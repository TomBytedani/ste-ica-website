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
                    primary: "#1f2937",
                    secondary: "#4b5563",
                    muted: "#9ca3af",
                },
                background: {
                    primary: "#ffffff",
                    secondary: "#f9fafb",
                    accent: "#fafaf9",
                },
                accent: {
                    primary: "#1a1a1a",
                    hover: "#404040",
                    ring: "#3b82f6",
                },
                brand: {
                    sage: "#87a878",
                    earth: "#8b7355",
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
