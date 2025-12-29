import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { contactInfo } from "@/lib/constants";
import { GoogleMap } from "@/components/shared/GoogleMap";

export function Contact() {
    return (
        <section id="contatti" className="section">
            <div className="container-custom">
                <SectionHeading
                    title="Contattami"
                    subtitle="Compila il form o contattami direttamente"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                        <ContactForm />
                    </div>

                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                        {/* Contact Details */}
                        <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
                            <h3 className="text-xl font-medium mb-6">Informazioni</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-6 h-6 text-[var(--color-accent-primary)] flex-shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Indirizzo</p>
                                        <p className="text-[var(--color-text-secondary)]">
                                            {contactInfo.address.street}
                                            <br />
                                            {contactInfo.address.postalCode} {contactInfo.address.city}
                                        </p>
                                        <a
                                            href={contactInfo.address.googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-[var(--color-accent-primary)] hover:underline mt-1 inline-block"
                                        >
                                            Apri in Google Maps →
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-6 h-6 text-[var(--color-accent-primary)] flex-shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Email</p>
                                        <a
                                            href={`mailto:${contactInfo.email}`}
                                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)]"
                                        >
                                            {contactInfo.email}
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg
                                        className="w-6 h-6 text-[var(--color-accent-primary)] flex-shrink-0 mt-0.5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <div>
                                        <p className="font-medium">Telefono</p>
                                        <a
                                            href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)]"
                                        >
                                            {contactInfo.phone}
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Map */}
                        <GoogleMap />
                    </div>
                </div>
            </div>
        </section>
    );
}
