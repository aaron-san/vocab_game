import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      stats: true,
    },
    orderBy: {
      stats: {
        totalPoints: "desc",
      },
    },
    take: 20,
  });

  const leaderboard = users.map((user) => ({
    username: user.username,
    totalPoints: user.stats?.totalPoints ?? 0,
    wordsPerMinute: user.stats?.wordsPerMinute ?? 0,
  }));

  return NextResponse.json(leaderboard);
}
