import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const infoItems = [
    {
        title: "Dove ricevo",
        description: "Viale Luigi Majno, 38 - Milano",
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
    },
    {
        title: "Primo colloquio",
        description:
            "Il primo incontro serve a conoscerci e definire insieme gli obiettivi del percorso",
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
    },
    {
        title: "Durata e frequenza",
        description:
            "Ogni seduta dura circa 50 minuti con cadenza settimanale o quindicinale",
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {infoItems.map((item) => (
                        <Card
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
