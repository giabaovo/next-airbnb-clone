import {getCurrentUser, getReservationsByUser} from "@/app/lib/actions";
import EmptyState from "@/app/components/EmptyState";
import TripsClient from "@/app/trips/TripsClient";

const TripsPage = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState
                title={"Unauthorized"}
                subtitle={"Please login"}
            />
        )
    }

    const reservations = await getReservationsByUser()

    if (reservations.length === 0) {
        return (
            <EmptyState
                title={"No trips found"}
                subtitle={"Looks like you haven't reserved any trips"}
            />
        )
    }

    return (
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default TripsPage