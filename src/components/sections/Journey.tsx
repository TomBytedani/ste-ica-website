import { SectionHeading } from "@/components/ui/SectionHeading";

export function Journey() {
    return (
        <section className="section">
            <div className="container-custom max-w-4xl">
                <SectionHeading title="Il percorso psicologico" />
                <div className="prose prose-lg mx-auto text-center">
                    <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                        Un percorso psicologico è un&apos;esperienza di crescita personale
                        che permette di sviluppare una maggiore consapevolezza di sé e delle
                        proprie dinamiche relazionali. Attraverso il dialogo e la
                        riflessione condivisa, si lavora insieme per comprendere le origini
                        delle difficoltà attuali e trovare nuove modalità per affrontarle.
                    </p>
                    <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mt-6">
                        Il mio approccio si basa sulla relazione terapeutica come strumento
                        principale di cambiamento, in un contesto di ascolto empatico e non
                        giudicante.
                    </p>
                </div>
            </div>
        </section>
    );
}
