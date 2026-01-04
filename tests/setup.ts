import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.test") });

const prisma = new PrismaClient();

beforeAll(async () => {
  const dbUrl = process.env.DATABASE_URL || "";

  if (!dbUrl.includes("_test")) {
    throw new Error(
      "ERREUR : La DATABASE_URL dans .env.test doit pointer vers une base de données de test (contenant '_test'). " +
        "Action annulée pour protéger tes données de développement."
    );
  }

  try {
    execSync("npx prisma db push --skip-generate", { stdio: "inherit" });
  } catch (error) {
    console.error("Impossible de synchroniser la base de données de test.");
    process.exit(1);
  }
});

beforeEach(async () => {
  const deleteTokens = prisma.refreshToken.deleteMany();
  const deleteUsers = prisma.user.deleteMany();

  await prisma.$transaction([deleteTokens, deleteUsers]);
});

afterAll(async () => {
  await prisma.$disconnect();
});
