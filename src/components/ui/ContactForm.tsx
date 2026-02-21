"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./Button";
import type { ContactFormData, ContactFormState } from "@/lib/types";

export function ContactForm() {
    const t = useTranslations("contactForm");
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
                message: t("successMessage"),
            });
            setFormData({ nome: "", email: "", telefono: "", messaggio: "" });
        } catch {
            setState({
                status: "error",
                message: t("errorMessage"),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="nome" className="form-label">
                    {t("nameLabel")} {t("requiredField")}
                </label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder={t("namePlaceholder")}
                />
            </div>

            <div>
                <label htmlFor="email" className="form-label">
                    {t("emailLabel")} {t("requiredField")}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder={t("emailPlaceholder")}
                />
            </div>

            <div>
                <label htmlFor="telefono" className="form-label">
                    {t("phoneLabel")}
                </label>
                <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="form-input"
                    placeholder={t("phonePlaceholder")}
                />
            </div>

            <div>
                <label htmlFor="messaggio" className="form-label">
                    {t("messageLabel")} {t("requiredField")}
                </label>
                <textarea
                    id="messaggio"
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-input resize-none"
                    placeholder={t("messagePlaceholder")}
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
                {t("submitButton")}
            </Button>
        </form>
    );
}
