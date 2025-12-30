"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/constants";

export function Hero() {
    const t = useTranslations("homepage.hero");

    return (
    return (
        <section className="section relative overflow-hidden bg-[var(--color-bg-secondary)] pb-20 pt-28 lg:pt-32">
            {/* Organic Background Blobs */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[var(--color-bg-accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-[var(--color-brand-sage)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob mutation-delay-2000" />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Text Content */}
                    <div className="text-center lg:text-left order-2 lg:order-1">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium mb-6 text-balance text-[var(--color-text-primary)] leading-tight">
                            {t("title")}
                        </h1>
                        <p className="text-2xl md:text-3xl font-heading text-[var(--color-text-secondary)] mb-2 italic">
                            {t("subtitle")}
                        </p>
                        <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                            {t("subtitleExtended")}
                        </p>
                        <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-xl mx-auto lg:mx-0 text-pretty leading-relaxed">
                            {t("description")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-8">
                            <Button href="#contatti" variant="primary" size="lg" className="shadow-lg hover:shadow-xl">
                                {t("ctaPrimary")}
                            </Button>
                            <Button href="/chi-sono" variant="secondary" size="lg">
                                {t("ctaSecondary")}
                            </Button>
                        </div>
                        {/* Trust Signal */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-primary)] rounded-full shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-[var(--color-brand-sage)]" />
                            <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                                {t("trustSignal")}
                            </p>
                        </div>
                    </div>

                    {/* Profile Image - Organic Shape */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
                        <div className="absolute inset-0 bg-[var(--color-accent-primary)] rounded-[3rem_5rem_4rem_6rem] rotate-6 opacity-10 scale-105" />
                        <div className="relative aspect-[3/4] w-full max-w-sm lg:max-w-md rounded-[3rem_5rem_4rem_6rem] overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ease-out">
                            <Image
                                src="/images/profile/stefano-icardi-profile.png"
                                alt={`${siteConfig.name} - Psicologo a Milano`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

