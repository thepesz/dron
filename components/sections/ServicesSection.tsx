"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  ScanSearch,
  Box,
  Thermometer,
  Wind,
  TreePine,
  Leaf,
} from "lucide-react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { useInView } from "@/lib/hooks/useInView";

interface ServiceItem {
  key: string;
  icon: React.ReactNode;
  photos: string[];
  slug?: string;
}

const serviceItems: ServiceItem[] = [
  {
    key: "inspection",
    icon: <ScanSearch className="h-6 w-6" />,
    photos: ["/images/dron1.jpg", "/images/surface.png", "/images/oblot.png"],
  },
  {
    key: "photogrammetry",
    icon: <Box className="h-6 w-6" />,
    photos: ["/images/budynek3d1.jpg", "/images/model1.png", "/images/model2.png"],
    slug: "photogrammetry",
  },
  {
    key: "thermal",
    icon: <Thermometer className="h-6 w-6" />,
    photos: ["/images/pv1.jpg"],
    slug: "thermal-imaging",
  },
  {
    key: "windTurbines",
    icon: <Wind className="h-6 w-6" />,
    photos: ["/images/gsm1.jpg"],
    slug: "wind-turbines",
  },
  {
    key: "wildlifeDamage",
    icon: <TreePine className="h-6 w-6" />,
    photos: ["/images/agro1.jpg"],
    slug: "wildlife-damage",
  },
  {
    key: "cropMonitoring",
    icon: <Leaf className="h-6 w-6" />,
    photos: ["/images/agro2.jpg", "/images/rosliny1.png", "/images/rosliny2.png"],
    slug: "crop-monitoring",
  },
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
        <div
          ref={headerRef}
          className={`animate-on-scroll mb-14 text-center ${headerInView ? "in-view" : ""}`}
        >
          <h2 id="services-heading" className="heading-section">
            {t("heading")}
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((item, index) => (
            <ServiceCard
              key={item.key}
              icon={item.icon}
              title={t(`items.${item.key}.title`)}
              description={t(`items.${item.key}.description`)}
              index={index}
              photos={item.photos}
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
