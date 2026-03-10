"use client";

import { useTranslations, useLocale } from "next-intl";
import { Search, Plus, X } from "lucide-react";

/**
 * Filter sidebar for the jobs listing page.
 * Static mockup — filters do not actually filter; UI only.
 */
export function JobFilters({ onClose }: { onClose?: () => void }) {
  const t = useTranslations("jobs");
  const locale = useLocale();

  const serviceOptions = [
    "photogrammetry",
    "thermal",
    "inspection",
    "aerial",
    "wildlife_damage",
    "wind_turbines",
  ] as const;

  const droneOptions = [
    "dji_mavic",
    "dji_phantom",
    "dji_matrice",
    "fixed_wing",
  ] as const;

  const licenseOptions = ["a1a3", "a2", "sts"] as const;

  return (
    <div className="flex h-full flex-col">
      {/* Mobile close button */}
      {onClose && (
        <div className="flex items-center justify-between border-b border-slate-800 p-4 lg:hidden">
          <h2 className="text-sm font-semibold text-white">{t("filters")}</h2>
          <button
            onClick={onClose}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Type filter */}
        <div>
          <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t("filterType")}
          </h3>
          <div className="space-y-1.5">
            {(["all", "seeking_operator", "seeking_job"] as const).map(
              (type) => (
                <label
                  key={type}
                  className="flex min-h-[36px] cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-300 transition-colors hover:bg-slate-800"
                >
                  <input
                    type="radio"
                    name="type"
                    defaultChecked={type === "all"}
                    className="h-4 w-4 border-slate-600 bg-slate-700 text-brand-500 focus:ring-brand-500 focus:ring-offset-0"
                  />
                  <span>
                    {type === "all"
                      ? t("typeAll")
                      : type === "seeking_operator"
                        ? t("seekingOperator")
                        : t("seekingJob")}
                  </span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Location filter */}
        <div>
          <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t("filterLocation")}
          </h3>
          <input
            type="text"
            placeholder={t("locationPlaceholder")}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <div className="mt-2">
            <label className="mb-1 block text-xs text-slate-500">
              {t("filterRadius")}
            </label>
            <input
              type="range"
              min="10"
              max="200"
              defaultValue="50"
              className="w-full accent-brand-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>10 km</span>
              <span>200 km</span>
            </div>
          </div>
        </div>

        {/* Drone type filter */}
        <div>
          <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t("filterDroneType")}
          </h3>
          <div className="space-y-1.5">
            {droneOptions.map((drone) => (
              <label
                key={drone}
                className="flex min-h-[36px] cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-300 transition-colors hover:bg-slate-800"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-brand-500 focus:ring-brand-500 focus:ring-offset-0"
                />
                <span>{t(`droneLabels.${drone}`)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Service filter */}
        <div>
          <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t("filterService")}
          </h3>
          <div className="space-y-1.5">
            {serviceOptions.map((service) => (
              <label
                key={service}
                className="flex min-h-[36px] cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-300 transition-colors hover:bg-slate-800"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-brand-500 focus:ring-brand-500 focus:ring-offset-0"
                />
                <span>{t(`serviceLabels.${service}`)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rate slider */}
        <div>
          <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t("filterRate")}
          </h3>
          <input
            type="range"
            min="0"
            max="5000"
            defaultValue="5000"
            step="100"
            className="w-full accent-brand-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>0 PLN</span>
            <span>5 000 PLN</span>
          </div>
        </div>

        {/* License filter */}
        <div>
          <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t("filterLicense")}
          </h3>
          <div className="space-y-1.5">
            {licenseOptions.map((license) => (
              <label
                key={license}
                className="flex min-h-[36px] cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-slate-300 transition-colors hover:bg-slate-800"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-brand-500 focus:ring-brand-500 focus:ring-offset-0"
                />
                <span>{t(`licenseLabels.${license}`)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Post ad CTA at bottom */}
      <div className="border-t border-slate-800 p-4">
        <a
          href={`/${locale}/jobs/new`}
          className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          <Plus className="h-4 w-4" />
          {t("postAd")}
        </a>
      </div>
    </div>
  );
}
