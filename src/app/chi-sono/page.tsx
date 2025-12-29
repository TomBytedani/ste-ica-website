import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Chi Sono",
    description:
        "Scopri la formazione e l'esperienza professionale del Dott. Stefano Icardi, psicologo clinico iscritto all'Ordine della Lombardia.",
};

export default function ChiSonoPage() {
    return (
        <>
            <Header />
            <main id="main-content" className="min-h-screen">
                {/* Hero Section */}
                <section className="section bg-[var(--color-bg-secondary)]">
                    <div className="container-custom">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
                            Chi Sono
                        </h1>
                        <p className="text-xl md:text-2xl text-center text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                            Psicologo clinico a Milano
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="section">
                    <div className="container-custom max-w-3xl">
                        <div className="prose prose-lg">
                            <h2 className="text-3xl font-medium mb-6">Formazione</h2>
                            <p className="text-[var(--color-text-secondary)] mb-8">
                                Pagina in costruzione. I contenuti saranno aggiunti a breve.
                            </p>

                            <h2 className="text-3xl font-medium mb-6">Attività</h2>
                            <p className="text-[var(--color-text-secondary)]">
                                Pagina in costruzione. I contenuti saranno aggiunti a breve.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
