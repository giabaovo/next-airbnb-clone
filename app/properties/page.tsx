import {getCurrentUser, getListingByUser} from "@/app/lib/actions";
import EmptyState from "@/app/components/EmptyState";
import PropertiesClient from "@/app/properties/PropertiesClient";

const PropertiesPage = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState
                title={"Unauthorized"}
                subtitle={"Please login"}
            />
        )
    }

    const listings = await getListingByUser()

    if (listings.length === 0) {
        return (
            <EmptyState
                title={"No properties found"}
                subtitle={"Looks like you don't have any properties"}
            />
        )
    }

    return (
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default PropertiesPage