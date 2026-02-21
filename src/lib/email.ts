import { Resend } from 'resend';

// Lazy initialization of Resend client
let resendClient: Resend | null = null;

function getResendClient(): Resend {
    if (!resendClient) {
        if (!process.env.RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY environment variable is not set');
        }
        resendClient = new Resend(process.env.RESEND_API_KEY);
    }
    return resendClient;
}

interface SendContactEmailParams {
    nome: string;
    email: string;
    telefono?: string;
    messaggio: string;
}

export async function sendContactEmail({
    nome,
    email,
    telefono,
    messaggio,
}: SendContactEmailParams) {
    const toEmail = process.env.CONTACT_EMAIL || 'stefano.icardi@outlook.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
        from: `Sito Web Stefano Icardi <${fromEmail}>`,
        to: [toEmail],
        replyTo: email,
        subject: `Nuovo messaggio dal sito web: ${nome}`,
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #1a1a1a, #333); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 500;">Nuovo Messaggio</h1>
        <p style="color: #cccccc; margin: 10px 0 0 0; font-size: 14px;">dal sito stefanoicardi.com</p>
    </div>
    
    <div style="background: #f9fafb; padding: 30px 20px; border: 1px solid #e5e7eb; border-top: none;">
        <div style="background: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1a1a1a; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 0.5px;">Dettagli Contatto</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 100px; vertical-align: top;">
                        <strong style="color: #666; font-size: 12px; text-transform: uppercase;">Nome</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a1a1a;">
                        ${nome}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 100px; vertical-align: top;">
                        <strong style="color: #666; font-size: 12px; text-transform: uppercase;">Email</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                        <a href="mailto:${email}" style="color: #1a1a1a; text-decoration: none;">${email}</a>
                    </td>
                </tr>
                ${telefono ? `
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 100px; vertical-align: top;">
                        <strong style="color: #666; font-size: 12px; text-transform: uppercase;">Telefono</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                        <a href="tel:${telefono.replace(/\s/g, '')}" style="color: #1a1a1a; text-decoration: none;">${telefono}</a>
                    </td>
                </tr>
                ` : ''}
            </table>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border-radius: 8px;">
            <h2 style="color: #1a1a1a; font-size: 16px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 0.5px;">Messaggio</h2>
            <p style="color: #333; margin: 0; white-space: pre-wrap; line-height: 1.8;">${messaggio.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
    </div>
    
    <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
        <p style="margin: 0 0 5px 0;">Ricevuto il ${new Date().toLocaleDateString('it-IT', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}</p>
        <p style="margin: 0;">
            <a href="mailto:${email}" style="color: #1a1a1a; text-decoration: none; font-weight: 500;">Rispondi a ${nome}</a>
        </p>
    </div>
</body>
</html>
        `,
        text: `
Nuovo messaggio dal sito web stefanoicardi.com

DETTAGLI CONTATTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nome: ${nome}
Email: ${email}
${telefono ? `Telefono: ${telefono}` : ''}

MESSAGGIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${messaggio}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ricevuto il ${new Date().toLocaleDateString('it-IT')} alle ${new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
        `,
    });

    if (error) {
        console.error('Error sending email:', error);
        throw new Error('Errore nell\'invio dell\'email');
    }

    return data;
}
