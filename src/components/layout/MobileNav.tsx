"use client";

import Link from "next/link";
import { navigation } from "@/lib/constants";
import { useEffect } from "react";

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
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
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
