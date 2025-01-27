import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Middleware for API request forwarding
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    const api_url = process.env.NEXT_PUBLIC_API_URL;

    // Remove `/api` from the forwarded path
    const forwardedPath = request.nextUrl.pathname.replace('/api', '');
    const url = new URL(api_url + forwardedPath + request.nextUrl.search);

    console.log('-> (m)forwarding-url:', url.toString());
    return NextResponse.rewrite(url.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*', // Always match API routes
  ],
};
