import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TextEditorLinkDialogProps {
  open: boolean;
  title: string;
  setTitle: (val: string) => void;
  href: string;
  setHref: (val: string) => void;
  handleClose: () => void;
  handleSubmit: () => void;
}

export const TextEditorLinkDialog: FC<TextEditorLinkDialogProps> = ({
  open,
  title,
  setTitle,
  href,
  setHref,
  handleClose,
  handleSubmit,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="flex w-96 flex-col space-y-4">
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
        </DialogHeader>

        <Input
          autoFocus
          required
          label="Text"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          required
          label="Link"
          type="text"
          value={href}
          onChange={(e) => setHref(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleClose} className="px-5" size="sm">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="px-7"
            size="sm"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
