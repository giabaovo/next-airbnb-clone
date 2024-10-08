'use server'

import {cookies} from "next/headers";
import axios from "axios";
import toast from "react-hot-toast";

export const handleLogin = async (accessToken: string, refreshToken: string) => {
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
    cookies().set('session_access_token', '')
    cookies().set('session_refresh_token', '')
}

export const getCurrentUser = async () => {
    try {
        const token = await getAccessToken()
        if (token) {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/me/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }
        return null
    } catch (error) {
        toast.error("Something went wrong");
    }
};

export const getAccessToken = async () => {
    const accessToken = cookies().get('session_access_token')?.value
    return accessToken ? accessToken : null
}

export const getListings = async (query: string) => {
    try {
        let url = `${process.env.NEXT_PUBLIC_API_HOST}/api/property/`
        if (query) {
            url += `?${query}`
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        toast.error("Something went wrong");
        return [];
    }
};

export const getListingById = async (listingId: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/property/${listingId}/`);
        return response.data;
    } catch (error) {
        toast.error("Something went wrong");
    }
};

export const getListingByUser = async () => {
    try {
        const token = await getAccessToken()
        if (token) {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/property/user-properties/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data
        }
        return null
    } catch (error) {
        toast.error("Something went wrong");
    }
};

export const getReservations = async (listingId: string) => {
    try {
        const token = await getAccessToken()
        if (token) {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/property/${listingId}/reservation/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data
        }
        return null
    } catch (error) {
        toast.error("Something went wrong");
    }
};

export const getReservationsByUser = async () => {
    try {
        const token = await getAccessToken()
        if (token) {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/property/user-reservation/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data
        }
        return null
    } catch (error) {
        toast.error("Something went wrong");
    }
};

export const getReservationsByAuthor = async () => {
    try {
        const token = await getAccessToken()
        if (token) {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/property/author-reservation/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data
        }
        return null
    } catch (error) {
        toast.error("Something went wrong");
    }
};

export const getWishList = async () => {
    try {
        const token = await getAccessToken()
        if (token) {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/property/wishlist/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data
        }
        return null
    } catch (error) {
        toast.error("Something went wrong");
    }
};