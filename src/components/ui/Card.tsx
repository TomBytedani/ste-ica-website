import { cn } from "@/lib/utils";
import type { CardProps } from "@/lib/types";

export function Card({ title, description, icon, className, children }: CardProps) {
    return (
        <div
            className={cn(
                "bg-[var(--color-bg-primary)] border border-[var(--color-bg-accent)] rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                className
            )}
        >
            {icon && (
                <div className="w-14 h-14 flex items-center justify-center bg-[var(--color-bg-secondary)] rounded-2xl rotate-3 mb-6 text-[var(--color-accent-primary)] shadow-sm">
                    {icon}
                </div>
            )}
            {title && (
                <h3 className="text-xl font-heading font-medium mb-3 text-[var(--color-text-primary)]">
                    {title}
                </h3>
            )}
            {description && (
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {description}
                </p>
            )}
            {children}
        </div>
    );
}
