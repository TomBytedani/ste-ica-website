import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig, contactInfo } from "@/lib/constants";

export function Hero() {
    return (
        <section className="section relative overflow-hidden bg-[var(--color-bg-secondary)]">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-center lg:text-left order-2 lg:order-1">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-balance">
                            {siteConfig.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-2">
                            {contactInfo.professional.title}
                        </p>
                        <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                            {contactInfo.professional.subtitle}
                        </p>
                        <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
                            Mi occupo di supporto psicologico e percorsi psicologici individuali
                            rivolti ad adulti. Il mio approccio è di tipo relazionale, integrato
                            e personalizzato.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                            <Button href="#contatti" variant="primary" size="lg">
                                Scrivimi
                            </Button>
                            <Button href="/chi-sono" variant="secondary" size="lg">
                                Scopri di più
                            </Button>
                        </div>
                        {/* Trust Signal */}
                        <p className="text-sm text-[var(--color-text-muted)]">
                            Iscritto all&apos;Ordine degli Psicologi della Lombardia, Albo A (n. 22963)
                        </p>
                    </div>

                    {/* Profile Image */}
                    <div className="order-1 lg:order-2 flex justify-center">
                        <div className="relative aspect-[3/4] w-full max-w-sm lg:max-w-md rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/profile/stefano-icardi-profile.png"
                                alt="Dott. Stefano Icardi - Psicologo a Milano"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

