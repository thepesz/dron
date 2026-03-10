"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { mockJobs } from "@/lib/jobs/mockData";

/**
 * Leaflet requires browser APIs (window, document) so we must
 * load the map component with SSR disabled.
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

/**
 * Client-side content for the jobs listing page.
 * Extracted from page.tsx so the page can export generateMetadata as a Server Component.
 *
 * Three-column layout inspired by justjoin.it:
 * - Left: filter sidebar (280px, collapsible on mobile)
 * - Center: job cards list (scrollable)
 * - Right: map (40% width, hidden on mobile)
 */
export function JobsPageContent() {
  const t = useTranslations("jobs");
  const locale = useLocale();
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <Header />

      {/* Push content below fixed header */}
      <div className="pt-[88px] lg:pt-[96px]">
        {/* Page header bar */}
        <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <h1 className="text-lg font-bold text-white sm:text-xl">
                {t("pageTitle")}
              </h1>
              <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
                {t("results", { count: mockJobs.length })}
              </p>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(true)}
              className="flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {t("filters")}
            </button>
          </div>
        </div>

        {/* Main three-column layout */}
        <div className="flex h-[calc(100dvh-88px-53px)] lg:h-[calc(100dvh-96px-53px)]">
          {/* LEFT: Filter sidebar — desktop always visible */}
          <aside className="hidden w-[280px] shrink-0 border-r border-slate-800 bg-slate-900 lg:block overflow-hidden">
            <JobFilters />
          </aside>

          {/* Mobile filter drawer */}
          {showFilters && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                onClick={() => setShowFilters(false)}
                aria-hidden="true"
              />
              <div className="fixed inset-y-0 left-0 z-50 w-[300px] bg-slate-900 shadow-2xl lg:hidden">
                <JobFilters onClose={() => setShowFilters(false)} />
              </div>
            </>
          )}

          {/* CENTER: Job cards */}
          <div className="flex-1 overflow-y-auto bg-slate-950 p-3 sm:p-4">
            <div className="space-y-3">
              {mockJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isActive={activeJobId === job.id}
                  onHover={setActiveJobId}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Map — hidden on mobile */}
          <div className="hidden w-[40%] shrink-0 border-l border-slate-800 md:block">
            <JobMap
              jobs={mockJobs}
              activeJobId={activeJobId}
              onMarkerClick={(id) => setActiveJobId(id)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
