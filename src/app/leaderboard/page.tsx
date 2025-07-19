"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

type LeaderData = {
  username: string;
  totalPoints: number;
  wordsPerMinute: number;
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderData[]>([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const res = await fetch("/api/stats/leaderboard");
    if (res.ok) {
      const data = await res.json();
      setLeaders(data);
    }
  };

  return (
    <div className="bg-white shadow mx-auto mt-10 p-6 border rounded max-w-2xl animate-fade-in">
      <h2 className="mb-6 font-bold text-indigo-700 text-3xl text-center">
        🏆 Leaderboard
      </h2>

      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b text-gray-600 text-sm">
            <th className="pb-2">#</th>
            <th className="pb-2">User</th>
            <th className="pb-2">Points</th>
            <th className="pb-2">WPM</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((user, index) => (
            <tr
              key={user.username}
              className="hover:bg-stone-100 border-b transition"
            >
              <td className="py-2 text-center">{index + 1}</td>
              <td className="py-2 font-semibold">{user.username}</td>
              <td className="py-2 text-emerald-600">
                <CountUp end={user.totalPoints} duration={1.5} separator="," />
              </td>
              <td className="py-2 text-indigo-500">
                <CountUp end={user.wordsPerMinute} duration={1.5} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {leaders.length === 0 && (
        <div className="mt-6 text-gray-500 text-center">
          🙈 No leaderboard data available.
        </div>
      )}
    </div>
  );
}
