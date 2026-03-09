"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Building2, Sprout, Zap, HardHat } from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";
import type { ReactNode } from "react";

interface IndustryBadge {
  icon: ReactNode;
  key: string;
}

const industries: IndustryBadge[] = [
  { icon: <Building2 className="h-4 w-4" />, key: "industry" },
  { icon: <Sprout className="h-4 w-4" />, key: "agriculture" },
  { icon: <Zap className="h-4 w-4" />, key: "energy" },
  { icon: <HardHat className="h-4 w-4" />, key: "infrastructure" },
];

/**
 * About section with two-column layout on large screens:
 * - Left: heading, description paragraphs, and industry badges
 * - Right: tall drone photo with orange accent border
 *
 * On mobile the columns stack vertically (text first, image below).
 * Uses CSS-based entrance animations via useInView instead of Framer Motion
 * to reduce DOM node count and JS bundle.
 */
export function AboutSection() {
  const t = useTranslations("about");
  const { ref: textRef, isInView: textInView } = useInView();
  const { ref: photoRef, isInView: photoInView } = useInView();

  return (
    <section
      id="about"
      className="section-padding bg-slate-900/30"
      aria-labelledby="about-heading"
    >
      <div className="container-wide">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left column — text content */}
          <div
            ref={textRef}
            className={`animate-on-scroll lg:w-1/2 ${textInView ? "in-view" : ""}`}
          >
            <h2
              id="about-heading"
              className="heading-section mb-8"
            >
              {t("heading")}
            </h2>

            <div className="space-y-5">
              <p className="text-body">{t("paragraphs.intro")}</p>
              <p className="text-body">{t("paragraphs.industries")}</p>
              <p className="text-body">{t("paragraphs.commitment")}</p>
            </div>

            {/* Industry badges */}
            <div className="mt-10 flex flex-wrap gap-3">
              {industries.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-zinc-300"
                >
                  <span className="text-brand-400">{item.icon}</span>
                  {t(`industries.${item.key}`)}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — drone photo */}
          <div
            ref={photoRef}
            className={`animate-on-scroll-right lg:w-1/2 ${photoInView ? "in-view" : ""}`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="relative min-h-[400px] overflow-hidden rounded-xl border-l-4 border-l-brand-500 lg:min-h-[500px]">
              <Image
                src="/images/dron3.jpg"
                alt={t("photoAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
              {/* Subtle bottom gradient for depth */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
