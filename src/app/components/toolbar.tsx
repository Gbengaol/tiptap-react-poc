import React, { FC, HTMLAttributes, useState } from "react";
import { Options } from "../options.type";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Bold,
  Italic,
  Link,
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
import { TextEditorLinkDialog } from "./LinkDialog";

type MenubarOptions = {
  name: Options;
  props: {
    icon: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    isActive?: boolean;
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

  const [open, setOpen] = useState(false);
  const [href, setHref] = useState("");
  const [title, setTitle] = useState("");

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setHref("");
  };

  if (!editor) return null;

  const openDialog = () => {
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, "");
    const previousUrl = editor.getAttributes("link").href;

    if (previousUrl) setHref(previousUrl);
    if (text) setTitle(text);
    setOpen(true);
  };

  const handleSetLink = () => {
    // cancelled
    if (href === null) return;
    // empty - remove link and keep focus
    if (href === "")
      return editor.chain().focus().extendMarkRange("link").unsetLink().run();

    const { from, to } = editor.state.selection;
    const isWhiteSpaceInFront = !!editor.state.doc.textBetween(to, to + 1);

    // Set the link and update the title
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href })
      .insertContentAt({ from, to }, title)
      .run();

    // Move the cursor to the end of the inserted space, remove focus from the link
    if (!isWhiteSpaceInFront) {
      editor
        .chain()
        .setTextSelection(editor.state.selection.to + 1)
        .insertContent(" ")
        .splitBlock({
          keepMarks: true,
        })
        .run();
    }

    handleClose();
  };

  const menubarOptions: MenubarOptions[] = [
    {
      name: "Bold",
      props: {
        icon: <Bold />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        disabled: !editor.can().chain().focus().toggleBold().run(),
        isActive: editor.isActive("bold"),
      },
    },
    {
      name: "Italic",
      props: {
        icon: <Italic />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        disabled: !editor.can().chain().focus().toggleItalic().run(),
        isActive: editor.isActive("italic"),
      },
    },
    {
      name: "Underline",
      props: {
        icon: <Underline />,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        disabled: !editor.can().chain().focus().toggleUnderline().run(),
        isActive: editor.isActive("underline"),
      },
    },
    {
      name: "Strikethrough",
      props: {
        icon: <Strikethrough />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        disabled: !editor.can().chain().focus().toggleStrike().run(),
        isActive: editor.isActive("strike"),
      },
    },
    {
      name: "Superscript",
      props: {
        icon: <Superscript />,
        onClick: () => editor.chain().focus().toggleSuperscript().run(),
        disabled: !editor.can().chain().focus().toggleSuperscript().run(),
        isActive: editor.isActive("superscript"),
      },
    },
    {
      name: "Subscript",
      props: {
        icon: <Subscript />,
        onClick: () => editor.chain().focus().toggleSubscript().run(),
        disabled: !editor.can().chain().focus().toggleSubscript().run(),
        isActive: editor.isActive("subscript"),
      },
    },
    {
      name: "BulletList",
      props: {
        icon: <List />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive("bulletList"),
      },
    },
    {
      name: "OrderedList",
      props: {
        icon: <ListOrdered />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive("orderedList"),
      },
    },
    {
      name: "Undo",
      props: {
        icon: <Undo />,
        onClick: () => editor.chain().focus().undo().run(),
        disabled: !editor.can().chain().focus().undo().run(),
      },
    },
    {
      name: "Redo",
      props: {
        icon: <Redo />,
        onClick: () => editor.chain().focus().redo().run(),
        disabled: !editor.can().chain().focus().redo().run(),
      },
    },
    {
      name: "Link",
      props: {
        icon: <Link />,
        onClick: openDialog,
        isActive: editor.isActive("link"),
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
            onClick={option.props.onClick}
            disabled={option.props.disabled}
            title={option.name}
            className={cn(
              "size-8 p-2 rounded-full hover:scale-[1.05]",
              !!option.props.isActive && "bg-red-600 text-white"
            )}
          >
            {option.props.icon}
          </Button>
        ))}
        {toolbarCustomButtons?.map((el) => el)}
      </div>

      {/* Dialog for handling Links  */}
      <TextEditorLinkDialog
        open={open}
        title={title}
        setTitle={(title) => setTitle(title)}
        href={href}
        setHref={(title) => setHref(title)}
        handleClose={handleClose}
        handleSubmit={handleSetLink}
      />
    </div>
  );
};
