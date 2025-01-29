/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { signInSchema } from "./zod/auth/auth.schema";
import { CredentialsSignin, NextAuthConfig } from "next-auth";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const publicRoutes = ["/auth/signin", "/auth/signup"];
const authRoutes = ["/auth/signin", "/auth/signup"];

async function refreshAccessToken(token: any) {

    try {
      

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token.refresh_token}`,
                },
            }
        );
console.log(response);
        const tokens = response.data.userTokens;

    

        return {
            ...token,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.log(error);

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
                        console.error("Invalid credentials:", parsedCredentials.error.errors);
                        throw new CredentialsSignin({ cause: "Required fields missing" });
                    }
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                        email,
                        password,
                    });

                    const data = {
                        access_token: response.data.userTokens.access_token,
                        refresh_token: response.data.userTokens.refresh_token,
                        user: response.data.user,
                    };
                    

                    return data;
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, account, user }: any) => {
       
            if (token.access_token) {
                const decodedToken:any = jwtDecode(token.access_token);
            
                token.accessTokenExpires = decodedToken?.exp * 1000;
            }

            if (account && user) {
                console.log(`In jwt callback - User is ${JSON.stringify(user)}`);
                console.log(`In jwt callback - account is ${JSON.stringify(account)}`);

                return {
                    ...token,
                    access_token: user.access_token,
                    refresh_token: user.refresh_token,
                    user,
                };
            }

            if (Date.now() < token.accessTokenExpires) {
                console.log("**** returning previous token ******");
                return token;
            }

            // Access token has expired, try to update it
            console.log("**** Update Refresh token ******");
            //return token;
            return refreshAccessToken(token);
        },
        session: async ({ session, token }: any) => {
            session.user = token.user as any;
            session.access_token = token.access_token as any;

            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
} satisfies NextAuthConfig;
