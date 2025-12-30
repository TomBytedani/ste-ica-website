"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PracticalInfo() {
    const t = useTranslations("homepage.practicalInfo");

    const infoItems = [
        {
            titleKey: "whenToSeek.title" as const,
            descriptionKey: "whenToSeek.description" as const,
            details: [
                t("whenToSeek.detail1"),
                t("whenToSeek.detail2"),
                t("whenToSeek.detail3"),
            ],
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
            titleKey: "duration.title" as const,
            descriptionKey: "duration.description" as const,
            details: [
                t("duration.detail1"),
                t("duration.detail2"),
                t("duration.detail3"),
            ],
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
            titleKey: "frequency.title" as const,
            descriptionKey: "frequency.description" as const,
            details: [
                t("frequency.detail1"),
                t("frequency.detail2"),
                t("frequency.detail3"),
            ],
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

    return (
        <section className="section bg-[var(--color-bg-secondary)]">
            <div className="container-custom">
                <SectionHeading
                    title={t("title")}
                    subtitle={t("subtitle")}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {infoItems.map((item) => (
                        <div
                            key={item.titleKey}
                            className="group bg-[var(--color-bg-primary)] border border-[var(--color-bg-accent)] rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center text-[var(--color-accent-primary)] mb-5 group-hover:bg-[var(--color-accent-primary)] group-hover:text-white transition-colors duration-300">
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-3">
                                {t(item.titleKey)}
                            </h3>

                            {/* Description */}
                            <p className="text-[var(--color-text-secondary)] mb-5 leading-relaxed">
                                {t(item.descriptionKey)}
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
