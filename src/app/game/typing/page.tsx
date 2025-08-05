"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/LoginForm";
import { FIFTH_GRADE_TOPICS, SIXTH_GRADE_TOPICS } from "@/utils/constants";
import { useState } from "react";
import { useGameStore } from "@/store/useGameStore";

type TopicProps = {
  topic: { jp: string; en: string };
  index: number;
};

export default function Home() {
  const { data: session, status } = useSession();
  const completedTopics = useGameStore((state) => state.completedTopics);

  // return <div>Score: {points}</div>;

  // ⏳ Wait for session to load
  if (status === "loading") return null;

  // 🔐 If not logged in, show only login
  if (!session?.user) {
    return <LoginForm />;
  }

  const ALL_TOPICS = [...FIFTH_GRADE_TOPICS, ...SIXTH_GRADE_TOPICS];

  // Authenticated view
  return (
    <div className="p-2 sm:p-8 pb-16 min-h-screen font-sans">
      <main className="flex flex-col items-center sm:items-start gap-[32px] row-start-2">
        <div>
          <div className="bg-stone-800 mx-auto px-4 py-2 rounded w-fit text-stone-50 text-center">
            Typing Game!
          </div>
          {/* <div className="bg-stone-400 px-4 py-1 border-emerald-200 border-b-2 rounded-l rounded-r-full w-1/4 font-bold text-stone-50">
            ５年生
          </div> */}
          <div className="flex flex-wrap justify-evenly gap-2 mx-auto p-4 max-w-[800px]">
            {ALL_TOPICS.map((topic, index) => {
              const topicSlug = topic.en.toLowerCase().replace(/ /g, "-");
              return (
                <Link
                  key={index}
                  href={`/game/typing/${topicSlug}`}
                  className={`shadow px-2 min-w-[100px] py-1 border-1 border-stone-400 rounded-xl hover:rounded-xl hover:text-slate-700 text-xl transition-all text-center active:scale-[0.98] ${
                    completedTopics.some((el) => el === topicSlug)
                      ? "bg-emerald-500 text-gray-300"
                      : "bg-stone-600 text-slate-50 "
                  }`}
                >
                  {topic.jp}
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="flex flex-wrap justify-center items-center gap-[24px] row-start-3">
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}
