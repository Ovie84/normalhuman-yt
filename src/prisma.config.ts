import "dotenv/config";
import { url } from "inspector/promises";
import { defineConfig, env } from "prisma/config";

//datasource.url = env("DATABASE_URL");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },

  datasource: {
    //provider : "postgresql"
    url: env("DATABASE_URL"),
    //directUrl : env("DIRECT_URL")
    //datasourceUrl : env("DIRECT_URL")
    //url   : env("DIRECT_URL")
    //url : env("NEXT_PUBLIC_SUPABASE_URL")
}, 
})

