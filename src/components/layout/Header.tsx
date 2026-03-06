"use client";

import { Link } from "@/i18n/navigation";
import { navigation, siteConfig } from "@/lib/constants";
import { useState } from "react";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "@/components/ui";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface HeaderProps {
    hasArticles?: boolean;
}

export function Header({ hasArticles = true }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const t = useTranslations("navigation");
    const pathname = usePathname();
    const isHomepage = pathname === "/" || /^\/[a-z]{2}\/?$/.test(pathname);
    const bookingHref = isHomepage ? "#prenota" : "/#prenota";

    const visibleNav = navigation.main.filter(
        (item) => !('conditional' in item && item.conditional) || hasArticles
    );

    // Map navigation keys to translation keys
    const getNavKey = (name: string) => {
        const keyMap: { [key: string]: string } = {
            "Home": "home",
            "Chi Sono": "about",
            "Podcast": "podcast",
            "Articoli": "articles",
            "Contatti": "contact"
        };
        return keyMap[name] || name.toLowerCase();
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="font-heading text-xl font-medium">
                        {siteConfig.name}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <nav className="flex items-center gap-8">
                            {visibleNav.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                                >
                                    {t(getNavKey(item.name))}
                                </Link>
                            ))}
                        </nav>
                        {/* Booking CTA */}
                        <a
                            href={bookingHref}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] rounded-full transition-colors shadow-sm hover:shadow-md"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {t("book")}
                        </a>
                        {/* Language Switcher */}
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 -mr-2"
                        aria-label="Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <MobileNav
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                hasArticles={hasArticles}
            />
        </header>
    );
}
