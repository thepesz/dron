import type { Metadata } from "next";
import { locales, type Locale, baseUrl } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { getJobById, mockJobs } from "@/lib/jobs/mockData";
import { JobDetailContent } from "@/components/jobs/JobDetailContent";

interface JobDetailPageProps {
  params: { locale: string; id: string };
}

/**
 * Pre-generate all job detail variants at build time:
 * 8 jobs x 3 locales = 24 static pages.
 */
export function generateStaticParams() {
  return mockJobs.map((job) => ({ id: job.id }));
}

/**
 * Generate localized SEO metadata for each job detail page.
 * Uses the job title and a truncated description for the meta description.
 */
export async function generateMetadata({
  params: { locale, id },
}: JobDetailPageProps): Promise<Metadata> {
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "pl";

  const job = getJobById(id);
  if (!job) {
    return generateLocalizedMetadata({
      locale: validLocale,
      title: "404",
      description: "",
      path: `/jobs/${id}`,
    });
  }

  // Truncate description to ~120 chars at word boundary
  const metaDesc =
    job.description.length > 120
      ? job.description.substring(0, job.description.lastIndexOf(" ", 120)) +
        "..."
      : job.description;

  return generateLocalizedMetadata({
    locale: validLocale,
    title: `${job.title} | loty-dronem.pl`,
    description: metaDesc,
    path: `/jobs/${id}`,
  });
}

/**
 * Generate JSON-LD for a single job posting (only if type is "seeking_operator").
 */
function generateJobDetailJsonLd(
  job: (typeof mockJobs)[number]
): string | null {
  if (job.type !== "seeking_operator") return null;

  const now = new Date();
  const postedDate = new Date(now);
  postedDate.setDate(postedDate.getDate() - job.postedDaysAgo);
  const datePosted = postedDate.toISOString().split("T")[0];

  const posting: Record<string, unknown> = {
    "@context": "https://schema.org",
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

  return JSON.stringify(posting, null, 0);
}

/**
 * Job detail page (Server Component).
 * Exports generateMetadata for SEO and passes the job data to the client component.
 * Falls back to first job if ID not found.
 */
export default function JobDetailPage({
  params: { id },
}: JobDetailPageProps) {
  const job = getJobById(id) ?? mockJobs[0];
  const jsonLd = generateJobDetailJsonLd(job);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <JobDetailContent job={job} />
    </>
  );
}
