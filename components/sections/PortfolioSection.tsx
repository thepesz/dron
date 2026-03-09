"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioItem {
  key: string;
  src: string;
}

const portfolioItems: PortfolioItem[] = [
  { key: "item1", src: "/images/dron2.jpg" },
  { key: "item2", src: "/images/agro2.jpg" },
  { key: "item3", src: "/images/budynek3d2.png" },
  { key: "item4", src: "/images/dron3.jpg" },
  { key: "item5", src: "/images/agro3.jpg" },
  { key: "item6", src: "/images/las1.jpg" },
];

/**
 * Portfolio grid displaying real drone photography with hover effects
 * and a fullscreen lightbox modal for detailed viewing.
 *
 * Uses next/image with lazy loading for performance.
 * Images are sourced from /public/images/.
 */
export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function openLightbox(index: number) {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }

  function navigateLightbox(direction: -1 | 1) {
    if (lightboxIndex === null) return;
    const newIndex =
      (lightboxIndex + direction + portfolioItems.length) %
      portfolioItems.length;
    setLightboxIndex(newIndex);
  }

  return (
    <section
      id="portfolio"
      className="section-padding border-t border-slate-800/50"
      aria-labelledby="portfolio-heading"
    >
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 id="portfolio-heading" className="heading-section">
            {t("heading")}
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">{t("subtitle")}</p>
        </motion.div>

        {/* Image grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label={t(`items.${item.key}.alt`)}
              >
                <Image
                  src={item.src}
                  alt={t(`items.${item.key}.alt`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Lightbox modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label={t(
                `items.${portfolioItems[lightboxIndex].key}.alt`
              )}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute right-4 top-4 z-10 rounded-full bg-slate-800/80 p-2 text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(-1);
                }}
                className="absolute left-4 z-10 rounded-full bg-slate-800/80 p-2 text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(1);
                }}
                className="absolute right-4 z-10 rounded-full bg-slate-800/80 p-2 text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Lightbox content — real image */}
              <div
                className="relative h-[80vh] w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={portfolioItems[lightboxIndex].src}
                  alt={t(
                    `items.${portfolioItems[lightboxIndex].key}.alt`
                  )}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
