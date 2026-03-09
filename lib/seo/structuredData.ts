import { type Locale, locales, baseUrl } from "@/lib/i18n/config";

/**
 * Localised business descriptions for JSON-LD structured data.
 */
const descriptions: Record<Locale, string> = {
  pl: "Profesjonalne usługi dronowe w Szczecinie. Inspekcje dronem, fotogrametria, termowizja, modele 3D i szacowanie szkód łowieckich.",
  en: "Professional drone services in Szczecin, Poland. Drone inspections, photogrammetry, thermal imaging, 3D models and wildlife damage estimation.",
  de: "Professionelle Drohnendienstleistungen in Stettin (Szczecin), Polen. Drohneninspektionen, Fotogrammetrie, Thermografie, 3D-Modelle und Wildschadenbewertung.",
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
// Email: kontakt@aerometric.pl
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
    },
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/images/glownefoto.png`,
      contentUrl: `${baseUrl}/images/glownefoto.png`,
    },
    email: "kontakt@aerometric.pl",
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
      },
      {
        "@type": "Country",
        name: "Germany",
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
    ],
    availableLanguage: ["Polish", "English", "German"],
    openingHoursSpecification: {
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
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [businessEntity, websiteEntity],
  };

  return JSON.stringify(graph);
}
