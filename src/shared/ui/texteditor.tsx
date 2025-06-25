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
import { FC, useEffect, useMemo, useRef, useState } from "react";

import "ckeditor5/ckeditor5.css"


interface TextEditorProps {
  value: string;
  onChange: (data: string) => void;
}

const TextEditor: FC<TextEditorProps> = ({ value, onChange }) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
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
            "numberedList", // ← lista ordenada
            "bulletedList", // ← lista desordenada
            "todoList", // ← lista tipo checklist (opcional)
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
      },
    };
  }, [isLayoutReady]);

  return (
    <div className="w-fit" ref={editorContainerRef}>
      <div ref={editorRef}>
        {editorConfig && (
          <CKEditor
            editor={ClassicEditor}
            config={editorConfig}
            data={value}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange(data);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TextEditor;
