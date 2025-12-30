import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from 'next-intl/server';
import { useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.articoli' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: ["/images/podcast-cover.jpg"],
            locale: locale === 'it' ? 'it_IT' : 'en_US',
            type: "website",
        },
    };
}

export default function ArticoliPage() {
    const t = useTranslations('articoli');
    return (
        <>
            <Header />
            <main id="main-content" className="min-h-screen">
                {/* Hero Section */}
                <section className="section bg-[var(--color-bg-secondary)]">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Podcast Cover */}
                            <div className="flex justify-center relative">
                                <div className="absolute inset-0 bg-[var(--color-accent-primary)] rounded-[2rem_4rem_2rem_4rem] rotate-3 opacity-10 scale-105" />
                                <div className="relative w-full max-w-sm aspect-square rounded-[2rem_4rem_2rem_4rem] overflow-hidden shadow-lg rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
                                    <Image
                                        src="/images/podcast-cover.jpg"
                                        alt="Podcast di Stefano Icardi"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Hero Text */}
                            <div className="text-center lg:text-left">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mb-6 text-[var(--color-text-primary)]">
                                    {t('hero.title')}
                                </h1>
                                <p className="text-xl md:text-2xl font-heading text-[var(--color-text-secondary)] mb-6 italic">
                                    {t('hero.subtitle')}
                                </p>
                                <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                    {t('hero.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Podcast Embed Section */}
                <section className="section">
                    <div className="container-custom max-w-4xl">
                        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-[var(--color-bg-accent)]">
                            {/* Mixcloud Embed - Palombari 23 Psicologia */}
                            <div className="w-full">
                                <iframe
                                    src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2FPalombari%2Fpalombari-23-psicologia%2F"
                                    width="100%"
                                    height="120"
                                    frameBorder="0"
                                    title="Palombari 23 - Psicologia - Podcast con Stefano Icardi"
                                    className="w-full"
                                    allow="autoplay"
                                />
                            </div>
                        </div>

                        {/* Subscribe Section */}
                        <div className="mt-12 text-center">
                            <h2 className="text-2xl font-heading font-medium mb-6 text-[var(--color-text-primary)]">{t('subscribe.title')}</h2>
                            <p className="text-[var(--color-text-secondary)] mb-8">
                                {t('subscribe.description')}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="https://www.mixcloud.com/Palombari/palombari-23-psicologia/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-primary)] text-white rounded-2xl hover:bg-[var(--color-accent-hover)] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                                    </svg>
                                    {t('subscribe.mixcloudButton')}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

