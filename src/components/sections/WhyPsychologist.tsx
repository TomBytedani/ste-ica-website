"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyPsychologist() {
    const t = useTranslations("homepage.whyPsychologist");

    return (
        <section className="section">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="order-2 lg:order-1 relative">
                        {/* Decorative Blob */}
                        <div className="absolute inset-0 bg-[var(--color-brand-sage)] rounded-[4rem_2rem_6rem_3rem] rotate-[-3deg] opacity-20 scale-105" />

                        <div className="relative aspect-[4/3] rounded-[4rem_2rem_6rem_3rem] overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
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
                            title={t("title")}
                            align="left"
                        />
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
                </div>
            </div>
        </section>
    );
}
