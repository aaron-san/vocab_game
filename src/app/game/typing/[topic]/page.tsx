"use client";
import { use, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// import allWords from "/public/assets/words.json" assert { type: "json" };
import allWords from "../../../../../public/assets/words.json" assert { type: "json" };
import Image from "next/image";
import WordInputs from "@/components/WordInputs";
import Spinner from "@/components/Spinner";
import { AnimatePresence, motion } from "framer-motion";
import type { Stats } from "@/types/stats";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { FIFTH_GRADE_TOPICS } from "@/utils/constants";
import { SIXTH_GRADE_TOPICS } from "@/utils/constants";
import { useGameStore } from "@/store/useGameStore";

const ALL_TOPICS = [...FIFTH_GRADE_TOPICS, ...SIXTH_GRADE_TOPICS];

type WordBank = {
  data: { [topic: string]: string[] };
};

export default function TypingGame({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { data: session, status } = useSession();
  const { topic } = use(params);
  const cleanedTopic = topic.replace(/-/g, "_");
  const gameWords = (allWords as WordBank).data?.[cleanedTopic] ?? [];
  const totalWords = gameWords.length;

  const addCompletedTopic = useGameStore((state) => state.addCompletedTopic);
  // const [correctLetters, setCorrectLetters] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isWordComplete, setIsWordComplete] = useState(false);
  const currentWord = gameWords[wordIndex] || "";
  const [stats, setStats] = useState<Stats>({});
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const router = useRouter();
  const currentLetter = currentWord[letterIndex];

  // const getJpWord = async () => {
  //   const cleanedCurrentWord = currentWord?.replace(/_/g, "");
  //   for (let word of ALL_TOPICS) {
  //     if (word.en === cleanedCurrentWord) {
  //       return word.jp;
  //     }
  //   }
  // };
  // const jpCurrentWord = getJpWord();
  // console.log(jpCurrentWord);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats/fetch");
      if (res.ok) {
        const data = await res.json();
        // console.log("Fetched stats:", data);use
        setStats(data);
      }
    } catch (err) {
      console.error("fetchStats crashed:", err);
    }
  };

  // Fetch stats on load
  useEffect(() => {
    fetchStats();
  }, []);

  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   console.log(e.key);
  //   console.log(currentWord[letterIndex]);
  //   if (e.key === currentWord[letterIndex]) {
  //     console.log("Correct");
  //   }
  // };

  const useGlobalKeyHandler = (callback: (event: KeyboardEvent) => void) => {
    useEffect(() => {
      window.addEventListener("keydown", callback);
      return () => window.removeEventListener("keydown", callback);
    }, [callback]);
  };

  // Lock keyinput when word is transitioning
  useEffect(() => {
    if (letterIndex === currentWord.length) {
      setIsLocked(true);
      addPoints();
      setIsWordComplete(true);
    }
  }, [letterIndex]);

  useEffect(() => {
    if (isWordComplete) {
      const timeout = setTimeout(() => {
        setWordIndex((prev) => prev + 1);
        setTypedLetters(Array(currentWord.length).fill(""));
        setLetterIndex(0);
        setIsLocked(false);
        setIsWordComplete(false);
      }, 200); // Slight delay for UX feedback

      return () => clearTimeout(timeout);
    }
    if (wordIndex === totalWords) {
      addCompletedTopic(topic);
      router.push("/game/typing");
    }
  }, [isWordComplete]);

  useGlobalKeyHandler((e) => {
    if (e.key === currentLetter) {
      const newIndex = letterIndex + 1;
      // new Promise((res) => setTimeout(() => res("good"), 4000));
      setLetterIndex(newIndex);
    }
  });

    const addPoints = async () => {
      const res = await fetch("/api/stats/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pointsEarned: 2,
          wordsPlayed: 1,
          timePlayed: 0,
        }),
      });

      if (!res.ok) {
        let errText = await res.text(); // safer than res.json()
        try {
          const errJson = JSON.parse(errText);
          console.error("Failed to update stats:", errJson);
        } catch {
          console.error("Failed to update stats:", errText);
        }
      }

      await fetchStats();
    };
  // });

  // useEffect(() => {

  // }, [letterIndex, currentWord]);

  const setTypedLetter = (i: number, letter: string) => {
    setTypedLetters((prev) => {
      const updated = [...prev];
      updated[i] = letter;
      return updated;
    });
  };

  const advanceIndex = () => {
    if (letterIndex === currentWord.length) {
      router.push("/game/typing");
    }

    setLetterIndex((prev) => prev + 1);
  };

  if (status === "loading")
    return (
      <div className="flex justify-center mx-auto mt-20 w-full">
        <Spinner />
      </div>
    );

  return (
    <section className="relative flex flex-col justify-center items-center space-y-6 p-4 text-primary">
      {/* <div className="font-bold text-emerald-600 text-xl">🙌 Typing Game</div> */}
      <div className="flex justify-between mx-2 w-full">
        <Link
          href="/gamemenu"
          className="bg-stone-100 shadow p-1 border border-stone-400 rounded-r-xl rounded-l-full h-fit text-secondary text-sm active:scale-[0.98]"
        >
          <BackButton text="ゲームメニュー" />
        </Link>
        <div className="bg-accent/20 p-1 border border-stone-400 rounded-t-lg h-fit text-mint-910 text-sm uppercase">
          -- {topic} --
        </div>
        <div className="p-2 border border-accent rounded-lg text-accent text-2xl">
          {stats.totalPoints || "0"}🪙
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 max-w-[400px]">
        {Array.from({ length: totalWords }, (_, i) => i + 1).map(
          (questionNumber) => {
            return (
              <div
                key={questionNumber}
                className={`w-8 h-8 py-1 border-2 text-sm rounded-2xl text-center ${
                  questionNumber - 1 < wordIndex
                    ? "bg-emerald-500 text-emerald-50 border-emerald-50"
                    : "bg-gradient-to-r from-primary to-accent border-secondary "
                }`}
              >
                {questionNumber}
              </div>
            );
          }
        )}
      </div>

      <div className="relative flex justify-center items-center min-h-24">
        {/* {status === "loading" && <Spinner />} */}
        {status === "authenticated" && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${wordIndex}-${currentWord}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-col items-center gap-4"
            >
              {currentWord && (
                <Image
                  src={`/assets/images/${topic.replace(
                    /-/g,
                    ""
                  )}/${currentWord}.png`}
                  alt={`${currentWord}`}
                  width={100}
                  height={100}
                  style={{ height: "200px", width: "auto" }}
                  className="shadow mx-auto border border-stone-400 rounded"
                />
              )}

              <WordInputs
                word={currentWord}
                letterIndex={letterIndex}
                typedLetters={typedLetters}
                setTypedLetter={setTypedLetter}
                advanceIndex={advanceIndex}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
