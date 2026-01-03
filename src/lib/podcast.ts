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
