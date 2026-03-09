"use client";

import { useTranslations } from "next-intl";
import {
  Zap,
  HardHat,
  Building2,
  Sprout,
  Shield,
  Landmark,
} from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";
import type { ReactNode } from "react";

interface IndustrySlot {
  key: string;
  icon: ReactNode;
}

const industrySlots: IndustrySlot[] = [
  { key: "energy", icon: <Zap className="h-6 w-6" /> },
  { key: "construction", icon: <HardHat className="h-6 w-6" /> },
  { key: "industry", icon: <Building2 className="h-6 w-6" /> },
  { key: "agriculture", icon: <Sprout className="h-6 w-6" /> },
  { key: "insurance", icon: <Shield className="h-6 w-6" /> },
  { key: "infrastructure", icon: <Landmark className="h-6 w-6" /> },
];

/**
 * Client logos / industry trust strip displayed between Hero and Services.
 * Shows 6 placeholder industry slots with icons and labels.
 * Replace placeholder boxes with actual client logos when available.
 * Horizontally scrollable on mobile, grid on larger screens.
 *
 * Uses CSS-based entrance animations via useInView instead of framer-motion
 * to avoid pulling in the full framer-motion bundle.
 */
export function ClientLogosSection() {
  const t = useTranslations("clients");
  const { ref: headingRef, isInView: headingInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();

  return (
    <section
      className="border-t border-slate-800/50 bg-slate-900/50 px-4 py-12 sm:px-6 lg:px-8"
      aria-label={t("heading")}
    >
      <div className="container-wide">
        <p
          ref={headingRef}
          className={`animate-on-scroll mb-8 text-center text-sm font-semibold uppercase tracking-widest text-zinc-500 ${headingInView ? "in-view" : ""}`}
        >
          {t("heading")}
        </p>

        {/* Horizontal scroll on mobile, grid on larger screens */}
        <div
          ref={gridRef}
          className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-6"
        >
          {industrySlots.map((slot, index) => (
            <div
              key={slot.key}
              className={`animate-on-scroll flex min-w-[140px] shrink-0 flex-col items-center justify-center gap-3 rounded border border-slate-700/40 bg-slate-800/40 px-4 py-6 transition-colors hover:border-slate-600 hover:bg-slate-800/70 sm:min-w-0 ${gridInView ? "in-view" : ""}`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              {/* Placeholder icon representing the industry */}
              <div className="text-zinc-500">
                {slot.icon}
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {t(`industries.${slot.key}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
