"use client";

import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Lock,
  Briefcase,
} from "lucide-react";
import { Header } from "@/components/ui/Header";
import { useAuth } from "@/lib/firebase/auth-context";
import type { JobListing } from "@/lib/jobs/mockData";

/**
 * Small map for the detail page, loaded without SSR.
 */
const JobMap = dynamic(
  () => import("@/components/jobs/JobMap").then((mod) => mod.JobMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-500">
        <div className="text-center">
          <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-brand-500" />
          <p className="text-sm">Mapa</p>
        </div>
      </div>
    ),
  }
);

interface JobDetailContentProps {
  job: JobListing;
}

/**
 * Client-side content for the job detail page.
 * Extracted from page.tsx so the page can export generateMetadata as a Server Component.
 */
export function JobDetailContent({ job }: JobDetailContentProps) {
  const t = useTranslations("jobs");
  const locale = useLocale();
  const { user } = useAuth();

  const typeLabel =
    job.type === "seeking_operator" ? t("seekingOperator") : t("seekingJob");
  const typeBadgeColor =
    job.type === "seeking_operator"
      ? "bg-brand-500/15 text-brand-400 border-brand-500/30"
      : "bg-sky-500/15 text-sky-400 border-sky-500/30";

  const rateDisplay = (() => {
    if (job.rateType === "negotiable") return t("negotiable");
    const suffix = job.rateType === "day" ? t("perDay") : t("perProject");
    return `${job.rate} ${suffix}`;
  })();

  const postedLabel = (() => {
    if (job.postedDaysAgo === 0) return t("postedToday");
    return t("postedDaysAgo", { count: job.postedDaysAgo });
  })();

  return (
    <>
      <Header />

      <div className="pt-[88px] lg:pt-[96px]">
        <main className="min-h-[calc(100dvh-88px)] bg-slate-950 lg:min-h-[calc(100dvh-96px)]">
          {/* Top bar with back button */}
          <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
            <div className="container-wide px-4 py-3 sm:px-6">
              <a
                href={`/${locale}/jobs`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("backToList")}
              </a>
            </div>
          </div>

          <div className="container-wide px-4 py-6 sm:px-6 lg:py-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
              {/* LEFT: Details */}
              <div>
                {/* Type badge + posted date */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${typeBadgeColor}`}
                  >
                    {typeLabel}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Calendar className="h-4 w-4" />
                    {postedLabel}
                  </span>
                </div>

                {/* Title */}
                <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {job.title}
                </h1>

                {/* Meta grid */}
                <div className="mb-8 grid gap-4 rounded-lg border border-slate-800 bg-slate-900 p-5 sm:grid-cols-2">
                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        {t("location")}
                      </p>
                      <p className="text-sm text-white">
                        {job.location}, {job.province}
                      </p>
                    </div>
                  </div>

                  {/* Radius */}
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        {t("radius")}
                      </p>
                      <p className="text-sm text-white">{job.radiusKm} km</p>
                    </div>
                  </div>

                  {/* Rate */}
                  <div className="flex items-start gap-3">
                    <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        {t("rate")}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {rateDisplay}
                      </p>
                    </div>
                  </div>

                  {/* Posted by */}
                  <div className="flex items-start gap-3">
                    <User className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        {t("postedBy")}
                      </p>
                      <p className="text-sm text-white">{job.contactName}</p>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    {t("services")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300"
                      >
                        {t(`serviceLabels.${service}`)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Drones */}
                <div className="mb-6">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    {t("droneType")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.drones.map((drone) => (
                      <span
                        key={drone}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300"
                      >
                        {t(`droneLabels.${drone}`)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Licenses */}
                <div className="mb-8">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    {t("license")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.licenses.map((license) => (
                      <span
                        key={license}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300"
                      >
                        {t(`licenseLabels.${license}`)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    {t("description")}
                  </h2>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
                    {job.description}
                  </p>
                </div>

                {/* Map on detail page */}
                <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                    {t("mapTitle")}
                  </h2>
                  <div className="h-[300px] overflow-hidden rounded-lg border border-slate-800">
                    <JobMap
                      jobs={[job]}
                      activeJobId={job.id}
                      onMarkerClick={() => {}}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT: Contact panel */}
              <div className="lg:sticky lg:top-[120px] lg:self-start">
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
                  {/* Contact info -- blurred for guests */}
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {t("postedBy")}
                    </p>
                    {user ? (
                      <div className="rounded-lg border border-slate-800 bg-slate-800/50 p-4">
                        <p className="flex items-center gap-2 text-sm font-medium text-white">
                          <User className="h-4 w-4 text-brand-500" />
                          {job.contactName}
                        </p>
                      </div>
                    ) : (
                      <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-800/50 p-4">
                        {/* Blurred name */}
                        <p className="select-none text-sm font-medium text-white blur-sm">
                          {t("blurredContactName")}
                        </p>
                        {/* Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg bg-slate-900/70 backdrop-blur-[2px]">
                          <Lock className="h-5 w-5 text-slate-400" />
                          <p className="text-center text-xs text-slate-400">
                            {t("loginToSeeContact")}
                          </p>
                          <a
                            href={`/${locale}/auth/login`}
                            className="mt-1 rounded-lg bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-500"
                          >
                            {t("loginLink")}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick info summary */}
                  <div className="mt-6 space-y-3 border-t border-slate-800 pt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{t("rate")}</span>
                      <span className="font-semibold text-white">
                        {rateDisplay}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{t("location")}</span>
                      <span className="text-white">{job.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{t("radius")}</span>
                      <span className="text-white">{job.radiusKm} km</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{t("posted")}</span>
                      <span className="text-white">{postedLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
