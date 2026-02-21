import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { CookieConsent } from "@/components/ui/CookieConsent";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: {
            default: t('homepage.title'),
            template: t('homepage.titleTemplate'),
        },
        description: t('homepage.description'),
        keywords: t.raw('keywords') as string[],
        authors: [{ name: "Stefano Icardi" }],
        creator: "Stefano Icardi",
        metadataBase: new URL("https://stefanoicardi.com"),
        openGraph: {
            title: t('homepage.ogTitle'),
            description: t('homepage.ogDescription'),
            url: "https://stefanoicardi.com",
            siteName: t('siteName'),
            locale: locale === 'it' ? 'it_IT' : 'en_US',
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t('homepage.ogTitle'),
            description: t('homepage.ogDescription'),
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as typeof routing.locales[number])) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client side is the easiest way to get started
    const messages = await getMessages();
    const t = await getTranslations({ locale, namespace: 'accessibility' });

    return (
        <NextIntlClientProvider messages={messages}>
            <a href="#main-content" className="skip-to-content">
                {t('skipToContent')}
            </a>
            {children}
            <CookieConsent />
        </NextIntlClientProvider>
    );
}
