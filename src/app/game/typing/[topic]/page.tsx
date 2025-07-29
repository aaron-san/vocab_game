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
  console.log(cleanedTopic);
  const gameWords = (allWords as WordBank).data?.[cleanedTopic] ?? [];
  const [correctLetters, setCorrectLetters] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = gameWords[wordIndex] || "";

  const getJpWord = async () => {
    const cleanedCurrentWord = currentWord?.replace(/_/g, "");
    for (let word of ALL_TOPICS) {
      if (word.en === cleanedCurrentWord) {
        return word.jp;
      }
    }
  };
  const jpCurrentWord = getJpWord();
  // console.log(jpCurrentWord);
  const [stats, setStats] = useState<Stats>({});

  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [letterIndex, setLetterIndex] = useState(0);
  const router = useRouter();

  // Fetch stats on load
  useEffect(() => {
    fetchStats();
  }, []);

  const possiblePoints = currentWord.length;

  useEffect(() => {
    setTypedLetters(Array(currentWord.length).fill(""));
    setLetterIndex(0);
  }, [currentWord]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats/fetch");
      if (res.ok) {
        const data = await res.json();
        // console.log("Fetched stats:", data);
        setStats(data);
      }
    } catch (err) {
      console.error("fetchStats crashed:", err);
    }
  };

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

  useGlobalKeyHandler((e) => {
    // console.log(e.key);
    // console.log(currentWord[letterIndex]);
    if (e.key === currentWord[letterIndex]) {
      console.log("Correct");
    }
    const addPoints = async () => {
      const res = await fetch("/api/stats/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pointsEarned: 3,
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
  });

  useEffect(() => {
    if (letterIndex === currentWord.length) {
      setWordIndex((prev) => prev + 1);
    }
  }, [letterIndex, currentWord]);

  const setTypedLetter = (i: number, letter: string) => {
    setTypedLetters((prev) => {
      const updated = [...prev];
      updated[i] = letter;
      return updated;
    });
  };

  const advanceIndex = () => {
    if (letterIndex == currentWord.length) {
      router.push("/gamemenu");
    }

    setLetterIndex((prev) => prev + 1);
  };

  if (status === "loading")
    return (
      <div className="flex justify-center mt-8 w-screen h-screen">
        <Spinner />
      </div>
    );

  return (
    <section className="relative flex flex-col justify-center items-center space-y-6 p-4">
      {/* <div className="font-bold text-emerald-600 text-xl">🙌 Typing Game</div> */}
      <div className="flex justify-between mx-2 w-full">
        <Link
          href="/gamemenu"
          className="bg-stone-100 shadow p-1 border border-stone-400 rounded-r-xl rounded-l-full text-sm active:scale-[0.98]"
        >
          <BackButton text="ゲームメニュー" />
        </Link>
        <div className="bg-stone-100 p-1 border border-stone-400 rounded-t-lg text-blue-500 text-sm uppercase">
          -- {topic} --
        </div>
        <div className="text-2xl">{stats.totalPoints || "0"}🪙</div>
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
