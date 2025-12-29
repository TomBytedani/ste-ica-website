import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
    return (
        <>
            <Header />
            <main
                id="main-content"
                className="min-h-screen flex items-center justify-center"
            >
                <div className="container-custom text-center">
                    <h1 className="text-6xl md:text-8xl font-medium mb-4">404</h1>
                    <h2 className="text-2xl md:text-3xl font-medium mb-6">
                        Pagina non trovata
                    </h2>
                    <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
                        La pagina che stai cercando non esiste o è stata spostata.
                    </p>
                    <Link href="/" className="btn btn-primary">
                        Torna alla Home
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
