// TableButton.tsx
"use client";

import * as React from "react";
import { Table, Rows, Columns, Trash, Plus, Type } from "lucide-react";
import { Editor } from "@tiptap/react";

import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { Button } from "@/components/tiptap-ui-primitive/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu";

import {
  insertTable,
  deleteTable,
  addColumnBefore,
  addColumnAfter,
  deleteColumn,
  addRowBefore,
  addRowAfter,
  deleteRow,
  toggleHeaderRow,
  toggleHeaderColumn,
} from "./table-helpers";

interface TableButtonProps {
  editor?: Editor | null;
}

export const TableButton: React.FC<TableButtonProps> = ({
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
          aria-label="Insert table"
          tabIndex={-1}
        >
          <Table className="tiptap-button-icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={() => insertTable(editor)}>
          <Plus className="mr-2 h-4 w-4" />
          Insert table
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteTable(editor)}>
          <Trash className="mr-2 h-4 w-4" />
          Delete table
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => addRowBefore(editor)}>
          <Rows className="mr-2 h-4 w-4" />
          Add row before
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => addRowAfter(editor)}>
          <Rows className="mr-2 h-4 w-4" />
          Add row after
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteRow(editor)}>
          <Rows className="mr-2 h-4 w-4" />
          Delete row
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => addColumnBefore(editor)}>
          <Columns className="mr-2 h-4 w-4" />
          Add column before
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => addColumnAfter(editor)}>
          <Columns className="mr-2 h-4 w-4" />
          Add column after
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteColumn(editor)}>
          <Columns className="mr-2 h-4 w-4" />
          Delete column
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => toggleHeaderRow(editor)}>
          <Type className="mr-2 h-4 w-4" />
          Toggle header row
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleHeaderColumn(editor)}>
          <Type className="mr-2 h-4 w-4" />
          Toggle header column
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
