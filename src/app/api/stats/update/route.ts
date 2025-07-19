import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  // Read from JWT token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Decoded token:", token); // 👀 check if `id` is present
  if (!token?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { pointsEarned = 0, timePlayed = 0, wordsPlayed = 0 } = body;

  const stat = await prisma.stat.update({
    where: { userId: token.id as string },
    data: {
      pointsEarned: { increment: pointsEarned },
      totalPoints: { increment: pointsEarned },
      timePlayed: { increment: timePlayed },
      totalTime: { increment: timePlayed },
      wordsPlayed: { increment: wordsPlayed },
      totalWords: { increment: wordsPlayed },
      wordsPerMinute: {
        set: Math.round((wordsPlayed / timePlayed) * 60), // basic WPM calc
      },
      lastLogin: new Date(),
    },
  });

  return NextResponse.json(stat);
}
