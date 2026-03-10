import type { MetadataRoute } from "next";
import { locales, defaultLocale, baseUrl } from "@/lib/i18n/config";
import { serviceSlugs } from "@/components/sections/ServicePageLayout";

/**
 * Dynamic XML sitemap for all locale variants.
 *
 * Generates entries for:
 * - Homepage: 3 locale variants (pl, en, de)
 * - Service pages: 5 services x 3 locales = 15 entries
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

  // ── Homepage entries (one per locale) ──

  // Build hreflang alternates for homepage
  const homepageLanguages: Record<string, string> = {};
  for (const locale of locales) {
    homepageLanguages[locale] = `${baseUrl}/${locale}`;
  }
  homepageLanguages["x-default"] = `${baseUrl}/${defaultLocale}`;

  const homepageEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === defaultLocale ? 1.0 : 0.9,
    alternates: {
      languages: homepageLanguages,
    },
  }));

  // ── Service page entries (5 services x 3 locales) ──

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.flatMap((slug) => {
    // Build hreflang alternates for this service page
    const serviceLanguages: Record<string, string> = {};
    for (const locale of locales) {
      serviceLanguages[locale] = `${baseUrl}/${locale}/services/${slug}`;
    }
    serviceLanguages["x-default"] = `${baseUrl}/${defaultLocale}/services/${slug}`;

    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}/services/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: serviceLanguages,
      },
    }));
  });

  // ── Jobs listing page entries (one per locale) ──

  const jobsLanguages: Record<string, string> = {};
  for (const locale of locales) {
    jobsLanguages[locale] = `${baseUrl}/${locale}/jobs`;
  }
  jobsLanguages["x-default"] = `${baseUrl}/${defaultLocale}/jobs`;

  const jobsEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/jobs`,
    lastModified,
    changeFrequency: "daily" as const,
    priority: 0.8,
    alternates: {
      languages: jobsLanguages,
    },
  }));

  return [...homepageEntries, ...serviceEntries, ...jobsEntries];
}
