import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  letter: string;
  index: number;
  letterIndex: number;
  typedLetter: string;
  setTypedLetter: (index: number, letter: string) => void;
  advanceIndex: () => void;
};

const LetterInput = ({
  letter,
  index,
  letterIndex,
  typedLetter,
  setTypedLetter,
  advanceIndex,
}: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isWrong, setIsWrong] = useState(false);
  const [isGone, setIsGone] = useState(false);

  const isFocused = index === letterIndex;
  const isCorrect = typedLetter === letter;

  useEffect(() => {
    if (isFocused && divRef.current) {
      divRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [isFocused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused || isGone || e.key.length !== 1) return;
      const value = e.key;

      if (value === letter) {
        playSound("correct");
        setTypedLetter(index, value);

        // setTimeout(() => {
        setIsGone(true);
        advanceIndex();
        // }, 50);
      } else {
        playSound("wrong");
        setTypedLetter(index, value);
        setIsWrong(true);
        // setTimeout(() => {
        setTypedLetter(index, "");
        setIsWrong(false);
        // }, 50);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, isGone, letter]);

  const playSound = (type: "correct" | "wrong") => {
    const src = `/sounds/${type}.mp3`;
    const audio = new Audio(src);
    audio.volume = 0.6;
    audio.play().catch(() => {});
  };

  return (
    <div className="relative flex justify-center items-center w-8 h-10">
      {/* <AnimatePresence>
        {!isGone && (
          <motion.div
            ref={divRef}
            initial={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0, transition: { duration: 0.75 } }}
            className={`absolute inset-0 flex justify-center items-center text-lg font-bold 
              ${
                isCorrect
                  ? "text-green-600 font-bold drop-shadow-lg"
                  : "text-stone-800"
              }
              ${isWrong ? "animate-shake text-red-500" : ""}
            `}
          >
            {typedLetter}
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* 🎯 Thick underline for current letter */}
      <div
        className={`absolute top-0 left-0 right-0 rounded-full 
          ${isFocused ? "bg-blue-600 h-1 ring-blue-600" : "bg-slate-300 h-1"}
          ${index < letterIndex ? "bg-transparent" : ""}
        `}
      />
    </div>
  );
};

export default LetterInput;

// import React, { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// type Props = {
//   letter: string;
//   index: number;
//   letterIndex: number;
//   typedLetter: string;
//   setTypedLetter: (index: number, letter: string) => void;
//   advanceIndex: () => void;
// };

// const LetterInput = ({
//   letter,
//   index,
//   letterIndex,
//   typedLetter,
//   setTypedLetter,
//   advanceIndex,
// }: Props) => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [isWrong, setIsWrong] = useState(false);
//   const [isGone, setIsGone] = useState(false);

//   const isFocused = index === letterIndex;
//   const isCorrect = letter === typedLetter;
//   const isDisabled = !isFocused;

//   useEffect(() => {
//     if (isFocused && inputRef.current) {
//       inputRef.current.focus();
//       inputRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
//     }
//   }, [isFocused]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.slice(-1);

//     if (value === letter) {
//       playSound("correct");
//       setTypedLetter(index, value);
//       setIsGone(true); // Trigger exit animation
//       setTimeout(() => {
//         advanceIndex();
//       }, 250);
//     } else {
//       playSound("wrong");
//       setTypedLetter(index, value);
//       setIsWrong(true);
//       setTimeout(() => {
//         setTypedLetter(index, "");
//         setIsWrong(false);
//       }, 250);
//     }
//   };

//   const playSound = (type: "correct" | "wrong") => {
//     const src = `/sounds/${type}.mp3`;
//     new Audio(src).play().catch(() => {});
//   };

//   return (
//     <AnimatePresence>
//       {!isGone && (
//         <motion.input
//           ref={inputRef}
//           value={typedLetter}
//           onChange={handleChange}
//           disabled={isDisabled}
//           initial={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 1.6, opacity: 0, transition: { duration: 1 } }}
//           className={`absolute inset-0 text-center font-bold text-lg w-10 h-10 p-2 rounded border transition-all duration-300 text-stone-800
//             ${
//               isCorrect
//                 ? "bg-green-200 border-green-500"
//                 : "bg-stone-50 border-slate-400"
//             }
//             ${isWrong ? "animate-shake border-red-500 bg-red-300" : ""}
//             ${
//               isDisabled
//                 ? "disabled:bg-stone-300 disabled:border-stone-400"
//                 : ""
//             }
//           `}
//         />
//       )}
//     </AnimatePresence>
//   );
// };

// export default LetterInput;

// // readOnly={index < letterIndex} // ⛔ Prevent typing in past inputs
// // tabIndex={index < letterIndex ? -1 : 0} // ⛔ Skip on tab
