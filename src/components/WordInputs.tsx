import React from "react";
import LetterInput from "./LetterInput";
import LetterPrint from "./LetterPrint";

type Props = {
  word: string;
  inputRef?: React.RefObject<HTMLInputElement>;
};

const WordInputs = ({ word, inputRef }: Props) => {
  return (
    <div className="mt-2">
      <div className="flex space-x-1">
        {word.split("").map((letter, index) => (
          <LetterPrint key={index} letter={letter} />
        ))}
      </div>
      <div className="flex space-x-1">
        {word.split("").map((letter, index) => (
          <LetterInput key={index} inputRef={inputRef} />
        ))}
      </div>
    </div>
  );
};
export default WordInputs;
