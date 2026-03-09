"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Zap,
  Crosshair,
  Mountain,
  Cpu,
  MapPin,
  Award,
} from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";
import type { ReactNode } from "react";

interface Advantage {
  key: string;
  icon: ReactNode;
}

const advantages: Advantage[] = [
  { key: "safety", icon: <ShieldCheck className="h-6 w-6" /> },
  { key: "speed", icon: <Zap className="h-6 w-6" /> },
  { key: "precision", icon: <Crosshair className="h-6 w-6" /> },
  { key: "access", icon: <Mountain className="h-6 w-6" /> },
  { key: "equipment", icon: <Cpu className="h-6 w-6" /> },
  { key: "local", icon: <MapPin className="h-6 w-6" /> },
  { key: "reliability", icon: <Award className="h-6 w-6" /> },
];

const bgPhotos = [
  "/images/dron1.jpg",
  "/images/agro1.jpg",
  "/images/budynek3d1.jpg",
  "/images/pv1.jpg",
  "/images/gsm1.jpg",
  "/images/las1.jpg",
  "/images/dron2.jpg",
  "/images/agro2.jpg",
  "/images/dron3.jpg",
  "/images/budynek3d2.jpg",
  "/images/agro3.jpg",
];

/**
 * "Why Choose Us" section with crossfading photo background and advantage cards.
 *
 * Background: CSS crossfade between two <Image> elements (current + next),
 * using opacity transitions instead of Framer Motion AnimatePresence.
 * This keeps the DOM at exactly 2 image nodes regardless of cycle count.
 *
 * Advantages grid: CSS entrance animations via useInView hook instead
 * of individual motion.div wrappers, reducing DOM nodes by 7.
 */
export function WhyChooseUsSection() {
  const t = useTranslations("whyUs");
  const [current, setCurrent] = useState(0);
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgPhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="why-us"
      className="relative overflow-hidden"
      aria-labelledby="why-us-heading"
    >
      {/* Two-slot crossfade background (only 2 DOM nodes, not N) */}
      <div className="absolute inset-0">
        <Image
          src={bgPhotos[current]}
          alt=""
          fill
          sizes="100vw"
          className="object-cover transition-opacity duration-1000"
          priority={current === 0}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-slate-950/75" />

      {/* Content */}
      <div className="section-padding container-wide relative z-10">
        <div
          ref={headerRef}
          className={`animate-on-scroll mb-14 text-center ${headerInView ? "in-view" : ""}`}
        >
          <h2 id="why-us-heading" className="heading-section">
            {t("heading")}
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">{t("subtitle")}</p>
        </div>

        <div
          ref={gridRef}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {advantages.map((item, index) => (
            <div
              key={item.key}
              className={`animate-on-scroll flex gap-4 ${gridInView ? "in-view" : ""}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600/20 text-brand-400">
                {item.icon}
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-white">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-300">
                  {t(`items.${item.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
