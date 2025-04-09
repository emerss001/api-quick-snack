import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Reutiliza o client no modo dev com hot reload
export const db =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ["query"], // opcional: loga todas as queries
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
