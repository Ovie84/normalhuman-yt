// Gemini recommeded
// export const runtime = "nodejs"

import { env } from "@/env";
// import { PrismaClient } from "../../generated/prisma";
import { PrismaClient } from '@prisma/client';

// Prisma@v7 implementaion
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
// import { env } from "@/env";

// const createPrismaClient = () =>
//   new PrismaClient({
//     log:
//       env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
//   });

// Prisma@v7 implementation
const createPrismaClient = () => {
  //1. Establish a native connection pool using your Supabase URL
  const pool = new pg.Pool({ connectionString: env.DATABASE_URL });
  const adapter = new PrismaPg(pool);

  //2. Inject the adapter directly into the constructor object
  return new PrismaClient({
    adapter: adapter, // Required for Prisma 7
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
