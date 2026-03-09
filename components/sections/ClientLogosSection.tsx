"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Zap,
  HardHat,
  Building2,
  Sprout,
  Shield,
  Landmark,
} from "lucide-react";
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
 */
export function ClientLogosSection() {
  const t = useTranslations("clients");

  return (
    <section
      className="border-t border-slate-800/50 bg-slate-900/50 px-4 py-12 sm:px-6 lg:px-8"
      aria-label={t("heading")}
    >
      <div className="container-wide">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-zinc-500"
        >
          {t("heading")}
        </motion.p>

        {/* Horizontal scroll on mobile, grid on larger screens */}
        <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-6">
          {industrySlots.map((slot, index) => (
            <motion.div
              key={slot.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex min-w-[140px] shrink-0 flex-col items-center justify-center gap-3 rounded border border-slate-700/40 bg-slate-800/40 px-4 py-6 transition-colors hover:border-slate-600 hover:bg-slate-800/70 sm:min-w-0"
            >
              {/* Placeholder icon representing the industry */}
              <div className="text-zinc-500">
                {slot.icon}
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {t(`industries.${slot.key}`)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
