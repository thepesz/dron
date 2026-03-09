"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  ScanSearch,
  Box,
  Thermometer,
  Wind,
  TreePine,
  Camera,
} from "lucide-react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { useInView } from "@/lib/hooks/useInView";

/**
 * Services grid showing six drone service offerings.
 * Each card has a photo background, icon, title, and description
 * sourced from translations. Cards with a dedicated service page
 * include a "Learn more" link via the `slug` prop.
 *
 * Uses CSS-based entrance animations via useInView hook
 * instead of Framer Motion to reduce DOM node count and JS bundle.
 */

interface ServiceItem {
  key: string;
  icon: React.ReactNode;
  photo: string;
  /** Slug for the dedicated service landing page. Undefined = no dedicated page. */
  slug?: string;
}

const serviceItems: ServiceItem[] = [
  { key: "inspection", icon: <ScanSearch className="h-6 w-6" />, photo: "/images/dron1.jpg" },
  { key: "photogrammetry", icon: <Box className="h-6 w-6" />, photo: "/images/budynek3d1.jpg", slug: "photogrammetry" },
  { key: "thermal", icon: <Thermometer className="h-6 w-6" />, photo: "/images/pv1.jpg", slug: "thermal-imaging" },
  { key: "windTurbines", icon: <Wind className="h-6 w-6" />, photo: "/images/gsm1.jpg", slug: "wind-turbines" },
  { key: "wildlifeDamage", icon: <TreePine className="h-6 w-6" />, photo: "/images/agro1.jpg", slug: "wildlife-damage" },
  { key: "aerial", icon: <Camera className="h-6 w-6" />, photo: "/images/las1.jpg" },
];

export function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();
  const { ref: headerRef, isInView: headerInView } = useInView();

  return (
    <section
      id="services"
      className="section-padding border-t border-slate-800/50"
      aria-labelledby="services-heading"
    >
      <div className="container-wide">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`animate-on-scroll mb-14 text-center ${headerInView ? "in-view" : ""}`}
        >
          <h2 id="services-heading" className="heading-section">
            {t("heading")}
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">{t("subtitle")}</p>
        </div>

        {/* Service cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((item, index) => (
            <ServiceCard
              key={item.key}
              icon={item.icon}
              title={t(`items.${item.key}.title`)}
              description={t(`items.${item.key}.description`)}
              index={index}
              photo={item.photo}
              photoAlt={t(`items.${item.key}.photoAlt`)}
              href={item.slug ? `/${locale}/services/${item.slug}` : undefined}
              learnMoreLabel={item.slug ? t(`items.${item.key}.linkLabel`) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
