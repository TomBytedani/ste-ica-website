import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
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

export function generateMetadata(): Metadata {
    return {
        title: {
            default: "Stefano Icardi | Psicologo a Milano",
            template: "%s | Stefano Icardi Psicologo",
        },
        description:
            "Psicologo clinico a Milano. Supporto psicologico e percorsi individuali per adulti con approccio relazionale e personalizzato. Prenota un appuntamento.",
        keywords: [
            "psicologo",
            "Milano",
            "psicologo clinico",
            "supporto psicologico",
            "psicoterapia",
            "Stefano Icardi",
        ],
        authors: [{ name: "Stefano Icardi" }],
        creator: "Stefano Icardi",
        metadataBase: new URL("https://stefanoicardi.com"),
        openGraph: {
            title: "Stefano Icardi | Psicologo a Milano",
            description:
                "Supporto psicologico e percorsi individuali per adulti con approccio relazionale.",
            url: "https://stefanoicardi.com",
            siteName: "Stefano Icardi - Psicologo",
            locale: "it_IT",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Stefano Icardi | Psicologo a Milano",
            description:
                "Supporto psicologico e percorsi individuali per adulti con approccio relazionale.",
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

    return (
        <NextIntlClientProvider messages={messages}>
            <a href="#main-content" className="skip-to-content">
                Vai al contenuto principale
            </a>
            {children}
            <CookieConsent />
        </NextIntlClientProvider>
    );
}
