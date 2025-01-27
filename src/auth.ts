import NextAuth from "next-auth";
import authConfig from "./auth.config";
export const { handlers, signIn, signOut, auth } = NextAuth({

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  ...authConfig
})