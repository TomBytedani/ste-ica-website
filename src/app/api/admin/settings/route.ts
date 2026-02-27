import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSettings, saveSettings, SiteSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const settings = await getSettings();
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body: SiteSettings = await request.json();
        await saveSettings(body);
        revalidatePath('/', 'layout');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving settings:', error);
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }
}
