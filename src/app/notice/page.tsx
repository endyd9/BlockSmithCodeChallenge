"use client";

import { CNotice } from "@/components/notice";
import { Pagination } from "@/components/pagination";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export interface INotice {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
}

interface NoticeResponse {
  ok: boolean;
  notices: INotice[];
  totalPage: number;
}

const Notice = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [notices, setNotices] = useState<INotice[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const fetchNotices = async () => {
    setLoading((prev) => !prev);
    try {
      const { data } = await axios.get<NoticeResponse>(
        `api/notice?page=${page}`
      );
      setNotices([...data.notices]);
      setTotalPage(data.totalPage);
    } catch (error) {
      alert("데이터를 불러오지 못 했습니다. \n 잠시 후 다시 시도해주세요.");
    }
    setLoading((prev) => !prev);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (search === "") return alert("검색어를 입력해 주세요");
    setLoading((prev) => !prev);
    event.preventDefault();
    try {
      const { data } = await axios.get<NoticeResponse>(
        `api/notice?page=${page}&&keyword=${search}`
      );
      setNotices([...data.notices]);
    } catch (error) {
      alert("데이터를 불러오지 못 했습니다. \n 잠시 후 다시 시도해주세요.");
    }

    setLoading((prev) => !prev);
  };

  const changePage = (goTo: number) => {
    if (goTo > totalPage) {
      if (page !== totalPage) {
        return setPage(totalPage);
      }
      return alert("마지막 페이지입니다.");
    }
    if (goTo < 1) {
      if (page !== 1) {
        return setPage(1);
      }
      return alert("첫번째 페이지입니다.");
    }
    setPage(goTo);
  };

  useEffect(() => {
    fetchNotices();
  }, [page]);
  return (
    <main className="max-w-screen-lg mx-auto mt-20">
      <div className="w-full flex items-start justify-between my-10">
        <h1 className="text-3xl">공지사항</h1>
        <div className="relative">
          <form onSubmit={onSubmit}>
            <input
              className="border border-black rounded-md w-[280px] h-[40px] p-2"
              type="text"
              placeholder="검색어"
              onChange={(event) => setSearch(() => event.target.value)}
              value={search}
            />
          </form>
          {search.length === 0 ? (
            <button className="absolute top-2 right-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                  stroke="#707070"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 21L15 15"
                  stroke="#707070"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <button
              className="absolute top-[0.6rem] right-3"
              onClick={() => setSearch("")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="bg-black w-5 h-5 rounded-full"
              >
                <path
                  d="M11.75 4.25L4.25 11.75"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.25 4.25L11.75 11.75"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <hr />
      <div className="mx-5">
        {!loading ? (
          notices.length > 0 ? (
            <div className="">
              {notices.map((notice) => (
                <CNotice
                  key={notice.id}
                  id={notice.id}
                  title={notice.title}
                  createdAt={notice.updatedAt}
                />
              ))}
            </div>
          ) : (
            <div className="my-36">
              <h3 className="text-lg opacity-50 text-center">
                공지사항이 없습니다.
              </h3>
            </div>
          )
        ) : (
          <div className="my-36 w-10 h-10 animate-spin">임시 로딩</div>
        )}
      </div>
      <hr />
      <div className="my-10">
        {totalPage > 0 && (
          <Pagination
            totalPage={totalPage}
            currentPage={page}
            changePage={changePage}
          />
        )}
      </div>
    </main>
  );
};

export default Notice;
