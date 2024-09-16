'use client'

import React, {useCallback, useEffect, useMemo, useState} from "react";
import {categories} from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import {useRouter} from "next/navigation";
import {differenceInCalendarDays, eachDayOfInterval} from "date-fns";
import axios from "axios";
import {getAccessToken} from "@/app/lib/actions";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import {Range} from "react-date-range";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservations?: Reservation[]
    listing: Listing & {
        user: User
    }
    currentUser?: User | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {

    const loginModal = useLoginModal()

    const router = useRouter()

    const disableDates = useMemo(() => {
        let dates: Date[] = []

        reservations?.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })

            dates = [...dates, ...range]
        })

        return dates
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price_per_night)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)

    const onCreateReservation = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        setIsLoading(true)
        const token = await getAccessToken()

        axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/api/property/${listing.id}/reservation/`, {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                toast.success("Listing reserved!")
                setDateRange(initialDateRange)
                router.push('/trips')
                router.refresh()
            })
            .catch(() => {
                toast.error("Something went wrong")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [currentUser, totalPrice, loginModal, dateRange, listing?.id, router])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )

            if (dayCount && listing.price_per_night) {
                setTotalPrice(dayCount * listing.price_per_night)
            } else {
                setTotalPrice(listing.price_per_night)
            }
        }
    }, [dateRange, listing.price_per_night]);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category])

    return (
        <Container>
            <div className={"max-w-screen-lg mx-auto"}>
                <div className={"flex flex-col gap-6"}>
                    <ListingHead
                        id={listing.id}
                        title={listing.title}
                        image={listing.image}
                        locationValue={listing.location.value}
                        currentUser={currentUser}
                    />
                    <div className={"grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6"}>
                        <ListingInfo
                            user={listing.landlord}
                            description={listing.description}
                            guestCount={listing.guests}
                            roomCount={listing.bedrooms}
                            bathRoomCount={listing.bathrooms}
                            category={category}
                            locationValue={listing.location.value}
                        />
                        <div className={"order-first mb-10 md:order-last md:col-span-3"}>
                            <ListingReservation
                                price={listing.price_per_night}
                                totalPrice={totalPrice}
                                dateRange={dateRange}
                                disabledDates={disableDates}
                                disabled={isLoading}
                                onChangeDate={(value) => setDateRange(value)}
                                onSubmit={onCreateReservation}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient