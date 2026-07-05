import { PrismaClient } from "@prisma/client";

declare global {
  var echelonPrisma: PrismaClient | undefined;
}

export const prisma = globalThis.echelonPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.echelonPrisma = prisma;
}
