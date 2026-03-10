/**
 * Mock job listings for the drone operator job board.
 * These are static placeholder data for the UI mockup.
 * In production, this data would come from a database/API.
 */

export type JobType = "seeking_operator" | "seeking_job";

export interface JobListing {
  id: string;
  type: JobType;
  title: string;
  location: string;
  lat: number;
  lng: number;
  radiusKm: number;
  services: string[];
  drones: string[];
  licenses: string[];
  rate: string;
  rateType: "day" | "project" | "negotiable";
  description: string;
  postedDaysAgo: number;
  contactName: string;
  /** Province (voivodeship) */
  province: string;
}

/**
 * 8 realistic mock job listings from the Szczecin region.
 * Mix of "seeking operator" (client posts) and "seeking job" (operator posts).
 * All coordinates are real locations in zachodniopomorskie voivodeship.
 */
export const mockJobs: JobListing[] = [
  {
    id: "1",
    type: "seeking_operator",
    title: "Fotogrametria terenu inwestycyjnego — Szczecin Prawobrzeże",
    location: "Szczecin",
    lat: 53.4285,
    lng: 14.5528,
    radiusKm: 10,
    services: ["photogrammetry"],
    drones: ["dji_mavic", "dji_matrice"],
    licenses: ["a1a3", "a2"],
    rate: "800",
    rateType: "day",
    description:
      "Poszukujemy operatora drona do wykonania nalotu fotogrametrycznego nad terenem inwestycyjnym o powierzchni ok. 12 ha w Szczecinie Prawobrzeże. Wymagane dostarczenie ortofotomapy i modelu 3D terenu w formacie GeoTIFF i OBJ. Termin realizacji: 2 tygodnie.",
    postedDaysAgo: 1,
    contactName: "BudInvest Sp. z o.o.",
    province: "zachodniopomorskie",
  },
  {
    id: "2",
    type: "seeking_job",
    title: "Doświadczony operator — DJI Matrice 350 RTK + kamera termowizyjna",
    location: "Szczecin",
    lat: 53.44,
    lng: 14.53,
    radiusKm: 50,
    services: ["thermal", "inspection", "photogrammetry"],
    drones: ["dji_matrice"],
    licenses: ["a1a3", "a2", "sts"],
    rate: "1200",
    rateType: "day",
    description:
      "Jestem certyfikowanym operatorem BVLOS z 4-letnim doświadczeniem w inspekcjach przemysłowych. Dysponuję dronem DJI Matrice 350 RTK z kamerą termowizyjną H20T oraz pełnym ubezpieczeniem OC. Realizuję zlecenia na terenie całego województwa zachodniopomorskiego.",
    postedDaysAgo: 3,
    contactName: "Marcin K.",
    province: "zachodniopomorskie",
  },
  {
    id: "3",
    type: "seeking_operator",
    title: "Inspekcja dachu hali magazynowej — Stargard",
    location: "Stargard",
    lat: 53.3364,
    lng: 15.0491,
    radiusKm: 20,
    services: ["inspection"],
    drones: ["dji_mavic", "dji_phantom"],
    licenses: ["a1a3"],
    rate: "500",
    rateType: "project",
    description:
      "Potrzebujemy inspekcji dachu hali magazynowej o powierzchni ok. 2000 m². Raport fotograficzny z oznaczeniem uszkodzeń pokrycia dachowego. Jeden dzień pracy, preferowany termin: najbliższy tydzień.",
    postedDaysAgo: 2,
    contactName: "LogiPark Stargard",
    province: "zachodniopomorskie",
  },
  {
    id: "4",
    type: "seeking_operator",
    title: "Termowizja instalacji PV — farma fotowoltaiczna Goleniów",
    location: "Goleniów",
    lat: 53.5647,
    lng: 14.8282,
    radiusKm: 15,
    services: ["thermal"],
    drones: ["dji_matrice"],
    licenses: ["a1a3", "a2"],
    rate: "1500",
    rateType: "day",
    description:
      "Zleceniodawca poszukuje operatora z kamerą termowizyjną do inspekcji farmy fotowoltaicznej o mocy 5 MW w okolicach Goleniowa. Wymagane doświadczenie w inspekcjach PV i dostarczenie raportu z lokalizacją hot-spotów. Kamera termowizyjna po stronie operatora.",
    postedDaysAgo: 5,
    contactName: "SolarTech Energy",
    province: "zachodniopomorskie",
  },
  {
    id: "5",
    type: "seeking_job",
    title: "Operator drona — zdjęcia i filmy 4K, licencja A2",
    location: "Koszalin",
    lat: 54.1944,
    lng: 16.1715,
    radiusKm: 80,
    services: ["aerial", "photogrammetry"],
    drones: ["dji_mavic"],
    licenses: ["a1a3", "a2"],
    rate: "600",
    rateType: "day",
    description:
      "Oferuję usługi operatora drona DJI Mavic 3 Pro — zdjęcia lotnicze, filmy 4K, fotogrametria. Doświadczenie w dokumentacji budowlanej i nieruchomości. Mogę dojechać na terenie województwa zachodniopomorskiego i pomorskiego.",
    postedDaysAgo: 7,
    contactName: "Tomasz W.",
    province: "zachodniopomorskie",
  },
  {
    id: "6",
    type: "seeking_operator",
    title: "Szacowanie szkód łowieckich — pole kukurydzy, Pyrzyce",
    location: "Pyrzyce",
    lat: 53.1449,
    lng: 14.8936,
    radiusKm: 30,
    services: ["wildlife_damage"],
    drones: ["dji_mavic", "dji_phantom"],
    licenses: ["a1a3"],
    rate: "do negocjacji",
    rateType: "negotiable",
    description:
      "Pilnie poszukujemy operatora drona do oszacowania szkód łowieckich na polu kukurydzy o powierzchni ok. 8 ha w okolicach Pyrzyc. Wymagane dostarczenie ortofotomapy z obliczeniem procentu uszkodzeń. Czas realizacji: jak najszybciej.",
    postedDaysAgo: 0,
    contactName: 'Koło Łowieckie "Dzik"',
    province: "zachodniopomorskie",
  },
  {
    id: "7",
    type: "seeking_operator",
    title: "Inspekcja wizualna turbin wiatrowych — farma Darłowo",
    location: "Darłowo",
    lat: 54.4248,
    lng: 16.4112,
    radiusKm: 25,
    services: ["inspection", "wind_turbines"],
    drones: ["dji_matrice"],
    licenses: ["a1a3", "a2", "sts"],
    rate: "2500",
    rateType: "day",
    description:
      "Poszukujemy doświadczonego operatora do inspekcji wizualnej 6 turbin wiatrowych na farmie pod Darłowem. Wymagane: dron z kamerą min. 45 MP, doświadczenie w inspekcjach turbin, ubezpieczenie OC. Przewidywany czas realizacji: 2-3 dni.",
    postedDaysAgo: 4,
    contactName: "WindPower Polska",
    province: "zachodniopomorskie",
  },
  {
    id: "8",
    type: "seeking_job",
    title: "Operator BVLOS — inspekcje liniowe i mapowanie, Police/Szczecin",
    location: "Police",
    lat: 53.5544,
    lng: 14.5689,
    radiusKm: 60,
    services: ["inspection", "photogrammetry", "thermal"],
    drones: ["dji_matrice", "fixed_wing"],
    licenses: ["a1a3", "a2", "sts"],
    rate: "1800",
    rateType: "day",
    description:
      "Certyfikowany operator BVLOS z doświadczeniem w inspekcjach liniowych (gazociągi, linie energetyczne) i mapowaniu dużych terenów. Dysponuję DJI Matrice 300 RTK oraz dronem stałopłatowym do misji na dużych areałach. Pełne ubezpieczenie OC na kwotę 1 mln PLN.",
    postedDaysAgo: 6,
    contactName: "Krzysztof M.",
    province: "zachodniopomorskie",
  },
];

/** Helper to get a single job by ID */
export function getJobById(id: string): JobListing | undefined {
  return mockJobs.find((job) => job.id === id);
}
