"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
  photo?: string;
  photos?: string[];
  photoAlt?: string;
  href?: string;
  learnMoreLabel?: string;
}

const INTERVAL = 5000; // ms between photo changes
const FADE_MS = 1200;  // CSS transition duration

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
  const hasPhoto = allPhotos.length > 0;
  const hasMultiple = allPhotos.length > 1;

  const [current, setCurrent] = useState(0);
  // Use a ref for the interval so cleanup is always reliable
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hasMultiple) return;

    // Spread cards evenly: card 0 starts at 0 ms, card 1 at INTERVAL/6, etc.
    const stagger = Math.round((index * INTERVAL) / 6);

    delayRef.current = setTimeout(() => {
      // Advance once after the stagger delay so cards are out of phase
      setCurrent((prev) => (prev + 1) % allPhotos.length);

      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % allPhotos.length);
      }, INTERVAL);
    }, stagger);

    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasMultiple, allPhotos.length, index]);

  return (
    <div
      ref={ref}
      className={`animate-on-scroll group relative h-[300px] overflow-hidden border border-slate-700/60 border-l-4 border-l-brand-500 bg-slate-900 transition-all duration-300 hover:border-slate-600 hover:shadow-lg hover:shadow-brand-500/10 ${
        isInView ? "in-view" : ""
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* All photos stacked — only `current` is opaque, rest are transparent.
          CSS opacity transition = smooth crossfade with no JS timing needed. */}
      {hasPhoto &&
        allPhotos.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? (photoAlt || title) : ""}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={{
              opacity: i === current ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
            }}
            loading="lazy"
          />
        ))}

      {/* Gradient always on top of photos */}
      {hasPhoto && (
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/50 to-black/15" />
      )}

      {/* Text content — above everything */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-600/15 text-brand-400 transition-colors group-hover:bg-brand-600/25 group-hover:text-brand-300">
          {icon}
        </div>
        <h3 className="mb-2 text-base font-semibold leading-snug text-white">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-zinc-300">{description}</p>
        {href && learnMoreLabel && (
          <Link
            href={href}
            className="mt-2 inline-flex min-h-[44px] items-center gap-1 py-1 text-xs font-medium text-brand-400 transition-colors hover:text-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {learnMoreLabel}
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
