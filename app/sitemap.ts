import type { MetadataRoute } from "next";
import { locales, defaultLocale, baseUrl } from "@/lib/i18n/config";
import { serviceSlugs } from "@/components/sections/ServicePageLayout";

/**
 * Dynamic XML sitemap for all locale variants.
 *
 * Generates entries for:
 * - Homepage: 3 locale variants (pl, en, de)
 * - Service pages: 5 services x 3 locales = 15 entries
 * - Jobs listing page: 3 locale variants
 * - Auth pages: login + register x 3 locales = 6 entries
 * - Account page: 3 locale variants
 *
 * Each entry includes:
 * - lastModified date
 * - changeFrequency
 * - priority
 * - alternates.languages with hreflang entries per Google's spec
 *
 * Next.js automatically serves this at /sitemap.xml.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  /**
   * Helper to build sitemap entries for a given path suffix.
   */
  function buildEntries(
    pathSuffix: string,
    options: { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }
  ): MetadataRoute.Sitemap {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${baseUrl}/${locale}${pathSuffix}`;
    }
    languages["x-default"] = `${baseUrl}/${defaultLocale}${pathSuffix}`;

    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}${pathSuffix}`,
      lastModified,
      changeFrequency: options.changeFrequency,
      priority: locale === defaultLocale ? options.priority : options.priority * 0.9,
      alternates: { languages },
    }));
  }

  return [
    // Homepage
    ...buildEntries("", { changeFrequency: "monthly", priority: 1.0 }),

    // Service pages
    ...serviceSlugs.flatMap((slug) =>
      buildEntries(`/services/${slug}`, { changeFrequency: "monthly", priority: 0.8 })
    ),

    // Jobs listing
    ...buildEntries("/jobs", { changeFrequency: "daily", priority: 0.9 }),

    // Auth pages
    ...buildEntries("/auth/login", { changeFrequency: "monthly", priority: 0.3 }),
    ...buildEntries("/auth/register", { changeFrequency: "monthly", priority: 0.3 }),

    // Account page
    ...buildEntries("/account", { changeFrequency: "monthly", priority: 0.4 }),
  ];
}
