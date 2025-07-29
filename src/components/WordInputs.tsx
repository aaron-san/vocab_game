import React from "react";
import LetterInput from "./LetterInput";
import LetterPrint from "./LetterPrint";

type Props = {
  word: string;
  letterIndex: number;
  typedLetters: string[];
  setTypedLetter: (index: number, letter: string) => void;
  advanceIndex: () => void;
};

const WordInputs = ({
  word,
  letterIndex,
  typedLetters,
  setTypedLetter,
  advanceIndex,
}: Props) => {
  return (
    <div className="space-y-1 mt-4">
      {/* Printed letters */}
      <div className="flex justify-center items-center space-x-1">
        {word.split("").map((letter, index) => (
          <LetterPrint key={index} letter={letter} />
        ))}
      </div>
      <div className="flex justify-center space-x-1">
        {word.split("").map((letter, index) => (
          <LetterInput
            key={index}
            letter={letter}
            index={index}
            letterIndex={letterIndex}
            typedLetter={typedLetters[index] || ""}
            setTypedLetter={setTypedLetter}
            advanceIndex={advanceIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default WordInputs;
