"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { SlidersHorizontal, Plus, ListChecks, Map } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { useAuth } from "@/lib/firebase/auth-context";
import type { JobListing } from "@/lib/jobs/mockData";

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

interface JobsPageContentProps {
  initialJobs: JobListing[];
}

/**
 * Client-side content for the jobs listing page.
 * Extracted from page.tsx so the page can export generateMetadata as a Server Component.
 *
 * Three-column layout inspired by justjoin.it:
 * - Left: filter sidebar (280px, collapsible on mobile)
 * - Center: job cards list (scrollable)
 * - Right: map (40% width, hidden on mobile)
 */
export function JobsPageContent({ initialJobs }: JobsPageContentProps) {
  const t = useTranslations("jobs");
  const locale = useLocale();
  const { user } = useAuth();
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <Header />

      {/* Push content below fixed header */}
      <div className="pt-[88px] lg:pt-[96px]">
        {/* Page header bar */}
        <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-2 sm:px-6">
            <div>
              <h1 className="text-lg font-bold text-white sm:text-xl">
                {t("pageTitle")}
              </h1>
              <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
                {t("results", { count: initialJobs.length })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Add listing button — visible when logged in */}
              {user && (
                <a
                  href={`/${locale}/jobs/new`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
                >
                  <Plus className="h-4 w-4" />
                  {t("postAd")}
                </a>
              )}

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
        </div>

        {/* Main three-column layout */}
        <div className="flex h-[calc(100dvh-88px-49px-50px)] md:h-[calc(100dvh-88px-49px)] lg:h-[calc(100dvh-96px-49px)]">
          {/* LEFT: Filter sidebar — desktop always visible */}
          <aside className="hidden w-[280px] shrink-0 overflow-hidden border-r border-slate-700/50 bg-slate-900 lg:block">
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
          <div
            className={`${
              showMap ? "hidden md:block" : "block"
            } flex-1 overflow-y-auto bg-slate-950 p-3 pb-[50px] sm:p-4 md:pb-0`}
          >
            {initialJobs.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-slate-500">{t("noResults")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {initialJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isActive={activeJobId === job.id}
                    onHover={setActiveJobId}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Map — toggle on mobile, always visible on md+ */}
          <div
            className={`${
              showMap ? "block" : "hidden"
            } w-full shrink-0 border-l border-slate-700/50 md:block md:w-[40%]`}
          >
            <JobMap
              jobs={initialJobs}
              activeJobId={activeJobId}
              onMarkerClick={(id) => setActiveJobId(id)}
            />
          </div>
        </div>

        {/* Mobile tab bar — fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 z-30 flex border-t border-slate-700/50 bg-slate-900 md:hidden">
          <button
            onClick={() => setShowMap(false)}
            className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              !showMap
                ? "border-t-2 border-brand-500 text-brand-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ListChecks className="h-4 w-4" />
            {t("pageTitle")}
          </button>
          <button
            onClick={() => setShowMap(true)}
            className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              showMap
                ? "border-t-2 border-brand-500 text-brand-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Map className="h-4 w-4" />
            {t("mapTitle")}
          </button>
        </div>
      </div>
    </>
  );
}
