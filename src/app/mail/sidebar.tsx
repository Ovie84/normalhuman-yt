"use client";

import React from "react";
import { useLocalStorage } from "usehooks-ts";
import { Nav } from "./nav";
import { Inbox, Send, File } from "lucide-react";
import { DefaultDeserializer } from "v8";
import { api } from "@/trpc/react";

type Props = { isCollapsed: boolean };

const Sidebar = ({ isCollapsed }: Props) => {
  const [accountId] = useLocalStorage("accountId", "");
  const [tab] = useLocalStorage<"inbox" | "drafts" | "sent">(
    "normalhuman-tab",
    "inbox",
  );

  const refetchInterval = 5000;

  const { data: inboxThreads } = api.account.getNumThreads.useQuery(
  // const { data: inboxThreads } = api.mail.getNumThreads.useQuery(
    {
      accountId,
      tab: "inbox",
    },
    {
      enabled: !!accountId && !!tab, refetchInterval,
    },
  );

  const { data: draftThreads } = api.account.getNumThreads.useQuery(
  // const { data: draftThreads } = api.mail.getNumThreads.useQuery(
    {
      accountId,
      tab: "drafts",
    },
    {
      enabled: !!accountId && !!tab, refetchInterval,
    },
  );

  const { data: sentThreads } = api.account.getNumThreads.useQuery(
  // const { data: sentThreads } = api.mail.getNumThreads.useQuery(
    {
      accountId,
      tab: "sent",
    },
    {
      enabled: !!accountId && !!tab, refetchInterval,
    },
  );

  return (
    //<div>{accountId}</div>
    <Nav
      isCollapsed={isCollapsed}
      links={[
        {
          title: "Inbox",
          // label: inboxThreads?.toString() ?? "0",
          label: inboxThreads?.toString() || "0",
          icon: Inbox,
          variant: tab === "inbox" ? "default" : "ghost",
        },
        {
          title: "Drafts",
          // label: draftThreads?.toString() ?? "0",
          label: draftThreads?.toString() || "0",
          icon: File,
          variant: tab === "drafts" ? "default" : "ghost",
        },
        {
          title: "Sent",
          // label: sentThreads?.toString() ?? "0",
          label: sentThreads?.toString() || "0",
          icon: Send,
          variant: tab === "sent" ? "default" : "ghost",
        },
      ]}
    />
  );
};

export default Sidebar;
