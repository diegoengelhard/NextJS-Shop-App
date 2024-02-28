import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

export async function middleware(req, ev) {
    // Get URL path
    const path = req.nextUrl.pathname;
    const publicPath = path === '/signin'; // Define non-protected paths

    // Get NextAuth session
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(session);

    // Redirect to home if user is logged in
    if (publicPath && session) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    // Redirect to signin if user is not logged in
    if (publicPath && !session) {
        return NextResponse.next();
    }

    // Redirect to signin if user is not logged in
    if (!session) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl))
    }
}

export const config = {
    // Set matcher to all available paths
    matcher: [
        '/',
        '/signin',
        '/products',
    ]
};
