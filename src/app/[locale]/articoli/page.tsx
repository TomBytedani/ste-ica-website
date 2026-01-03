import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getPodcastData, Episode, PodcastData } from "@/lib/podcast";
import { getArticlesData, Article } from "@/lib/articles";

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

// Helper function to extract Mixcloud embed path from URL
function getMixcloudEmbedPath(url: string): string {
    try {
        const urlObj = new URL(url);
        // Remove the domain and return just the path
        return urlObj.pathname;
    } catch {
        // If it's already a path, return as is
        return url;
    }
}

// Helper function to format date for display
function formatDate(dateString: string, locale: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export default async function ArticoliPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'articoli' });

    // Fetch podcast data
    let podcastData: PodcastData | null = null;
    try {
        podcastData = await getPodcastData();
    } catch (error) {
        console.error('Error fetching podcast data:', error);
    }

    // Fetch articles data
    let articles: Article[] = [];
    try {
        const articlesData = await getArticlesData();
        // Only show published articles
        articles = articlesData.articles.filter(article => article.published);
    } catch (error) {
        console.error('Error fetching articles data:', error);
    }

    const episodes = podcastData?.episodes || [];
    const feedInfo = podcastData?.feedInfo;
    const subscribeLinks = podcastData?.subscribeLinks || [];

    // Find featured episode
    const featuredEpisode = episodes.find((ep: Episode) => ep.featured);
    // Get non-featured episodes for the list
    const otherEpisodes = episodes.filter((ep: Episode) => !ep.featured);

    return (
        <>
            <Header />
            <main id="main-content" className="min-h-screen">
                {/* Articles Hero Section - Only shown when there are articles */}
                {articles.length > 0 && (
                    <section className="section bg-[var(--color-bg-primary)]">
                        <div className="container-custom">
                            <div className="max-w-3xl mx-auto text-center">
                                {/* Decorative Icon */}
                                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-[var(--color-accent-primary)] text-white">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mb-6 text-[var(--color-text-primary)]">
                                    {locale === 'it' ? 'Articoli e Approfondimenti' : 'Articles & Insights'}
                                </h1>
                                <p className="text-xl md:text-2xl font-heading text-[var(--color-text-secondary)] mb-6 italic">
                                    {locale === 'it'
                                        ? 'Pensieri, riflessioni e strumenti pratici'
                                        : 'Thoughts, reflections and practical tools'}
                                </p>
                                <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
                                    {locale === 'it'
                                        ? 'Esplora approfondimenti su psicologia, benessere e crescita personale. Articoli pensati per accompagnarti nel tuo percorso di consapevolezza.'
                                        : 'Explore insights on psychology, well-being and personal growth. Articles designed to accompany you on your journey of awareness.'}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Written Articles Grid - Displayed when articles exist */}
                {articles.length > 0 && (
                    <section className="section bg-[var(--color-bg-secondary)]">
                        <div className="container-custom">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {articles.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={`/${locale}/articoli/${article.slug}`}
                                        className="group"
                                    >
                                        <article
                                            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[var(--color-bg-accent)] transition-all group-hover:shadow-lg group-hover:-translate-y-1 h-full"
                                        >
                                            {/* Cover Image */}
                                            {article.coverImage && (
                                                <div className="relative h-48 w-full overflow-hidden">
                                                    <Image
                                                        src={article.coverImage}
                                                        alt={article.title[locale as 'it' | 'en'] || article.title.it}
                                                        fill
                                                        className="object-cover transition-transform group-hover:scale-105"
                                                    />
                                                </div>
                                            )}

                                            {/* Article Content */}
                                            <div className="p-6">
                                                {/* Tags */}
                                                {article.tags && article.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {article.tags.slice(0, 3).map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="px-2 py-0.5 text-xs bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-full"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Title */}
                                                <h3 className="text-xl font-heading font-medium text-[var(--color-text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                                                    {article.title[locale as 'it' | 'en'] || article.title.it}
                                                </h3>

                                                {/* Date */}
                                                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                                                    {formatDate(article.publishedAt, locale)}
                                                </p>

                                                {/* Excerpt */}
                                                <p className="text-[var(--color-text-secondary)] line-clamp-3">
                                                    {article.excerpt[locale as 'it' | 'en'] || article.excerpt.it}
                                                </p>

                                                {/* Read More */}
                                                <span className="inline-flex items-center gap-1 mt-4 text-[var(--color-accent-primary)] font-medium text-sm group-hover:gap-2 transition-all">
                                                    {locale === 'it' ? 'Leggi di più' : 'Read more'}
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Podcast Hero Section */}
                <section className="section bg-[var(--color-bg-primary)]">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Podcast Cover */}
                            <div className="flex justify-center relative order-2 lg:order-1">
                                <div className="absolute inset-0 bg-[var(--color-accent-primary)] rounded-[2rem_4rem_2rem_4rem] rotate-3 opacity-10 scale-105" />
                                <div className="relative w-full max-w-sm aspect-square rounded-[2rem_4rem_2rem_4rem] overflow-hidden shadow-lg rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
                                    <Image
                                        src={feedInfo?.coverImage || "/images/podcast-cover.jpg"}
                                        alt={feedInfo?.title || "Podcast di Stefano Icardi"}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Hero Text */}
                            <div className="text-center lg:text-left order-1 lg:order-2">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mb-6 text-[var(--color-text-primary)]">
                                    {t('hero.title')}
                                </h2>
                                <p className="text-xl md:text-2xl font-heading text-[var(--color-text-secondary)] mb-6 italic">
                                    {t('hero.subtitle')}
                                </p>
                                <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                    {feedInfo?.description || t('hero.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Episode Section */}
                {featuredEpisode && (
                    <section className="section bg-[var(--color-bg-accent)]">
                        <div className="container-custom max-w-4xl">
                            <div className="text-center mb-8">
                                <span className="inline-block px-4 py-2 bg-[var(--color-accent-primary)] text-white text-sm font-medium rounded-full mb-4">
                                    ★ {locale === 'it' ? 'Episodio in Evidenza' : 'Featured Episode'}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-heading font-medium text-[var(--color-text-primary)]">
                                    {featuredEpisode.title}
                                </h2>
                                <p className="text-[var(--color-text-secondary)] mt-2">
                                    {formatDate(featuredEpisode.publishedAt, locale)}
                                    {featuredEpisode.duration && ` • ${featuredEpisode.duration}`}
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-[var(--color-bg-accent)]">
                                <iframe
                                    src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${encodeURIComponent(getMixcloudEmbedPath(featuredEpisode.mixcloudUrl))}`}
                                    width="100%"
                                    height="120"
                                    frameBorder="0"
                                    title={featuredEpisode.title}
                                    className="w-full"
                                    allow="autoplay"
                                />
                            </div>

                            {featuredEpisode.description && (
                                <p className="text-[var(--color-text-secondary)] mt-6 text-center max-w-2xl mx-auto">
                                    {featuredEpisode.description}
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {/* All Episodes Section */}
                <section className="section">
                    <div className="container-custom max-w-4xl">
                        <h2 className="text-2xl md:text-3xl font-heading font-medium mb-8 text-center text-[var(--color-text-primary)]">
                            {locale === 'it' ? 'Tutti gli Episodi' : 'All Episodes'}
                        </h2>

                        {episodes.length > 0 ? (
                            <div className="space-y-6">
                                {(otherEpisodes.length > 0 ? otherEpisodes : episodes).map((episode: Episode) => (
                                    <div
                                        key={episode.id}
                                        className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[var(--color-bg-accent)] transition-shadow hover:shadow-md"
                                    >
                                        {/* Episode Header */}
                                        <div className="p-6 pb-4">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                {episode.featured && (
                                                    <span className="px-2 py-0.5 text-xs bg-[var(--color-accent-primary)] text-white rounded-full">
                                                        ★ {locale === 'it' ? 'In Evidenza' : 'Featured'}
                                                    </span>
                                                )}
                                                {episode.tags?.map((tag: string) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 text-xs bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-heading font-medium text-[var(--color-text-primary)] mb-2">
                                                {episode.title}
                                            </h3>
                                            <p className="text-sm text-[var(--color-text-secondary)]">
                                                {formatDate(episode.publishedAt, locale)}
                                                {episode.duration && ` • ${episode.duration}`}
                                            </p>
                                            {episode.description && (
                                                <p className="text-[var(--color-text-secondary)] mt-3 line-clamp-2">
                                                    {episode.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Mixcloud Embed */}
                                        <div className="border-t border-[var(--color-bg-accent)]">
                                            <iframe
                                                src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${encodeURIComponent(getMixcloudEmbedPath(episode.mixcloudUrl))}`}
                                                width="100%"
                                                height="60"
                                                frameBorder="0"
                                                title={episode.title}
                                                className="w-full"
                                                allow="autoplay"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-[var(--color-text-secondary)]">
                                {locale === 'it'
                                    ? 'Nessun episodio disponibile al momento.'
                                    : 'No episodes available at the moment.'}
                            </div>
                        )}

                        {/* Subscribe Section */}
                        <div className="mt-12 text-center">
                            <h2 className="text-2xl font-heading font-medium mb-6 text-[var(--color-text-primary)]">{t('subscribe.title')}</h2>
                            <p className="text-[var(--color-text-secondary)] mb-8">
                                {t('subscribe.description')}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {subscribeLinks.length > 0 ? (
                                    subscribeLinks.map((link) => (
                                        <a
                                            key={link.platform}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-primary)] text-white rounded-2xl hover:bg-[var(--color-accent-hover)] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                                            </svg>
                                            {link.platform}
                                        </a>
                                    ))
                                ) : (
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
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
