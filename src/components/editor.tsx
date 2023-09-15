import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "../lib/client/custom_edtor";

interface EditorProps {
  content?: string;
  onChange: (data: string) => void;
}

export default function Editor({ content = "", onChange }: EditorProps) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={(_, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}
