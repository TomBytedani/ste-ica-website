"use client";

import { Link } from "@/i18n/navigation";
import { navigation } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
    hasArticles?: boolean;
}

export function MobileNav({ isOpen, onClose, hasArticles = true }: MobileNavProps) {
    const t = useTranslations('navigation');
    const pathname = usePathname();
    const isHomepage = pathname === "/" || /^\/[a-z]{2}\/?$/.test(pathname);
    const bookingHref = isHomepage ? "#prenota" : "/#prenota";

    const navLabels: Record<string, string> = {
        'Home': t('home'),
        'Chi Sono': t('about'),
        'Podcast': t('podcast'),
        'Articoli': t('articles'),
        'Contatti': t('contact'),
    };

    const visibleNav = navigation.main.filter(
        (item) => !('conditional' in item && item.conditional) || hasArticles
    );

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 z-40 md:hidden"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Menu */}
            <nav
                className="fixed top-16 left-0 right-0 bg-white border-b border-gray-100 z-40 md:hidden"
                role="navigation"
                aria-label="Menu principale"
            >
                <ul className="container-custom py-4 space-y-2">
                    {visibleNav.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                onClick={onClose}
                                className="block py-3 text-lg font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent-hover)] transition-colors"
                            >
                                {navLabels[item.name] || item.name}
                            </Link>
                        </li>
                    ))}
                    {/* Booking CTA */}
                    <li className="pt-2 border-t border-gray-100">
                        <a
                            href={bookingHref}
                            onClick={onClose}
                            className="flex items-center gap-2 py-3 text-lg font-medium text-white bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] rounded-xl px-4 transition-colors text-center justify-center"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {t('book')}
                        </a>
                    </li>
                    {/* Language Switcher in Mobile Menu */}
                    <li className="pt-2 border-t border-gray-100">
                        <div className="py-2">
                            <LanguageSwitcher />
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}
