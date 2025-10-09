import { PrismaClient } from "@/lib/generated/prisma";
import { sampleData } from "./sample-data"; // importの形も修正

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // === データ削除 (順序に注意)
  await prisma.set.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  // === ユーザーとその関連Exercise/Setを作成
  for (const user of sampleData.users) {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        exercises: {
          create: user.exercises.map((exercise) => ({
            name: exercise.name,
            categoryColor: exercise.categoryColor,
            muscle: exercise.muscle,
            date: exercise.date,
            sets: {
              create: exercise.sets.map((set) => ({
                weight: set.weight,
                reps: set.reps,
              })),
            },
          })),
        },
      },
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
