/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
import Credentials from "next-auth/providers/credentials";

import { signInSchema } from "./zod/auth/auth.schema";
import { CredentialsSignin, NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";


const authRoute = ["/sign-in", "/sign-up"]
const publicRoute = ["/verify", "/reset-password", "/get-token"];

async function refreshAccessToken(token: any) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.refresh_token}`,
          },
          // no body needed (empty object), but if your API expects JSON:
          body: JSON.stringify({}),
        }
      );
  
      // Throw on HTTP errors so we catch them below
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to refresh access token");
      }
  
      const tokens = await res.json();
      return {
        ...token,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token, // fall back to old refresh token if needed
      };
    } catch (err: any) {
      console.error("Refresh token error:", err);
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  }
  

export default {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },

            async authorize(credentials): Promise<any> {
                const { email, password } = credentials;

                // validate credentials
                try {
                    const parsedCredentials = signInSchema.safeParse({ email, password });
            
                    if (!parsedCredentials.success) {
                        //console.error("Invalid credentials:", parsedCredentials.error.errors);
                        throw new CredentialsSignin({ cause: "Required fields missing" });
                    }
              
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            email,
                            password,
                          }),
                        }
                      );
                      
                      if (!response.ok) {
                        // throw or handle non-2xx HTTP errors
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Login failed");
                      }
                      
                      const responseData = await response.json();
                      
                      const data = {
                        access_token: responseData.userTokens.access_token,
                        refresh_token: responseData.userTokens.refresh_token,
                        user: responseData.user,
                      };

                    return data;
                } catch (error) {
                   
                   throw new CredentialsSignin({"cause": "Invalid credentials"});
                }
            },
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const { pathname } = nextUrl;
            const isAuthRoute = authRoute.some((route) => pathname.startsWith(route));
            const isLoggedIn = !!auth?.user;
            if(publicRoute.some((route) => pathname.startsWith(route))){
                return true
            }
      
            // 1. Unauthenticated user trying to access an auth page?  ✅ Allow.
            if (!isLoggedIn && isAuthRoute) {
              return true;
            }
      
            // 2. Unauthenticated user trying to access any other page?  ⛔ Redirect to /sign-in.
            if (!isLoggedIn && !isAuthRoute) {
              return NextResponse.redirect(new URL("/sign-in", nextUrl));
            }
      
            // 3. Authenticated user trying to hit /sign-in or /sign-up?  ⛔ Redirect to home.
            if (isLoggedIn && isAuthRoute) {
              return NextResponse.redirect(new URL("/", nextUrl));
            }
      
            // 4. Authenticated user on any other page?  ✅ Allow.
            return true;
          },
        jwt: async ({ token, account, user }: any) => {
       
            if (token.access_token) {
                const decodedToken:any = jwtDecode(token.access_token);
            
                token.accessTokenExpires = decodedToken?.exp * 1000;
            }

            if (account && user) {
            

                return {
                    ...token,
                    access_token: user.access_token,
                    refresh_token: user.refresh_token,
                    user,
                };
            }

            if (Date.now() < token.accessTokenExpires) {
                //console.log("**** returning previous token ******");
                return token;
            }

          
            //console.log("**** Update Refresh token ******");
            
            return refreshAccessToken(token);
        },
        session: async ({ session, token }: any) => {
            session.user = token.user as any;
            session.access_token = token.access_token as any;

          
            return session;
        },
    },
    pages: {
        signIn: "/sign-in",
    },
    trustHost:true,
} satisfies NextAuthConfig;
