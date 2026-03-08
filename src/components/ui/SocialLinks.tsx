import { contactInfo } from "@/lib/constants";
import { useTranslations } from "next-intl";

interface SocialLinksProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function SocialLinks({
    size = "md",
    className = "",
}: SocialLinksProps) {
    const t = useTranslations("accessibility");
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
    };

    const iconSizes = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    const socialLinks = [
        {
            name: "LinkedIn",
            href: contactInfo.social.linkedin,
            icon: (
                <svg
                    className={iconSizes[size]}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
    ];

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {socialLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-[#0A66C2] hover:text-[#004182] transition-colors`}
                    aria-label={t("followLinkedIn")}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
}
