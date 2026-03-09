"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const statKeys = ["years", "projects", "specializations", "area"] as const;

/**
 * Statistics section displaying 4 key numbers/facts about the company.
 * Large orange accent numbers with descriptive labels below.
 * Placed between Services and WhyChooseUs for trust-building.
 */
export function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section
      className="border-t border-slate-800/50 bg-slate-900/60 px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      aria-label={t("heading")}
    >
      <div className="container-wide">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {statKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-bold tracking-tight text-brand-500 sm:text-4xl lg:text-5xl">
                {t(`items.${key}.value`)}
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-400 sm:text-base">
                {t(`items.${key}.label`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
