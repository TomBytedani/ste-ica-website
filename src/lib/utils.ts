// Utility functions

import { type ClassValue, clsx } from "clsx";

/**
 * Combines class names using clsx
 * Useful for conditional class names
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

/**
 * Formats a phone number for display
 */
export function formatPhoneNumber(phone: string): string {
    return phone.replace(/\s+/g, " ").trim();
}

/**
 * Formats a phone number for tel: links
 */
export function formatPhoneForLink(phone: string): string {
    return phone.replace(/\s+/g, "");
}

/**
 * Formats an address for display
 */
export function formatAddress(address: {
    street: string;
    postalCode: string;
    city: string;
    province: string;
}): string {
    return `${address.street}, ${address.postalCode} ${address.city} (${address.province})`;
}

/**
 * Delays execution for a specified duration
 * Useful for animations and debouncing
 */
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely truncates text to a maximum length
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
}

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates an Italian phone number
 */
export function isValidItalianPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\s+/g, "");
    const phoneRegex = /^(\+39)?[0-9]{9,10}$/;
    return phoneRegex.test(cleanPhone);
}
