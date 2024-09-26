import React, { FC, HTMLAttributes } from "react";
import { Options } from "../options.type";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Undo,
} from "lucide-react";
import { useCurrentEditor } from "@tiptap/react";

type MenubarOptions = {
  name: Options;
  elements: {
    icon: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className: HTMLAttributes<HTMLDivElement>["className"];
  };
};

interface ToolBarProps {
  options: Options[];
  toolbarCustomButtons?: React.JSX.Element[];
  toolbarStyle?: HTMLAttributes<HTMLDivElement>["style"];
  setHTML?: (html?: string) => void;
}

export const ToolBar: FC<ToolBarProps> = ({
  options,
  toolbarCustomButtons,
  toolbarStyle,
}) => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const menubarOptions: MenubarOptions[] = [
    {
      name: "Bold",
      elements: {
        icon: <Bold />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        disabled: !editor.can().chain().focus().toggleBold().run(),
        className: cn(
          "size-8 p-2 rounded-full hover:scale-[1.05]",
          editor.isActive("bold") && "bg-red-600 text-white p-1.5"
        ),
      },
    },
    {
      name: "Italic",
      elements: {
        icon: <Italic />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        disabled: !editor.can().chain().focus().toggleItalic().run(),
        className: cn(
          "size-8 p-2 rounded-full hover:scale-[1.05]",
          editor.isActive("italic") && "bg-red-600 text-white"
        ),
      },
    },
    {
      name: "Underline",
      elements: {
        icon: <Underline />,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        disabled: !editor.can().chain().focus().toggleUnderline().run(),
        className: cn(
          "size-8 p-2 rounded-full hover:scale-[1.05]",
          editor.isActive("underline") && "bg-red-600 text-white"
        ),
      },
    },
    {
      name: "Strikethrough",
      elements: {
        icon: <Strikethrough />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        disabled: !editor.can().chain().focus().toggleStrike().run(),
        className: cn(
          "size-8 p-2 rounded-full hover:scale-[1.05]",
          editor.isActive("strike") && "bg-red-600 text-white"
        ),
      },
    },
    {
      name: "Superscript",
      elements: {
        icon: <Superscript />,
        onClick: () => editor.chain().focus().toggleSuperscript().run(),
        disabled: !editor.can().chain().focus().toggleSuperscript().run(),
        className: cn(
          "size-8 p-2 rounded-full hover:scale-[1.05]",
          editor.isActive("superscript") && "bg-red-600 text-white"
        ),
      },
    },
    {
      name: "Subscript",
      elements: {
        icon: <Subscript />,
        onClick: () => editor.chain().focus().toggleSubscript().run(),
        disabled: !editor.can().chain().focus().toggleSubscript().run(),
        className: cn(
          "size-8 p-2 rounded-full hover:scale-[1.05]",
          editor.isActive("subscript") && "bg-red-600 text-white"
        ),
      },
    },
    {
      name: "Bullet List",
      elements: {
        icon: <List />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        className: cn(
          "size-8 p-2 rounded-full hover:scale-[1.05]",
          editor.isActive("bulletList") && "bg-red-600 text-white"
        ),
      },
    },
    {
      name: "Ordered List",
      elements: {
        icon: <ListOrdered />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        className: cn(
          "size-8 p-2 rounded-full hover:scale-[1.05]",
          editor.isActive("orderedList") && "bg-red-600 text-white"
        ),
      },
    },
    {
      name: "Undo",
      elements: {
        icon: <Undo />,
        onClick: () => editor.chain().focus().undo().run(),
        disabled: !editor.can().chain().focus().undo().run(),
        className: "size-8 p-2 rounded-full hover:scale-[1.05]",
      },
    },
    {
      name: "Redo",
      elements: {
        icon: <Redo />,
        onClick: () => editor.chain().focus().redo().run(),
        disabled: !editor.can().chain().focus().redo().run(),
        className: "size-8 p-2 rounded-full hover:scale-[1.05]",
      },
    },
  ];
  const filtered = menubarOptions.filter((el) => options.includes(el.name));

  return (
    <div>
      <div
        className="box-border flex flex-wrap gap-0.5 p-1"
        style={toolbarStyle}
      >
        {filtered.map((option) => (
          <Button
            key={option.name}
            onClick={option.elements.onClick}
            disabled={option.elements.disabled}
            className={option.elements.className}
            title={option.name}
          >
            {option.elements.icon}
          </Button>
        ))}
        {toolbarCustomButtons?.map((el) => el)}
      </div>
    </div>
  );
};
