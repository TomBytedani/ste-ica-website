"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function InterventionAreas() {
    const t = useTranslations("homepage.interventionAreas");

    const areas = [
        t("area1"),
        t("area2"),
        t("area3"),
        t("area4"),
        t("area5"),
        t("area6"),
        t("area7"),
        t("area8"),
        t("area9"),
    ];

    return (
        <section className="section bg-[var(--color-bg-secondary)]">
            <div className="container-custom">
                <SectionHeading
                    title={t("title")}
                    subtitle={t("subtitle")}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {areas.map((area, index) => (
                        <div
                            key={index}
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
