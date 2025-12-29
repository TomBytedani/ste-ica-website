import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Podcast | Stefano Icardi Psicologo",
    description:
        "Ascolta il podcast di Stefano Icardi con riflessioni e approfondimenti su psicologia, relazioni e benessere mentale.",
    openGraph: {
        title: "Podcast | Stefano Icardi Psicologo",
        description:
            "Riflessioni e approfondimenti su psicologia, relazioni e benessere mentale.",
        images: ["/images/podcast-cover.jpg"],
        locale: "it_IT",
        type: "website",
    },
};

export default function ArticoliPage() {
    return (
        <>
            <Header />
            <main id="main-content" className="min-h-screen">
                {/* Hero Section */}
                <section className="section bg-[var(--color-bg-secondary)]">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Podcast Cover */}
                            <div className="flex justify-center">
                                <div className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden shadow-lg">
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
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
                                    Podcast
                                </h1>
                                <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-6">
                                    Riflessioni e approfondimenti su psicologia e benessere mentale
                                </p>
                                <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto lg:mx-0">
                                    In questo podcast condivido pensieri e riflessioni sui temi della
                                    psicologia, delle relazioni e della crescita personale. Episodi
                                    brevi e accessibili per accompagnarti nella tua quotidianità.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Podcast Embed Section */}
                <section className="section">
                    <div className="container-custom max-w-4xl">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            {/* Spreaker Embed */}
                            <div className="w-full">
                                <iframe
                                    src="https://widget.spreaker.com/player?show_id=5391022&theme=light&playlist=show&playlist-continuous=true&chapters-image=true"
                                    width="100%"
                                    height="400"
                                    frameBorder="0"
                                    title="Podcast di Stefano Icardi"
                                    className="w-full"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                />
                            </div>
                        </div>

                        {/* Subscribe Section */}
                        <div className="mt-12 text-center">
                            <h2 className="text-2xl font-medium mb-6">Ascolta ovunque</h2>
                            <p className="text-[var(--color-text-secondary)] mb-8">
                                Segui il podcast sulla tua piattaforma preferita
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="https://www.spreaker.com/show/5391022"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-primary)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    Spreaker
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

