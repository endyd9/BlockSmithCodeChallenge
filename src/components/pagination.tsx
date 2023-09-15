interface PaginationProps {
  totalPage: number;
  currentPage: number;
  changePage: (goTo: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  currentPage,
  changePage,
}) => {
  const pageGroup = Math.ceil(currentPage / 5);
  const pages: number[] = [];
  const currentLast = pageGroup * 5 > totalPage ? totalPage : pageGroup * 5;
  const groupFirst = currentLast >= 5 ? currentLast - 4 : 1;

  for (let i = groupFirst; i <= currentLast; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between mx-auto max-w-xs">
      <div>
        <button onClick={() => changePage(currentPage - 5)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.625 16.25L9.375 10L15.625 3.75"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.375 16.25L3.125 10L9.375 3.75"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button onClick={() => changePage(currentPage - 1)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 16.25L6.25 10L12.5 3.75"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {pages.map((page, index) => (
        <button
          onClick={() => changePage(page)}
          key={page}
          className={page === currentPage ? "font-bold" : ""}
        >
          {page}
        </button>
      ))}
      <div>
        <button onClick={() => changePage(currentPage + 1)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 3.75L13.75 10L7.5 16.25"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button onClick={() => changePage(currentPage + 5)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.375 3.75L10.625 10L4.375 16.25"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.625 3.75L16.875 10L10.625 16.25"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
