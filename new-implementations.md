# Articoli Page & Admin Dashboard - Implementation Plan

## Approach: Option A - Integrated Passphrase-Protected Admin

Based on the project's needs (single owner, simple content, minimal infrastructure), we'll implement a passphrase-protected admin panel directly within the existing Next.js application, with content stored in JSON files.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js Application                          │
├─────────────────────────────────────────────────────────────────┤
│  PUBLIC ROUTES              │   PROTECTED ADMIN ROUTES          │
│  ─────────────              │   ──────────────────────          │
│  /[locale]/                 │   /admin/login                    │
│  /[locale]/chi-sono         │   /admin (dashboard)              │
│  /[locale]/articoli         │   /admin/podcast                  │
│  /api/contact               │   /admin/articles                 │
│                             │   /api/admin/auth                 │
│                             │   /api/admin/podcast              │
│                             │   /api/admin/articles             │
│                             │   /api/admin/upload               │
├─────────────────────────────────────────────────────────────────┤
│  DATA LAYER                                                      │
│  ──────────                                                      │
│  /content/podcast.json      (podcast episodes)                   │
│  /content/articles.json     (written articles - optional)        │
│  /public/images/podcast/    (episode images)                     │
│  /public/images/articles/   (article images)                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Authentication Infrastructure
### Phase 2: Data Layer & API Routes
### Phase 3: Admin UI Components
### Phase 4: Articoli Page Improvements
### Phase 5: Verification & Polish

---

## Phase 1: Authentication Infrastructure

### Proposed Changes

---

#### [NEW] `.env.example`

Add new environment variable for admin passphrase:
```env
# Admin Dashboard
ADMIN_PASSPHRASE=your-secure-passphrase-here-minimum-20-chars
```

---

#### [MODIFY] `src/middleware.ts`

Extend the existing middleware to handle admin route protection alongside i18n:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Admin routes: Check authentication
    if (pathname.startsWith('/admin')) {
        // Allow access to login page
        if (pathname === '/admin/login') {
            return NextResponse.next();
        }
        
        // Check for auth cookie
        const authToken = request.cookies.get('admin_session')?.value;
        const expectedToken = process.env.ADMIN_SESSION_TOKEN;
        
        if (!authToken || authToken !== expectedToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        
        return NextResponse.next();
    }
    
    // All other routes: Apply i18n middleware
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/((?!api|_next|_vercel|.*\\..*).*)',
        '/'
    ]
};
```

---

#### [NEW] `src/app/api/admin/auth/route.ts`

Authentication API endpoint:

```typescript
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Generate a session token from the passphrase
function generateSessionToken(passphrase: string): string {
    return crypto.createHash('sha256').update(passphrase).digest('hex');
}

// Rate limiting store
const loginAttempts = new Map<string, { count: number; timestamp: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export async function POST(request: Request) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    
    // Check rate limit
    const attempts = loginAttempts.get(ip);
    if (attempts && attempts.count >= MAX_ATTEMPTS) {
        const timePassed = Date.now() - attempts.timestamp;
        if (timePassed < LOCKOUT_DURATION) {
            return NextResponse.json(
                { success: false, message: 'Troppi tentativi. Riprova tra 15 minuti.' },
                { status: 429 }
            );
        }
        loginAttempts.delete(ip);
    }
    
    const { passphrase } = await request.json();
    const correctPassphrase = process.env.ADMIN_PASSPHRASE;
    
    if (!correctPassphrase) {
        console.error('ADMIN_PASSPHRASE not configured');
        return NextResponse.json(
            { success: false, message: 'Configurazione server mancante' },
            { status: 500 }
        );
    }
    
    if (passphrase !== correctPassphrase) {
        // Track failed attempt
        const current = loginAttempts.get(ip) || { count: 0, timestamp: Date.now() };
        loginAttempts.set(ip, { count: current.count + 1, timestamp: Date.now() });
        
        return NextResponse.json(
            { success: false, message: 'Passphrase non corretta' },
            { status: 401 }
        );
    }
    
    // Generate session token and set cookie
    const sessionToken = generateSessionToken(correctPassphrase);
    const cookieStore = await cookies();
    
    cookieStore.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
    });
    
    // Clear failed attempts on success
    loginAttempts.delete(ip);
    
    return NextResponse.json({ success: true });
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    return NextResponse.json({ success: true });
}
```

---

#### [NEW] `src/app/admin/login/page.tsx`

Admin login page with passphrase form:

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [passphrase, setPassphrase] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ passphrase }),
            });

            const data = await res.json();

            if (data.success) {
                router.push('/admin');
            } else {
                setError(data.message || 'Errore di autenticazione');
            }
        } catch {
            setError('Errore di connessione');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="passphrase" className="block text-sm font-medium mb-2">
                            Passphrase
                        </label>
                        <input
                            id="passphrase"
                            type="password"
                            value={passphrase}
                            onChange={(e) => setPassphrase(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Inserisci la passphrase"
                            required
                        />
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Accesso...' : 'Accedi'}
                    </button>
                </form>
            </div>
        </div>
    );
}
```

---

## Phase 2: Data Layer & API Routes

### Proposed Changes

---

#### [MODIFY] `content/blog.json` → `content/podcast.json`

Rename and restructure to support multiple episodes:

```json
{
    "feedInfo": {
        "title": "Palombari 23 - Psicologia",
        "description": "Podcast in collaborazione con la Radio del Politecnico di Milano",
        "mixcloudFeed": "/Palombari/palombari-23-psicologia/",
        "coverImage": "/images/podcast-cover.jpg"
    },
    "episodes": [
        {
            "id": "ep-001",
            "title": "Introduzione alla Psicologia",
            "description": "Prima puntata del podcast dove parliamo di...",
            "mixcloudUrl": "https://www.mixcloud.com/Palombari/episode-1/",
            "publishedAt": "2024-01-15",
            "duration": "25:30",
            "featured": true,
            "tags": ["introduzione", "psicologia"]
        }
    ],
    "subscribeLinks": [
        {
            "platform": "Mixcloud",
            "href": "https://www.mixcloud.com/Palombari/palombari-23-psicologia/",
            "icon": "mixcloud"
        }
    ]
}
```

---

#### [NEW] `content/articles.json`

New file for written articles:

```json
{
    "articles": [
        {
            "id": "article-001",
            "slug": "gestione-ansia-quotidiana",
            "title": {
                "it": "Come gestire l'ansia nella vita quotidiana",
                "en": "How to manage anxiety in daily life"
            },
            "excerpt": {
                "it": "Strategie pratiche per affrontare i momenti di ansia...",
                "en": "Practical strategies to face moments of anxiety..."
            },
            "content": {
                "it": "Contenuto completo dell'articolo in italiano...",
                "en": "Full article content in English..."
            },
            "coverImage": "/images/articles/ansia.jpg",
            "publishedAt": "2024-01-20",
            "tags": ["ansia", "benessere", "strategie"],
            "published": true
        }
    ]
}
```

---

#### [NEW] `src/lib/podcast.ts`

Data access layer for podcast content:

```typescript
import fs from 'fs/promises';
import path from 'path';

const PODCAST_FILE = path.join(process.cwd(), 'content', 'podcast.json');

export interface Episode {
    id: string;
    title: string;
    description: string;
    mixcloudUrl: string;
    publishedAt: string;
    duration?: string;
    featured?: boolean;
    tags?: string[];
}

export interface PodcastData {
    feedInfo: {
        title: string;
        description: string;
        mixcloudFeed: string;
        coverImage: string;
    };
    episodes: Episode[];
    subscribeLinks: {
        platform: string;
        href: string;
        icon: string;
    }[];
}

export async function getPodcastData(): Promise<PodcastData> {
    const content = await fs.readFile(PODCAST_FILE, 'utf-8');
    return JSON.parse(content);
}

export async function savePodcastData(data: PodcastData): Promise<void> {
    await fs.writeFile(PODCAST_FILE, JSON.stringify(data, null, 4), 'utf-8');
}

export async function addEpisode(episode: Omit<Episode, 'id'>): Promise<Episode> {
    const data = await getPodcastData();
    const newEpisode = {
        ...episode,
        id: `ep-${Date.now()}`
    };
    data.episodes.unshift(newEpisode);
    await savePodcastData(data);
    return newEpisode;
}

export async function updateEpisode(id: string, updates: Partial<Episode>): Promise<Episode | null> {
    const data = await getPodcastData();
    const index = data.episodes.findIndex(ep => ep.id === id);
    if (index === -1) return null;
    
    data.episodes[index] = { ...data.episodes[index], ...updates };
    await savePodcastData(data);
    return data.episodes[index];
}

export async function deleteEpisode(id: string): Promise<boolean> {
    const data = await getPodcastData();
    const index = data.episodes.findIndex(ep => ep.id === id);
    if (index === -1) return false;
    
    data.episodes.splice(index, 1);
    await savePodcastData(data);
    return true;
}
```

---

#### [NEW] `src/app/api/admin/podcast/route.ts`

CRUD API for podcast episodes:

```typescript
import { NextResponse } from 'next/server';
import { getPodcastData, addEpisode, updateEpisode, deleteEpisode } from '@/lib/podcast';

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
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting episode:', error);
        return NextResponse.json(
            { error: 'Failed to delete episode' },
            { status: 500 }
        );
    }
}
```

---

## Phase 3: Admin UI Components

### Proposed Changes

---

#### [NEW] `src/app/admin/layout.tsx`

Admin layout with navigation sidebar:

```tsx
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white">
                <div className="p-4 border-b border-gray-700">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-800">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/podcast" className="block px-4 py-2 rounded hover:bg-gray-800">
                                Podcast
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/articles" className="block px-4 py-2 rounded hover:bg-gray-800">
                                Articoli
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
                    <form action="/api/admin/auth" method="DELETE">
                        <button type="submit" className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white">
                            Logout
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-gray-100 p-8">
                {children}
            </main>
        </div>
    );
}
```

---

#### [NEW] `src/app/admin/page.tsx`

Admin dashboard home:

```tsx
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/admin/podcast" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">Podcast</h2>
                    <p className="text-gray-600">Gestisci gli episodi del podcast</p>
                </Link>

                <Link href="/admin/articles" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">Articoli</h2>
                    <p className="text-gray-600">Scrivi e modifica articoli</p>
                </Link>

                <a href="/" target="_blank" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">Visualizza Sito</h2>
                    <p className="text-gray-600">Apri il sito pubblico</p>
                </a>
            </div>
        </div>
    );
}
```

---

#### [NEW] `src/app/admin/podcast/page.tsx`

Podcast management page:

```tsx
'use client';

import { useState, useEffect } from 'react';

interface Episode {
    id: string;
    title: string;
    description: string;
    mixcloudUrl: string;
    publishedAt: string;
    duration?: string;
    featured?: boolean;
}

export default function PodcastAdminPage() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        mixcloudUrl: '',
        publishedAt: new Date().toISOString().split('T')[0],
        duration: '',
        featured: false
    });

    useEffect(() => {
        fetchEpisodes();
    }, []);

    const fetchEpisodes = async () => {
        try {
            const res = await fetch('/api/admin/podcast');
            const data = await res.json();
            setEpisodes(data.episodes || []);
        } catch (error) {
            console.error('Error fetching episodes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (editingEpisode) {
                await fetch('/api/admin/podcast', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingEpisode.id, ...formData })
                });
            } else {
                await fetch('/api/admin/podcast', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }
            
            resetForm();
            fetchEpisodes();
        } catch (error) {
            console.error('Error saving episode:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Sei sicuro di voler eliminare questo episodio?')) return;
        
        try {
            await fetch('/api/admin/podcast', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            fetchEpisodes();
        } catch (error) {
            console.error('Error deleting episode:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            mixcloudUrl: '',
            publishedAt: new Date().toISOString().split('T')[0],
            duration: '',
            featured: false
        });
        setEditingEpisode(null);
        setShowForm(false);
    };

    const startEdit = (episode: Episode) => {
        setFormData({
            title: episode.title,
            description: episode.description,
            mixcloudUrl: episode.mixcloudUrl,
            publishedAt: episode.publishedAt,
            duration: episode.duration || '',
            featured: episode.featured || false
        });
        setEditingEpisode(episode);
        setShowForm(true);
    };

    if (loading) {
        return <div className="text-center py-8">Caricamento...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Gestione Podcast</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    {showForm ? 'Annulla' : 'Nuovo Episodio'}
                </button>
            </div>

            {/* Episode Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingEpisode ? 'Modifica Episodio' : 'Nuovo Episodio'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Titolo</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">URL Mixcloud</label>
                            <input
                                type="url"
                                value={formData.mixcloudUrl}
                                onChange={(e) => setFormData({ ...formData, mixcloudUrl: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Data Pubblicazione</label>
                            <input
                                type="date"
                                value={formData.publishedAt}
                                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Durata (es. 25:30)</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="MM:SS"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Descrizione</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            />
                            <span className="text-sm">Episodio in evidenza</span>
                        </label>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            {editingEpisode ? 'Salva Modifiche' : 'Crea Episodio'}
                        </button>
                        <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                            Annulla
                        </button>
                    </div>
                </form>
            )}

            {/* Episodes List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Titolo</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Data</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Durata</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Azioni</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {episodes.map((episode) => (
                            <tr key={episode.id}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        {episode.featured && (
                                            <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">★</span>
                                        )}
                                        {episode.title}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">{episode.publishedAt}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{episode.duration || '-'}</td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => startEdit(episode)}
                                        className="text-blue-600 hover:underline mr-3"
                                    >
                                        Modifica
                                    </button>
                                    <button
                                        onClick={() => handleDelete(episode.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Elimina
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {episodes.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                    Nessun episodio. Clicca "Nuovo Episodio" per iniziare.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
```

---

## Phase 4: Articoli Page Improvements

### Proposed Changes

---

#### [MODIFY] `src/app/[locale]/articoli/page.tsx`

Update to dynamically render episodes from JSON:

- Fetch episodes from `podcast.json` using `getPodcastData()`
- Display featured episode prominently
- Show list of all episodes with title, date, and duration
- Add individual Mixcloud embeds for each episode
- Maintain existing i18n support

---

## Phase 5: Verification Plan

### Automated Tests
```bash
npm run build    # Ensure no build errors
npm run lint     # Check for linting issues
```

### Manual Verification
1. Navigate to `/admin/login` and verify passphrase flow
2. Test CRUD operations for podcast episodes
3. Verify changes appear on public `/articoli` page
4. Test logout functionality
5. Verify rate limiting works after 5 failed attempts

---

## File Summary

| Phase | File | Action |
|-------|------|--------|
| 1 | `.env.example` | Modify |
| 1 | `src/middleware.ts` | Modify |
| 1 | `src/app/api/admin/auth/route.ts` | New |
| 1 | `src/app/admin/login/page.tsx` | New |
| 2 | `content/podcast.json` | New (rename from blog.json) |
| 2 | `content/articles.json` | New |
| 2 | `src/lib/podcast.ts` | New |
| 2 | `src/app/api/admin/podcast/route.ts` | New |
| 3 | `src/app/admin/layout.tsx` | New |
| 3 | `src/app/admin/page.tsx` | New |
| 3 | `src/app/admin/podcast/page.tsx` | New |
| 4 | `src/app/[locale]/articoli/page.tsx` | Modify |

---

## Estimated Effort

| Phase | Description | Estimate |
|-------|-------------|----------|
| Phase 1 | Auth infrastructure | 1-2 hours |
| Phase 2 | Data layer & APIs | 1-2 hours |
| Phase 3 | Admin UI | 2-3 hours |
| Phase 4 | Articoli improvements | 1-2 hours |
| Phase 5 | Testing & polish | 1 hour |
| **Total** | | **6-10 hours** |
