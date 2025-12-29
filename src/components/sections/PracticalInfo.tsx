import { SectionHeading } from "@/components/ui/SectionHeading";

const infoItems = [
    {
        title: "Quando chiedere aiuto",
        description:
            "La sofferenza è una questione molto soggettiva. Quello che per noi può essere doloroso per altri potrebbe sembrare superficiale, ma questo non lo invalida. Essere consapevoli di ciò che si prova dentro di sé è il primo passo.",
        details: ["Riconoscere il disagio", "Accogliere le proprie emozioni", "Chiedere supporto senza giudizio"],
        icon: (
            <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        ),
    },
    {
        title: "Durata e svolgimento",
        description:
            "Ogni seduta dura circa 50 minuti. Il percorso si articola generalmente su un periodo che va da pochi mesi a un anno, in base agli obiettivi concordati insieme.",
        details: ["Sedute da 50 minuti", "In studio a Milano o online", "Durata personalizzata"],
        icon: (
            <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    },
    {
        title: "Frequenza delle sedute",
        description:
            "La frequenza è tipicamente settimanale o quindicinale. Viene concordata insieme sulla base delle esigenze personali e degli obiettivi del percorso.",
        details: ["Cadenza settimanale o quindicinale", "Flessibilità negli appuntamenti", "Co-costruzione del percorso"],
        icon: (
            <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
    },
];

export function PracticalInfo() {
    return (
        <section className="section bg-[var(--color-bg-secondary)]">
            <div className="container-custom">
                <SectionHeading
                    title="Informazioni pratiche"
                    subtitle="Tutto quello che devi sapere per iniziare un percorso"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {infoItems.map((item) => (
                        <div
                            key={item.title}
                            className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center text-[var(--color-accent-primary)] mb-5 group-hover:bg-[var(--color-accent-primary)] group-hover:text-white transition-colors duration-300">
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-3">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[var(--color-text-secondary)] mb-5 leading-relaxed">
                                {item.description}
                            </p>

                            {/* Details List */}
                            <ul className="space-y-2">
                                {item.details.map((detail, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                                    >
                                        <svg
                                            className="w-4 h-4 text-[var(--color-brand-sage)] flex-shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
