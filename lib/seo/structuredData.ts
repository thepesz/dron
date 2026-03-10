import { type Locale, locales, baseUrl } from "@/lib/i18n/config";

/**
 * Localised business descriptions for JSON-LD structured data.
 */
const descriptions: Record<Locale, string> = {
  pl: "Profesjonalne usługi dronowe w Polsce. Inspekcje dronem, fotogrametria, termowizja, modele 3D, szacowanie szkód łowieckich i monitorowanie stanu zdrowotnego zbóż.",
  en: "Professional drone services across Poland and Germany. Drone inspections, photogrammetry, thermal imaging, 3D models, wildlife damage estimation and crop health monitoring.",
  de: "Professionelle Drohnendienstleistungen in Polen und Deutschland. Inspektionen, Fotogrammetrie, Thermografie, 3D-Modelle, Wildschadenbewertung und Pflanzengesundheitsüberwachung.",
};

/**
 * Map locale codes to BCP 47 language tags for Schema.org inLanguage.
 */
const languageTags: Record<Locale, string> = {
  pl: "pl-PL",
  en: "en-US",
  de: "de-DE",
};

// IMPORTANT: Keep this data consistent with your Google Business Profile:
// Website: https://loty-dronem.pl
// Business name: Aero Metric
// Category: Drone Inspection Service / Aerial Photography Service
// Phone: +48 123 456 789
// Email: info@loty-dronem.pl
// Location: Szczecin, Poland
// Service area: Poland, Germany

/**
 * Generates JSON-LD structured data as a @graph array containing:
 * 1. Combined LocalBusiness + ProfessionalService entity
 * 2. WebSite entity for sitelinks / search appearance
 *
 * The graph format is recommended by Google for pages with multiple
 * entity types. Each entity is cross-referenced via @id.
 *
 * Replace placeholder values (coordinates, address details, phone number)
 * with real business information before going live.
 */
export function generateStructuredData(locale: Locale): string {
  const url = `${baseUrl}/${locale}`;

  const businessEntity = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${baseUrl}/#business`,
    name: "Aero Metric",
    url,
    description: descriptions[locale],
    logo: {
      "@type": "ImageObject",
      "@id": `${baseUrl}/#logo`,
      url: `${baseUrl}/images/logo.png`,
      contentUrl: `${baseUrl}/images/logo.png`,
      caption: "Aero Metric",
      width: 140,
      height: 48,
    },
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/images/glownefoto.jpg`,
      contentUrl: `${baseUrl}/images/glownefoto.jpg`,
    },
    email: "info@loty-dronem.pl",
    telephone: "+48 123 456 789",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Szczecin",
      addressRegion: "zachodniopomorskie",
      postalCode: "70-001",
      addressCountry: "PL",
      // TODO: Replace postalCode and add streetAddress with real values before going live:
      // streetAddress: "ul. Przykladowa 1",
    },
    geo: {
      "@type": "GeoCoordinates",
      // TODO: Replace with actual business coordinates:
      latitude: 53.4285,
      longitude: 14.5528,
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Poland",
        sameAs: "https://www.wikidata.org/wiki/Q36",
      },
      {
        "@type": "Country",
        name: "Germany",
        sameAs: "https://www.wikidata.org/wiki/Q183",
      },
      {
        "@type": "AdministrativeArea",
        name: "Zachodniopomorskie",
        containedInPlace: { "@type": "Country", name: "Poland" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Wielkopolskie",
        containedInPlace: { "@type": "Country", name: "Poland" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Dolnośląskie",
        containedInPlace: { "@type": "Country", name: "Poland" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Mazowieckie",
        containedInPlace: { "@type": "Country", name: "Poland" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Lubuskie",
        containedInPlace: { "@type": "Country", name: "Poland" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Brandenburg",
        containedInPlace: { "@type": "Country", name: "Germany" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Mecklenburg-Vorpommern",
        containedInPlace: { "@type": "Country", name: "Germany" },
      },
    ],
    serviceType: [
      "Drone Inspection",
      "Photogrammetry",
      "Thermal Imaging",
      "3D Modeling",
      "Wind Turbine Inspection",
      "Wildlife Damage Estimation",
      "Aerial Photography",
      "Crop Health Monitoring",
      "NDVI Mapping",
      "Precision Agriculture",
    ],
    availableLanguage: [
      { "@type": "Language", name: "Polish", alternateName: "pl" },
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "German", alternateName: "de" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$",
    // TODO: Add real social media profile URLs before going live:
    // sameAs: ["https://linkedin.com/company/aerometric", "https://instagram.com/aerometric"],
  };

  const websiteEntity = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Aero Metric",
    publisher: { "@id": `${baseUrl}/#business` },
    inLanguage: locales.map((loc) => languageTags[loc]),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [businessEntity, websiteEntity],
  };

  return JSON.stringify(graph);
}
