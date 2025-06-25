import { Editor } from "@tiptap/react";

export const setTextColor = (editor: Editor, color: string) => {
  editor.chain().focus().setColor(color).run();
};
