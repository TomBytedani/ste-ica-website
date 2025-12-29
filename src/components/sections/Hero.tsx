import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";

export function Hero() {
    return (
        <section className="section relative overflow-hidden bg-[var(--color-bg-secondary)]">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-balance">
                            {siteConfig.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-4">
                            Psicologo Clinico a Milano
                        </p>
                        <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-xl mx-auto lg:mx-0 text-pretty">
                            Supporto psicologico e percorsi individuali per adulti con
                            approccio relazionale e personalizzato
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button href="#contatti" variant="primary" size="lg">
                                Prenota un appuntamento
                            </Button>
                            <Button href="/chi-sono" variant="secondary" size="lg">
                                Scopri di più
                            </Button>
                        </div>
                    </div>

                    {/* Image Placeholder */}
                    <div className="hidden lg:block">
                        <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-xl flex items-center justify-center text-gray-500">
                            <span className="text-sm">Foto profilo</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
