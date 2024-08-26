'use client'

import useRegisterModal from "@/app/hooks/useRegisterModal";
import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import {handleLogin} from "@/app/lib/actions";
import {useRouter} from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password1: "",
            password2: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/register/`, data)
            .then((response) => {
                handleLogin(response.data.access, response.data.refresh, response.data.user.pk)
                toast.success("Register successfully")
                registerModal.onClose()
                router.refresh()
            })
            .catch((error) => {
                toast.error("Something went wrong.")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className={"flex flex-col gap-4"}>
            <Heading
                title={"Welcome to Airbnb"}
                subtitle={"Create an account"}
            />
            <Input
                id={"email"}
                label={"Email"}
                register={register}
                errors={errors}
                required
            />
            <Input
                id={"name"}
                label={"Name"}
                register={register}
                errors={errors}
                required
            />
            <Input
                id={"password1"}
                type={"password"}
                label={"Password"}
                register={register}
                errors={errors}
                required
            />
            <Input
                id={"password2"}
                type={"password"}
                label={"Confirm Password"}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className={"flex flex-col gap-4 mt-3"}>
            <hr/>
            <Button
                outline
                label={"Continue with Google"}
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button
                outline
                label={"Continue with Github"}
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <div className={"text-neutral-500 text-center mt-4 font-light"}>
                <div className={"justify-center flex flex-row items-center gap-2"}>
                    <div>
                        Already have an account
                    </div>
                    <div className={"text-neutral-800 cursor-pointer hover:underline"} onClick={toggle}>
                        Login
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={"Continue"}
            disabled={isLoading}
            title={"Register"}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal