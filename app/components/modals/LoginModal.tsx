'use client'

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";


const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch((error) => {
                toast.error("Something went wrong.")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className={"flex flex-col gap-4"}>
            <Heading
                title={"Welcome back"}
                subtitle={"Login to your account!"}
            />
            <Input
                id={"email"}
                label={"Email"}
                register={register}
                errors={errors}
                required
            />
            <Input
                id={"password"}
                type={"password"}
                label={"Password"}
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
                        Don't have an account
                    </div>
                    <div className={"text-neutral-800 cursor-pointer hover:underline"} onClick={registerModal.onClose}>
                        Sign up
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={"Continue"}
            disabled={isLoading}
            title={"Login"}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal