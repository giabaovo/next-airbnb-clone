import {getCurrentUser, getReservationsByAuthor} from "@/app/lib/actions";
import EmptyState from "@/app/components/EmptyState";
import ReservationsClient from "@/app/reservations/ReservationsClient";

const ReservationsPage = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <EmptyState
                title={"Unauthorized"}
                subtitle={"Please login"}
            />
        )
    }

    const reservations = await getReservationsByAuthor()

    if (reservations.length === 0) {
        return (
            <EmptyState
                title={"No reservations found"}
                subtitle={"Looks like you have no reservations on your properties"}
            />
        )
    }

    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default ReservationsPage