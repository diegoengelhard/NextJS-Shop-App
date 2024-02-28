import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

export async function middleware(req, ev) {
    const path = req.nextUrl.pathname;
    const publicPath = path === '/signin';

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(session);

    if (publicPath && session) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    if (publicPath && !session) {
        return NextResponse.next();
    }

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
