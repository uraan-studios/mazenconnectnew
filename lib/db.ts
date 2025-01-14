import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined; // No need for 'const' or 'let' here
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export const adapter = new PrismaAdapter(db.session, db.user);
