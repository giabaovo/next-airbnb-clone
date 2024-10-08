'use client'

import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "@/app/components/navbar/Avatar";
import React, {useCallback, useState} from "react";
import MenuItem from "@/app/components/navbar/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {useRouter} from "next/navigation";
import {resetAuthCookies} from "@/app/lib/actions";
import toast from "react-hot-toast";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()

    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value)
    }, [])

    const submitLogout = async () => {
        resetAuthCookies()
        toast.success('Logout successfully')
        router.refresh()
    }

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal])

    return (
        <div className={"relative"}>
            <div className={"flex flex-row items-center gap-3"}>
                <div
                    onClick={() => {
                        setIsOpen(false)
                        onRent()
                    }}
                    className={"hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"}>
                    Airbnb Your Home
                </div>
                <div
                    onClick={toggleOpen}
                    className={"p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"}>
                    <AiOutlineMenu/>
                    <div className={"hidden md:block"}>
                        <Avatar imageSrc={"/images/placeholder.png"}/>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className={"absolute rounded-md shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"}>
                    <div className={"flex flex-col cursor-pointer"}>
                        {currentUser ? (
                            <>
                                <MenuItem
                                    label={"My trips"}
                                    onClick={() => {
                                        setIsOpen(false)
                                        router.push('/trips')
                                    }}
                                />
                                <MenuItem
                                    label={"My favorites"}
                                    onClick={() => {
                                        setIsOpen(false)
                                        router.push('/favorites')
                                    }}
                                />
                                <MenuItem
                                    label={"My reservations"}
                                    onClick={() => {
                                        setIsOpen(false)
                                        router.push('/reservations')
                                    }}
                                />
                                <MenuItem
                                    label={"My properties"}
                                    onClick={() => {
                                        setIsOpen(false)
                                        router.push('/properties')
                                    }}
                                />
                                <MenuItem
                                    label={"Airbnb my home"}
                                    onClick={() => {
                                        setIsOpen(false)
                                        rentModal.onOpen()
                                    }}
                                />
                                <hr/>
                                <MenuItem
                                    label={"Logout"}
                                    onClick={() => {
                                        setIsOpen(false)
                                        submitLogout()
                                    }}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label={"Login"}
                                    onClick={() => {
                                        setIsOpen(false)
                                        loginModal.onOpen()
                                    }}
                                />
                                <MenuItem
                                    label={"Sign up"}
                                    onClick={() => {
                                        setIsOpen(false)
                                        registerModal.onOpen()
                                    }}
                                />
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu