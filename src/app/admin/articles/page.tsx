'use client';

import { useState, useEffect } from 'react';

interface LocalizedString {
    it: string;
    en: string;
}

interface Article {
    id: string;
    slug: string;
    title: LocalizedString;
    excerpt: LocalizedString;
    content: LocalizedString;
    coverImage: string;
    publishedAt: string;
    tags: string[];
    published: boolean;
}

export default function ArticlesAdminPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        slug: '',
        title: { it: '', en: '' },
        excerpt: { it: '', en: '' },
        content: { it: '', en: '' },
        coverImage: '',
        publishedAt: new Date().toISOString().split('T')[0],
        tags: '',
        published: false
    });

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await fetch('/api/admin/articles');
            const data = await res.json();
            setArticles(data.articles || []);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const articleData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        };

        try {
            if (editingArticle) {
                await fetch('/api/admin/articles', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingArticle.id, ...articleData })
                });
            } else {
                await fetch('/api/admin/articles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(articleData)
                });
            }

            resetForm();
            fetchArticles();
        } catch (error) {
            console.error('Error saving article:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Sei sicuro di voler eliminare questo articolo?')) return;

        try {
            await fetch('/api/admin/articles', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            fetchArticles();
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            slug: '',
            title: { it: '', en: '' },
            excerpt: { it: '', en: '' },
            content: { it: '', en: '' },
            coverImage: '',
            publishedAt: new Date().toISOString().split('T')[0],
            tags: '',
            published: false
        });
        setEditingArticle(null);
        setShowForm(false);
    };

    const startEdit = (article: Article) => {
        setFormData({
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            coverImage: article.coverImage,
            publishedAt: article.publishedAt,
            tags: article.tags.join(', '),
            published: article.published
        });
        setEditingArticle(article);
        setShowForm(true);
    };

    if (loading) {
        return <div className="text-center py-8">Caricamento...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Gestione Articoli</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    {showForm ? 'Annulla' : 'Nuovo Articolo'}
                </button>
            </div>

            {/* Article Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingArticle ? 'Modifica Articolo' : 'Nuovo Articolo'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="mio-articolo"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Data Pubblicazione</label>
                            <input
                                type="date"
                                value={formData.publishedAt}
                                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    {/* Title Section */}
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-medium mb-3">Titolo</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">🇮🇹 Italiano</label>
                                <input
                                    type="text"
                                    value={formData.title.it}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        title: { ...formData.title, it: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">🇬🇧 English</label>
                                <input
                                    type="text"
                                    value={formData.title.en}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        title: { ...formData.title, en: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Excerpt Section */}
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-medium mb-3">Estratto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">🇮🇹 Italiano</label>
                                <textarea
                                    value={formData.excerpt.it}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        excerpt: { ...formData.excerpt, it: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    rows={2}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">🇬🇧 English</label>
                                <textarea
                                    value={formData.excerpt.en}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        excerpt: { ...formData.excerpt, en: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    rows={2}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-medium mb-3">Contenuto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">🇮🇹 Italiano</label>
                                <textarea
                                    value={formData.content.it}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        content: { ...formData.content, it: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    rows={6}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">🇬🇧 English</label>
                                <textarea
                                    value={formData.content.en}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        content: { ...formData.content, en: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    rows={6}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Immagine di copertina (URL)</label>
                            <input
                                type="text"
                                value={formData.coverImage}
                                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="/images/articles/nome-immagine.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tags (separati da virgola)</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="ansia, benessere, strategie"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            />
                            <span className="text-sm">Pubblicato</span>
                        </label>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            {editingArticle ? 'Salva Modifiche' : 'Crea Articolo'}
                        </button>
                        <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                            Annulla
                        </button>
                    </div>
                </form>
            )}

            {/* Articles List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Titolo</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Data</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Stato</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Azioni</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {articles.map((article) => (
                            <tr key={article.id}>
                                <td className="px-4 py-3">
                                    <div>
                                        <div className="font-medium">{article.title.it}</div>
                                        <div className="text-sm text-gray-500">/{article.slug}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">{article.publishedAt}</td>
                                <td className="px-4 py-3">
                                    {article.published ? (
                                        <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">Pubblicato</span>
                                    ) : (
                                        <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">Bozza</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => startEdit(article)}
                                        className="text-blue-600 hover:underline mr-3"
                                    >
                                        Modifica
                                    </button>
                                    <button
                                        onClick={() => handleDelete(article.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Elimina
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {articles.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                    Nessun articolo. Clicca &quot;Nuovo Articolo&quot; per iniziare.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
