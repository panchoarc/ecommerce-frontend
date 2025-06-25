// table-helpers.ts
import { Editor } from "@tiptap/react";

export const insertTable = (editor: Editor) =>
  editor
    .chain()
    .focus()
    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
    .run();

export const deleteTable = (editor: Editor) =>
  editor.chain().focus().deleteTable().run();

export const addColumnBefore = (editor: Editor) =>
  editor.chain().focus().addColumnBefore().run();

export const addColumnAfter = (editor: Editor) =>
  editor.chain().focus().addColumnAfter().run();

export const deleteColumn = (editor: Editor) =>
  editor.chain().focus().deleteColumn().run();

export const addRowBefore = (editor: Editor) =>
  editor.chain().focus().addRowBefore().run();

export const addRowAfter = (editor: Editor) =>
  editor.chain().focus().addRowAfter().run();

export const deleteRow = (editor: Editor) =>
  editor.chain().focus().deleteRow().run();

export const toggleHeaderRow = (editor: Editor) =>
  editor.chain().focus().toggleHeaderRow().run();

export const toggleHeaderColumn = (editor: Editor) =>
  editor.chain().focus().toggleHeaderColumn().run();


export const toggleHeaderCell = (editor: Editor) =>
  editor.chain().focus().toggleHeaderCell().run();

export const mergeCells = (editor: Editor) =>
  editor.chain().focus().mergeCells().run();

export const splitCells = (editor: Editor) =>
  editor.chain().focus().splitCell().run();

export const fixTables = (editor: Editor) =>
  editor.chain().focus().fixTables().run();
