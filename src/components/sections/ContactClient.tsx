"use client";

import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { GoogleMap } from "@/components/shared/GoogleMap";
import type { ContactSettings, StudioSettings } from "@/lib/settings";

interface ContactClientProps {
    contact: Pick<ContactSettings, "phone" | "email">;
    studio: Pick<StudioSettings, "street" | "postalCode" | "city" | "googleMapsUrl" | "coordinates">;
}

export function ContactClient({ contact, studio }: ContactClientProps) {
    const t = useTranslations("contact");

    return (
        <section id="contatti" className="section bg-[var(--color-bg-secondary)]">
            <div className="container-custom">
                <SectionHeading
                    title={t("title")}
                    subtitle={t("subtitle")}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div id="form-contatti" className="bg-[var(--color-bg-primary)] border border-[var(--color-bg-accent)] rounded-3xl p-6 md:p-8 shadow-sm order-2 lg:order-1">
                        <h3 className="text-xl font-heading font-medium mb-6">{t("formTitle")}</h3>
                        <ContactForm />
                    </div>

                    {/* Contact Info & Map */}
                    <div className="space-y-6 order-1 lg:order-2">
                        {/* Contact Details */}
                        <div className="bg-[var(--color-bg-primary)] border border-[var(--color-bg-accent)] rounded-3xl p-6 md:p-8 shadow-sm">
                            <h3 className="text-xl font-heading font-medium mb-6">{t("infoTitle")}</h3>
                            <ul className="space-y-5">
                                {/* Address */}
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-5 h-5 text-[var(--color-accent-primary)]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--color-text-primary)]">{t("addressLabel")}</p>
                                        <p className="text-[var(--color-text-secondary)]">
                                            {studio.street}
                                            <br />
                                            {studio.postalCode} {studio.city}
                                        </p>
                                        <a
                                            href={studio.googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-[var(--color-accent-primary)] hover:underline mt-1 inline-flex items-center gap-1"
                                        >
                                            {t("openInMaps")}
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </li>

                                {/* Email */}
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-5 h-5 text-[var(--color-accent-primary)]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--color-text-primary)]">{t("emailLabel")}</p>
                                        <a
                                            href={`mailto:${contact.email}`}
                                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                                        >
                                            {contact.email}
                                        </a>
                                    </div>
                                </li>

                                {/* Phone */}
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[var(--color-bg-accent)] rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-5 h-5 text-[var(--color-accent-primary)]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--color-text-primary)]">{t("phoneLabel")}</p>
                                        <a
                                            href={`tel:${contact.phone.replace(/\s/g, "")}`}
                                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
                                        >
                                            {contact.phone}
                                        </a>
                                    </div>
                                </li>
                            </ul>

                            {/* Scroll to Form - Mobile Only */}
                            <div className="mt-6 pt-6 border-t border-[var(--color-bg-accent)] lg:hidden">
                                <a
                                    href="#form-contatti"
                                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[var(--color-accent-primary)] hover:opacity-90 text-white font-medium rounded-2xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                >
                                    {t("scrollToForm")}
                                </a>
                            </div>

                            {/* Social Links */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-sm text-[var(--color-text-muted)] mb-3">{t("followSocial")}</p>
                                <SocialLinks size="md" />
                            </div>
                        </div>

                        {/* Map */}
                        <GoogleMap coordinates={studio.coordinates} />
                    </div>
                </div>
            </div>
        </section>
    );
}
