import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { MIN_PASSWORD_LENGTH } from "@/utils/constants";

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { username, password } = body;

  if (!username || !password || password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "ユーザー名は既に使われています。" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    await prisma.stat.create({
      data: {
        userId: newUser.id,
        totalWords: 0,
        totalTime: 0,
        timePlayed: 0,
        wordsPlayed: 0,
        totalPoints: 0,
        pointsEarned: 0,
        wordsPerMinute: 0,
        lastLogin: new Date(),
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 500 }
    );
  }
}
