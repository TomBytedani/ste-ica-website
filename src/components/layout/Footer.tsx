"use client";

import Link from "next/link";
import { contactInfo, siteConfig } from "@/lib/constants";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useTranslations } from "next-intl";

export function Footer() {
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
                        <p className="mt-3 text-sm text-gray-300">
                            {contactInfo.professional.title}
                            <br />
                            {contactInfo.professional.subtitle}
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-medium mb-4">{t("contactTitle")}</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {contactInfo.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {contactInfo.phone}
                                </a>
                            </li>
                            <li className="pt-2">
                                {contactInfo.address.street}
                                <br />
                                {contactInfo.address.postalCode} {contactInfo.address.city}
                            </li>
                        </ul>
                    </div>

                    {/* Professional Info & Social */}
                    <div>
                        <h3 className="font-medium mb-4">{t("infoTitle")}</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            {contactInfo.professional.registration}
                        </p>
                        <p className="text-sm text-gray-300 mb-4">
                            P.IVA {contactInfo.professional.vatNumber}
                        </p>
                        <SocialLinks variant="light" />
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>
                        © {currentYear} {siteConfig.name}. {t("copyright")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
