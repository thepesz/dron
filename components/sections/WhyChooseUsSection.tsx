"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
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
  "/images/gsm1.png",
  "/images/las1.jpg",
  "/images/dron2.jpg",
  "/images/agro2.jpg",
  "/images/dron3.jpg",
  "/images/budynek3d2.png",
  "/images/agro3.jpg",
];

export function WhyChooseUsSection() {
  const t = useTranslations("whyUs");
  const [current, setCurrent] = useState(0);

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
      {/* Crossfade photo background */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={bgPhotos[current]}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={current === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-slate-950/75" />

      {/* Content */}
      <div className="section-padding container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 id="why-us-heading" className="heading-section">
            {t("heading")}
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">{t("subtitle")}</p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {advantages.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex gap-4"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
