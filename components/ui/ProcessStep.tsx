"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/hooks/useInView";

interface ProcessStepProps {
  stepNumber: number;
  icon: ReactNode;
  title: string;
  description: string;
  isLast: boolean;
}

/**
 * Single process step with numbered indicator, icon, and description.
 * Uses CSS-based entrance animation via useInView instead of Framer Motion
 * to reduce DOM node count and JS bundle.
 */
export function ProcessStep({
  stepNumber,
  icon,
  title,
  description,
  isLast,
}: ProcessStepProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`animate-on-scroll-left relative flex gap-6 ${isInView ? "in-view" : ""}`}
      style={{ transitionDelay: `${stepNumber * 100}ms` }}
    >
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-500 bg-brand-600/10 text-brand-400">
          {icon}
        </div>
        {!isLast && (
          <div className="mt-2 h-full w-px bg-gradient-to-b from-brand-500/40 to-transparent" />
        )}
      </div>

      <div className={`pb-10 ${isLast ? "pb-0" : ""}`}>
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-400">
          {String(stepNumber).padStart(2, "0")}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
