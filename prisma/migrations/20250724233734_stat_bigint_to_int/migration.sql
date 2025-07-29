/*
  Warnings:

  - You are about to alter the column `pointsEarned` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `totalPoints` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `totalWords` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `wordsPlayed` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalWords" INTEGER NOT NULL DEFAULT 0,
    "totalTime" REAL NOT NULL DEFAULT 0,
    "timePlayed" REAL NOT NULL DEFAULT 0,
    "wordsPlayed" INTEGER NOT NULL DEFAULT 0,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "wordsPerMinute" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Stat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stat" ("createdAt", "id", "lastLogin", "pointsEarned", "timePlayed", "totalPoints", "totalTime", "totalWords", "userId", "wordsPerMinute", "wordsPlayed") SELECT "createdAt", "id", "lastLogin", "pointsEarned", "timePlayed", "totalPoints", "totalTime", "totalWords", "userId", "wordsPerMinute", "wordsPlayed" FROM "Stat";
DROP TABLE "Stat";
ALTER TABLE "new_Stat" RENAME TO "Stat";
CREATE UNIQUE INDEX "Stat_userId_key" ON "Stat"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
