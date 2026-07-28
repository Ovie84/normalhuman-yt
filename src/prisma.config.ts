import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },

  datasource: {
    // url: env("DATABASE_URL"),
    // shadowDatabaseUrl: env("DIRECT_URL"),
    // url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",

    // Prisma 7 explicitly requires the built-in 
    // env() function wrapper to map locat strings
    url: env("DIRECT_URL") || env("DATABASE_URL") || "",
  },
});