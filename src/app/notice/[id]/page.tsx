"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { INotice } from "../page";
import Link from "next/link";

export interface NoticeResponse {
  ok: boolean;
  notice: INotice;
}

export default function noticeDetail() {
  const { id } = useParams();
  const [data, setData] = useState<INotice>();

  const router = useRouter();

  const getData = async () => {
    const { data: response } = await axios.get<NoticeResponse>(
      `/api/notice/${id}`
    );
    setData({ ...response.notice });
  };

  const onDeleteClick = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const { data: deleteResponse } = await axios.delete(`/api/notice/${id}`);
      if (deleteResponse.ok) {
        alert("삭제되었습니다.");
        return (window.location.href = "/notice");
      } else {
        alert("삭제에 실패 했습니다.");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <main className="max-w-screen-lg mx-auto my-16">
      <h3 className=" mb-5">공지사항</h3>
      {data && (
        <>
          <h1 className="text-3xl">{data.title}</h1>
          <span className="opacity-30 my-4 block">
            {new Date(data.createdAt).toLocaleDateString("ko").slice(0, -1)}
          </span>
          <hr />
          <div className="my-10">
            <p dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </>
      )}
      <hr />
      <div className="flex">
        <button
          className="m-3 py-2 px-3 border border-opacity-75 rounded-md"
          onClick={() => (window.location.href = "/notice")}
        >
          취소
        </button>
        <Link
          href={`/notice/${id}/edit`}
          className="m-3 py-2 px-3 border border-opacity-75 rounded-md bg-[#FF5C00] text-white"
        >
          수정
        </Link>
        <button
          onClick={onDeleteClick}
          className="m-3 py-2 px-3 border border-opacity-75 rounded-md bg-[#FF0000] text-white"
        >
          삭제
        </button>
      </div>
    </main>
  );
}
