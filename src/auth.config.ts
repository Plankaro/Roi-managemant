/* eslint-disable @typescript-eslint/no-explicit-any */
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { signInSchema } from "./zod/auth/auth.schema";
import { CredentialsSignin, NextAuthConfig } from "next-auth";
import axios from "axios";
const publicRoutes = ["/auth/signin", "/auth/signup"];
const authRoutes = ["/auth/signin", "/auth/signup"];

async function refreshAccessToken(token:any) {
    console.log("Refreshing access token", token);
    try {    

        console.log("Beaarer token", `Bearer ${token.refresh_token}`);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth//refresh-token`, {
            headers: {
                "Authorization": `Bearer ${token.refresh_token}`
            }
        });

    

        const tokens = response.data.userTokens;

        console.log(tokens);

      

        /*const refreshedTokens = {
        "access_token": "acess-token",
        "expires_in": 2,
        "refresh_token": "refresh-token"
      }*/

        //return token;

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

            async authorize(credentials) {
                const { email, password } = credentials;
         

                // validate credentials
                try {
                    const parsedCredentials = signInSchema.safeParse({ email, password });
                    if (!parsedCredentials.success) {
                        console.error("Invalid credentials:", parsedCredentials.error.errors);
                        throw new CredentialsSignin({cause:"Required fields missing"})
                    }
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
             
                    const data = {
                        access_token: response.data.userTokens.access_token,
                        refresh_token: response.data.userTokens.refresh_token,
                        user: response.data.user

                    }
                  
                    
                    return data
                } catch (error) {
                    console.log(error)
                   
                    
                }

               
            }
        })
    ],
    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;

            // Allow access to public routes for all users
            if (publicRoutes.includes(pathname)) {
                return true;
            }

            // Redirect logged-in users away from auth routes
            if (authRoutes.includes(pathname)) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/', nextUrl));
                }
                return true; // Allow access to auth pages if not logged in
            }

            // Allow access if the user is authenticated
            return isLoggedIn;
        },
        jwt: async({ token, user, trigger, session,account })=> {
          


            if (user) {
                token.user = user.user,
                token.access_token = user.access_token,
                token.refresh_token = user.refresh_token
               
            }
          
            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }
            return token;
        },
        session: async({ session, token }) =>{
            console.log(token);
          
            session.user = token.user;
            session.access_token = token.access_token;
            
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin"
    }
} satisfies NextAuthConfig;