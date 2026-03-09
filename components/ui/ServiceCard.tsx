"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/lib/hooks/useInView";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
  /** Optional background photo path (e.g. "/images/dron1.jpg") */
  photo?: string;
  /** Localized alt text for the background photo (from translations) */
  photoAlt?: string;
  /** Optional link to a dedicated service landing page */
  href?: string;
  /** Label for the "Learn more" link (from translations) */
  learnMoreLabel?: string;
}

/**
 * Industrial-style service card with left accent border, icon, title,
 * and description. Uses CSS-based entrance animations via useInView
 * instead of Framer Motion to reduce DOM node count.
 *
 * When a `photo` prop is provided, the card displays the image as a
 * background with a dark gradient overlay. Icon, title, and description
 * are rendered on top. The image scales subtly on hover for a premium feel.
 *
 * When `href` and `learnMoreLabel` are provided, a "Learn more" link
 * is rendered below the description, pointing to the dedicated service page.
 *
 * Design matches dark B2B industrial inspection aesthetic.
 */
export function ServiceCard({
  icon,
  title,
  description,
  index,
  photo,
  photoAlt,
  href,
  learnMoreLabel,
}: ServiceCardProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`animate-on-scroll group relative border border-slate-700/60 border-l-4 border-l-brand-500 bg-slate-900 transition-all duration-300 hover:border-slate-600 hover:shadow-lg hover:shadow-brand-500/10 ${
        photo ? "min-h-[260px] overflow-hidden" : "p-6 sm:p-8"
      } ${isInView ? "in-view" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Background photo (when provided) */}
      {photo && (
        <>
          <Image
            src={photo}
            alt={photoAlt ?? ""}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </>
      )}

      {/* Content — always on top */}
      <div className={`relative z-10 ${photo ? "flex h-full min-h-[260px] flex-col justify-end p-6 sm:p-8" : ""}`}>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-600/10 text-brand-500 transition-colors group-hover:bg-brand-600/20 group-hover:text-brand-400">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className={`text-sm leading-relaxed ${photo ? "text-zinc-300" : "text-zinc-400"}`}>
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
