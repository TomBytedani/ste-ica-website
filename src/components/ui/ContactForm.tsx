"use client";

import { useState } from "react";
import { Button } from "./Button";
import type { ContactFormData, ContactFormState } from "@/lib/types";

export function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        nome: "",
        email: "",
        telefono: "",
        messaggio: "",
    });

    const [state, setState] = useState<ContactFormState>({
        status: "idle",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState({ status: "submitting" });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Errore durante l'invio");

            setState({
                status: "success",
                message: "Messaggio inviato con successo! Ti risponderemo al più presto.",
            });
            setFormData({ nome: "", email: "", telefono: "", messaggio: "" });
        } catch {
            setState({
                status: "error",
                message: "Si è verificato un errore. Riprova più tardi.",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="nome" className="form-label">
                    Nome *
                </label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Il tuo nome"
                />
            </div>

            <div>
                <label htmlFor="email" className="form-label">
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="La tua email"
                />
            </div>

            <div>
                <label htmlFor="telefono" className="form-label">
                    Telefono
                </label>
                <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Il tuo numero di telefono"
                />
            </div>

            <div>
                <label htmlFor="messaggio" className="form-label">
                    Messaggio *
                </label>
                <textarea
                    id="messaggio"
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Scrivi il tuo messaggio..."
                />
            </div>

            {state.message && (
                <div
                    className={`p-4 rounded-md ${state.status === "success"
                            ? "bg-green-50 text-green-800"
                            : "bg-red-50 text-red-800"
                        }`}
                >
                    {state.message}
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                loading={state.status === "submitting"}
                disabled={state.status === "submitting"}
            >
                Invia messaggio
            </Button>
        </form>
    );
}
