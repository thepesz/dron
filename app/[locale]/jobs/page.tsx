import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locales, type Locale, baseUrl } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { mockJobs } from "@/lib/jobs/mockData";
import { JobsPageContent } from "@/components/jobs/JobsPageContent";

interface JobsPageProps {
  params: { locale: string };
}

/**
 * Generate localized SEO metadata for the jobs listing page.
 * Targets drone operator job keywords in pl/en/de.
 */
export async function generateMetadata({
  params: { locale },
}: JobsPageProps): Promise<Metadata> {
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "pl";
  const t = await getTranslations({ locale: validLocale, namespace: "jobs" });

  return generateLocalizedMetadata({
    locale: validLocale,
    title: t("meta.title"),
    description: t("meta.description"),
    path: "/jobs",
  });
}

/**
 * Generate JSON-LD JobPosting structured data for all "seeking_operator" listings.
 * Google only indexes JobPosting for employer-to-worker direction.
 * "seeking_job" listings (operator looking for work) are excluded.
 */
function generateJobPostingsJsonLd(): string {
  const now = new Date();

  const jobPostings = mockJobs
    .filter((job) => job.type === "seeking_operator")
    .map((job) => {
      // Compute absolute date from relative postedDaysAgo
      const postedDate = new Date(now);
      postedDate.setDate(postedDate.getDate() - job.postedDaysAgo);
      const datePosted = postedDate.toISOString().split("T")[0];

      const posting: Record<string, unknown> = {
        "@type": "JobPosting",
        title: job.title,
        description: job.description,
        datePosted,
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location,
            addressRegion: job.province,
            addressCountry: "PL",
          },
        },
        hiringOrganization: {
          "@type": "Organization",
          name: job.contactName,
          sameAs: baseUrl,
        },
        employmentType: "CONTRACTOR",
      };

      // Add salary if a numeric rate is available
      if (job.rateType !== "negotiable" && job.rate) {
        const numericRate = parseInt(job.rate, 10);
        if (!isNaN(numericRate)) {
          posting.baseSalary = {
            "@type": "MonetaryAmount",
            currency: "PLN",
            value: {
              "@type": "QuantitativeValue",
              value: numericRate,
              unitText: job.rateType === "day" ? "DAY" : "MONTH",
            },
          };
        }
      }

      return posting;
    });

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": jobPostings,
    },
    null,
    0
  );
}

/**
 * Jobs listing page (Server Component).
 * Exports generateMetadata for SEO and injects JSON-LD structured data.
 * The interactive content is rendered by the JobsPageContent client component.
 */
export default function JobsPage() {
  const jsonLd = generateJobPostingsJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <JobsPageContent />
    </>
  );
}
