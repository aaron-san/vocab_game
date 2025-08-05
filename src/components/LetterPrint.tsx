import React from "react";

type Props = { letter: string };

const LetterPrint = ({ letter }: Props) => {
  return (
    <div className="flex justify-center items-center mb-1 w-8 h-10 font-bold text-gray-200 text-4xl">
      {letter}
    </div>
  );
};

export default LetterPrint;
