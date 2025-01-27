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

    console.log("-> (m)forwarding-url:", url.toString());

    // Rewrite the request to the API URL
    return NextResponse.rewrite(url.toString(), {
      headers: {
        ...request.headers,
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
    "/api/:path*", // Always match API routes
  ],
};
