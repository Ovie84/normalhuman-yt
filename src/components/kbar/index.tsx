"use client";

import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
  type Action,
} from "kbar";
import RenderResults from "./render-results";
import { useLocalStorage } from "usehooks-ts";

export default function KBar({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useLocalStorage("normalhuman-tab", "inbox");
  const [done, setDone] = useLocalStorage("normalhuman-done", false);

  const actions: Action[] = [
    {
      id: "inboxAction",
      name: "Inbox",
      shortcut: ["g", "i"],
      section: "Navigation",
      subtitle: "View your inbox",
      perform: () => {
        console.log("Inbox"); //stand-in
        setTab("Inbox");
      },
    },
    {
      id: "draftsAction",
      name: "Drafts",
      shortcut: ["g", "d"],
      keywords: "drafts",
      section: "Navigation",
      subtitle: "View your drafts",
      perform: () => {
        setTab("drafts");
      },
    },
    {
      id: "sentAction",
      name: "Sent",
      shortcut: ["g", "s"],
      section: "Navigation",
      keywords: "sents",
      subtitle: "View your sent messages",
      perform: () => {
        setTab("Sent");
      },
    },
    {
      id: "pendingAction",
      name: "See done",
      shortcut: ["g", "d"],
      keywords: "done",
      section: "Navigation",
      subtitle: "View your done emails",
      perform: () => {
        setDone(true);
      },
    },
    {
      id: "doneAction",
      name: "See pending",
      shortcut: ["g", "u"],
      keywords: "pending undone, not done",
      section: "Navigation",
      subtitle: "View the pending emails",
      perform: () => {
        setDone(false);
      },
    },
  ];
  return (
    <KBarProvider actions={actions}>
      <ActualComponent>{children}</ActualComponent>
    </KBarProvider>
  );
}

const ActualComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <KBarPortal>
        <KBarPositioner className="insert-0 scrollbar-hide fixed z-999 bg-black/40 p-0! backdrop-blur-sm dark:bg-black/80">
          <KBarAnimator className="text-foreground relative mt-64! w-full max-w-150 -translate-y-12! overflow-hidden rounded-lg border bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <div className="bg-white dark:bg-gray-800">
              <div className="border-x-0 border-b-2 dark:border-gray-700">
                <KBarSearch className="w=full border-none bg-white px-5 py-4 text-lg outline-none focus:ring-0 focus:ring-offset-0 focus:outline-none dark:bg-gray-800" />
              </div>
            </div>
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </>
  );
};
