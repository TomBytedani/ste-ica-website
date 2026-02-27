import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPodcastData, addEpisode, updateEpisode, deleteEpisode } from '@/lib/podcast';

export const dynamic = 'force-dynamic';

// GET - List all episodes
export async function GET() {
    try {
        const data = await getPodcastData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching podcast data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch podcast data' },
            { status: 500 }
        );
    }
}

// POST - Create new episode
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const episode = await addEpisode(body);
        revalidatePath('/[locale]/podcast', 'page');
        return NextResponse.json(episode, { status: 201 });
    } catch (error) {
        console.error('Error creating episode:', error);
        return NextResponse.json(
            { error: 'Failed to create episode' },
            { status: 500 }
        );
    }
}

// PUT - Update episode
export async function PUT(request: Request) {
    try {
        const { id, ...updates } = await request.json();
        const episode = await updateEpisode(id, updates);
        if (!episode) {
            return NextResponse.json(
                { error: 'Episode not found' },
                { status: 404 }
            );
        }
        revalidatePath('/[locale]/podcast', 'page');
        return NextResponse.json(episode);
    } catch (error) {
        console.error('Error updating episode:', error);
        return NextResponse.json(
            { error: 'Failed to update episode' },
            { status: 500 }
        );
    }
}

// DELETE - Delete episode
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const success = await deleteEpisode(id);
        if (!success) {
            return NextResponse.json(
                { error: 'Episode not found' },
                { status: 404 }
            );
        }
        revalidatePath('/[locale]/podcast', 'page');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting episode:', error);
        return NextResponse.json(
            { error: 'Failed to delete episode' },
            { status: 500 }
        );
    }
}
