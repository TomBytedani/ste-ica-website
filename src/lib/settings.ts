import { unstable_noStore as noStore } from 'next/cache';
import { readContent, writeContent } from './content-store';

export interface CVSettings {
    url: string;
    isCustom: boolean;
}

export interface StudioSettings {
    street: string;
    city: string;
    postalCode: string;
    province: string;
    googleMapsUrl: string;
    coordinates: { lat: number; lng: number };
}

export interface ContactSettings {
    phone: string;
    email: string;
}

export interface SiteSettings {
    cv: CVSettings;
    studio: StudioSettings;
    contact: ContactSettings;
}

const DEFAULT_SETTINGS: SiteSettings = {
    cv: {
        url: 'https://www.opl.it/iscritti/cv/CV-22963.pdf',
        isCustom: false,
    },
    studio: {
        street: 'Viale Luigi Majno, 38',
        city: 'Milano',
        postalCode: '20129',
        province: 'MI',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=45.4733096,9.2056856',
        coordinates: { lat: 45.4733096, lng: 9.2056856 },
    },
    contact: {
        phone: '+39 334 1397960',
        email: 'stefano.icardi@outlook.com',
    },
};

export async function getSettings(): Promise<SiteSettings> {
    noStore();
    try {
        const content = await readContent('settings.json');
        if (!content) return DEFAULT_SETTINGS;
        const parsed = JSON.parse(content);
        // Deep merge with defaults to handle missing keys
        return {
            cv: { ...DEFAULT_SETTINGS.cv, ...parsed.cv },
            studio: {
                ...DEFAULT_SETTINGS.studio,
                ...parsed.studio,
                coordinates: {
                    ...DEFAULT_SETTINGS.studio.coordinates,
                    ...parsed.studio?.coordinates,
                },
            },
            contact: { ...DEFAULT_SETTINGS.contact, ...parsed.contact },
        };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
    await writeContent('settings.json', JSON.stringify(settings, null, 4));
}
