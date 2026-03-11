import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { getTranslations } from "next-intl/server";
import { NewJobForm } from "@/components/jobs/NewJobForm";
import { ComingSoon } from "@/components/jobs/ComingSoon";

interface NewJobPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: NewJobPageProps): Promise<Metadata> {
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "pl";
  const t = await getTranslations({ locale: validLocale, namespace: "jobs" });

  return {
    ...(await generateLocalizedMetadata({
      locale: validLocale,
      title: t("newJob.metaTitle"),
      description: t("newJob.metaDescription"),
      path: "/jobs/new",
    })),
    robots: { index: false, follow: true },
  };
}

export default function NewJobPage() {
  if (process.env.NEXT_PUBLIC_JOBS_ENABLED === "false") return <ComingSoon />;
  return <NewJobForm />;
}
