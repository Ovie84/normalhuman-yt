// "use client";

// import * as React from "react";
// import {
//   // ResizablePanelGroup,
//   // ResizablePanel,
//   // ResizableHandle,
//   ResizablePanelGroup as BaseGroup,
//   ResizablePanel as BasePanel,
//   ResizableHandle,
// } from "@/components/ui/resizable";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { cn } from "../../lib/utils";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { AccountSwitcher } from "@/app/mail/account-switcher";
// import Sidebar from "./sidebar";
// import ThreadList from "./thread-list";
// import ThreadDisplay from "./thread-display";
// import { useLocalStorage } from "usehooks-ts";
// import { boolean, number } from "zod";
// import { Direction } from "radix-ui";
// // import { HTMLAttributes, ReactNode } from 'react';

// const ResizablePanelGroup = BaseGroup as any;
// const ResizablePanel = BasePanel as any;

// // type ResizablePanelGroupProps = React.HTMLAttributes<HTMLDivElement> & {
// //   direction?: "horizontal" | "vertical";
// //   onLayout?: (sizes: number[]) => void;
// // };

// // const ResizablePanelGroup: React.FC<ResizablePanelGroupProps> = ({
// //   direction = "horizontal",
// //   onLayout,
// //   children,
// //   className,
// //   ...rest
// // }) => (
// //   <div {...rest} className={className}>
// //     {children}
// //   </div>
// // );

// // type Props = {
// //   defaultLayout: number[] | undefined;
// //   navCollapsedSize: number;
// //   defaultCollapsed: boolean;
// // };

// // type ResizablePanelProps = React.HTMLAttributes<HTMLDivElement> & {
// //   onCollapse?: () => void;
// //   defaultSize?: number;
// //   collapsedSize?: number;
// //   collapsible?: boolean;
// //   minSize?: number;
// //   maxSize?: number;
// //   onResize?: () => void;
// // };

// // const ResizablePanel: React.FC<ResizablePanelProps> = ({
// //   // onCollapse,
// //   defaultSize,
// //   collapsedSize,
// //   collapsible,
// //   minSize,
// //   maxSize,
// //   onResize,
// //   onCollapse,
// //   onExpand,
// //   tagName = "div",
// //   id,
// //   order,
// //   ...rest
// // }: any) => {
// //   // call onCollapse when collapse happens
// //   return <div {...rest} />;
// // };

// interface MailProps {
//   defaultLayout: number[] | undefined;
//   defaultCollapsed?: boolean;
//   navCollapsedSize: number;
//   // Not sure of the next two lines of code
//   onCollapse?: (sizes: number[]) => void;
//   direction?: string;
// }

// export function Mail({
//   defaultLayout = [20, 32, 48],
//   defaultCollapsed = false,
//   navCollapsedSize,
// }: MailProps) {
//   const [done, setDone] = useLocalStorage("normalhuman-done", false);
//   const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
//   // const Mail = ({ defaultLayout = [20, 32, 40], navCollapsedSize }: Props) => {
  
//   return (
//     <TooltipProvider delayDuration={0}>
//       <ResizablePanelGroup
//         direction="horizontal"
//         onLayout={(sizes: number[]) => {
//           // console.log(sizes)
//           document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
//             sizes,
//           )}`;
//         }}
//         className="h-full min-h-screen items-stretch"
//       >
//         <ResizablePanel
//           defaultSize={defaultLayout[0]}
//           collapsedSize={navCollapsedSize}
//           collapsible={true}
//           minSize={15}
//           maxSize={40}
//           onCollapse={() => {
//             setIsCollapsed(true);
//             document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
//               true,
//             )}`;
//           }}
//           onResize={() => {
//             setIsCollapsed(false);
//             document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
//               false,
//             )}`;
//           }}
//           className={cn(
//             isCollapsed && "min-w-12.5 transition-all duration-300 ease-in-out",
//           )}
//         >
//           <div className="flex h-full flex-1 flex-col">
//             <div
//               className={cn(
//                 "flex h-12.5 items-center justify-between",
//                 isCollapsed ? "h-12.5" : "p-2",
//               )}
//             >
//               {/* Account Switcher */}
//               <AccountSwitcher isCollapsed={isCollapsed} />
//             </div>
//             <Separator />
//             <Sidebar isCollapsed={isCollapsed} />
//             <div className="flex-1"></div>
//             {/* AI */}
//             {/* <AskAI isCollapsed={isCollapsed}/> */}
//             <span>Ask AI</span>
//           </div>
//         </ResizablePanel>
//         <ResizableHandle withHandle />
//         <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
//           <Tabs
//             defaultValue="inbox"
//             value={done ? "done" : "inbox"}
//             onValueChange={(tab) => {
//               if (tab === "done") {
//                 setDone(true);
//               } else {
//                 setDone(false);
//               }
//             }}
//           >
//             <div className="flex items-center px-4 py-2">
//               <h1 className="text-xl font-bold">Inbox</h1>
//               <TabsList className="ml-auto">
//                 <TabsTrigger
//                   value="inbox"
//                   className="text-xinc-600 dark:text-zinc-200"
//                 >
//                   <div>Inbox</div>
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="done"
//                   className="text-xinc-600 dark:text-zinc-200"
//                 >
//                   <div>Done</div>
//                 </TabsTrigger>
//               </TabsList>
//             </div>
//             <Separator />
//             {/* Search Bar */}
//             <div>Search Bar</div>
//             <TabsContent value="inbox" className="m-0">
//               <ThreadList />
//             </TabsContent>
//             <TabsContent value="done" className="m-0">
//               <ThreadList />
//             </TabsContent>
//           </Tabs>
//         </ResizablePanel>
//         <ResizableHandle withHandle />
//         <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
//           <ThreadDisplay />
//         </ResizablePanel>
//       </ResizablePanelGroup>
//     </TooltipProvider>
//   );
// }

// // React.useState at the top level of the file,
// //  outside of a React function component body,
// //  will cause app to crash instantly in production
// // export default Mail;
