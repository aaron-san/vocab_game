import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { AuthToken } from "@/types/auth-token";

export async function POST(req: NextRequest) {
  // Read from JWT token
  const rawToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const token = rawToken as AuthToken;

  if (!token?.id || typeof token.id !== "string") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Decoded token:", token); // 👀 check if `id` is present
  if (!token?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    pointsEarned = 0,
    timePlayed = 0,
    wordsPlayed = 0,
  } = await req.json();

  const stat = await prisma.stat.upsert({
    // const stat = await prisma.stat.update({
    where: { userId: token.id as string },
    update: {
      pointsEarned: { increment: pointsEarned },
      totalPoints: { increment: pointsEarned },
      timePlayed: { increment: timePlayed },
      // totalTime: { increment: timePlayed },
      wordsPlayed: { increment: wordsPlayed },
      totalWords: { increment: wordsPlayed },
      wordsPerMinute: {
        set: timePlayed > 0 ? Math.round((wordsPlayed / timePlayed) * 60) : 0, // basic WPM calc
      },
      lastLogin: new Date(),
    },
    create: {
      userId: token.id,
      pointsEarned,
      totalPoints: pointsEarned,
      timePlayed,
      wordsPlayed,
      totalWords: wordsPlayed,
      // wordsPerMinute,
      lastLogin: new Date(),
      createdAt: new Date(),
    },
  });

  return NextResponse.json(stat);
}
