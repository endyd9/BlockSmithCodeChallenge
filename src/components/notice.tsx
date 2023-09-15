import Link from "next/link";

interface NoticeProps {
  id: number;
  title: string;
  createdAt: string;
}

export const CNotice: React.FC<NoticeProps> = ({ id, title, createdAt }) => {
  const displayDate = () => {
    const uploadTime = new Date(createdAt.replace("Z", ""));
    const currentTime = new Date();

    if (+uploadTime - +currentTime > -60000) {
      return "방금 전";
    } else if (+uploadTime - +currentTime > -119000) {
      return "1분 전";
    } else if (+uploadTime - +currentTime > -240000) {
      return "2분 전";
    } else if (+uploadTime - +currentTime > -3659000) {
      return `1시간 전`;
    } // 2...22
    else if (+uploadTime - +currentTime > -86399000) {
      return `23시간 전`;
    } else {
      return new Date(createdAt).toLocaleDateString("ko").slice(0, -1);
    }
  };
  return (
    <Link href={`notice/${id}`} replace>
      <div className="w-full my-5 px-3 py-2 hover:bg-[#EFF0F3] cursor-pointer">
        <h1 className="break-all">
          {title.length > 100 ? title.slice(0, 100) : title}
        </h1>
        <span className="text-sm opacity-50 max-h-[50%]">{displayDate()}</span>
        <p>{}</p>
      </div>
    </Link>
  );
};
