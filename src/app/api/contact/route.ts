import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

// Rate limiting: Simple in-memory store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (!record) {
        rateLimitStore.set(ip, { count: 1, timestamp: now });
        return false;
    }

    if (now - record.timestamp > RATE_LIMIT_WINDOW) {
        rateLimitStore.set(ip, { count: 1, timestamp: now });
        return false;
    }

    if (record.count >= MAX_REQUESTS) {
        return true;
    }

    record.count += 1;
    return false;
}

// Contact form handler
export async function POST(request: Request) {
    try {
        // Get client IP for rate limiting
        const forwardedFor = request.headers.get("x-forwarded-for");
        const ip = forwardedFor?.split(",")[0] || "unknown";

        // Check rate limit
        if (isRateLimited(ip)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Troppi tentativi. Riprova tra un'ora."
                },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { nome, email, telefono, messaggio } = body;

        // Validate required fields
        if (!nome || !email || !messaggio) {
            return NextResponse.json(
                { success: false, message: "Campi obbligatori mancanti" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Email non valida" },
                { status: 400 }
            );
        }

        // Validate message length
        if (messaggio.length < 10) {
            return NextResponse.json(
                { success: false, message: "Il messaggio è troppo corto" },
                { status: 400 }
            );
        }

        if (messaggio.length > 5000) {
            return NextResponse.json(
                { success: false, message: "Il messaggio è troppo lungo" },
                { status: 400 }
            );
        }

        // Check if Resend is configured
        if (!process.env.RESEND_API_KEY) {
            console.warn("RESEND_API_KEY not configured, logging form submission instead");
            console.log("Contact form submission:", {
                nome,
                email,
                telefono,
                messaggio: messaggio.substring(0, 100) + "...",
                timestamp: new Date().toISOString(),
            });

            return NextResponse.json({
                success: true,
                message: "Messaggio ricevuto! Ti risponderemo al più presto.",
            });
        }

        // Send email via Resend
        await sendContactEmail({
            nome,
            email,
            telefono,
            messaggio,
        });

        console.log("Contact form email sent successfully to:", process.env.CONTACT_EMAIL || "stefano.icardi@outlook.com");

        return NextResponse.json({
            success: true,
            message: "Messaggio inviato con successo! Ti risponderemo al più presto.",
        });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Si è verificato un errore durante l'invio del messaggio. Riprova più tardi."
            },
            { status: 500 }
        );
    }
}
