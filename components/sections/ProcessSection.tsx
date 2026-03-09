"use client";

import { useTranslations } from "next-intl";
import {
  MessageSquare,
  Search,
  Map,
  Plane,
  FileCheck,
  ExternalLink,
} from "lucide-react";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { useInView } from "@/lib/hooks/useInView";
import type { ReactNode } from "react";

interface StepItem {
  key: string;
  icon: ReactNode;
}

const steps: StepItem[] = [
  { key: "contact", icon: <MessageSquare className="h-5 w-5" /> },
  { key: "analysis", icon: <Search className="h-5 w-5" /> },
  { key: "planning", icon: <Map className="h-5 w-5" /> },
  { key: "execution", icon: <Plane className="h-5 w-5" /> },
  { key: "delivery", icon: <FileCheck className="h-5 w-5" /> },
];

/**
 * Process section showing five numbered workflow steps.
 * Uses CSS-based entrance animations via useInView instead of Framer Motion
 * to reduce DOM node count and JS bundle.
 */
export function ProcessSection() {
  const t = useTranslations("process");
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: noteRef, isInView: noteInView } = useInView();

  return (
    <section
      id="process"
      className="section-padding border-t border-slate-800/50"
      aria-labelledby="process-heading"
    >
      <div className="container-wide">
        <div
          ref={headerRef}
          className={`animate-on-scroll mb-14 text-center ${headerInView ? "in-view" : ""}`}
        >
          <h2 id="process-heading" className="heading-section">
            {t("heading")}
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">{t("subtitle")}</p>
        </div>

        <div className="mx-auto max-w-2xl">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.key}
              stepNumber={index + 1}
              icon={step.icon}
              title={t(`steps.${step.key}.title`)}
              description={t(`steps.${step.key}.description`)}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Regulatory compliance note with external link */}
        <p
          ref={noteRef}
          className={`animate-on-scroll-fade mx-auto mt-12 max-w-2xl text-center text-sm text-zinc-500 ${noteInView ? "in-view" : ""}`}
          style={{ transitionDelay: "300ms" }}
        >
          {t("regulations.text")}{" "}
          <a
            href={t("regulations.url")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1 rounded py-2 text-brand-400 underline underline-offset-2 transition-colors hover:text-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {t("regulations.linkText")}
            <ExternalLink className="h-3 w-3" />
          </a>
          .
        </p>
      </div>
    </section>
  );
}
