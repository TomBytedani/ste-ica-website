import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyPsychologist() {
    return (
        <section className="section">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="order-2 lg:order-1">
                        <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-brand-sage)]/20 to-[var(--color-brand-earth)]/20 rounded-2xl flex items-center justify-center text-gray-500">
                            <span className="text-sm">Immagine decorativa</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="order-1 lg:order-2">
                        <SectionHeading
                            title="Perché rivolgersi ad uno psicologo?"
                            align="left"
                        />
                        <div className="space-y-4 text-[var(--color-text-secondary)]">
                            <p>
                                Rivolgersi a uno psicologo può essere una scelta importante in
                                diversi momenti della vita. Lo psicologo offre uno spazio
                                protetto e non giudicante dove poter esplorare le proprie
                                emozioni, pensieri e comportamenti.
                            </p>
                            <p>
                                Un percorso psicologico può aiutarti a comprendere meglio te
                                stesso, a sviluppare nuove strategie per affrontare le
                                difficoltà e a migliorare la qualità delle tue relazioni.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
