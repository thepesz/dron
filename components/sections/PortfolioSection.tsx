"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";

interface PortfolioItem {
  key: string;
  src: string;
}

const portfolioItems: PortfolioItem[] = [
  { key: "item1", src: "/images/dron2.jpg" },
  { key: "item2", src: "/images/agro2.jpg" },
  { key: "item3", src: "/images/budynek3d2.jpg" },
  { key: "item4", src: "/images/dron3.jpg" },
  { key: "item5", src: "/images/agro3.jpg" },
  { key: "item6", src: "/images/las1.jpg" },
];

/**
 * Portfolio grid displaying real drone photography with hover effects
 * and a fullscreen lightbox modal for detailed viewing.
 *
 * Uses CSS-based entrance animations via useInView hook instead of
 * framer-motion, matching the pattern used by all other sections.
 * This eliminates the full framer-motion bundle import that was
 * previously used here (motion.div + AnimatePresence).
 *
 * The lightbox uses CSS opacity transitions with conditional rendering
 * for a smooth open/close effect without AnimatePresence.
 */
export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: gridRef, isInView: gridInView } = useInView();

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    // Trigger CSS transition on next frame
    requestAnimationFrame(() => setLightboxVisible(true));
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxVisible(false);
    // Wait for CSS fade-out transition before unmounting
    setTimeout(() => {
      setLightboxIndex(null);
      document.body.style.overflow = "";
    }, 200);
  }, []);

  const navigateLightbox = useCallback(
    (direction: -1 | 1) => {
      if (lightboxIndex === null) return;
      const newIndex =
        (lightboxIndex + direction + portfolioItems.length) %
        portfolioItems.length;
      setLightboxIndex(newIndex);
    },
    [lightboxIndex]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  return (
    <section
      id="portfolio"
      className="section-padding border-t border-slate-800/50"
      aria-labelledby="portfolio-heading"
    >
      <div className="container-wide">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`animate-on-scroll mb-14 text-center ${headerInView ? "in-view" : ""}`}
        >
          <h2 id="portfolio-heading" className="heading-section">
            {t("heading")}
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">{t("subtitle")}</p>
        </div>

        {/* Image grid */}
        <div
          ref={gridRef}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {portfolioItems.map((item, index) => (
            <div
              key={item.key}
              className={`animate-on-scroll ${gridInView ? "in-view" : ""}`}
              style={{ transitionDelay: `${index * 80}ms` }}
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
            </div>
          ))}
        </div>

        {/* Lightbox modal — CSS opacity transition instead of AnimatePresence */}
        {lightboxIndex !== null && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-200 ${
              lightboxVisible ? "opacity-100" : "opacity-0"
            }`}
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
          </div>
        )}
      </div>
    </section>
  );
}
