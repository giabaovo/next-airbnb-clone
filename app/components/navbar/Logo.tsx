'use client'

import Image from "next/image";
import {useRouter} from "next/navigation";


const Logo = () => {
    const router = useRouter()

    return (
        <Image
            onClick={() => router.push('/')}
            height={100}
            width={100}
            className={"hidden md:block cursor-pointer"}
            src={"/images/logo.png"}
            alt={"Logo"}
        />
    )
}

export default Logo