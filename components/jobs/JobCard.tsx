"use client";

import { useTranslations, useLocale } from "next-intl";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import type { JobListing } from "@/lib/jobs/mockData";

interface JobCardProps {
  job: JobListing;
  isActive?: boolean;
  onHover?: (id: string | null) => void;
}

/**
 * A single job listing card.
 * Orange left border = seeking operator (client post).
 * Sky/blue left border = seeking job (operator post).
 */
export function JobCard({ job, isActive = false, onHover }: JobCardProps) {
  const t = useTranslations("jobs");
  const locale = useLocale();

  const borderColor =
    job.type === "seeking_operator"
      ? "border-l-brand-500"
      : "border-l-sky-500";

  const typeBadgeColor =
    job.type === "seeking_operator"
      ? "bg-brand-500/15 text-brand-400"
      : "bg-sky-500/15 text-sky-400";

  const typeLabel =
    job.type === "seeking_operator"
      ? t("seekingOperator")
      : t("seekingJob");

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
    <a
      href={`/${locale}/jobs/${job.id}`}
      className={`group block border-l-4 ${borderColor} rounded-r-lg border border-slate-700/60 bg-slate-800 p-4 transition-all hover:border-slate-600 hover:bg-slate-800/80 ${
        isActive ? "ring-2 ring-brand-500/50 bg-slate-800/90" : ""
      }`}
      onMouseEnter={() => onHover?.(job.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {/* Top row: type badge + posted date */}
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadgeColor}`}
        >
          {typeLabel}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Calendar className="h-3 w-3" />
          {postedLabel}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-sm font-semibold leading-snug text-white group-hover:text-brand-400 transition-colors">
        {job.title}
      </h3>

      {/* Location + radius */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-400">
        <MapPin className="h-3.5 w-3.5 text-slate-500" />
        <span>
          {job.location} &bull; {job.radiusKm} km
        </span>
      </div>

      {/* Service badges */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {job.services.map((service) => (
          <span
            key={service}
            className="rounded bg-slate-700/60 px-2 py-0.5 text-xs text-slate-300"
          >
            {t(`serviceLabels.${service}`)}
          </span>
        ))}
      </div>

      {/* Bottom row: rate + view details */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">{rateDisplay}</span>
        <span className="flex items-center gap-1 text-xs font-medium text-brand-400 group-hover:text-brand-300 transition-colors">
          {t("viewDetails")}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  );
}
