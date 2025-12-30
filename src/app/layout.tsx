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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={`${playfairDisplay.variable} ${inter.variable}`}>
            <body className="antialiased">{children}</body>
        </html>
    );
}

