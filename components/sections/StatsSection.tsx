"use client";

import { useTranslations } from "next-intl";
import { useInView } from "@/lib/hooks/useInView";

const statKeys = ["years", "projects", "specializations", "area"] as const;

/**
 * Statistics section displaying 4 key numbers/facts about the company.
 * Large orange accent numbers with descriptive labels below.
 * Placed between Services and WhyChooseUs for trust-building.
 *
 * Uses CSS-based entrance animations via useInView instead of framer-motion
 * to avoid pulling in the full framer-motion bundle.
 */
export function StatsSection() {
  const t = useTranslations("stats");
  const { ref: gridRef, isInView: gridInView } = useInView();

  return (
    <section
      className="border-t border-slate-800/50 bg-slate-900/60 px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      aria-label={t("heading")}
    >
      <div className="container-wide">
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12"
        >
          {statKeys.map((key, index) => (
            <div
              key={key}
              className={`animate-on-scroll text-center ${gridInView ? "in-view" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <p className="text-3xl font-bold tracking-tight text-brand-500 sm:text-4xl lg:text-5xl">
                {t(`items.${key}.value`)}
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-400 sm:text-base">
                {t(`items.${key}.label`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
