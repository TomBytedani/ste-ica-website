"use client";

import Link from "next/link";
import { navigation } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/ui";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const t = useTranslations('navigation');

    const navLabels: Record<string, string> = {
        'Home': t('home'),
        'Chi Sono': t('about'),
        'Articoli': t('articles'),
        'Contatti': t('contact'),
    };

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
                    {navigation.main.map((item) => (
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
