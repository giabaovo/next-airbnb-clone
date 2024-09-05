import {getCurrentUser, getListingById} from "@/app/lib/actions";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "@/app/listings/[listingId]/ListingClient";

interface ListingPageProps {
    params: {
        listingId: string;
    };
}

const ListingPage = async ({params}: ListingPageProps) => {

    const {listingId} = params

    const listing = await getListingById(listingId)
    const currentUser = await getCurrentUser()

    if (!listing) {
        return (
            <EmptyState/>
        )
    }

    return (
        <ListingClient
            listing={listing}
            currentUser={currentUser}
        />
    )
}

export default ListingPage