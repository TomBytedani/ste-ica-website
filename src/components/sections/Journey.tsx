"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Journey() {
    const t = useTranslations("homepage.journey");

    return (
        <section className="section">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div>
                        <SectionHeading title={t("title")} align="left" />
                        <div className="space-y-5 text-[var(--color-text-secondary)] text-lg leading-relaxed">
                            <p>
                                {t("paragraph1")}
                            </p>
                            <p>
                                {t("paragraph2")}
                            </p>
                            <p>
                                {t("paragraph3")}
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
