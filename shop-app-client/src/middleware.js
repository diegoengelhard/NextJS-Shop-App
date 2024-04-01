import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

export async function middleware(req, ev) {
    // Get URL path
    const path = req.nextUrl.pathname;
    console.log(path);
    const publicPath = path === '/account/sign-in' || path === '/account/sign-up' ; // Define non-protected paths
    console.log(publicPath);
    const accountPath = path.startsWith('/account/'); // Define account paths

    // Get NextAuth session
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(session);

    // Redirect to home if user is logged in and trying to access signin or signup
    if (publicPath && session) {
        return NextResponse.redirect(new URL(`/account/${session.sub}`, req.nextUrl))
    }

    // Allow access to signin or signup if user is not logged in
    if (publicPath && !session) {
        return NextResponse.next();
    }

    // Redirect to signin if user is not logged in and trying to access account path
    if (accountPath && !session) {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
    }

    // Allow access to other paths
    return NextResponse.next();
}

export const config = {
    // Set matcher to all available paths
    matcher: [
        '/',
        '/account/sign-in',
        '/account/sign-up',
        '/account/:id',
        '/products',
        '/products/:path*',
        '/categories',
    ]
};