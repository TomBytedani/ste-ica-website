import fs from 'fs/promises';
import path from 'path';

const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

/**
 * Read a content JSON file. In production (when BLOB_READ_WRITE_TOKEN is set),
 * reads from Vercel Blob first, falling back to the local /content/ directory.
 * In development, reads directly from the local filesystem.
 */
export async function readContent(key: string): Promise<string | null> {
    if (useBlob) {
        try {
            const { head } = await import('@vercel/blob');
            const blobInfo = await head(`content/${key}`, {
                token: process.env.BLOB_READ_WRITE_TOKEN!,
            });
            const response = await fetch(blobInfo.url);
            if (response.ok) {
                return await response.text();
            }
        } catch {
            // Blob not found or error — fall through to local file
        }
    }

    // Fallback: read from local /content/ directory (seed/default data)
    try {
        const filePath = path.join(process.cwd(), 'content', key);
        return await fs.readFile(filePath, 'utf-8');
    } catch {
        return null;
    }
}

/**
 * Write a content JSON file. In production, writes to Vercel Blob.
 * In development, writes to the local /content/ directory.
 */
export async function writeContent(key: string, data: string): Promise<void> {
    if (useBlob) {
        const { put } = await import('@vercel/blob');
        await put(`content/${key}`, data, {
            access: 'public',
            addRandomSuffix: false,
            token: process.env.BLOB_READ_WRITE_TOKEN!,
            contentType: 'application/json',
        });
        return;
    }

    const filePath = path.join(process.cwd(), 'content', key);
    await fs.writeFile(filePath, data, 'utf-8');
}
