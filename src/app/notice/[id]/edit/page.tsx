"use client";

import ClassicEditor from "@ckeditor/ckeditor5-39";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { useParams} from "next/navigation";
import { useEffect, useState } from "react";
import { NoticeResponse } from "../page";

export default function EditNotice() {
  const params = useParams();
  const { id } = params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);


  const getData = async () => {
    setLoading((prev) => !prev);
    const { data } = await axios.get<NoticeResponse>(`/api/notice/${id}`);
    if (data.notice) {
      setTitle(data.notice.title);
      setContent(data.notice.content);
      setDate(data.notice.createdAt);
    }
    setLoading((prev) => !prev);
  };

  const onSaveClick = async () => {
    const { data } = await axios.patch(`/api/notice/${id}`, {
      id,
      title,
      content,
    });

    if (data.ok) {
      alert("수정되었습니다.");
      window.location.href = `/notice/${id}`;
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
        {new Date(date).toLocaleDateString("ko").slice(0, -1)}
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
          onClick={() => (window.location.href = `/notice/${id}`)}
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
