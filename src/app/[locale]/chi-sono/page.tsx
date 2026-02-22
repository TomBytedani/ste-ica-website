import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from 'next-intl/server';
import { ServerAwareHeader } from "@/components/layout/ServerAwareHeader";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/lib/constants";
import { getSettings } from "@/lib/settings";

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.chiSono' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDescription'),
            images: ["/images/og/chi-sono.jpg"],
            locale: locale === 'it' ? 'it_IT' : 'en_US',
            type: "website",
        },
    };
}

export default async function ChiSonoPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'chiSono' });
    const settings = await getSettings();
    return (
        <>
            <ServerAwareHeader />
            <main id="main-content">
                {/* Hero Section — Gradient Banner */}
                <section className="relative h-[50vh] min-h-[400px] max-h-[600px] flex items-center justify-center overflow-hidden">
                    {/* Base gradient: deep warm brown → earth tone */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(150deg, #1a110c 0%, #2d2620 45%, #6b4c35 100%)' }}
                    />

                    {/* Terracotta radial glow — upper right */}
                    <div
                        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(224,122,95,0.45) 0%, transparent 65%)',
                            filter: 'blur(40px)',
                        }}
                    />

                    {/* Sage accent glow — lower left */}
                    <div
                        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(135,168,120,0.3) 0%, transparent 70%)',
                            filter: 'blur(48px)',
                        }}
                    />

                    {/* Soft central stage — lifts the text area */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(92,68,53,0.35) 0%, transparent 75%)' }}
                    />

                    {/* Subtle vignette edges */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(20,12,8,0.5) 100%)' }}
                    />

                    {/* Content */}
                    <div className="relative z-10 container-custom text-center">
                        {/* Decorative ornament */}
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="h-px w-10" style={{ background: 'rgba(224,122,95,0.65)' }} />
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(224,122,95,0.8)' }} />
                            <div className="h-px w-10" style={{ background: 'rgba(224,122,95,0.65)' }} />
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mb-5 tracking-wide" style={{ color: 'var(--color-accent-primary)' }}>
                            {t('hero.title')}
                        </h1>
                        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide" style={{ color: 'rgba(255,250,245,0.8)' }}>
                            {t('hero.subtitle')}
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="section">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            {/* Intro with Profile Image */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-16">
                                {/* Profile Image */}
                                <div className="w-full md:w-1/3 flex-shrink-0 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[var(--color-bg-accent)] rounded-[3rem_5rem_4rem_6rem] rotate-3 opacity-60 scale-105" />
                                    <div className="relative aspect-[3/4] rounded-[3rem_5rem_4rem_6rem] overflow-hidden shadow-lg rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                                        <Image
                                            src="/images/profile/stefano-icardi-profile.png"
                                            alt="Dott. Stefano Icardi - Psicologo"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Intro Text */}
                                <div className="flex-1">
                                    <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4 text-[var(--color-text-primary)]">
                                        {t('intro.name')}
                                    </h2>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="px-3 py-1 bg-[var(--color-bg-accent)] rounded-full text-sm text-[var(--color-text-secondary)]">
                                            {t('intro.badge1')}
                                        </span>
                                        <span className="px-3 py-1 bg-[var(--color-bg-accent)] rounded-full text-sm text-[var(--color-text-secondary)]">
                                            {t('intro.badge2')}
                                        </span>
                                    </div>
                                    <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                        {t('intro.description1')}
                                    </p>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                        {t('intro.description2')} (n. {contactInfo.professional.registration.match(/n\.\s*(\d+)/)?.[1]}).
                                    </p>
                                    <div className="flex gap-4">
                                        <Button href="/#contatti" variant="primary">
                                            {t('intro.contactButton')}
                                        </Button>
                                        <Button
                                            href={settings.cv.url}
                                            variant="secondary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            {t('intro.cvButton')}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Formazione Section */}
                            <div className="mb-16">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-[var(--color-accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-heading font-medium text-[var(--color-text-primary)]">
                                        {t('formazione.title')}
                                    </h2>
                                </div>
                                <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-bg-accent)] rounded-3xl p-6 md:p-8">
                                    <ul className="space-y-4">
                                        <li className="flex gap-4">
                                            <div className="w-2 h-2 mt-2 bg-[var(--color-brand-sage)] rounded-full flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-[var(--color-text-primary)]">
                                                    {t('formazione.degree')}
                                                </p>
                                                <p className="text-[var(--color-text-secondary)]">
                                                    {t('formazione.university')}
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-2 h-2 mt-2 bg-[var(--color-brand-sage)] rounded-full flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-[var(--color-text-primary)]">
                                                    {t('formazione.specialization')}
                                                </p>
                                                <p className="text-[var(--color-text-secondary)]">
                                                    {t('formazione.school')}
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-2 h-2 mt-2 bg-[var(--color-brand-sage)] rounded-full flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-[var(--color-text-primary)]">
                                                    {t('formazione.registration')}
                                                </p>
                                                <p className="text-[var(--color-text-secondary)]">
                                                    {t('formazione.registrationNumber')}
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Area Formativa Section */}
                            <div className="mb-16">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-[var(--color-accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-heading font-medium text-[var(--color-text-primary)]">
                                        {t('areaFormativa.title')}
                                    </h2>
                                </div>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                        {t('areaFormativa.description1')}
                                    </p>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                        {t('areaFormativa.description2')}
                                    </p>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                        {t('areaFormativa.description3')}
                                    </p>
                                </div>
                            </div>

                            {/* Attività Lavorative Section */}
                            <div className="mb-16">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-[var(--color-accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-heading font-medium text-[var(--color-text-primary)]">
                                        {t('attivita.title')}
                                    </h2>
                                </div>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                        {t('attivita.description1')}
                                    </p>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                        {t('attivita.description2')}
                                    </p>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                        {t('attivita.description3')}
                                    </p>
                                </div>
                            </div>

                            {/* Studio Section */}
                            <div className="bg-gradient-to-r from-[var(--color-bg-accent)] to-[var(--color-bg-secondary)] rounded-3xl p-8 text-center border border-white/50 shadow-sm">
                                <h3 className="text-xl font-heading font-medium mb-4 text-[var(--color-text-primary)]">
                                    {t('studio.title')}
                                </h3>
                                <p className="text-[var(--color-text-secondary)] mb-2">
                                    {settings.studio.street}
                                </p>
                                <p className="text-[var(--color-text-secondary)] mb-6">
                                    {settings.studio.postalCode} {settings.studio.city}, {settings.studio.province}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button href="/#contatti" variant="primary">
                                        {t('studio.bookButton')}
                                    </Button>
                                    <Button
                                        href={settings.studio.googleMapsUrl}
                                        variant="secondary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 11111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {t('studio.mapsButton')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
