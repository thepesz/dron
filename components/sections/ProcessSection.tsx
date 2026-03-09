"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  Map,
  Plane,
  FileCheck,
  ExternalLink,
} from "lucide-react";
import { ProcessStep } from "@/components/ui/ProcessStep";
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

export function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section
      id="process"
      className="section-padding border-t border-slate-800/50"
      aria-labelledby="process-heading"
    >
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 id="process-heading" className="heading-section">
            {t("heading")}
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">{t("subtitle")}</p>
        </motion.div>

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
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-12 max-w-2xl text-center text-sm text-zinc-500"
        >
          {t("regulations.text")}{" "}
          <a
            href={t("regulations.url")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand-400 underline underline-offset-2 transition-colors hover:text-brand-300"
          >
            {t("regulations.linkText")}
            <ExternalLink className="h-3 w-3" />
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
