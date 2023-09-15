"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NoticeResponse } from "../page";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Loading } from "@/components/loading";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

const LazyEditor = dynamic(() => import("@/components/editor"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function EditNotice() {
  const params = useParams();
  const { id } = params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("1");
  const [loading, setLoading] = useState(false);

  const [changeDate, setChangeDate] = useState(false);

  const getData = async () => {
    setLoading((prev) => !prev);
    const { data } = await axios.get<NoticeResponse>(`/api/notice/${id}`);
    if (data.notice) {
      setTitle(data.notice.title);
      setContent(data.notice.content);
      setDate(data.notice.updatedAt);
    }
    setLoading((prev) => !prev);
  };

  const onChange = (data: string) => {
    setContent(() => data);
  };

  const onSaveClick = async () => {
    const { data } = await axios.patch(`/api/notice/${id}`, {
      id,
      title,
      content,
      updatedAt: new Date(date).toISOString(),
      changeDate,
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
      <div>
        {changeDate === true ? (
          <ReactDatePicker
            selected={new Date(new Date(date).toLocaleDateString("ko"))}
            onChange={(data) => setDate(data + "")}
            dateFormat={"yyyy.MM.dd"}
            locale={ko}
          />
        ) : (
          <span
            onClick={() => setChangeDate((prev) => !prev)}
            className="text-gray-400 cursor-pointer"
          >
            {new Date(date).toLocaleDateString("ko")}
          </span>
        )}
      </div>
      <hr />
      <div className="h-96">
        <LazyEditor content={content} onChange={onChange} />
      </div>
      <hr />
      <div className="my-10">
        <Link
          href={`/notice/${id}`}
          className="m-3 py-2 px-3 border border-opacity-75 rounded-md"
        >
          취소
        </Link>
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
