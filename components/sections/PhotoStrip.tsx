"use client";

import Image from "next/image";

/**
 * Photo sources for the infinite marquee strip.
 * These are purely decorative images (visual rhythm element), so alt=""
 * is correct — they duplicate content already accessible in the
 * Services and Portfolio sections.
 */
const stripPhotos = [
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

/**
 * Infinite auto-scrolling horizontal photo strip (marquee effect).
 *
 * Duplicates the photo array to create a seamless loop using
 * CSS animation (translateX from 0 to -50%). Vignette gradients
 * on left and right edges blend the strip into the dark background.
 *
 * Placed between StatsSection and WhyChooseUsSection for visual rhythm.
 */
export function PhotoStrip() {
  // Duplicate photos for seamless infinite scroll
  const allPhotos = [...stripPhotos, ...stripPhotos];

  return (
    <div className="relative h-[240px] w-full overflow-hidden border-y border-slate-800/50 md:h-[340px]">
      {/* Scrolling track */}
      <div
        className="animate-scroll-x flex h-full"
        style={{ willChange: "transform" }}
      >
        {allPhotos.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative h-full w-72 flex-shrink-0 md:w-[420px]"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Left vignette edge */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-950 to-transparent" />
      {/* Right vignette edge */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-950 to-transparent" />
    </div>
  );
}
