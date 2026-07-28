"use client";
import useThreads from "@/hooks/use-threads";
import { cn } from "@/lib/utils";
import type { RouterOutputs } from "@/trpc/react";
import { formatDistance, formatDistanceToNow } from "date-fns";
import React from "react";
import Avatar from "react-avatar";
import { Letter } from 'react-letter';

type Props = {
  email: RouterOutputs["account"]["getThreads"][0]["emails"][0];
};

const EmailDisplay = ({ email }: Props) => {
  const { account } = useThreads();

  // const isMe = true;
  const isMe = account?.emailAddress === email.from.address;
  // who sent the email? and if its me
  return (
    // <div>{account?.emailAddress}</div>
    <div
      className={cn(
        "rounded-md border p-4 transition-all hover:translate-x-2",
        {
          "border-1-gray-900 border-1-4": isMe,
        },
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center justify-between gap-2">
          {/* <span>{email.from.name}</span> */}
          {!isMe && (
            <Avatar
              name={email.from.name ?? email.from.address}
              email={email.from.address}
              size="35"
              textSizeRatio={2}
              round={true}
            />
          )}
          <span className="font-medium">
            {isMe ? "Me" : email.from.address}
          </span>
        </div>
        <p className="text-me text-muted-foreground">
          {formatDistanceToNow(email.sentAt ?? new Date(), {
            addSuffix: true
          })}
        </p>
      </div>
      <div className="h-4"></div>
      <Letter html={email?.body ?? ''} className='bg-white rounded-md text-black'/>
    </div>
  );
};

export default EmailDisplay;
