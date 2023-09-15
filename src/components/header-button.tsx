"use client";
interface Hbtn {
  text: string;
  clickEvent?: () => void;
  isNotice?: boolean;
}

export const HeaderButton: React.FC<Hbtn> = ({
  text,
  clickEvent,
  isNotice,
}) => {
  return (
    <button
      onClick={() => (clickEvent ? clickEvent() : null)}
      className="text-white mx-2 bg=[#001E4C]"
    >
      {text}
      {isNotice && (
        <span className="inline-block w-1 h-1 ml-1 mb-2 bg-red-600 rounded-full"></span>
      )}
    </button>
  );
};
