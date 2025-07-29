// npx tsx scripts/alter-db.ts

import { prisma } from "@/lib/prisma";

async function main() {
  // Example: Remove "NA" values from a field
  await prisma.stat.updateMany({
    where: { totalPoints: 100 },
    data: { totalPoints: 0 },
  });

  console.log("✅ Database updated");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
