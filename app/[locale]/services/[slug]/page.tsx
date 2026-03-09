import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import {
  ServicePageLayout,
  serviceSlugs,
  type ServiceSlug,
} from "@/components/sections/ServicePageLayout";

interface ServicePageProps {
  params: { locale: string; slug: string };
}

/**
 * Pre-generate all service page variants at build time:
 * 5 slugs x 3 locales = 15 static pages.
 */
export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

/**
 * Generate localized SEO metadata for each service page.
 * Uses the servicePages.[slug].meta namespace from translation files.
 * Canonical and hreflang URLs include the /services/[slug] path.
 */
export async function generateMetadata({
  params: { locale, slug },
}: ServicePageProps): Promise<Metadata> {
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "pl";

  if (!serviceSlugs.includes(slug as ServiceSlug)) {
    return {};
  }

  const t = await getTranslations({
    locale: validLocale,
    namespace: `servicePages.${slug}`,
  });

  return generateLocalizedMetadata({
    locale: validLocale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: `/services/${slug}`,
  });
}

/**
 * Service landing page.
 * Each service (photogrammetry, thermal-imaging, etc.) gets its own
 * dedicated page with unique keyword-targeting content for SEO.
 * The page is a Server Component — no client-side JS for fast load.
 */
export default async function ServicePage({
  params: { locale, slug },
}: ServicePageProps) {
  // Validate slug
  if (!serviceSlugs.includes(slug as ServiceSlug)) {
    notFound();
  }

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: `servicePages.${slug}`,
  });
  const tShared = await getTranslations({
    locale: locale as Locale,
    namespace: "servicePages",
  });

  // Use t.raw() to extract raw JSON arrays from translations.
  // This avoids iterating with try/catch and produces no MISSING_MESSAGE warnings.
  const introParagraphs = t.raw("intro") as string[];
  const benefits = t.raw("benefits") as { title: string; description: string }[];
  const useCases = t.raw("useCases") as { title: string; description: string }[];
  const processSteps = t.raw("process") as { step: string; title: string; description: string }[];
  const deliverables = t.raw("deliverables") as { heading: string; items: string[] };
  const area = t.raw("area") as { heading: string; text: string };

  return (
    <>
      <Header />
      <main id="main-content">
        <ServicePageLayout
          locale={locale}
          breadcrumbLabel={t("breadcrumb")}
          heroHeading={t("hero.heading")}
          heroSubheading={t("hero.subheading")}
          introParagraphs={introParagraphs}
          benefits={benefits}
          useCases={useCases}
          processSteps={processSteps}
          processHeading={tShared("processHeading")}
          deliverables={deliverables}
          area={area}
          ctaHeading={t("cta.heading")}
          ctaText={t("cta.text")}
          labels={{
            home: tShared("home"),
            servicesLabel: tShared("servicesLabel"),
            backToHome: tShared("backToHome"),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
