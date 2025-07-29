import prisma from "prisma";

await prisma.modelName.updateMany({
  where: {
    OR: [
      { totalPoints: "NA" },
      { totalWords: "NA" },
      { timePlayed: "NA" },
      { wordsPlayed: "NA" },
      { pointsEarned: "NA" },
      { totalWords: "NA" },
    ],
  },
  data: {
    totalPoints: 0,
    totalWords: 0,
    timePlayed: 0,
    wordsPlayed: 0,
    pointsEarned: 0,
    totalWords: 0,
  },
});
