import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/admin/podcast" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">Podcast</h2>
                    <p className="text-gray-600">Gestisci gli episodi del podcast</p>
                </Link>

                <Link href="/admin/articles" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">Articoli</h2>
                    <p className="text-gray-600">Scrivi e modifica articoli</p>
                </Link>

                <a href="/" target="_blank" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold mb-2">Visualizza Sito</h2>
                    <p className="text-gray-600">Apri il sito pubblico</p>
                </a>
            </div>
        </div>
    );
}
