import {useRouter} from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import {useCallback, useMemo} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {getAccessToken} from "@/app/lib/actions";

interface UseFavoriteProps {
    listingId: string
    currentUser?: User | null
}

const useFavorite = ({
    listingId,
    currentUser
}: UseFavoriteProps) => {
    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFavorited = useMemo( () => {
        const list = currentUser?.favorites || []
        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation()

        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            const token = await getAccessToken()
            await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/api/property/${listingId}/favorite/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            router.refresh()
            toast.success('Success')
        } catch (error) {
            toast.error('Something went wrong')
        }
    }, [currentUser, listingId, loginModal, router])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite