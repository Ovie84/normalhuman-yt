// /api/aurinko/callback/route.js

import { NextRequest, NextResponse } from "next/server"
//import { auth } from "@kinde-oss/kinde-auth-nextjs"
//import auth from "node_modules/@kinde-oss/kinde-auth-nextjs/dist/types/src/handlers/auth"
import { waitUntil } from "@vercel/functions"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { exchangeCodeForAccessToken, getAccountDetails } from "@/lib/aurinko"
import { db } from "@/server/db"
import axios from "axios"

export const GET = async( req: NextRequest ) => {
    const { getUser } = await getKindeServerSession()
    const user = await getUser()
    const userId = user?.id
    // const userId = await getKindeServerSession();
    if(!userId) return NextResponse.json({message: "No user founded0"}, { status: 401})
    const params = req.nextUrl.searchParams
    //const params = new URL(req.url).searchParams
    const status = params.get('status')
    if (status != 'success') return NextResponse.json({ message: "Authentication failed to link account"}, { status: 400})

    // get the code to exchange for an access token
    const code = params.get('code')
    if (!code) return NextResponse.json({ message: 'No code provided'}, {status: 400})
    const token = await exchangeCodeForAccessToken(code)
    if (!token) return NextResponse.json({message: 'Failed to exchange code for access token'}, { status: 500})
    console.log(userId)

    const accountDetails = await getAccountDetails(token.accessToken)

    await db.account.upsert({
        where: { id: token.accountId.toString()},
        update: {
            accessToken: token.accessToken,
        },
        create: {
            id: token.accountId.toString(),
            userId,
            emailAddress: accountDetails.email,
            name: accountDetails.name,
            accessToken: token.accessToken,
        }
    })

    // trigger initial sync endpoint to fetch emails and othere data from the email account
    waitUntil(
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/initial-sync`, {
            accountId: token.accountId.toString(),
            userId
        }).then(response => {
            console.log("Initial sync triggered successfully", response.data)  
        }).catch (error => {
            console.error('Failed to trigger initial sync endpoint', error)  
        })
    )

    //return NextResponse.json({ message: "Hello from the aurinko callback API"})
    return NextResponse.redirect(new URL('/mail', req.url))

}