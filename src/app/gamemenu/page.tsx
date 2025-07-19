"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginForm from "@/components/LoginForm";
import { FIFTH_GRADE_TOPICS, SIXTH_GRADE_TOPICS } from "@/utils/constants";

type TopicProps = {
  topic: { jp: string; en: string };
  index: number;
};

export default function Home() {
  const { data: session, status } = useSession();

  // ⏳ Wait for session to load
  if (status === "loading") return null;

  // 🔐 If not logged in, show only login
  if (!session?.user) {
    return <LoginForm />;
  }

  // ✅ Authenticated view
  return (
    <div className="justify-items-center gap-16 grid grid-rows-[20px_1fr_20px] mt-4 p-8 sm:p-20 pb-20 min-h-screen font-sans">
      <main className="flex flex-col items-center sm:items-start gap-[32px] row-start-2">
        <div>
          {/* <div className="bg-stone-400 px-4 py-1 border-emerald-200 border-b-2 rounded-l rounded-r-full w-1/4 font-bold text-stone-50">
            ５年生
          </div> */}
          <div className="flex flex-wrap gap-2 p-4 max-w-[800px]">
            {FIFTH_GRADE_TOPICS.map((topic, index) => {
              const topicSlug = topic.en.toLowerCase().replace(/ /g, "-");
              return (
                <Link
                  key={index}
                  href={`/game/typing/${topicSlug}`}
                  className="flex items-center gap-2 bg-stone-100 shadow px-4 py-2 border-1 border-stone-400 rounded-xl hover:rounded-xl text-slate-800 hover:text-slate-700 text-2xl transition-all"
                >
                  {topic.jp}
                </Link>
              );
            })}
          </div>

          {/* <div className="bg-stone-400 mt-4 px-4 py-1 border-stone-600 border-b-2 rounded-l rounded-r-full w-1/4 font-bold text-stone-50">
            ６年生
          </div> */}
          <div className="flex flex-wrap gap-2 p-4 max-w-[800px]">
            {SIXTH_GRADE_TOPICS.map((topic, index) => {
              const topicSlug = topic.en.toLowerCase().replace(/ /g, "-");
              return (
                <Link
                  key={index}
                  href={`/game/typing/${topicSlug}`}
                  className="flex items-center gap-2 bg-stone-100 shadow px-4 py-2 border-1 border-stone-400 rounded-xl hover:rounded-xl text-slate-800 hover:text-slate-700 text-2xl transition-all"
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
