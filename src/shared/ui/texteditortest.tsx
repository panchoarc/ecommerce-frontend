import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { FC, memo } from "react";

interface TextEditorProps {
  value: string;
  onChange: (data: string) => void;
}

const TextEditorTestComponent: FC<TextEditorProps> = ({ value, onChange }) => {
  console.log("TextEditorTest render");

  return (
    <div className="w-full h-[300px] rounded-md border border-input bg-background  text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
      <SimpleEditor
        content={value}
        onChange={(newContent: string) => {
          onChange(newContent);
        }}
      />
    </div>
  );
};

const TextEditorTest = memo(TextEditorTestComponent);

export default TextEditorTest;
