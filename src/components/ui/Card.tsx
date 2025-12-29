import { cn } from "@/lib/utils";
import type { CardProps } from "@/lib/types";

export function Card({ title, description, icon, className, children }: CardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200",
                className
            )}
        >
            {icon && (
                <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-bg-secondary)] rounded-lg mb-4 text-[var(--color-accent-primary)]">
                    {icon}
                </div>
            )}
            {title && (
                <h3 className="text-lg font-medium mb-2 text-[var(--color-text-primary)]">
                    {title}
                </h3>
            )}
            {description && (
                <p className="text-[var(--color-text-secondary)] text-sm">
                    {description}
                </p>
            )}
            {children}
        </div>
    );
}
