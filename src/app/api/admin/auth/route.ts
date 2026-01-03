import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Generate a session token from the passphrase
function generateSessionToken(passphrase: string): string {
    return crypto.createHash('sha256').update(passphrase).digest('hex');
}

// Rate limiting store
const loginAttempts = new Map<string, { count: number; timestamp: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export async function POST(request: Request) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    // Check rate limit
    const attempts = loginAttempts.get(ip);
    if (attempts && attempts.count >= MAX_ATTEMPTS) {
        const timePassed = Date.now() - attempts.timestamp;
        if (timePassed < LOCKOUT_DURATION) {
            return NextResponse.json(
                { success: false, message: 'Troppi tentativi. Riprova tra 15 minuti.' },
                { status: 429 }
            );
        }
        loginAttempts.delete(ip);
    }

    const { passphrase } = await request.json();
    const correctPassphrase = process.env.ADMIN_PASSPHRASE;

    if (!correctPassphrase) {
        console.error('ADMIN_PASSPHRASE not configured');
        return NextResponse.json(
            { success: false, message: 'Configurazione server mancante' },
            { status: 500 }
        );
    }

    if (passphrase !== correctPassphrase) {
        // Track failed attempt
        const current = loginAttempts.get(ip) || { count: 0, timestamp: Date.now() };
        loginAttempts.set(ip, { count: current.count + 1, timestamp: Date.now() });

        return NextResponse.json(
            { success: false, message: 'Passphrase non corretta' },
            { status: 401 }
        );
    }

    // Generate session token and set cookie
    const sessionToken = generateSessionToken(correctPassphrase);
    const cookieStore = await cookies();

    cookieStore.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
    });

    // Clear failed attempts on success
    loginAttempts.delete(ip);

    return NextResponse.json({ success: true });
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    return NextResponse.json({ success: true });
}
