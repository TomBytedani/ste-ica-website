import type { SEOProps } from "@/lib/types";
import { siteConfig } from "@/lib/constants";

/**
 * SEO Component for generating JSON-LD structured data
 * Use this in page components to add structured data
 */
export function SEO({ title, description }: SEOProps) {
    const pageTitle = title
        ? `${title} | ${siteConfig.name}`
        : `${siteConfig.name} | ${siteConfig.title}`;
    const pageDescription = description || siteConfig.description;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "PsychologicalTreatment",
        name: `${siteConfig.name} - Psicologo`,
        description: pageDescription,
        address: {
            "@type": "PostalAddress",
            streetAddress: "Viale Luigi Majno, 38",
            addressLocality: "Milano",
            postalCode: "20129",
            addressCountry: "IT",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 45.4733096,
            longitude: 9.2056856,
        },
        telephone: "+39 334 1397960",
        email: "stefano.icardi@outlook.com",
        url: siteConfig.url,
        sameAs: [
            "https://www.instagram.com/stefano_icardi/",
            "https://www.linkedin.com/in/stefano-icardi-62a225134/",
        ],
        priceRange: "€€",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
