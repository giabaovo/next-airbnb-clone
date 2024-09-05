'use client'

import React, {useMemo} from "react";
import {categories} from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

interface ListingClientProps {
    reservations?: []
    listing: Listing & {
        user: User
    }
    currentUser?: User | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser
}) => {
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
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient