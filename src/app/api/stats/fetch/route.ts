import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth"; // App Router version

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stat = await prisma.stat.findFirst({
    where: { userId: session.user.id },
    select: {
      totalPoints: true,
      wordsPerMinute: true,
      totalWords: true,
      totalTime: true,
    },
  });

  return NextResponse.json(stat ?? {}, { status: 200 });
}
