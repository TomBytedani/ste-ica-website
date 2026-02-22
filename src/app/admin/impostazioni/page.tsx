'use client';

import { useState, useEffect, useRef } from 'react';
import type { SiteSettings } from '@/lib/settings';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function ImpostazioniPage() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [studioStatus, setStudioStatus] = useState<SaveStatus>('idle');
    const [contactStatus, setContactStatus] = useState<SaveStatus>('idle');
    const [cvStatus, setCvStatus] = useState<SaveStatus>('idle');
    const [cvMessage, setCvMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch('/api/admin/settings')
            .then(r => r.json())
            .then(data => {
                setSettings(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    async function saveSection(section: 'studio' | 'contact') {
        if (!settings) return;
        const setStatus = section === 'studio' ? setStudioStatus : setContactStatus;
        setStatus('saving');
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            setStatus(res.ok ? 'saved' : 'error');
            setTimeout(() => setStatus('idle'), 3000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    }

    async function uploadCV(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setCvStatus('saving');
        setCvMessage('');
        const formData = new FormData();
        formData.append('cv', file);
        try {
            const res = await fetch('/api/admin/cv', { method: 'POST', body: formData });
            const data = await res.json();
            if (res.ok) {
                setCvStatus('saved');
                setCvMessage(`File caricato: ${data.url}`);
                setSettings(prev => prev ? { ...prev, cv: { url: data.url, isCustom: true } } : prev);
            } else {
                setCvStatus('error');
                setCvMessage(data.error || 'Errore durante il caricamento');
            }
        } catch {
            setCvStatus('error');
            setCvMessage('Errore durante il caricamento');
        }
        setTimeout(() => setCvStatus('idle'), 4000);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    async function resetCV() {
        setCvStatus('saving');
        setCvMessage('');
        try {
            const res = await fetch('/api/admin/cv', { method: 'DELETE' });
            if (res.ok) {
                setCvStatus('saved');
                setCvMessage('CV ripristinato all\'URL di default');
                setSettings(prev => prev ? {
                    ...prev,
                    cv: { url: 'https://www.opl.it/iscritti/cv/CV-22963.pdf', isCustom: false },
                } : prev);
            } else {
                setCvStatus('error');
                setCvMessage('Errore durante il ripristino');
            }
        } catch {
            setCvStatus('error');
            setCvMessage('Errore durante il ripristino');
        }
        setTimeout(() => setCvStatus('idle'), 4000);
    }

    async function saveCVUrl() {
        if (!settings) return;
        setCvStatus('saving');
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            setCvStatus(res.ok ? 'saved' : 'error');
            setCvMessage(res.ok ? 'URL CV salvato' : 'Errore durante il salvataggio');
        } catch {
            setCvStatus('error');
            setCvMessage('Errore durante il salvataggio');
        }
        setTimeout(() => { setCvStatus('idle'); setCvMessage(''); }, 3000);
    }

    if (loading) {
        return <div className="flex items-center justify-center h-64 text-gray-500">Caricamento...</div>;
    }

    if (!settings) {
        return <div className="text-red-600">Errore nel caricamento delle impostazioni.</div>;
    }

    const statusLabel = (s: SaveStatus) => ({
        idle: '',
        saving: 'Salvataggio...',
        saved: 'Salvato!',
        error: 'Errore durante il salvataggio',
    }[s]);

    const statusColor = (s: SaveStatus) => s === 'saved' ? 'text-green-600' : s === 'error' ? 'text-red-600' : 'text-gray-500';

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Impostazioni</h1>

            {/* CV Section */}
            <section className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-1">Curriculum Vitae</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Gestisci il link al CV visualizzato nella pagina &quot;Chi Sono&quot;.
                </p>

                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">URL attuale</p>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${settings.cv.isCustom ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                            {settings.cv.isCustom ? 'Personalizzato' : 'Default OPL'}
                        </span>
                        <a
                            href={settings.cv.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 underline truncate max-w-xs"
                        >
                            {settings.cv.url}
                        </a>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Carica un nuovo PDF</p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={uploadCV}
                        className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-gray-700 cursor-pointer"
                    />
                </div>

                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">O specifica un URL manuale</p>
                    <div className="flex gap-2">
                        <input
                            type="url"
                            value={settings.cv.url}
                            onChange={e => setSettings({ ...settings, cv: { ...settings.cv, url: e.target.value, isCustom: true } })}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            placeholder="https://..."
                        />
                        <button
                            onClick={saveCVUrl}
                            disabled={cvStatus === 'saving'}
                            className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
                        >
                            Salva URL
                        </button>
                    </div>
                </div>

                {settings.cv.isCustom && (
                    <button
                        onClick={resetCV}
                        disabled={cvStatus === 'saving'}
                        className="text-sm text-red-600 hover:underline disabled:opacity-50"
                    >
                        Ripristina URL default (OPL)
                    </button>
                )}

                {cvStatus !== 'idle' && (
                    <p className={`text-sm mt-2 ${statusColor(cvStatus)}`}>
                        {cvMessage || statusLabel(cvStatus)}
                    </p>
                )}
            </section>

            {/* Studio Address Section */}
            <section className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-1">Indirizzo Studio</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Aggiorna l&apos;indirizzo dello studio. Le modifiche si riflettono su tutte le pagine del sito (Chi Sono, Footer, Contatti, mappa).
                </p>

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Via / Indirizzo</label>
                        <input
                            type="text"
                            value={settings.studio.street}
                            onChange={e => setSettings({ ...settings, studio: { ...settings.studio, street: e.target.value } })}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Città</label>
                            <input
                                type="text"
                                value={settings.studio.city}
                                onChange={e => setSettings({ ...settings, studio: { ...settings.studio, city: e.target.value } })}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                            <input
                                type="text"
                                value={settings.studio.province}
                                onChange={e => setSettings({ ...settings, studio: { ...settings.studio, province: e.target.value } })}
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                maxLength={2}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CAP</label>
                        <input
                            type="text"
                            value={settings.studio.postalCode}
                            onChange={e => setSettings({ ...settings, studio: { ...settings.studio, postalCode: e.target.value } })}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            maxLength={5}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Google Maps</label>
                        <input
                            type="url"
                            value={settings.studio.googleMapsUrl}
                            onChange={e => setSettings({ ...settings, studio: { ...settings.studio, googleMapsUrl: e.target.value } })}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            placeholder="https://www.google.com/maps/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Coordinate (per la mappa integrata)</label>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Latitudine</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={settings.studio.coordinates.lat}
                                    onChange={e => setSettings({
                                        ...settings,
                                        studio: {
                                            ...settings.studio,
                                            coordinates: { ...settings.studio.coordinates, lat: parseFloat(e.target.value) || 0 },
                                        },
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    placeholder="45.4733096"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Longitudine</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={settings.studio.coordinates.lng}
                                    onChange={e => setSettings({
                                        ...settings,
                                        studio: {
                                            ...settings.studio,
                                            coordinates: { ...settings.studio.coordinates, lng: parseFloat(e.target.value) || 0 },
                                        },
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    placeholder="9.2056856"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            Trova le coordinate cercando l&apos;indirizzo su{' '}
                            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="underline">Google Maps</a>
                            {' '}e copiando i numeri dall&apos;URL.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                    <button
                        onClick={() => saveSection('studio')}
                        disabled={studioStatus === 'saving'}
                        className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
                    >
                        Salva indirizzo
                    </button>
                    {studioStatus !== 'idle' && (
                        <span className={`text-sm ${statusColor(studioStatus)}`}>{statusLabel(studioStatus)}</span>
                    )}
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-1">Informazioni di Contatto</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Telefono ed email di contatto.
                </p>

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                        <input
                            type="tel"
                            value={settings.contact.phone}
                            onChange={e => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={settings.contact.email}
                            onChange={e => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                    <button
                        onClick={() => saveSection('contact')}
                        disabled={contactStatus === 'saving'}
                        className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
                    >
                        Salva contatti
                    </button>
                    {contactStatus !== 'idle' && (
                        <span className={`text-sm ${statusColor(contactStatus)}`}>{statusLabel(contactStatus)}</span>
                    )}
                </div>
            </section>

            <p className="text-xs text-gray-400">
                Le modifiche si riflettono su tutto il sito alla prossima visita della pagina.
            </p>
        </div>
    );
}
