import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {getAuthToken} from "@/utils/auth";

export function middleware(request: NextRequest) {
    const token = getAuthToken();
    const { pathname } = request.nextUrl;

    if (!token && !pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
