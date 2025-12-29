"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const COOKIE_CONSENT_KEY = "cookie-consent";

type ConsentStatus = "pending" | "accepted" | "rejected";

export function CookieConsent() {
    const t = useTranslations("cookieConsent");
    const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (storedConsent) {
            setConsentStatus(storedConsent as ConsentStatus);
        } else {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
        setConsentStatus("accepted");
        setIsVisible(false);
        // Here you could enable analytics/tracking
    };

    const handleReject = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
        setConsentStatus("rejected");
        setIsVisible(false);
        // Here you would disable any non-essential cookies
    };

    // Don't render if consent already given or not visible
    if (consentStatus !== "pending" || !isVisible) {
        return null;
    }

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up"
            role="dialog"
            aria-label="Cookie consent"
            aria-describedby="cookie-consent-description"
        >
            <div className="container-custom max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Text Content */}
                        <div className="flex-1">
                            <h3 className="text-lg font-medium mb-2">
                                {t("title")}
                            </h3>
                            <p
                                id="cookie-consent-description"
                                className="text-[var(--color-text-secondary)] text-sm leading-relaxed"
                            >
                                {t("description")}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                            <button
                                onClick={handleReject}
                                className="px-6 py-2.5 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent-ring)]"
                                aria-label={t("rejectAriaLabel")}
                            >
                                {t("rejectButton")}
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2.5 text-sm font-medium rounded-lg bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent-ring)]"
                                aria-label={t("acceptAriaLabel")}
                            >
                                {t("acceptButton")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
