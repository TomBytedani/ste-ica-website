import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import { ServerAwareHeader } from "@/components/layout/ServerAwareHeader";
import { Footer } from "@/components/layout/Footer";
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
            locale: locale === 'it' ? 'it_IT' : 'en_US',
            type: "website",
        },
    };
}

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

    let articles: Article[] = [];
    try {
        const articlesData = await getArticlesData();
        articles = articlesData.articles.filter(article => article.published);
    } catch (error) {
        console.error('Error fetching articles data:', error);
    }

    return (
        <>
            <ServerAwareHeader />
            <main id="main-content" className="min-h-screen">
                {articles.length > 0 ? (
                    <>
                        {/* Articles Hero */}
                        <section className="section bg-[var(--color-bg-primary)]">
                            <div className="container-custom">
                                <div className="max-w-3xl mx-auto text-center">
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
                                </div>
                            </div>
                        </section>

                        {/* Articles Grid */}
                        <section className="section bg-[var(--color-bg-secondary)]">
                            <div className="container-custom">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {articles.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={`/${locale}/articoli/${article.slug}`}
                                            className="group"
                                        >
                                            <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[var(--color-bg-accent)] transition-all group-hover:shadow-lg group-hover:-translate-y-1 h-full">
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
                                                <div className="p-6">
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
                                                    <h3 className="text-xl font-heading font-medium text-[var(--color-text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                                                        {article.title[locale as 'it' | 'en'] || article.title.it}
                                                    </h3>
                                                    <p className="text-sm text-[var(--color-text-muted)] mb-3">
                                                        {formatDate(article.publishedAt, locale)}
                                                    </p>
                                                    <p className="text-[var(--color-text-secondary)] line-clamp-3">
                                                        {article.excerpt[locale as 'it' | 'en'] || article.excerpt.it}
                                                    </p>
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
                    </>
                ) : (
                    /* Empty state */
                    <section className="section bg-[var(--color-bg-primary)] flex items-center">
                        <div className="container-custom">
                            <div className="max-w-lg mx-auto text-center py-16">
                                <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-3xl bg-[var(--color-bg-accent)]">
                                    <svg className="w-10 h-10 text-[var(--color-accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-heading font-medium mb-4 text-[var(--color-text-primary)]">
                                    {t('emptyTitle')}
                                </h1>
                                <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                                    {t('emptyDescription')}
                                </p>
                                <Link
                                    href={`/${locale}/podcast`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-primary)] text-white rounded-2xl hover:bg-[var(--color-accent-hover)] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                                    </svg>
                                    {t('podcastLink')}
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
