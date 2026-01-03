import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white">
                <div className="p-4 border-b border-gray-700">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin" className="block px-4 py-2 rounded text-white hover:bg-gray-800">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/podcast" className="block px-4 py-2 rounded text-white hover:bg-gray-800">
                                Podcast
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/articles" className="block px-4 py-2 rounded text-white hover:bg-gray-800">
                                Articoli
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
                    <form action="/api/admin/auth" method="DELETE">
                        <button type="submit" className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white">
                            Logout
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-gray-100 p-8">
                {children}
            </main>
        </div>
    );
}
