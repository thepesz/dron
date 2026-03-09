import type { Metadata } from "next";
import { type Locale, locales, defaultLocale, baseUrl } from "@/lib/i18n/config";

/**
 * Map of locale codes to Open Graph locale format (language_TERRITORY).
 */
const ogLocaleMap: Record<Locale, string> = {
  pl: "pl_PL",
  en: "en_US",
  de: "de_DE",
};

interface GenerateMetadataParams {
  locale: Locale;
  title: string;
  description: string;
  /** Optional path suffix appended after the locale, e.g. "/services/photogrammetry" */
  path?: string;
}

/**
 * Generates fully localized Next.js metadata including Open Graph,
 * Twitter Card, canonical URL, and hreflang alternate links.
 *
 * Produces the following SEO tags per locale:
 * - <link rel="canonical" href="https://loty-dronem.pl/{locale}" />
 * - <link rel="alternate" hreflang="pl" href="https://loty-dronem.pl/pl" />
 * - <link rel="alternate" hreflang="en" href="https://loty-dronem.pl/en" />
 * - <link rel="alternate" hreflang="de" href="https://loty-dronem.pl/de" />
 * - <link rel="alternate" hreflang="x-default" href="https://loty-dronem.pl/pl" />
 * - <meta property="og:locale" content="{locale_TERRITORY}" />
 * - <meta property="og:locale:alternate" content="{other locales}" />
 * - <meta property="og:type" content="website" />
 * - <meta property="og:url" content="https://loty-dronem.pl/{locale}" />
 * - <meta name="robots" content="index, follow" />
 */
export function generateLocalizedMetadata({
  locale,
  title,
  description,
  path = "",
}: GenerateMetadataParams): Metadata {
  const pathSuffix = path ? `${path}` : "";
  const canonicalUrl = `${baseUrl}/${locale}${pathSuffix}`;

  // Build hreflang alternate map: all locales + x-default → default locale
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${baseUrl}/${loc}${pathSuffix}`;
  }
  // x-default signals to search engines which URL to use when no locale matches
  languages["x-default"] = `${baseUrl}/${defaultLocale}${pathSuffix}`;

  // OG alternate locales: all locales except the current one
  const alternateOgLocales = locales
    .filter((loc) => loc !== locale)
    .map((loc) => ogLocaleMap[loc]);

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Aero Metric",
      locale: ogLocaleMap[locale],
      alternateLocale: alternateOgLocales,
      type: "website",
      // TODO: Add a real OG image when available (1200x630 recommended):
      // images: [{ url: `${baseUrl}/images/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
