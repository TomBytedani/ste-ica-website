import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // List of all supported locales
    locales: ['it', 'en'],

    // Default locale - Italian
    defaultLocale: 'it',

    // Locale prefix strategy: always show the locale in the URL
    localePrefix: 'always',
});

// Export useful constants for use in other parts of the app
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
export type Locale = (typeof locales)[number];
