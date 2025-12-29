import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Chi Sono | Stefano Icardi Psicologo",
    description:
        "Scopri la formazione e l'esperienza professionale del Dott. Stefano Icardi, psicologo clinico iscritto all'Ordine della Lombardia. Specializzando in Psicoterapia con approccio relazionale.",
    openGraph: {
        title: "Chi Sono | Stefano Icardi Psicologo",
        description:
            "Scopri la formazione e l'esperienza professionale del Dott. Stefano Icardi, psicologo clinico a Milano.",
        images: ["/images/og/chi-sono.jpg"],
        locale: "it_IT",
        type: "website",
    },
};

export default function ChiSonoPage() {
    return (
        <>
            <Header />
            <main id="main-content">
                {/* Hero Section with Background Image */}
                <section className="relative h-[50vh] min-h-[400px] max-h-[600px] flex items-center justify-center overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src="/images/heroes/chi-sono-forest-path.png"
                            alt="Sentiero nel bosco"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 container-custom text-center text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 drop-shadow-lg">
                            Chi Sono
                        </h1>
                        <p className="text-xl md:text-2xl font-light drop-shadow-md max-w-2xl mx-auto">
                            {contactInfo.professional.title} · {contactInfo.professional.subtitle}
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
                                <div className="w-full md:w-1/3 flex-shrink-0">
                                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
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
                                    <h2 className="text-2xl md:text-3xl font-medium mb-4 text-[var(--color-text-primary)]">
                                        Dott. Stefano Icardi
                                    </h2>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="px-3 py-1 bg-[var(--color-bg-accent)] rounded-full text-sm text-[var(--color-text-secondary)]">
                                            Psicologo Clinico
                                        </span>
                                        <span className="px-3 py-1 bg-[var(--color-bg-accent)] rounded-full text-sm text-[var(--color-text-secondary)]">
                                            Specializzando Psicoterapeuta
                                        </span>
                                    </div>
                                    <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                        Mi occupo di supporto psicologico e percorsi psicologici individuali rivolti ad adulti.
                                        Il mio approccio è di tipo relazionale, integrato e personalizzato.
                                    </p>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                        Sono iscritto all&apos;Ordine degli Psicologi della Lombardia, Albo A
                                        (iscrizione n. {contactInfo.professional.registration.match(/n\.\s*(\d+)/)?.[1]}).
                                    </p>
                                    <div className="flex gap-4">
                                        <Button href="/#contatti" variant="primary">
                                            Contattami
                                        </Button>
                                        <Button
                                            href="https://www.opl.it/iscritti/cv/CV-22963.pdf"
                                            variant="outline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Scarica CV
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
                                    <h2 className="text-2xl md:text-3xl font-medium text-[var(--color-text-primary)]">
                                        Formazione
                                    </h2>
                                </div>
                                <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 md:p-8">
                                    <ul className="space-y-4">
                                        <li className="flex gap-4">
                                            <div className="w-2 h-2 mt-2 bg-[var(--color-brand-sage)] rounded-full flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-[var(--color-text-primary)]">
                                                    Laurea Magistrale in Psicologia Clinica
                                                </p>
                                                <p className="text-[var(--color-text-secondary)]">
                                                    Università degli Studi di Milano-Bicocca
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-2 h-2 mt-2 bg-[var(--color-brand-sage)] rounded-full flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-[var(--color-text-primary)]">
                                                    Specializzando in Psicoterapia
                                                </p>
                                                <p className="text-[var(--color-text-secondary)]">
                                                    Scuola di Specializzazione in Psicoterapia
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-2 h-2 mt-2 bg-[var(--color-brand-sage)] rounded-full flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-[var(--color-text-primary)]">
                                                    Iscrizione Albo A - Ordine degli Psicologi della Lombardia
                                                </p>
                                                <p className="text-[var(--color-text-secondary)]">
                                                    N. 22963
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Attività Section */}
                            <div className="mb-16">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-[var(--color-accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-medium text-[var(--color-text-primary)]">
                                        Attività
                                    </h2>
                                </div>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                        Svolgo attività di supporto psicologico e percorsi individuali per adulti,
                                        con particolare attenzione alle dinamiche relazionali e alla crescita personale.
                                    </p>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                        Il percorso psicologico è incentrato sul singolo con la finalità di supportarlo
                                        nella rielaborazione di momenti critici della vita che gli creano disagio,
                                        e che si sente di non riuscire a gestire in autonomia.
                                    </p>
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                        Nel percorso ci si sofferma sul soggetto e su come affronta situazioni diverse
                                        (relazioni, lavoro e vita quotidiana), con particolare attenzione alle dinamiche
                                        relazionali, andando a valorizzare e potenziare le risorse che già possiede.
                                    </p>
                                </div>
                            </div>

                            {/* Studio Section */}
                            <div className="bg-gradient-to-r from-[var(--color-bg-accent)] to-[var(--color-bg-secondary)] rounded-xl p-8 text-center">
                                <h3 className="text-xl font-medium mb-4 text-[var(--color-text-primary)]">
                                    Lo Studio
                                </h3>
                                <p className="text-[var(--color-text-secondary)] mb-2">
                                    {contactInfo.address.street}
                                </p>
                                <p className="text-[var(--color-text-secondary)] mb-6">
                                    {contactInfo.address.postalCode} {contactInfo.address.city}, {contactInfo.address.province}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button href="/#contatti" variant="primary">
                                        Prenota un appuntamento
                                    </Button>
                                    <Button
                                        href={contactInfo.address.googleMapsUrl}
                                        variant="outline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Visualizza su Maps
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
