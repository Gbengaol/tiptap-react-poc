"use client";

import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TipTapSubscript from "@tiptap/extension-subscript";
import TipTapSuperscript from "@tiptap/extension-superscript";
import TipTapUnderline from "@tiptap/extension-underline";
import TipTapPlaceholder from "@tiptap/extension-placeholder";

import React, { FC, HTMLAttributes } from "react";
import { Options } from "../options.type";
import { ToolBar } from "./toolbar";
import { cn } from "@/lib/utils";

const extensions = [
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: true,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: true,
    },
  }),
  TipTapSubscript,
  TipTapSuperscript,
  TipTapUnderline,
];

interface TiptapProps {
  options: Options[];
  toolbarCustomButtons?: React.JSX.Element[];
  toolbarHidden?: boolean;
  toolbarStyle?: HTMLAttributes<HTMLDivElement>["style"];
  wrapperStyle?: HTMLAttributes<HTMLDivElement>["style"];
  wrapperClassName?: HTMLAttributes<HTMLDivElement>["className"];
  editorClassName?: HTMLAttributes<HTMLDivElement>["className"];
  placeholder?: string;
  handleChange?: (val: string) => void;
  initialContent: string;
}

const Tiptap: FC<TiptapProps> = ({
  options,
  toolbarCustomButtons,
  toolbarHidden,
  toolbarStyle,
  wrapperStyle,
  wrapperClassName,
  editorClassName,
  placeholder,
  handleChange,
  initialContent,
}) => {
  return (
    <div
      className={cn(
        "tiptap flex flex-col border-2 border-gray-700",
        wrapperClassName
      )}
      style={wrapperStyle}
    >
      <EditorProvider
        extensions={[
          ...extensions,
          TipTapPlaceholder.configure({
            placeholder,
          }),
        ]}
        content={initialContent}
        editorProps={{
          attributes: {
            class: cn("h-96 overflow-auto", editorClassName),
          },
        }}
        onUpdate={(el) => {
          handleChange?.(el.editor.getHTML() || "");
        }}
        immediatelyRender={false}
      >
        {!toolbarHidden && (
          <ToolBar
            options={options}
            toolbarCustomButtons={toolbarCustomButtons}
            toolbarStyle={toolbarStyle}
            key="toolbar"
          />
        )}
      </EditorProvider>
    </div>
  );
};

export default Tiptap;
