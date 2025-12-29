import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
    title: {
        default: "Stefano Icardi | Psicologo a Milano",
        template: "%s | Stefano Icardi Psicologo",
    },
    description:
        "Psicologo clinico a Milano. Supporto psicologico e percorsi individuali per adulti con approccio relazionale e personalizzato. Prenota un appuntamento.",
    keywords: [
        "psicologo",
        "Milano",
        "psicologo clinico",
        "supporto psicologico",
        "psicoterapia",
        "Stefano Icardi",
    ],
    authors: [{ name: "Stefano Icardi" }],
    creator: "Stefano Icardi",
    metadataBase: new URL("https://stefanoicardi.com"),
    openGraph: {
        title: "Stefano Icardi | Psicologo a Milano",
        description:
            "Supporto psicologico e percorsi individuali per adulti con approccio relazionale.",
        url: "https://stefanoicardi.com",
        siteName: "Stefano Icardi - Psicologo",
        locale: "it_IT",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Stefano Icardi | Psicologo a Milano",
        description:
            "Supporto psicologico e percorsi individuali per adulti con approccio relazionale.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="it" className={`${playfairDisplay.variable} ${inter.variable}`}>
            <body className="antialiased">
                <a href="#main-content" className="skip-to-content">
                    Vai al contenuto principale
                </a>
                {children}
            </body>
        </html>
    );
}
