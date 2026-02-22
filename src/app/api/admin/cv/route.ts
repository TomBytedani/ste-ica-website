import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getSettings, saveSettings } from '@/lib/settings';

const CV_DEFAULT_URL = 'https://www.opl.it/iscritti/cv/CV-22963.pdf';

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

        const filesDir = path.join(process.cwd(), 'public', 'files');
        await mkdir(filesDir, { recursive: true });

        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(path.join(filesDir, 'cv-upload.pdf'), buffer);

        const settings = await getSettings();
        settings.cv = { url: '/files/cv-upload.pdf', isCustom: true };
        await saveSettings(settings);

        return NextResponse.json({ success: true, url: '/files/cv-upload.pdf' });
    } catch (error) {
        console.error('Error uploading CV:', error);
        return NextResponse.json({ error: 'Errore durante il caricamento' }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const settings = await getSettings();
        settings.cv = { url: CV_DEFAULT_URL, isCustom: false };
        await saveSettings(settings);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error resetting CV:', error);
        return NextResponse.json({ error: 'Errore durante il ripristino' }, { status: 500 });
    }
}
