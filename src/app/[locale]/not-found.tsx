import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ServerAwareHeader } from "@/components/layout/ServerAwareHeader";
import { Footer } from "@/components/layout/Footer";

export default async function NotFound() {
    const t = await getTranslations('notFound');
    return (
        <>
            <ServerAwareHeader />
            <main
                id="main-content"
                className="min-h-screen flex items-center justify-center"
            >
                <div className="container-custom text-center">
                    <h1 className="text-6xl md:text-8xl font-heading font-medium mb-4 text-[var(--color-accent-primary)]">{t('title')}</h1>
                    <h2 className="text-2xl md:text-3xl font-medium mb-6">
                        {t('heading')}
                    </h2>
                    <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
                        {t('description')}
                    </p>
                    <Link href="/" className="btn btn-primary">
                        {t('homeButton')}
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
