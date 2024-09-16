'use client'

import EmptyState from "@/app/components/EmptyState";
import React, {useEffect} from "react";

interface ErrorStateProps {
    error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({
    error
}) => {

    useEffect(() => {
        console.log(error)
    }, [error]);

    return (
        <EmptyState
            title={"Whoops"}
            subtitle={"Something went wrong!"}
        />
    )
}

export default ErrorState