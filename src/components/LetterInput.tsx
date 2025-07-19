import React from "react";

type Props = {
  inputRef?: React.RefObject<HTMLInputElement>;
};

const LetterInput = ({ inputRef }: Props) => {
  return (
    <input
      ref={inputRef}
      className="bg-slate-50 p-2 border border-slate-200 rounded w-10 h-10 text-center"
    />
  );
};

export default LetterInput;
