"use client";

import ClassicEditor from "@ckeditor/ckeditor5-39";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditNotice() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSaveClick = async () => {
    console.log(title, content);

    const { data } = await axios.post("/api/notice", {
      title,
      content,
    });
    if (data.ok) {
      alert("저장되었습니다.");
      window.location.href = `/notice/${data.id}`;
    }
  };

  return (
    <main className="max-w-screen-lg mx-auto my-16">
      <h3 className=" mb-5">공지사항</h3>
      <textarea
        className="text-3xl w-full h-fit p-3 resize-none border border-black rounded-md"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        rows={3}
      />
      <span className="opacity-50 mb-4 block">
        {new Date().toLocaleDateString("ko").slice(0, -1)}
      </span>
      <hr />
      <div className="h-96">
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(_, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
      </div>
      <hr />
      <div className="my-10">
        <button
          className="m-3 py-2 px-3 border border-opacity-75 rounded-md"
          onClick={() => (window.location.href = `/notice`)}
        >
          취소
        </button>
        <button
          onClick={onSaveClick}
          className="m-3 py-2 px-3 border border-opacity-75 rounded-md bg-[#FF5C00] text-white"
        >
          저장
        </button>
      </div>
    </main>
  );
}
