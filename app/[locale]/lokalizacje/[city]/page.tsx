import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { cities, citySlugs } from "@/lib/cities/cityData";
import { CityPageContent } from "@/components/cities/CityPageContent";

interface CityPageProps {
  params: { locale: string; city: string };
}

/**
 * Pre-generate all city x locale combinations at build time.
 * 7 cities x 3 locales = 21 static pages.
 */
export function generateStaticParams() {
  return citySlugs.map((city) => ({ city }));
}

/**
 * Generate localized SEO metadata for each city landing page.
 * Each city has unique, hand-written title and description per locale
 * stored in cityData.ts — not templated from translation files.
 */
export async function generateMetadata({
  params: { locale, city },
}: CityPageProps): Promise<Metadata> {
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "pl";
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) return {};

  const lang = validLocale as "pl" | "en" | "de";
  return generateLocalizedMetadata({
    locale: validLocale,
    title: cityData.seo.titles[lang],
    description: cityData.seo.descriptions[lang],
    path: `/lokalizacje/${city}`,
  });
}

/**
 * City landing page — unique SEO-optimised content per city.
 * Server Component: no client JS, fast static rendering.
 */
export default function CityPage({ params: { locale, city } }: CityPageProps) {
  if (!citySlugs.includes(city)) notFound();

  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "pl";
  const cityData = cities.find((c) => c.slug === city)!;

  return <CityPageContent city={cityData} locale={validLocale} />;
}
