'use client'

import Image from "next/image";
import React from "react";

interface AvatarProps {
    imageSrc: string
}

const Avatar: React.FC<AvatarProps> = ({
    imageSrc
}) => {
    return (
        <Image
            className={"rounded-full"}
            height={30}
            width={30}
            src={imageSrc}
            alt={"Avatar"}
        />
    )
}

export default Avatar