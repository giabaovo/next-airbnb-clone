import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import {getCurrentUser, getListings} from "@/app/lib/actions";
import ListingCard from "@/app/components/listings/ListingCard";

export interface ListingParams {
    searchParams: {
        bathroomCount?: string
        guestCount?: string
        roomCount?: string
        category?: string
        locationValue?: string
        startDate?: string
        endDate?: string
    }
}

export default async function Home(params: ListingParams) {

    const {
        bathroomCount,
        guestCount,
        roomCount,
        category,
        locationValue,
        startDate,
        endDate
    } = params.searchParams

    let query = ''

    if (bathroomCount) {
        query += `bathroomCount=${bathroomCount}&`
    }

    if (guestCount) {
        query += `guestCount=${guestCount}&`
    }

    if (roomCount) {
        query += `roomCount=${roomCount}&`
    }

    if (category) {
        query += `category=${category}&`
    }

    if (locationValue) {
        query += `locationValue=${locationValue}&`
    }

    if (startDate) {
        query += `startDate=${startDate}&`
    }

    if (endDate) {
        query += `endDate=${endDate}&`
    }

    const listings = await getListings(query)
    const currentUser = await getCurrentUser()

    if (listings.length === 0) {
        return (
            <EmptyState showReset/>
        )
    }

    return (
        <Container>
            <div
                className={"pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"}>
                {listings.map((listing: any) => {
                    return (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            currentUser={currentUser}
                        />
                    )
                })}
            </div>
        </Container>
    );
}
