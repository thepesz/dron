"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonialKeys = [
  "testimonial1",
  "testimonial2",
  "testimonial3",
] as const;

/**
 * Testimonials section with 3 client quote cards.
 * Dark card style consistent with the industrial service card aesthetic.
 * Uses left border accent and quote icon for visual hierarchy.
 */
export function TestimonialsSection() {
  const t = useTranslations("testimonials");

  return (
    <section
      id="testimonials"
      className="section-padding border-t border-slate-800/50"
      aria-labelledby="testimonials-heading"
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
          <h2 id="testimonials-heading" className="heading-section">
            {t("heading")}
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">{t("subtitle")}</p>
        </motion.div>

        {/* Testimonial cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonialKeys.map((key, index) => (
            <motion.blockquote
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative border border-slate-700/60 border-l-4 border-l-brand-500 bg-slate-900 p-6 sm:p-8"
            >
              {/* Quote icon */}
              <Quote className="mb-4 h-8 w-8 text-brand-500/30" />

              {/* Quote text */}
              <p className="mb-6 text-sm leading-relaxed text-zinc-300 italic">
                &ldquo;{t(`items.${key}.quote`)}&rdquo;
              </p>

              {/* Attribution */}
              <footer className="border-t border-slate-700/40 pt-4">
                <cite className="not-italic">
                  <p className="text-sm font-semibold text-white">
                    {t(`items.${key}.name`)}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {t(`items.${key}.company`)}
                  </p>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
