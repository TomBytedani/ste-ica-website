"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BookingWidget() {
    const t = useTranslations("homepage.booking");
    const locale = useLocale();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Clean up any previously injected widget content
        if (containerRef.current) {
            const iframes = containerRef.current.querySelectorAll("iframe");
            iframes.forEach((iframe) => iframe.remove());
        }

        // Remove old script so it re-runs on the fresh anchor
        const oldScript = document.getElementById("zl-widget-s");
        if (oldScript) oldScript.remove();

        const script = document.createElement("script");
        script.id = "zl-widget-s";
        script.src = "//platform.docplanner.com/js/widget.js";
        script.async = true;
        document.body.appendChild(script);
    }, [locale]);

    return (
        <section id="prenota" className="section">
            <div className="container-custom">
                <SectionHeading
                    title={t("title")}
                    subtitle={t("subtitle")}
                />

                {/* Widget container */}
                <div className="max-w-3xl mx-auto mt-10">
                    <div ref={containerRef} className="bg-[var(--color-bg-secondary)] border border-[var(--color-bg-accent)] rounded-3xl p-6 md:p-10 shadow-sm">
                        <a
                            id="zl-url"
                            className="zl-url"
                            href="https://www.miodottore.it/stefano-icardi/psicologo/milano"
                            rel="nofollow"
                            data-zlw-doctor="stefano-icardi"
                            data-zlw-type="big_with_calendar"
                            data-zlw-opinion="false"
                            data-zlw-hide-branding="true"
                            data-zlw-saas-only="false"
                            data-zlw-a11y-title={t("widgetAriaTitle")}
                        >
                            {t("widgetFallbackText")}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
