import React from "react";

type Props = {
  letter: string;
};

const LetterInput = ({ letter }: Props) => {
  return <div className="p-2 w-10 h-10 text-center">{letter}</div>;
};

export default LetterInput;
