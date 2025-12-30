import { Playfair_Display, Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={`${playfairDisplay.variable} ${inter.variable}`}>
            <head>
                <PlausibleProvider
                    domain="stefanoicardi.com"
                    enabled={process.env.NODE_ENV === "production"}
                />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    );
}

