import React from "react";
import {IconType} from "react-icons";
import useCountries from "@/app/hooks/useCountries";
import Avatar from "@/app/components/navbar/Avatar";
import ListingCategory from "@/app/components/listings/ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), {
    ssr: false
})

interface ListingInfoProps {
    user: User
    description: string
    guestCount: number
    roomCount: number
    bathRoomCount: number
    category: {
        icon: IconType
        label: string
        description: string
    } | undefined
    locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathRoomCount,
    category,
    locationValue
}) => {

    const { getByValue } = useCountries()

    const coordinates = getByValue(locationValue)?.latlng

    return (
        <div className={"col-span-4 flex flex-col gap-8"}>
            <div className={"flex flex-col gap-2"}>
                <div className={"text-xl font-semibold flex flex-row items-center gap-2"}>
                    <div>Hosted by {user?.name}</div>
                    <Avatar imageSrc={user?.avatar} />
                </div>
                <div className={"flex flex-row items-center gap-4 font-light text-neutral-500"}>
                    {guestCount === 1 ?
                        <div>{guestCount} guest</div> :
                        <div>{guestCount} guests</div>
                    }
                    {roomCount === 1 ?
                        <div>{roomCount} room</div> :
                        <div>{roomCount} rooms</div>
                    }
                    {bathRoomCount === 1 ?
                        <div>{bathRoomCount} bathroom</div> :
                        <div>{bathRoomCount} bathrooms</div>
                    }
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    description={category.description}
                    label={category.label}
                />
            )}
            <hr />
            <div className={"text-lg font-light text-neutral-500"}>
                {description}
            </div>
            <hr />
            <Map center={coordinates}/>
        </div>
    )
}

export default ListingInfo