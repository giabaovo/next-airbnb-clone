'use server'

import {cookies} from "next/headers";
import axios from "axios";
import toast from "react-hot-toast";

export const handleLogin = async (userId: string, accessToken: string, refreshToken: string) => {
    cookies().set('session_user_id', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    })

    cookies().set('session_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        path: '/'
    })

    cookies().set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    })
}

export const resetAuthCookies = async () => {
    cookies().set('session_user_id', '')
    cookies().set('session_access_token', '')
    cookies().set('session_refresh_token', '')
}

export const getUserId = async () => {
    const userId = cookies().get('session_user_id')?.value
    return userId ? userId : null
}

export const getAccessToken = async () => {
    const accessToken = cookies().get('session_access_token')?.value
    return accessToken ? accessToken : null
}

export const getListings = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/property/`);
        return response.data;
    } catch (error) {
        toast.error("Something went wrong");
        return [];
    }
};