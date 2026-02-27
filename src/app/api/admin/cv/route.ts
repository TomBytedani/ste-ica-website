import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getSettings, saveSettings } from '@/lib/settings';

const CV_DEFAULT_URL = 'https://www.opl.it/iscritti/cv/CV-22963.pdf';
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('cv') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'Nessun file fornito' }, { status: 400 });
        }

        if (file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Sono ammessi solo file PDF' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        let cvUrl: string;

        if (useBlob) {
            const { put } = await import('@vercel/blob');
            const blob = await put('cv-upload.pdf', buffer, {
                access: 'public',
                addRandomSuffix: false,
                token: process.env.BLOB_READ_WRITE_TOKEN!,
                contentType: 'application/pdf',
            });
            cvUrl = blob.url;
        } else {
            const filesDir = path.join(process.cwd(), 'public', 'files');
            await mkdir(filesDir, { recursive: true });
            await writeFile(path.join(filesDir, 'cv-upload.pdf'), buffer);
            cvUrl = '/files/cv-upload.pdf';
        }

        const settings = await getSettings();
        settings.cv = { url: cvUrl, isCustom: true };
        await saveSettings(settings);

        return NextResponse.json({ success: true, url: cvUrl });
    } catch (error) {
        console.error('Error uploading CV:', error);
        return NextResponse.json({ error: 'Errore durante il caricamento' }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        if (useBlob) {
            const settings = await getSettings();
            if (settings.cv.isCustom && settings.cv.url.includes('.blob.')) {
                const { del } = await import('@vercel/blob');
                try {
                    await del(settings.cv.url, { token: process.env.BLOB_READ_WRITE_TOKEN! });
                } catch {
                    // Blob may already be deleted — continue
                }
            }
        }

        const settings = await getSettings();
        settings.cv = { url: CV_DEFAULT_URL, isCustom: false };
        await saveSettings(settings);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error resetting CV:', error);
        return NextResponse.json({ error: 'Errore durante il ripristino' }, { status: 500 });
    }
}
