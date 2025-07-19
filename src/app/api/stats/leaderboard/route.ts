import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch top 20 users by totalPoints
    const users = await prisma.user.findMany({
      include: {
        stats: {
          select: {
            totalPoints: true,
            wordsPerMinute: true,
          },
        },
      },
      orderBy: {
        stats: {
          totalPoints: "desc",
        },
      },
      take: 20,
    });

    // Shape response data
    const leaderboard = users.map((user) => ({
      username: user.username,
      totalPoints: user.stats?.totalPoints ?? 0,
      wordsPerMinute: user.stats?.wordsPerMinute ?? 0,
    }));

    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { error: "Failed to load leaderboard" },
      { status: 500 }
    );
  }
}
