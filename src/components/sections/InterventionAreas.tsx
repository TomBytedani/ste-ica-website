import { SectionHeading } from "@/components/ui/SectionHeading";

const areas = [
    "Problematiche relazionali",
    "Gestione delle emozioni",
    "Consapevolezza e autostima",
    "Stress correlato al lavoro",
    "Stati d'ansia",
    "Stati depressivi",
    "Difficoltà nell'apprendimento",
    "Insicurezze e blocchi nei cambiamenti di vita",
    "Problematiche afferenti alle dipendenze",
];

export function InterventionAreas() {
    return (
        <section className="section bg-[var(--color-bg-secondary)]">
            <div className="container-custom">
                <SectionHeading
                    title="Aree di intervento"
                    subtitle="Ambiti in cui posso offrirti supporto"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {areas.map((area) => (
                        <div
                            key={area}
                            className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                        >
                            <p className="font-medium text-[var(--color-text-primary)]">
                                {area}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
