import {getCurrentUser, getWishList} from "@/app/lib/actions";
import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "@/app/favorites/FavoritesClient";

const FavoritesPage = async () => {

    const currentUser = await getCurrentUser()

    const favorite_listings = await getWishList()
    const { listings } = favorite_listings
    console.log(listings)

    if (listings.length === 0) {
        return (
            <EmptyState
                title={"No favorites found"}
                subtitle={"Looks like you have no favorite listings"}
            />
        )
    }

    return (
        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default FavoritesPage