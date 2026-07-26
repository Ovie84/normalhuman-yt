'use client'
import type { RouterOutputs } from '@/trpc/react'
import React from 'react'

type Props = {
    email: RouterOutputs['account']['getThreads'][0]['emails'][0]
}

const EmailDisplay = (props: Props) => {
  return (
    <div>EmailDisplay</div>
  )
}

export default EmailDisplay