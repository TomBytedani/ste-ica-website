import { cn } from "@/lib/utils";
import type { SectionHeadingProps } from "@/lib/types";

export function SectionHeading({
    title,
    subtitle,
    align = "center",
    as: Tag = "h2",
}: SectionHeadingProps) {
    return (
        <div
            className={cn(
                "mb-12 md:mb-16",
                align === "center" && "text-center flex flex-col items-center",
                align === "left" && "text-left"
            )}
        >
            <Tag className="text-3xl md:text-5xl font-heading text-[var(--color-text-primary)] mb-4 relative inline-block">
                {title}
                {/* Decorative element implementation could go here, or just rely on the font */}
            </Tag>
            <div className={cn(
                "h-1.5 w-24 bg-[var(--color-accent-primary)] rounded-full mb-6 opacity-30",
                align === "center" && "mx-auto",
                align === "left" && "mr-auto"
            )} />
            {subtitle && (
                <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
