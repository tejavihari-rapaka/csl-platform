// ============================================================
// CSL SAFE PRISMA CLIENT — Drop this in /lib/prisma.ts
// Replaces your existing prisma.ts
// Falls back gracefully when no DB is available
// ============================================================

// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// let prisma: PrismaClient | undefined;

// // Only create Prisma client if DATABASE_URL is set
// if (process.env.DATABASE_URL) {
//   prisma = globalForPrisma.prisma ?? new PrismaClient({
//     log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
//   });

//   if (process.env.NODE_ENV !== 'production') {
//     globalForPrisma.prisma = prisma;
//   }
// }

// export default prisma;
// export const db = prisma;

// // Helper to check if DB is available
// export const isDbAvailable = () => !!process.env.DATABASE_URL && !!prisma;


import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma