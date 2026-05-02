import { authConfig } from "@/next-auth/next-auth";
import NextAuth from "next-auth";

const handlers = NextAuth(authConfig)
export { handlers as GET, handlers as POST }