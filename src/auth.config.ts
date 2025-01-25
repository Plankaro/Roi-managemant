/* eslint-disable @typescript-eslint/no-explicit-any */
import Credentials from "next-auth/providers/credentials";
import { SignInFormValues } from "./zod/auth/auth.schema";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";

async function refreshAccessToken(token: JWT, id: string) {
  try {
    console.log("Refreshing access token:", token);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      }
    );

    if (!response.data) {
      throw new Error("Failed to refresh access token");
    }

    const { accessToken, refreshToken } = response.data;

    return {
      ...token,
      accessToken,
      refreshToken: refreshToken || token.refreshToken, // Fallback to old refresh token if not provided
      accessTokenExpires: jwtDecode<{ exp: number }>(accessToken).exp * 1000, // Convert expiration time to ms
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as SignInFormValues;

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
            email,
            password,
          });

          if (response.data) {
            return response.data;
          }
          return null; // Return null if authentication fails
        } catch (error) {
          console.error("Error during authentication:", error);
          return null; // Return null if there's an error
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        // Initial login
        return {
          ...token,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          accessTokenExpires: jwtDecode<{ exp: number }>(token.accessToken as string).exp * 1000,
          user,
        };
      }

      // Return token if it hasn't expired
      if (Date.now() <= token.accessTokenExpires as any) {
        return token;
      }

      // Refresh token if it has expired
      console.log("Access token expired, refreshing...");
      return refreshAccessToken(token, token.user?.id);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user as any;
        session.accessToken = token.accessToken as string | undefined;
      }
      return session;
    },
  },
};

export default authConfig;
