"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Text } from "@tiptap/extension-text";
import EditorMenuBar from "./editor-menubar";
import { Separator } from "react-resizable-panels";
import { Button } from "@/components/ui/button";

type Props = {};

const EmailEditor = (props: Props) => {
  const [value, setValue] = React.useState<string>("");
  const [expanded, setExpanded] = React.useState<boolean>(false)

  const CustomText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Meta-j": () => {
          console.log("Meta-j pressed");
          return true;
        },
      };
    },
  });
  const editor = useEditor({
    autofocus: false,
    extensions: [StarterKit, CustomText],
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div className="flex border-b p-4 py-2">
        <EditorMenuBar editor={editor} />
      </div>
      <div className="p-4 pb-0 space-y-2">
        {expanded && (
          <>
          cc inputs
          </>
        )}
        <div className="flex items-center gap-2">
          <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <span className="text-green-600 font-medium">
            Draft {" "}
          </span>
          <span>
            to Ovie  
          </span>
          </div>
        </div>
      </div>
      <div className="prose w-full px-4">
        <EditorContent editor={editor} value={value} />
      </div>
      <Separator />
      <div className="py-3 px-4 flex items-center justify-between">
        <span className="text-sm">
          Tip: Press {" "}
          <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
            Cntrl + J  
          </kbd>
          for AI autocomplete
        </span>
        <Button>
          Send  
        </Button>
      </div>
    </div>
  );
};

export default EmailEditor;
