import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Autosave,
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Italic,
  Paragraph,
  RemoveFormat,
  Strikethrough,
  Table,
  TableToolbar,
  Underline,
  List,
  ListProperties,
  TodoList,
} from "ckeditor5";
import { useMemo, useRef } from "react";

import "ckeditor5/ckeditor5.css";

interface TextEditorProps {
  value: string;
  onChange: (data: string) => void;
}

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const editorConfig = useMemo(
    () => ({
      toolbar: {
        items: [
          "heading",
          "|",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "removeFormat",
          "|",
          "numberedList",
          "bulletedList",
          "todoList",
          "|",
          "insertTable",
          "blockQuote",
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        Autosave,
        BlockQuote,
        Bold,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        Heading,
        Italic,
        Paragraph,
        RemoveFormat,
        List,
        ListProperties,
        TodoList,
        Strikethrough,
        Table,
        TableToolbar,
        Underline,
      ],
      fontFamily: {
        supportAllValues: true,
      },
      fontSize: {
        options: [10, 12, 14, "default", 18, 20, 22],
        supportAllValues: true,
      },
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading1",
            view: "h1",
            title: "Heading 1",
            class: "ck-heading_heading1",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 2",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Heading 3",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 4",
            class: "ck-heading_heading4",
          },
          {
            model: "heading5",
            view: "h5",
            title: "Heading 5",
            class: "ck-heading_heading5",
          },
          {
            model: "heading6",
            view: "h6",
            title: "Heading 6",
            class: "ck-heading_heading6",
          },
        ],
      },
      licenseKey: "GPL",
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
    }),
    [],
  );

  return (
    <div className="w-fit" ref={editorContainerRef}>
      <div ref={editorRef}>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfig}
          data={value}
          onChange={(_, editor) => {
            onChange(editor.getData());
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
