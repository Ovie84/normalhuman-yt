// /api/initial-sync/route.ts
import { Account } from "@/lib/account";
import { syncEmailsToDatabase } from "@/lib/sync-to-db";
import { db } from "@/server/db";
import { error } from "console";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const { accountId, userId } = await req.json()
    if (!accountId || !userId) {
        return NextResponse.json({error: 'Missing accountId or userId'}, {status: 400})
    }const dbAccount = await db.account.findUnique({
        where: {
            id: accountId,
            userId
        }
    })
    if (!dbAccount) return NextResponse.json({error: 'Account not founded1'}, {status: 404})

    const account = new Account(dbAccount.accessToken)

    // here we would trigger the initial sync process to fetch emails and other data from the email account using the access token stored in the database
    //const emails = await account.performInitialSync(/*dbAccount.accessToken*/)
    const response = await account.performInitialSync()
    //await syncEmailsToDatabase(emails)
    if (!response) {
        return NextResponse.json({ error: 'Failed to perform initial sync' }, { status: 500 })
    }
    const { emails, deltaToken } = response

    await syncEmailsToDatabase(emails, accountId)

    console.log('emails ', emails)

    // await db.account.update({
    //     where: {
    //         id: accountId
    //     },
    //     data: {
    //         nextDeltaToken: deltaToken
    //     }
    // })
    await syncEmailsToDatabase(emails, accountId)
    console.log('sync completed', deltaToken)
    return NextResponse.json({ success: true, deltaToken }, { status: 200 })
}