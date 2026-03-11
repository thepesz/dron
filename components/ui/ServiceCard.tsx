"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
  /** Single background photo — shorthand when only one image needed */
  photo?: string;
  /** Multiple photos that crossfade every 4 s */
  photos?: string[];
  /** Localized alt text for the background photo */
  photoAlt?: string;
  /** Optional link to a dedicated service landing page */
  href?: string;
  /** Label for the "Learn more" link */
  learnMoreLabel?: string;
}

/**
 * Industrial-style service card with optional photo background.
 *
 * When multiple `photos` are supplied the card crossfades between them
 * using a two-slot opacity technique: the "next" image fades in on top
 * of the "current" one, then they swap instantly at full opacity.
 * DOM stays at exactly 2 Image nodes regardless of array size.
 *
 * Start time is staggered by `index` so cards don't all transition
 * simultaneously.
 */
export function ServiceCard({
  icon,
  title,
  description,
  index,
  photo,
  photos,
  photoAlt,
  href,
  learnMoreLabel,
}: ServiceCardProps) {
  const { ref, isInView } = useInView();

  const allPhotos = photos ?? (photo ? [photo] : []);
  const hasMultiple = allPhotos.length > 1;
  const hasPhoto = allPhotos.length > 0;

  const [current, setCurrent] = useState(0);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    if (!hasMultiple) return;

    const INTERVAL = 4000;
    const FADE = 900;
    // Stagger so every card starts its cycle at a different time
    const startDelay = index * 800;

    const startTimeout = setTimeout(() => {
      const timer = setInterval(() => {
        setShowNext(true);
        setTimeout(() => {
          setCurrent((prev) => (prev + 1) % allPhotos.length);
          setShowNext(false);
        }, FADE);
      }, INTERVAL);
      return () => clearInterval(timer);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [hasMultiple, allPhotos.length, index]);

  const nextIdx = (current + 1) % allPhotos.length;

  return (
    <div
      ref={ref}
      className={`animate-on-scroll group relative border border-slate-700/60 border-l-4 border-l-brand-500 bg-slate-900 transition-all duration-300 hover:border-slate-600 hover:shadow-lg hover:shadow-brand-500/10 ${
        hasPhoto ? "min-h-[260px] overflow-hidden" : "p-6 sm:p-8"
      } ${isInView ? "in-view" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {hasPhoto && (
        <>
          {/* Slot A — current photo, always opaque */}
          <Image
            src={allPhotos[current]}
            alt={photoAlt || title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Slot B — next photo, fades in then becomes current */}
          {hasMultiple && (
            <Image
              src={allPhotos[nextIdx]}
              alt={photoAlt || title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{
                opacity: showNext ? 1 : 0,
                transition: "opacity 900ms ease-in-out",
              }}
              loading="lazy"
            />
          )}

          {/* Gradient overlay — always above both images, keeps text readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        </>
      )}

      {/* Content — z-10, always on top */}
      <div className={`relative z-10 ${hasPhoto ? "flex h-full min-h-[260px] flex-col justify-end p-6 sm:p-8" : ""}`}>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-600/10 text-brand-500 transition-colors group-hover:bg-brand-600/20 group-hover:text-brand-400">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className={`text-sm leading-relaxed ${hasPhoto ? "text-zinc-300" : "text-zinc-400"}`}>
          {description}
        </p>
        {href && learnMoreLabel && (
          <Link
            href={href}
            className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 rounded py-2 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {learnMoreLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
