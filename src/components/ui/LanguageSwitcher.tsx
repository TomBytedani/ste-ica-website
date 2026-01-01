"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { useState, useTransition } from "react";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const handleLocaleChange = (newLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });
        setIsOpen(false);
    };

    const currentLanguage = locale.toUpperCase();
    const availableLanguages = locales.filter((l) => l !== locale);

    return (
        <div className="relative">
            {/* Current Language Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-lg hover:bg-gray-50"
                aria-label="Change language"
                disabled={isPending}
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                </svg>
                <span>{currentLanguage}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    {/* Backdrop for mobile */}
                    <div
                        className="fixed inset-0 z-10 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute left-0 md:left-auto md:right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                        {availableLanguages.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => handleLocaleChange(lang)}
                                className="w-full px-4 py-2 text-sm text-left text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-gray-50 transition-colors"
                                disabled={isPending}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
