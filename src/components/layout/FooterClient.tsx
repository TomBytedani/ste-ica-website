"use client";

import { Link } from "@/i18n/navigation";
import { siteConfig, contactInfo } from "@/lib/constants";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useTranslations } from "next-intl";
import type { ContactSettings, StudioSettings } from "@/lib/settings";

interface FooterClientProps {
    contact: Pick<ContactSettings, "phone" | "email">;
    studio: Pick<StudioSettings, "street" | "postalCode" | "city">;
}

export function FooterClient({ contact, studio }: FooterClientProps) {
    const currentYear = new Date().getFullYear();
    const t = useTranslations("footer");

    return (
        <footer className="bg-[var(--color-accent-primary)] text-white">
            <div className="container-custom py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="font-heading text-xl font-medium">
                            {siteConfig.name}
                        </Link>
                        <p className="mt-3 text-sm text-white/80">
                            {t("professionalTitle")}
                            <br />
                            {t("professionalSubtitle")}
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-medium mb-4">{t("contactTitle")}</h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {contact.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {contact.phone}
                                </a>
                            </li>
                            <li className="pt-2">
                                {studio.street}
                                <br />
                                {studio.postalCode} {studio.city}
                            </li>
                        </ul>
                    </div>

                    {/* Professional Info & Social */}
                    <div>
                        <h3 className="font-medium mb-4">{t("infoTitle")}</h3>
                        <p className="text-sm text-white/80 mb-4">
                            {contactInfo.professional.registration}
                        </p>
                        <p className="text-sm text-white/80 mb-4">
                            P.IVA {contactInfo.professional.vatNumber}
                        </p>
                        <SocialLinks />
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
                    <p>
                        © {currentYear} {siteConfig.name}. {t("copyright")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
