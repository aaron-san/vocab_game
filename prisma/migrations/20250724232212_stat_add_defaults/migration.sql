-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalWords" BIGINT NOT NULL DEFAULT 0,
    "totalTime" REAL NOT NULL DEFAULT 0,
    "timePlayed" REAL NOT NULL DEFAULT 0,
    "wordsPlayed" BIGINT NOT NULL DEFAULT 0,
    "totalPoints" BIGINT NOT NULL DEFAULT 0,
    "pointsEarned" BIGINT NOT NULL DEFAULT 0,
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
