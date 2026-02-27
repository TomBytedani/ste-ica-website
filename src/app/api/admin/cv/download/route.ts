import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

const pdfHeaders = {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'inline; filename="cv-stefano-icardi.pdf"',
};

export async function GET() {
    try {
        if (useBlob) {
            const { get } = await import('@vercel/blob');
            const blob = await get('cv-upload.pdf', {
                access: 'private',
                token: process.env.BLOB_READ_WRITE_TOKEN!,
            });
            if (!blob || !blob.stream) {
                return NextResponse.json({ error: 'CV non trovato' }, { status: 404 });
            }
            return new Response(blob.stream, { headers: pdfHeaders });
        }

        const filePath = path.join(process.cwd(), 'public', 'files', 'cv-upload.pdf');
        const buffer = await readFile(filePath);
        return new Response(new Blob([buffer]), { headers: pdfHeaders });
    } catch {
        return NextResponse.json({ error: 'CV non trovato' }, { status: 404 });
    }
}
