import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import {
  MapPin,
  CheckCircle2,
  ArrowRight,
  Phone,
  Building2,
  Scan,
  Thermometer,
  Wind,
  TreePine,
  Camera,
  Wheat,
} from "lucide-react";
import type { CityData } from "@/lib/cities/cityData";
import type { Locale } from "@/lib/i18n/config";
import { baseUrl } from "@/lib/i18n/config";

interface CityPageContentProps {
  city: CityData;
  locale: Locale;
}

/**
 * Service definitions shown on city pages.
 * Services with a `slug` value link to their dedicated service page (/services/{slug}).
 * Services without a dedicated page link to the homepage services section.
 */
interface ServiceDef {
  icon: typeof Scan;
  /** Slug of the dedicated service page, or null if no dedicated page exists. */
  pageSlug: string | null;
}

const serviceDefs: ServiceDef[] = [
  { icon: Scan, pageSlug: null },
  { icon: Building2, pageSlug: "photogrammetry" },
  { icon: Thermometer, pageSlug: "thermal-imaging" },
  { icon: Wind, pageSlug: "wind-turbines" },
  { icon: TreePine, pageSlug: "wildlife-damage" },
  { icon: Wheat, pageSlug: "crop-monitoring" },
  { icon: Camera, pageSlug: null },
];

/**
 * Localized service card content for each city page.
 * Order matches `serviceDefs` array above.
 */
const serviceCards = {
  pl: [
    {
      title: "Inspekcje dronem",
      desc: "Inspekcje budowlane, przemysłowe i infrastrukturalne z powietrza",
    },
    {
      title: "Fotogrametria i modele 3D",
      desc: "Ortofotomapy, chmury punktów i modele 3D z dokładnością centymetrową",
    },
    {
      title: "Termowizja dronem",
      desc: "Diagnostyka termiczna budynków, instalacji i paneli fotowoltaicznych",
    },
    {
      title: "Inspekcja turbin wiatrowych",
      desc: "Wizualne inspekcje łopat i elementów konstrukcji turbin",
    },
    {
      title: "Szacowanie szkód łowieckich",
      desc: "Operaty szacunkowe, pomiar powierzchni, dokumentacja PDF",
    },
    {
      title: "Monitoring upraw (NDVI)",
      desc: "Mapy NDVI, ocena kondycji zbóż i roślin, precyzyjne rolnictwo",
    },
    {
      title: "Fotografia i wideo lotnicze",
      desc: "Profesjonalne zdjęcia i filmy z drona dla dokumentacji i marketingu",
    },
  ],
  en: [
    {
      title: "Drone inspections",
      desc: "Building, industrial and infrastructure inspections from the air",
    },
    {
      title: "Photogrammetry & 3D models",
      desc: "Orthophotos, point clouds and 3D models with centimetre accuracy",
    },
    {
      title: "Thermal imaging",
      desc: "Thermal diagnostics for buildings, installations and PV panels",
    },
    {
      title: "Wind turbine inspection",
      desc: "Visual inspections of turbine blades and structural elements",
    },
    {
      title: "Wildlife damage estimation",
      desc: "PDF reports, area measurement, compliant documentation",
    },
    {
      title: "Crop monitoring (NDVI)",
      desc: "NDVI maps, crop health assessment, precision agriculture",
    },
    {
      title: "Aerial photography & video",
      desc: "Professional drone photos and video for documentation and marketing",
    },
  ],
  de: [
    {
      title: "Drohneninspektionen",
      desc: "Bau-, Industrie- und Infrastrukturinspektionen aus der Luft",
    },
    {
      title: "Fotogrammetrie & 3D-Modelle",
      desc: "Orthophotos, Punktwolken und 3D-Modelle mit Zentimetergenauigkeit",
    },
    {
      title: "Thermografie",
      desc: "Thermische Diagnose für Gebäude, Anlagen und PV-Paneele",
    },
    {
      title: "Windkraftinspektion",
      desc: "Visuelle Inspektionen von Turbinenschaufeln und Konstruktionselementen",
    },
    {
      title: "Wildschadenbewertung",
      desc: "PDF-Gutachten, Flächenvermessung, konforme Dokumentation",
    },
    {
      title: "Erntemonitoring (NDVI)",
      desc: "NDVI-Karten, Zustandsbewertung, Präzisionslandwirtschaft",
    },
    {
      title: "Luftfotografie & Video",
      desc: "Professionelle Drohnenfotos und -videos für Dokumentation und Marketing",
    },
  ],
} as const;

/** UI labels that are not city-specific — static per locale. */
const labels = {
  pl: {
    heroSub: "Profesjonalne usługi dronowe",
    servicesHeading: "Usługi dronowe dostępne w mieście",
    industriesHeading: "Kluczowe branże w regionie",
    contextHeading: "Aero Metric w regionie",
    ctaHeading: "Zamów usługę dronową",
    ctaDesc:
      "Skontaktuj się z nami — wycenimy Twoje zlecenie bezpłatnie i umówimy termin lotu.",
    ctaBtn: "Napisz do nas",
    phone: "Zadzwoń",
    backHome: "Strona główna",
    learnMore: "Dowiedz się więcej",
  },
  en: {
    heroSub: "Professional drone services",
    servicesHeading: "Drone services available in",
    industriesHeading: "Key industries in the region",
    contextHeading: "Aero Metric in the region",
    ctaHeading: "Request a drone service",
    ctaDesc:
      "Contact us — we will quote your project for free and arrange a flight date.",
    ctaBtn: "Contact us",
    phone: "Call us",
    backHome: "Homepage",
    learnMore: "Learn more",
  },
  de: {
    heroSub: "Professionelle Drohnendienstleistungen",
    servicesHeading: "Drohnendienstleistungen in",
    industriesHeading: "Schlüsselindustrien in der Region",
    contextHeading: "Aero Metric in der Region",
    ctaHeading: "Drohnenservice anfragen",
    ctaDesc:
      "Kontaktieren Sie uns — wir erstellen kostenlos ein Angebot und vereinbaren einen Flugtermin.",
    ctaBtn: "Kontakt",
    phone: "Anrufen",
    backHome: "Startseite",
    learnMore: "Mehr erfahren",
  },
} as const;

/**
 * City landing page content — Server Component (no "use client").
 *
 * Renders a full SEO-optimised page for a specific city with:
 * - Unique H1 with city name
 * - City-specific intro paragraph
 * - Services grid linking to dedicated service pages
 * - Industries and local context sections
 * - CTA section linking to contact form
 * - JSON-LD structured data for LocalBusiness + areaServed
 *
 * All content comes from cityData.ts — unique per city, not templated.
 */
export function CityPageContent({ city, locale }: CityPageContentProps) {
  const lang = locale as "pl" | "en" | "de";
  const l = labels[lang];
  const name = city.names[lang];
  const region = city.region[lang];
  const services = serviceCards[lang];

  // JSON-LD structured data — LocalBusiness with city-specific areaServed
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "Aero Metric",
    url: `${baseUrl}/${locale}/lokalizacje/${city.slug}`,
    description: city.seo.descriptions[lang],
    areaServed: {
      "@type": "City",
      name: name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: region,
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Szczecin",
      addressCountry: "PL",
    },
    telephone: "+48 123 456 789",
    email: "info@loty-dronem.pl",
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.lat,
      longitude: city.lng,
    },
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="min-h-screen bg-slate-950 pt-20 lg:pt-24">
        {/* Hero section */}
        <section className="bg-slate-900 py-16 sm:py-20">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb navigation */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-sm text-slate-400"
            >
              <Link
                href={`/${locale}`}
                className="transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {l.backHome}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-300">{name}</span>
            </nav>

            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-400">
              {l.heroSub}
            </p>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {lang === "pl"
                ? `Usługi dronowe ${name}`
                : lang === "en"
                  ? `Drone services in ${name}`
                  : `Drohnendienstleistungen in ${name}`}
            </h1>
            <p className="mb-2 flex items-center gap-2 text-lg text-slate-300">
              <MapPin className="h-5 w-5 shrink-0 text-brand-500" />
              {name}, {region}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300">
              {city.intro[lang]}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}#contact`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                {l.ctaBtn}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+48123456789"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <Phone className="h-4 w-4" />
                {l.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-16 sm:py-20">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
              {l.servicesHeading} {name}
            </h2>
            <p className="mb-10 max-w-2xl text-slate-400">
              {city.intro[lang].split(".")[0]}.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.map((svc, i) => {
                const def = serviceDefs[i];
                const Icon = def.icon;
                const href = def.pageSlug
                  ? `/${locale}/services/${def.pageSlug}`
                  : `/${locale}#services`;

                return (
                  <Link
                    key={svc.title}
                    href={href}
                    className="group flex flex-col gap-3 border-l-4 border-l-brand-500 bg-slate-900 p-5 transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <Icon className="h-6 w-6 text-brand-500" />
                    <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-brand-400">
                      {svc.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-400">
                      {svc.desc}
                    </p>
                    <span className="mt-auto flex items-center gap-1 text-xs font-medium text-brand-500 transition-colors group-hover:text-brand-400">
                      {l.learnMore}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Industries + local context */}
        <section className="border-t border-slate-800 bg-slate-900 py-16 sm:py-20">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Industries */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-white">
                  {l.industriesHeading}
                </h2>
                <ul className="space-y-3">
                  {city.industries[lang].map((industry) => (
                    <li
                      key={industry}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-500" />
                      <span className="text-slate-300">{industry}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Local context */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-white">
                  {l.contextHeading}
                </h2>
                <p className="leading-relaxed text-slate-300">
                  {city.localContext[lang]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-700 py-16">
          <div className="container-wide px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
              {l.ctaHeading} — {name}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-brand-100">
              {l.ctaDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}#contact`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-700"
              >
                {l.ctaBtn}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+48123456789"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-brand-400 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-700"
              >
                <Phone className="h-4 w-4" />
                +48 123 456 789
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
