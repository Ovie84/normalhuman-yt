'use client'

import /* * as */ React from "react";
import {
  ResizableHandle,
  //ResizablePanel,
  //ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from "../../lib/utils";
import { Separator } from "@/components/ui/separator";
//import { Tabs, TabsList, TabsTrigger } from "radix-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSwitcher from "@/app/mail/account-switcher";
import { Sidebar } from "lucide-react";
import ThreadList from "./thread-list";
import ThreadDisplay from "./thread-display";
//import { HTMLAttributes, ReactNode } from 'react';

type ResizablePanelGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  direction?: 'horizontal' | 'vertical'
  onLayout?: (sizes: number[]) => void
}

const ResizablePanelGroup: React.FC<ResizablePanelGroupProps> = ({
  direction = 'horizontal',
  onLayout,
  children,
  className,
  ...rest
}) => (
  <div {...rest} className={className}>
    {children}
  </div>
)


type Props = {
    defaultLayout: number[] | undefined
    navCollapsedSize: number
    defaultCollapsed: boolean
}

type ResizablePanelProps = React.HTMLAttributes<HTMLDivElement> & {
  onCollapse?: () => void
  defaultSize?: number
  collapsedSize?: number
  collapsible?: boolean
  minSize?: number
  maxSize?: number
  onResize?: () => void
}

const ResizablePanel: React.FC<ResizablePanelProps> = ({
  onCollapse,
  ...rest
}) => {
  // call onCollapse when collapse happens
  return <div {...rest} />
}

const [isCollapsed, setIsCollapsed] = React.useState(false)

const Mail = ({ defaultLayout = [20, 32, 40], navCollapsedSize }: Props) => {
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup direction="horizontal" onLayout={(sizes: number[]) => {
        console.log(sizes)
      }} className='items-stretch h-full min-h-screen'>
        <ResizablePanel defaultSize={defaultLayout[0]} collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={40}
            onCollapse={()=>{setIsCollapsed(true)}}
            onResize={()=>{setIsCollapsed(false)}}
            className={cn(isCollapsed && 'min-w-12.5 transition-all duration-300 ease-in-out')}
            >
              <div className="flex flex-col h-full flex-1">
                <div className={cn("flex h-12.5 items-center justify-between", isCollapsed ? 'h-12.5' : 'p-2')}>
                  {/* Account Switcher */}
                  <AccountSwitcher isCollapsed={isCollapsed} />
                </div>
                <Separator />
                {/* Sidebar */}
                <Sidebar /*isCollapsed={isCollapsed}*/ /> 
                <div className="flex-1"></div>
                {/* AI */}
                Ask AI              
              </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue='inbox'>
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger value="inbox" className="text-xinc-600 dark:text-zinc-200">
                  Inbox
                </TabsTrigger>
                <TabsTrigger value="done" className="text-xinc-600 dark:text-zinc-200">
                  Done
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            {/* Search Bar */}
            Search Bar
            <TabsContent value="inbox">
              {/* Inbox */}
              <ThreadList />
            </TabsContent>
            <TabsContent value="done">
              {/* Done */}
              <ThreadList />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <ThreadDisplay />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Mail;
