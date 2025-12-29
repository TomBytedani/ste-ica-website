// TypeScript interfaces and type definitions

export interface Address {
    street: string;
    city: string;
    postalCode: string;
    province: string;
    country: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    googleMapsUrl: string;
}

export interface SocialLinks {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
}

export interface ProfessionalInfo {
    title: string;
    subtitle: string;
    registration: string;
    vatNumber: string;
}

export interface ContactInfo {
    address: Address;
    email: string;
    phone: string;
    social: SocialLinks;
    professional: ProfessionalInfo;
}

export interface NavItem {
    name: string;
    href: string;
    external?: boolean;
}

export interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
    as?: "h1" | "h2" | "h3";
}

export interface ButtonProps {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    type?: "button" | "submit" | "reset";
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    children: React.ReactNode;
}

export interface CardProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}

export interface ContactFormData {
    nome: string;
    email: string;
    telefono?: string;
    messaggio: string;
}

export interface ContactFormState {
    status: "idle" | "submitting" | "success" | "error";
    message?: string;
}

export interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    openGraph?: {
        title?: string;
        description?: string;
        images?: string[];
    };
}
