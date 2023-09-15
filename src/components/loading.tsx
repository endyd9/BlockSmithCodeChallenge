"use client";

import { useEffect, useState } from "react";

export const Loading = () => {
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSecond((prev) => !prev);
    }, 40);
    setTimeout(() => {
      setThird((prev) => !prev);
    }, 80);
  }, []);

  return (
    <div className="my-36 mx-auto w-32">
      <div className="inline-block w-3 h-3 mx-3 bg-red-600 rounded-full animate-[up_.5s_infinite]"></div>
      <div
        className={`inline-block w-3 h-3 mx-3 bg-red-600 rounded-full ${
          second && "animate-up"
        }`}
      ></div>
      <div
        className={`inline-block w-3 h-3 mx-3 bg-red-600 rounded-full ${
          third && "animate-up"
        }`}
      ></div>
    </div>
  );
};
