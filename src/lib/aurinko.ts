'use server'

import axios from "axios"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const getAurinkoAuthorizationUrl = async (serviceType: 'Google' | 'Office365') => {
    const { getUser } = /*await*/ getKindeServerSession()
    const user = await getUser()
    const userId = user?.id
    
    if (!userId) throw new Error("User not found")

        const params = new URLSearchParams({
            clientid: process.env.AURINKO_CLIENT_ID as string,
            serviceType,
            scopes: 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All',
            responseType: 'code',
            returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/kinde/aurinko/callback`
        })

        return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`
}

export const exchangeCodeForAccessToken = async (code: string) => {
    try {
        const response = await axios.post(`https://api.aurinko.io/v1/auth/token/${code}`, {}, {
            auth: {
                 username: process.env.AURINKO_CLIENT_ID as string,
                 password: process.env.AURINKO_CLIENT_SECRET as string
            }
        })
        return response.data as {
            accountId: string
            accessToken: string
            userId: string
            userSessionId: string
        }
    } catch (error) {
        if (axios.isAxiosError(error)){
            console.error(error.response?.data)
        }
        console.error(error)
    }
}

export const getAccountDetails = async (accessToken: string) => {
    try {
        const response = await axios.get('https://api.aurinko.io/v1/account', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return response.data as {
            email: string,
            name: string,
        }
    } catch (error){
        if (axios.isAxiosError(error)){
            console.error("Error fetching account details:", error.response?.data);
        } else {
            console.error('Unexpected error fetching account details: ', error);
        }
        throw error;
    }
}