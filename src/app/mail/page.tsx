"use client";

import dynamic from 'next/dynamic'
import React from 'react'
// import { Mail } from './mail' 

// const Mail = dynamic(()=> import('./mail'),
const Mail = dynamic(()=> import('./mail').then((mod) => mod.Mail),
  { ssr: false }
);

const MailDashboard = () => {
  return (
    <Mail
      defaultLayout={[20, 32, 40]}
      defaultCollapsed={false}
      navCollapsedSize={4}
    />
  )
}

export default MailDashboard