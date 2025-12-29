import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Podcast",
    description:
        "Ascolta il podcast di Stefano Icardi con riflessioni e approfondimenti su psicologia, relazioni e benessere mentale.",
};

export default function ArticoliPage() {
    return (
        <>
            <Header />
            <main id="main-content" className="min-h-screen">
                {/* Hero Section */}
                <section className="section bg-[var(--color-bg-secondary)]">
                    <div className="container-custom">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
                            Podcast
                        </h1>
                        <p className="text-xl md:text-2xl text-center text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                            Riflessioni e approfondimenti su psicologia e benessere mentale
                        </p>
                    </div>
                </section>

                {/* Podcast Embed Section */}
                <section className="section">
                    <div className="container-custom max-w-4xl">
                        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                            <h2 className="text-2xl font-medium mb-6 text-center">
                                Ascolta il podcast
                            </h2>
                            <p className="text-center text-[var(--color-text-secondary)]">
                                Questa sezione sarà presto disponibile con il player del podcast.
                            </p>
                            {/* Spreaker embed will go here */}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
