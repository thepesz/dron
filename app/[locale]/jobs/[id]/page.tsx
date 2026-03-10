import type { Metadata } from "next";
import { locales, type Locale, baseUrl } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { getJobById, mockJobs, type JobListing } from "@/lib/jobs/mockData";
import { JobDetailContent } from "@/components/jobs/JobDetailContent";
import { adminDb } from "@/lib/firebase/admin";

/**
 * Force dynamic rendering — Firestore document IDs are dynamic and cannot
 * be statically enumerated at build time (unlike the 8 mock IDs).
 */
export const dynamic = "force-dynamic";

interface JobDetailPageProps {
  params: { locale: string; id: string };
}

/**
 * Attempt to load a job from Firestore by document ID.
 * Returns null if not found or on error.
 */
async function getFirestoreJobById(id: string): Promise<JobListing | null> {
  try {
    const docRef = adminDb.collection("jobs").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) return null;

    const data = docSnap.data()!;
    const now = new Date();
    const postedAt = data.postedAt?.toDate?.() ?? now;
    const diffMs = now.getTime() - postedAt.getTime();
    const postedDaysAgo = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    const rateValue = data.rate != null ? String(data.rate) : "do negocjacji";

    return {
      id: docSnap.id,
      type: data.type ?? "seeking_operator",
      title: data.title ?? "",
      location: data.location ?? "Szczecin",
      lat: data.coordinates?.lat ?? 53.4285,
      lng: data.coordinates?.lng ?? 14.5528,
      radiusKm: data.radius ?? 50,
      services: data.services ?? [],
      drones: data.droneTypes ?? [],
      licenses: data.licenses ?? [],
      rate: rateValue,
      rateType: data.rateType ?? "negotiable",
      description: data.description ?? "",
      postedDaysAgo,
      contactName: data.contactName ?? data.postedByName ?? "Anonymous",
      province: data.province ?? "zachodniopomorskie",
    };
  } catch (error) {
    console.error("Failed to fetch job from Firestore:", error);
    return null;
  }
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

  // Try Firestore first, then mock data
  const job = (await getFirestoreJobById(id)) ?? getJobById(id);

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
function generateJobDetailJsonLd(job: JobListing): string | null {
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
 * Tries Firestore first, falls back to mock data.
 */
export default async function JobDetailPage({
  params: { id },
}: JobDetailPageProps) {
  // Try Firestore first, then mock data, then first mock as ultimate fallback
  const job =
    (await getFirestoreJobById(id)) ?? getJobById(id) ?? mockJobs[0];

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
