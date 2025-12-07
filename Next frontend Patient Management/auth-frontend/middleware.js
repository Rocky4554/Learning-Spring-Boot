import { NextResponse } from 'next/server';

export function middleware(request) {
    // This is a client-side auth implementation helper
    // Since tokens are stored in localStorage, we can't truly protect routes
    // on the server side without cookies.
    // This middleware mainly handles simple redirects based on path logic

    // Real authentication check happens in the components
    return NextResponse.next();
}

export const config = {
    matcher: ['/home/:path*', '/login', '/signup'],
};
