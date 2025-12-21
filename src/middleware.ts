import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { RateLimitService } from './lib/services/RateLimitService';

// Singleton instance for middleware (note: this resets on cold start in serverless)
const rateLimiter = new RateLimitService();

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    // Public paths
    if (
        pathname === '/login' ||
        pathname === '/register' ||
        pathname === '/' ||
        pathname.startsWith('/api/auth/login') ||
        pathname.startsWith('/api/auth/register') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico')
    ) {
        if (token && (pathname === '/login' || pathname === '/register')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    // Rate Limiting Logic for API routes
    // Rate Limiting Logic for API routes
    let rateLimitResult = null;
    if (pathname.startsWith('/api')) {
        rateLimitResult = rateLimiter.checkLimit(ip);
        const { allowed, remaining, reset } = rateLimitResult;

        if (!allowed) {
            return NextResponse.json(
                { success: false, message: 'Too many requests' },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': '100',
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': reset.toString(),
                    }
                }
            );
        }
    }

    if (!token) {
        if (pathname.startsWith('/api')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key');
        const { payload } = await jwtVerify(token, secret);

        // Add user ID to headers for API routes
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', payload.id as string);

        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

        // Add Rate Limit Headers to response
        // Add Rate Limit Headers to response
        if (rateLimitResult) {
            response.headers.set('X-RateLimit-Limit', '100');
            response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
            response.headers.set('X-RateLimit-Reset', rateLimitResult.reset.toString());
        }

        return response;
    } catch (error) {
        if (pathname.startsWith('/api')) {
            return NextResponse.json({ success: false, message: 'Invalid Token' }, { status: 401 });
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
