import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Admin routes: Check authentication
    if (pathname.startsWith('/admin')) {
        // Allow access to login page
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for auth cookie - verify token exists and has valid SHA256 hex format (64 chars)
        const authToken = request.cookies.get('admin_session')?.value;

        // Validate token exists and is a valid SHA256 hex string (64 characters)
        if (!authToken || !/^[a-f0-9]{64}$/i.test(authToken)) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        return NextResponse.next();
    }

    // All other routes: Apply i18n middleware
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/((?!api|_next|_vercel|.*\\..*).*)',
        '/'
    ]
};
