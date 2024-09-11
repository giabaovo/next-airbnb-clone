'use client'

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import React, {useCallback, useState} from "react";
import ListingCard from "@/app/components/listings/ListingCard";
import {useRouter} from "next/navigation";
import {getAccessToken} from "@/app/lib/actions";
import axios from "axios";
import toast from "react-hot-toast";

interface ReservationsClientProps {
    reservations: Reservation[],
    currentUser?: User
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter()

    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id)

        const token = await getAccessToken()

        axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/api/property/reservation/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                toast.success('Reservation canceled')
                router.refresh()
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('')
            })
    }, [router])

    return (
        <Container>
            <Heading
                title={"Reservations"}
                subtitle={"Bookings on your properties"}
            />
            <div
                className={"mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"}>
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel={"Cancel guest reservation"}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default ReservationsClient