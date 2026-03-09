"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Photo background */}
      {/* Decorative background image — video plays on top; alt="" is correct */}
      <Image
        src="/images/glownefoto.png"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
      />

      {/* Video background – shown on top of photo once loaded */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/glownefoto.png"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-drone.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-slate-950" />

      {/* Content */}
      <div className="container-wide relative z-10 px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("heading")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-zinc-300 sm:text-xl"
          >
            {t("subheading")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-500 hover:shadow-brand-500/30 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-black"
            >
              {t("cta")}
              <ChevronRight className="h-5 w-5" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-8 py-4 text-base font-semibold text-zinc-200 transition-all hover:border-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {t("secondaryCta")}
            </a>
          </motion.div>

          {/* Trust signal */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 text-sm font-medium tracking-wide text-zinc-400"
          >
            {t("trust")}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#services"
            aria-label="Scroll down"
            className="flex flex-col items-center text-zinc-500 transition-colors hover:text-brand-400"
          >
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
