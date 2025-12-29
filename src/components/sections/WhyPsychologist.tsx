import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyPsychologist() {
    return (
        <section className="section">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="order-2 lg:order-1">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/decorative/tree-nature.webp"
                                alt="Albero nella natura - simbolo di crescita e radicamento"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="order-1 lg:order-2">
                        <SectionHeading
                            title="Perché rivolgersi ad uno psicologo?"
                            align="left"
                        />
                        <div className="space-y-5 text-[var(--color-text-secondary)] text-lg leading-relaxed">
                            <p>
                                In una società dove tutto scorre velocemente, dove si fatica a trovare
                                il tempo per riflettere su quello che ci sta accadendo, si è sempre
                                più connessi, ma senza delle vere connessioni.
                            </p>
                            <p>
                                La figura dello psicologo può aiutare a creare uno spazio di
                                riflessione su di sé, un luogo protetto dove esplorare le proprie
                                emozioni, pensieri e comportamenti senza giudizio.
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
