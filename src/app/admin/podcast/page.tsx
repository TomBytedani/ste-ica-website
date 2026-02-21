'use client';

import { useState, useEffect } from 'react';

interface Episode {
    id: string;
    title: string;
    description: string;
    mixcloudUrl: string;
    publishedAt: string;
    duration?: string;
    featured?: boolean;
}

export default function PodcastAdminPage() {
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        mixcloudUrl: '',
        publishedAt: new Date().toISOString().split('T')[0],
        duration: '',
        featured: false
    });

    useEffect(() => {
        fetchEpisodes();
    }, []);

    const fetchEpisodes = async () => {
        try {
            const res = await fetch('/api/admin/podcast');
            const data = await res.json();
            setEpisodes(data.episodes || []);
        } catch (error) {
            console.error('Error fetching episodes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingEpisode) {
                await fetch('/api/admin/podcast', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingEpisode.id, ...formData })
                });
            } else {
                await fetch('/api/admin/podcast', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }

            resetForm();
            fetchEpisodes();
        } catch (error) {
            console.error('Error saving episode:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Sei sicuro di voler eliminare questo episodio?')) return;

        try {
            await fetch('/api/admin/podcast', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            fetchEpisodes();
        } catch (error) {
            console.error('Error deleting episode:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            mixcloudUrl: '',
            publishedAt: new Date().toISOString().split('T')[0],
            duration: '',
            featured: false
        });
        setEditingEpisode(null);
        setShowForm(false);
    };

    const startEdit = (episode: Episode) => {
        setFormData({
            title: episode.title,
            description: episode.description,
            mixcloudUrl: episode.mixcloudUrl,
            publishedAt: episode.publishedAt,
            duration: episode.duration || '',
            featured: episode.featured || false
        });
        setEditingEpisode(episode);
        setShowForm(true);
    };

    if (loading) {
        return <div className="text-center py-8">Caricamento...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Gestione Podcast</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    {showForm ? 'Annulla' : 'Nuovo Episodio'}
                </button>
            </div>

            {/* Episode Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingEpisode ? 'Modifica Episodio' : 'Nuovo Episodio'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Titolo</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">URL Mixcloud</label>
                            <input
                                type="url"
                                value={formData.mixcloudUrl}
                                onChange={(e) => setFormData({ ...formData, mixcloudUrl: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
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
                        <div>
                            <label className="block text-sm font-medium mb-1">Durata (es. 25:30)</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="MM:SS"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Descrizione</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            />
                            <span className="text-sm">Episodio in evidenza</span>
                        </label>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            {editingEpisode ? 'Salva Modifiche' : 'Crea Episodio'}
                        </button>
                        <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                            Annulla
                        </button>
                    </div>
                </form>
            )}

            {/* Episodes List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Titolo</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Data</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Durata</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Azioni</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {episodes.map((episode) => (
                            <tr key={episode.id}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        {episode.featured && (
                                            <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">★</span>
                                        )}
                                        {episode.title}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">{episode.publishedAt}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">{episode.duration || '-'}</td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => startEdit(episode)}
                                        className="text-blue-600 hover:underline mr-3"
                                    >
                                        Modifica
                                    </button>
                                    <button
                                        onClick={() => handleDelete(episode.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Elimina
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {episodes.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                    Nessun episodio. Clicca &quot;Nuovo Episodio&quot; per iniziare.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
