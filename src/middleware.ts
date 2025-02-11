/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

// Use `NextAuth` to provide the `auth` function
const { auth } = NextAuth(authConfig);

// Export the wrapped middleware
export default auth(async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const session = await auth() as any


    // Remove `/api` from the forwarded path
    const forwardedPath = request.nextUrl.pathname.replace("/api", "");
    const url = new URL(api_url + forwardedPath + request.nextUrl.search);

   

    // Rewrite the request to the API URL
    return NextResponse.rewrite(url.toString(), {
      headers: {
        ...request.headers,
        Authorization: `Bearer ${session?.access_token??""}`, 
      },
      statusText: "Rewriting to API",
    });
  }

  // If not an API route, continue processing as normal
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
