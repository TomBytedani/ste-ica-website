import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Enable React strict mode for better debugging
    reactStrictMode: true,

    // Redirects from old WordPress URLs
    async redirects() {
        return [
            {
                source: "/chisono",
                destination: "/chi-sono",
                permanent: true,
            },
            {
                source: "/chisono/",
                destination: "/chi-sono",
                permanent: true,
            },
            {
                source: "/blog",
                destination: "/articoli",
                permanent: true,
            },
            {
                source: "/blog/",
                destination: "/articoli",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
