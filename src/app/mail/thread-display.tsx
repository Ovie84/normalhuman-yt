"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useThreads from "@/hooks/use-threads";
import { Archive, ArchiveX, Trash2, Clock, MoreVertical } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ThreadDisplay = () => {
  const { threadId, threads } = useThreads();
  const thread = threads?.find(t => t.id === threadId);
  return (
    <div className="flex h-full flex-col">
        {/* buttons row */}
      <div className="flex items-center gap-2">
            {/* Separator */}
            <Separator />  
            {thread ? <>
                <div className='flex flex-col flex-1 overflow-scroll'>
                    <div className='flex items-center p-4'>
                        <div className='flex items-center gap-4 text-sm'>
                            <Avatar>
                                <AvatarImage alt='avatar'/>
                                <AvatarFallback>
                                    {thread?.emails[0]?.from?.name?.split(' ').map((chunk) => chunk[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                              <div className="font-semibold">
                                {thread.emails[0]?.from.name}
                                <div className="text-xs line-clamp-1">
                                  {thread.emails[0]?.subject}
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <>
            <div className="p-8 text-center text-muted-foreground">
                No Message Selected
            </div>
            </>}
        <div className="flex items-center gap-2">
          <Button variant={"ghost"} size="icon" disabled={!thread}>
            <Archive className="size-4" />
          </Button>
          <Button variant={"ghost"} size="icon" disabled={!thread}>
            <ArchiveX className="size-4" />
          </Button>
          <Button variant={"ghost"} size="icon" disabled={!thread}>
            <Trash2 className="size-4" />
          </Button>
          <Separator className="h-full" orientation="vertical" />
          <Button
            className="ml-2"
            variant={"ghost"}
            size="icon"
            disabled={!thread}
          >
            <Clock className="size-4" />
          </Button>
        </div>
        <div className="item-center ml-auto flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreVertical className="size-4" />
                Open
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel></DropdownMenuLabel>
                <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                <DropdownMenuItem>Star Thread</DropdownMenuItem>
                <DropdownMenuItem>Add Label</DropdownMenuItem>
                <DropdownMenuItem>Mute Thread</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ThreadDisplay;
