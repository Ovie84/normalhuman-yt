'use client'

import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Nav } from './nav'
import { Inbox, Send, File } from 'lucide-react'
import { DefaultDeserializer } from 'v8'
import { api } from '@/trpc/react'

type Props = { isCollapsed: boolean }

const Sidebar = ({ isCollapsed }: Props) => {
  const [accountId] = useLocalStorage('accountId', '')
  const [tab] = useLocalStorage<'inbox' | 'drafts' | 'sent'>('normalhuman-tab', 'inbox')

  const { data: inboxThreads }  = api.account.getNumThreads.useQuery({
    accountId,
    tab: 'inbox'
  })

  const { data: draftThreads }  = api.account.getNumThreads.useQuery({
    accountId,
    tab: 'drafts'
  })

  const { data: sentThreads }  = api.account.getNumThreads.useQuery({
    accountId,
    tab: 'sent'
  })

  return (
    //<div>{accountId}</div>
    <Nav
        isCollapsed={isCollapsed}
        links={[
            {
               title: "Inbox",
               label: inboxThreads?.toString() ?? '0',
               icon: Inbox,
               variant: tab === 'inbox' ? 'default' : 'ghost'
            },
            {
                title: "Drafts",
                label: draftThreads?.toString() ?? '0',
                icon: File,
                variant: tab === 'drafts' ? 'default' : 'ghost'
            },
            {
                title: "Sent",
                label: sentThreads?.toString() ?? '0',
                icon: Send,
                variant: tab === 'sent' ?  'default' : 'ghost'
            }
        ]}
    />
  )
}

export default Sidebar