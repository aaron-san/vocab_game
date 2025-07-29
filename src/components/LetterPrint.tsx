import React from "react";

type Props = { letter: string };

const LetterPrint = ({ letter }: Props) => {
  return (
    <div className="flex justify-center items-center w-8 h-10 font-bold text-gray-500 text-4xl">
      {letter}
    </div>
  );
};

export default LetterPrint;
