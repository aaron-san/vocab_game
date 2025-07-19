/*
  Warnings:

  - Added the required column `timePlayed` to the `Stat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTime` to the `Stat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalWords` to the `Stat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wordsPlayed` to the `Stat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalCardsComplete" INTEGER NOT NULL,
    "totalWords" INTEGER NOT NULL,
    "totalTime" REAL NOT NULL,
    "timePlayed" REAL NOT NULL,
    "wordsPlayed" INTEGER NOT NULL,
    "wordsPerMinute" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Stat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Stat" ("createdAt", "id", "lastLogin", "totalCardsComplete", "userId", "wordsPerMinute") SELECT "createdAt", "id", "lastLogin", "totalCardsComplete", "userId", "wordsPerMinute" FROM "Stat";
DROP TABLE "Stat";
ALTER TABLE "new_Stat" RENAME TO "Stat";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
