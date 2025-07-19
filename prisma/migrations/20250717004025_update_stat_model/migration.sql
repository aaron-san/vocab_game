/*
  Warnings:

  - You are about to drop the column `totalCardsComplete` on the `Stat` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalWords" INTEGER NOT NULL,
    "totalTime" REAL NOT NULL,
    "timePlayed" REAL NOT NULL,
    "wordsPlayed" INTEGER NOT NULL,
    "totalPoints" INTEGER NOT NULL,
    "pointsEarned" INTEGER NOT NULL,
    "wordsPerMinute" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Stat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stat" ("createdAt", "id", "lastLogin", "pointsEarned", "timePlayed", "totalPoints", "totalTime", "totalWords", "userId", "wordsPerMinute", "wordsPlayed") SELECT "createdAt", "id", "lastLogin", "pointsEarned", "timePlayed", "totalPoints", "totalTime", "totalWords", "userId", "wordsPerMinute", "wordsPlayed" FROM "Stat";
DROP TABLE "Stat";
ALTER TABLE "new_Stat" RENAME TO "Stat";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
