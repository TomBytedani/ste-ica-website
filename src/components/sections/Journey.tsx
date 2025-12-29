import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Journey() {
    return (
        <section className="section">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div>
                        <SectionHeading title="Il percorso psicologico" align="left" />
                        <div className="space-y-5 text-[var(--color-text-secondary)] text-lg leading-relaxed">
                            <p>
                                Il percorso psicologico è incentrato sul singolo con la finalità
                                di supportarlo nella rielaborazione di momenti critici della vita
                                che gli creano disagio, e che si sente di non riuscire a gestire
                                in autonomia.
                            </p>
                            <p>
                                Nel percorso ci si sofferma sul soggetto e su come affronta
                                situazioni diverse (relazioni, lavoro e vita quotidiana), con
                                particolare attenzione alle dinamiche relazionali, andando a
                                valorizzare e potenziare le risorse che già possiede.
                            </p>
                            <p>
                                Il mio approccio si basa sulla relazione terapeutica come strumento
                                principale di cambiamento, in un contesto di ascolto empatico e non
                                giudicante.
                            </p>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="hidden lg:block">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/decorative/walkway-pier.png"
                                alt="Pontile sul lago - simbolo del percorso interiore"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

