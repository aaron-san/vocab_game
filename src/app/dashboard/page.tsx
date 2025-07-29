"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type { Stats } from "@/types/stats";

export default function UserStats() {
  const { data: session, status } = useSession();

  const [stats, setStats] = useState<Stats>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [firstLoad, setFirstLoad] = useState(true);

  // Fetch stats on load
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await fetch("/api/stats/fetch");
    if (res.ok) {
      const data = await res.json();
      // console.log("Fetched stats:", data);
      setStats(data);
    }
  };

  // 🎖️ Get achievement rank
  function getAchievement(points: number = 0) {
    if (points >= 10000)
      return { tier: "👑 Quiz Royalty", color: "yellow-500" };
    if (points >= 5000)
      return { tier: "🥇 ゴールド レベル", color: "amber-500" };
    if (points >= 2000)
      return { tier: "🥈 シルバー レベル", color: "gray-500" };
    if (points >= 1000)
      return { tier: "🥉 ブロンズ スプリンター", color: "orange-500" };
    return { tier: "📘 ルーキー エクスプローラー", color: "blue-500" };
  }

  // 🔥 WPM feedback
  function getWPMFeedback(wpm: number = 0) {
    if (wpm >= 100) return "🔥 タイピングマスター！";
    if (wpm >= 60) return "💨 グレートスピード！";
    if (wpm >= 30) return "🎯 しっかり練習中！";
    return "🐢 ゆっくりでも着実に！";
  }

  // 🧠 XP + Level logic
  function getLevel(points: number = 0) {
    const level = Math.floor(points / 500);
    const xp = points % 500;
    return { level, xp };
  }

  // 🎊 Confetti trigger once on new tier
  useEffect(() => {
    const points = stats.totalPoints ?? 0;
    if (!firstLoad && points >= 1000 && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      setFirstLoad(false);
    }
  }, [stats.totalPoints]);

  // 🧪 Progress bar logic
  const goal = 10000;
  const progress = Math.min((stats.totalPoints ?? 0) / goal, 1) * 100;
  const achievement = getAchievement(stats.totalPoints);
  const { level, xp } = getLevel(stats.totalPoints);

  // 🧪 Add points button (dev/test)
  const addTestPoints = async () => {
    await fetch("/api/stats/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pointsEarned: 500,
        timePlayed: 60,
        wordsPlayed: 5,
      }),
    });
    await fetchStats();
  };

  function getFormattedHrs(seconds: number) {
    return Math.floor(seconds / 3600);
  }
  function getFormattedMins(seconds: number) {
    return Math.floor((seconds % 3600) / 60);
  }

  return (
    <div className="bg-white shadow mx-auto my-8 p-6 border rounded max-w-md animate-fade-in">
      <h2 className="mb-4 font-bold text-2xl text-center">📊 あなたの統計</h2>

      {session?.user?.name && (
        <div className="flex items-center gap-2 rounded text-xl animate-fade-in">
          <div className="bg-green-200 mb-4 px-4 py-2 w-full text-center">
            ようこそ、{session.user.name}さん！
          </div>
        </div>
      )}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          recycle={false}
        />
      )}

      <ul className="space-y-3 text-stone-800 text-base">
        <li>
          🪙 得ポイント:{" "}
          <CountUp end={stats.totalPoints ?? 0} duration={1.5} separator="," />
        </li>
        <li>
          📈 WPM: <CountUp end={stats.wordsPerMinute ?? 0} duration={1.5} />
        </li>
        <li>
          📝 単語数:{" "}
          <CountUp end={stats.totalWords ?? 0} duration={1.5} separator="," />
        </li>
        <li>
          ⏱️ 勉強 時間:{" "}
          <CountUp
            end={stats?.totalTime ? getFormattedHrs(stats.totalTime) : 0}
            duration={1.5}
          />
          時間
          <CountUp
            end={stats?.totalTime ? getFormattedMins(stats.totalTime) : 0}
            duration={1.5}
          />{" "}
          分
        </li>
      </ul>

      <div
        className={`flex mt-6 text-${achievement.color} text-center items-center justify-center gap-2`}
      >
        <div className="relative flex justify-center items-center bg-yellow-100 p-4 border border-slate-200 rounded animate-[bounce_2s_ease-in-out_4s]">
          <div className="-top-2 -right-2 z-10 absolute bg-emerald-100 px-1 py-1/2 border border-slate-200 rounded-full text-emerald-600 text-xs">
            🎖️ ランク
          </div>
          <span className="text-4xl">{achievement.tier.slice(0, 2)}</span>
          <span className="break-normal whitespace-normal">
            {achievement.tier.slice(2)}
          </span>
        </div>
      </div>

      <div className="mt-2 text-indigo-600 text-sm text-center">
        🧠 レベル {level} ・XP: {xp}/500
      </div>

      <div className="mt-4 text-sm text-center">
        {getWPMFeedback(stats.wordsPerMinute)}
      </div>

      <div className="mt-6 text-stone-600">
        <span>🚀 次のランクまで: </span>
        <span className="font-bold text-blue-400 text-lg">
          {goal - (stats.totalPoints ?? 0)}
        </span>
        <span> ポイント</span>
      </div>
      <div className="bg-stone-300 shadow-inner mt-2 rounded w-full h-4">
        <div
          className="bg-gradient-to-r from-green-400 to-green-600 rounded h-4 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        onClick={addTestPoints}
        className="bg-blue-600 hover:bg-blue-700 mt-6 px-4 py-2 rounded text-white text-sm transition"
      >
        🧪 テスト用ポイント追加 (+500)
      </button>
      <Link
        href="/gamemenu"
        className="block mt-4 text-blue-500 text-center hover:underline"
      >
        ゲームメニューへ
      </Link>
      <Link
        href="/leaderboard"
        className="block mt-2 text-blue-500 text-center hover:underline"
      >
        リーダーボードを見る
      </Link>
    </div>
  );
}
