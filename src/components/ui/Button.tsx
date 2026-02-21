import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/lib/types";

export function Button({
    variant = "primary",
    size = "md",
    type = "button",
    href,
    target,
    rel,
    onClick,
    disabled = false,
    loading = false,
    className,
    children,
}: ButtonProps) {
    const baseStyles =
        "btn inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:-translate-y-0.5 active:translate-y-0";

    const variantClasses = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        outline: "btn-outline",
        ghost: "btn-ghost",
    };

    const variants = {
        primary:
            "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-hover)] border-2 border-[var(--color-accent-primary)] hover:border-[var(--color-accent-hover)] shadow-sm hover:shadow-md",
        secondary:
            "bg-transparent text-[var(--color-accent-primary)] border-2 border-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-white",
        outline:
            "bg-transparent text-[var(--color-text-primary)] border-2 border-[var(--color-bg-accent)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]",
        ghost:
            "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm rounded-xl",
        md: "px-6 py-3 text-base rounded-2xl",
        lg: "px-8 py-4 text-lg rounded-3xl",
    };

    const classes = cn(baseStyles, variantClasses[variant], variants[variant], sizes[size], className);

    if (href) {
        // Use regular anchor for external links
        if (target === "_blank" || href.startsWith("http") || href.startsWith("//")) {
            return (
                <a
                    href={href}
                    target={target || "_blank"}
                    rel={rel || "noopener noreferrer"}
                    className={classes}
                >
                    {loading ? <LoadingSpinner /> : children}
                </a>
            );
        }
        // Use Next.js Link for internal navigation
        return (
            <Link href={href} className={classes}>
                {loading ? <LoadingSpinner /> : children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled || loading} className={classes}>
            {loading ? <LoadingSpinner /> : children}
        </button>
    );
}

function LoadingSpinner() {
    return (
        <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}
