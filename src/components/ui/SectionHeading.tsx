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
                "mb-8 md:mb-12",
                align === "center" && "text-center",
                align === "left" && "text-left"
            )}
        >
            <Tag className="text-3xl md:text-4xl font-medium text-[var(--color-text-primary)] mb-4">
                {title}
            </Tag>
            {subtitle && (
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
