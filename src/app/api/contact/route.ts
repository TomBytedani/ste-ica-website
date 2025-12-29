import { NextResponse } from "next/server";

// Contact form handler
export async function POST(request: Request) {
    try {
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

        // TODO: Implement email sending with Resend or similar service
        // For now, just log the form data
        console.log("Contact form submission:", {
            nome,
            email,
            telefono,
            messaggio,
            timestamp: new Date().toISOString(),
        });

        // In production, you would send an email here:
        // await sendEmail({
        //   to: "stefano.icardi@outlook.com",
        //   subject: `Nuovo messaggio da ${nome}`,
        //   text: messaggio,
        //   replyTo: email,
        // });

        return NextResponse.json({
            success: true,
            message: "Messaggio inviato con successo!",
        });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, message: "Errore durante l'invio del messaggio" },
            { status: 500 }
        );
    }
}
