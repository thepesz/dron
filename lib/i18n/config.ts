export const locales = ["pl", "en", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pl";

export const localeNames: Record<Locale, string> = {
  pl: "Polski",
  en: "English",
  de: "Deutsch",
};

/**
 * Base URL for the production site.
 * Used by metadata, sitemap, structured data, and hreflang tags.
 */
export const baseUrl = "https://loty-dronem.pl";
