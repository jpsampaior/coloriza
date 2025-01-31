import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}
