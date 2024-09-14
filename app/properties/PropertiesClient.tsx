'use client'

import React, {useCallback, useState} from "react";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import {useRouter} from "next/navigation";
import ListingCard from "@/app/components/listings/ListingCard";
import axios from "axios";
import toast from "react-hot-toast";
import {getAccessToken} from "@/app/lib/actions";

interface TripsClientProps {
    listings: Listing[]
    currentUser: User
}

const PropertiesClient: React.FC<TripsClientProps> = ({
    listings,
    currentUser
}) => {

    const router = useRouter()

    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id)

        const token = await getAccessToken()

        axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}/api/property/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                toast.success('Property canceled')
                router.refresh()
            })
            .catch((error) => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setDeletingId('')
            })
    }, [router])

    return (
        <Container>
            <Heading
                title={"Properties"}
                subtitle={"List of your properties"}
            />
            <div className={"mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"}>
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel={"Cancel property"}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient