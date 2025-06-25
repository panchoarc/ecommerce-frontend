// TableButton.tsx
"use client";

import { Editor } from "@tiptap/react";
import { Palette } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/tiptap-ui-primitive/button";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { setTextColor } from "./table-helpers";

interface ColorButtonProps {
  editor?: Editor | null;
}

export const ColorButton: React.FC<ColorButtonProps> = ({
  editor: providedEditor,
}) => {
  const editor = useTiptapEditor(providedEditor);

  if (!editor?.isEditable) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          aria-label="Change text color"
          tabIndex={-1}
        >
          <Palette className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <label className="flex items-center space-x-2 cursor-pointer text-sm">
          <span>Color:</span>
          <Input
            type="color"
            onChange={(e) => setTextColor(editor, e.target.value)}
          />
        </label>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
