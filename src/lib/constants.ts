// Site-wide constants and configuration

export const siteConfig = {
    name: "Stefano Icardi",
    title: "Psicologo e Psicoterapeuta a Milano",
    description:
        "Psicologo clinico a Milano. Supporto psicologico e percorsi individuali per adulti con approccio relazionale e personalizzato.",
    url: "https://stefanoicardi.com",
    locale: "it_IT",
};

export const contactInfo = {
    address: {
        street: "Viale Luigi Majno, 38",
        city: "Milano",
        postalCode: "20129",
        province: "MI",
        country: "Italia",
        coordinates: { lat: 45.4733096, lng: 9.2056856 },
        googleMapsUrl:
            "https://www.google.com/maps/search/?api=1&query=45.4733096,9.2056856",
    },
    email: "stefano.icardi@outlook.com",
    phone: "+39 334 1397960",
    social: {
        instagram: "https://www.instagram.com/stefano_icardi/",
        linkedin: "https://www.linkedin.com/in/stefano-icardi-62a225134/",
    },
    professional: {
        title: "Psicologo clinico",
        subtitle: "Specializzando Psicoterapeuta",
        registration: "Ordine degli Psicologi della Lombardia, Albo A (n. 22963)",
        vatNumber: "11549340963",
    },
};

export const navigation = {
    main: [
        { name: "Home", href: "/" },
        { name: "Chi Sono", href: "/chi-sono" },
        { name: "Podcast", href: "/podcast" },
        { name: "Articoli", href: "/articoli", conditional: true },
        { name: "Contatti", href: "/#contatti" },
    ],
};
