/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
                body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
            },
            colors: {
                text: {
                    primary: "var(--color-text-primary)",
                    secondary: "var(--color-text-secondary)",
                    muted: "var(--color-text-muted)",
                },
                background: {
                    primary: "var(--color-bg-primary)",
                    secondary: "var(--color-bg-secondary)",
                    accent: "var(--color-bg-accent)",
                },
                accent: {
                    primary: "var(--color-accent-primary)",
                    hover: "var(--color-accent-hover)",
                    ring: "var(--color-focus-ring)",
                },
                brand: {
                    sage: "var(--color-brand-sage)",
                    earth: "var(--color-brand-earth)",
                },
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "1.5rem",
                    lg: "2rem",
                },
                screens: {
                    "2xl": "1200px",
                },
            },
        },
    },
    plugins: [],
};
