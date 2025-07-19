"use client";

import { useSession } from "next-auth/react";
// import Link from "next/link";
import { use, useState, useEffect, useRef } from "react";
import allWords from "@/app/assets/words.json" assert { type: "json" };
import WordInputs from "@/components/WordInputs";

type Stats = {
  totalPoints?: number;
  wordsPerMinute?: number;
  totalWords?: number;
  totalTime?: number;
};

type WordBank = {
  data: {
    [topic: string]: string[];
  };
};

export default function TypingGame({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<Stats>({});
  const { topic } = use(params); // ✅ unwrap the promise safely
  // Get words for the specific topic
  const gameWords: string[] = (allWords as WordBank).data?.[topic] ?? [];

  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = gameWords[0] || "";
  const [showConfetti, setShowConfetti] = useState(false);

  const letters = currentWord.split("");

  // Fetch stats on load
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await fetch("/api/stats/fetch");
    if (res.ok) {
      const data = await res.json();
      console.log("Fetched stats:", data);
      setStats(data);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center space-y-6 p-4">
      <div className="self-start bg-emerald-200 px-2 py-1 border border-emerald-500 rounded text-emerald-600 text-xl">
        🙌Typing Game
      </div>

      <div className="text-blue-500 text-xl text-center uppercase">
        &lt; {topic} &gt;
      </div>
      <div className="relative">
        {status === "loading" && <p>Loading...</p>}
        {status === "authenticated" && (
          <>
            <div className="-top-30 -right-10 absolute">
              Total Points: {stats.totalPoints || 0}
            </div>
            <WordInputs word={gameWords[0]} />
            {/* {gameWords.length > 0 ? (
              <div>
                <h2>Game Words</h2>
                <ul>
                  {gameWords.map((word, index) => (
                    <li key={index}>{word}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <p>No words available for this topic.</p>
              </div>
            )} */}
          </>
        )}
      </div>
    </section>
  );
}
