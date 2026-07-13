import z, { boolean } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { db } from "@/server/db";
import type { Prisma } from "@prisma/client";

export const authourizeAccountAccess = async (accountId: string, userId: string) => {
    const account = await db.account.findFirst({
        where: {
            id: accountId,
            userId
        }, select: {
            id: true, emailAddress: true, name: true, accessToken: true
        }
    })
    if (!account) throw new Error('Access not found')
        return account
}

export const accountRouter = createTRPCRouter({
    getAccounts: privateProcedure.query(async ({ ctx }) => {
        return await ctx.db.account.findMany({
            where: {
                //userId: ctx.auth?.userId
                userId: ctx.auth.id
            },
            select: {
                id: true, emailAddress: true, name: true
            }
        })
    }),

    getNumThreads: privateProcedure.input(z.object({
        accountId: z.string(),
        tab: z.string()
    })).query(async ({ ctx, input }) => {
        const account = await authourizeAccountAccess(input.accountId, ctx.auth./*user*/id)

        let filter: Prisma.ThreadWhereInput = {}
        if (input.tab === 'inbox') {
            filter.inboxStatus = true
        } else if (input.tab === 'drafts') {
            filter.draftStatus = true
        } else if (input.tab === 'sent') {
            filter.sentStatus = true
        }

        return await ctx.db.thread.count({
            where: {
                accountId: account.id,
                // inboxStatus: input.tab === 'inbox' ? true : false,
                // draftStatus: input.tab === 'drafts' ? true : false,
                // sentStatus: input.tab === 'sent' ? true : false
                ...filter
            }
        })
    }),
    getThreads: privateProcedure.input(z.object({
        accountId: z.string(),
        tab: z.string(),
        done: boolean()
    })).query(async({ ctx, input }) => {
        //done: z.boolean()
        const account = await authourizeAccountAccess(input.accountId, ctx.auth./*user*/id)

        let filter: Prisma.ThreadWhereInput = {}
        if (input.tab === 'inbox') {
            filter.inboxStatus = true
        } else if (input.tab === 'drafts') {
            filter.draftStatus = true
        } else if (input.tab === 'sent') {
            filter.sentStatus = true 
        } 

        filter.done = {
            equals: input.done
        }

        return await ctx.db.thread.findMany({
            where: filter,
            include: {
                emails: {
                    orderBy: {
                        sentAt: 'asc'
                    },
                    select: {
                        from: true,
                        body: true,
                        bodySnippet: true,
                        emailLabel: true,
                        subject: true,
                        id: true,
                        sentAt: true,
                    }
                },
            },
            takes: 15,
            orderBy: {
                lastMessageDates: 'desc'
            }
        })
    })
})