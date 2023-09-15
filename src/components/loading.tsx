"use client";

import { useEffect, useState } from "react";

export const Loading = () => {
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSecond((prev) => !prev);
    }, 50);
    setTimeout(() => {
      setThird((prev) => !prev);
    }, 80);
  }, []);

  return (
    <div className="my-36 mx-auto w-32">
      <div className="inline-block w-3 h-3 mx-3 bg-red-600 rounded-full animate-bounce"></div>
      <div
        className={`inline-block w-3 h-3 mx-3 bg-red-600 rounded-full ${
          second && "animate-bounce"
        }`}
      ></div>
      <div
        className={`inline-block w-3 h-3 mx-3 bg-red-600 rounded-full ${
          third && "animate-bounce"
        }`}
      ></div>
    </div>
  );
};
