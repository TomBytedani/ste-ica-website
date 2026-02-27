import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getArticlesData, addArticle, updateArticle, deleteArticle } from '@/lib/articles';

// GET - List all articles
export async function GET() {
    try {
        const data = await getArticlesData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles' },
            { status: 500 }
        );
    }
}

// POST - Create new article
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const article = await addArticle(body);
        revalidatePath('/[locale]/articoli', 'page');
        return NextResponse.json(article, { status: 201 });
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json(
            { error: 'Failed to create article' },
            { status: 500 }
        );
    }
}

// PUT - Update article
export async function PUT(request: Request) {
    try {
        const { id, ...updates } = await request.json();
        const article = await updateArticle(id, updates);
        if (!article) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }
        revalidatePath('/[locale]/articoli', 'layout');
        return NextResponse.json(article);
    } catch (error) {
        console.error('Error updating article:', error);
        return NextResponse.json(
            { error: 'Failed to update article' },
            { status: 500 }
        );
    }
}

// DELETE - Delete article
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const success = await deleteArticle(id);
        if (!success) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }
        revalidatePath('/[locale]/articoli', 'layout');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting article:', error);
        return NextResponse.json(
            { error: 'Failed to delete article' },
            { status: 500 }
        );
    }
}
