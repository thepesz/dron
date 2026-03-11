/**
 * City data configuration for locale-specific city landing pages.
 *
 * Each city entry contains:
 * - Slug for URL routing (/lokalizacje/{slug})
 * - Localized city and region names
 * - Coordinates for potential map integration
 * - SEO metadata (title + description) per locale
 * - Intro paragraph with unique, city-specific content
 * - Key industries in the region
 * - Local context paragraph explaining Aero Metric's presence
 *
 * All content is stored here rather than in translation files because
 * each city has completely unique copy — not templated boilerplate.
 * This ensures strong local SEO with differentiated content per page.
 */

export interface CityData {
  slug: string;
  names: { pl: string; en: string; de: string };
  region: { pl: string; en: string; de: string };
  lat: number;
  lng: number;
  seo: {
    titles: { pl: string; en: string; de: string };
    descriptions: { pl: string; en: string; de: string };
  };
  intro: { pl: string; en: string; de: string };
  industries: { pl: string[]; en: string[]; de: string[] };
  localContext: { pl: string; en: string; de: string };
}

export const cities: CityData[] = [
  {
    slug: "warszawa",
    names: { pl: "Warszawa", en: "Warsaw", de: "Warschau" },
    region: { pl: "Mazowieckie", en: "Masovia", de: "Masowien" },
    lat: 52.2297,
    lng: 21.0122,
    seo: {
      titles: {
        pl: "Usługi dronowe Warszawa | Inspekcje, fotogrametria, termowizja",
        en: "Drone Services Warsaw | Inspections, Photogrammetry, Thermal Imaging",
        de: "Drohnendienstleistungen Warschau | Inspektionen und Fotogrammetrie",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Warszawie i na Mazowszu. Inspekcje budowlane, fotogrametria, termowizja, modele 3D i monitoring upraw. Aero Metric — operatorzy z uprawnieniami.",
        en: "Professional drone services in Warsaw and Masovia region. Building inspections, photogrammetry, thermal imaging and crop monitoring. Licensed drone operators.",
        de: "Professionelle Drohnendienstleistungen in Warschau und Masowien. Bauinspektionen, Fotogrammetrie, Thermografie und Erntemonitoring.",
      },
    },
    intro: {
      pl: "Warszawa to największe miasto i stolica Polski — centrum budownictwa, infrastruktury i inwestycji. Dynamicznie rozwijająca się metropolia generuje ogromne zapotrzebowanie na precyzyjne inspekcje budowlane, monitoring inwestycji, dokumentację fotogrametryczną i termowizyjną. Aero Metric realizuje zlecenia dronowe na terenie Warszawy i całego województwa mazowieckiego.",
      en: "Warsaw is Poland's largest city and capital — a hub of construction, infrastructure and investment. The rapidly developing metropolis creates enormous demand for precision building inspections, investment monitoring, photogrammetric and thermal documentation. Aero Metric carries out drone assignments throughout Warsaw and the entire Masovian region.",
      de: "Warschau ist Polens größte Stadt und Hauptstadt — ein Zentrum für Bauwesen, Infrastruktur und Investitionen. Die sich dynamisch entwickelnde Metropole erzeugt enormen Bedarf an präzisen Bauinspektionen, Investitionsüberwachung sowie fotogrammetrischer und thermischer Dokumentation. Aero Metric führt Drohneneinsätze in Warschau und der gesamten Woiwodschaft Masowien durch.",
    },
    industries: {
      pl: [
        "Budownictwo i deweloperzy",
        "Infrastruktura miejska",
        "Energetyka i utility",
        "Ubezpieczenia i rzeczoznawstwo",
        "Marketing i reklama",
      ],
      en: [
        "Construction and developers",
        "Urban infrastructure",
        "Energy and utilities",
        "Insurance and appraisal",
        "Marketing and advertising",
      ],
      de: [
        "Bauwesen und Projektentwicklung",
        "Städtische Infrastruktur",
        "Energie und Versorgung",
        "Versicherung und Gutachten",
        "Marketing und Werbung",
      ],
    },
    localContext: {
      pl: "Warszawa to rynek z największą w Polsce liczbą inwestycji deweloperskich i infrastrukturalnych. Inspekcje dronem są tu szczególnie przydatne przy dokumentacji wysokich budynków, mostów, wiaduktów i stref przemysłowych. Obsługujemy klientów z Warszawy, Piaseczna, Pruszkowa, Legionowa, Wołomina i całego Mazowsza.",
      en: "Warsaw is Poland's market with the highest number of development and infrastructure investments. Drone inspections are particularly useful for documenting tall buildings, bridges, viaducts and industrial zones. We serve clients from Warsaw, Piaseczno, Pruszków, Legionowo, Wołomin and the entire Masovian region.",
      de: "Warschau ist der Markt mit den meisten Entwicklungs- und Infrastrukturinvestitionen in Polen. Drohneninspektionen sind besonders nützlich für die Dokumentation von Hochhäusern, Brücken, Viadukten und Industriegebieten. Wir betreuen Kunden aus Warschau, Piaseczno, Pruszków, Legionowo und der gesamten Woiwodschaft Masowien.",
    },
  },
  {
    slug: "wroclaw",
    names: { pl: "Wrocław", en: "Wrocław", de: "Breslau" },
    region: {
      pl: "Dolnośląskie",
      en: "Lower Silesia",
      de: "Niederschlesien",
    },
    lat: 51.1079,
    lng: 17.0385,
    seo: {
      titles: {
        pl: "Usługi dronowe Wrocław | Inspekcje dronem na Dolnym Śląsku",
        en: "Drone Services Wrocław | Inspections & Photogrammetry in Lower Silesia",
        de: "Drohnendienstleistungen Breslau | Inspektionen in Niederschlesien",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe we Wrocławiu i na Dolnym Śląsku. Inspekcje przemysłowe, fotogrametria, termowizja, modele 3D. Szybka realizacja, operatorzy z uprawnieniami.",
        en: "Professional drone services in Wrocław and Lower Silesia. Industrial inspections, photogrammetry, thermal imaging and 3D models. Fast turnaround, licensed operators.",
        de: "Professionelle Drohnendienstleistungen in Breslau und Niederschlesien. Industrieinspektionen, Fotogrammetrie und Thermografie. Lizenzierte Piloten.",
      },
    },
    intro: {
      pl: "Wrocław to jedno z największych centrów przemysłowych i technologicznych Polski. Rozwinięty sektor motoryzacyjny (Volkswagen, Volvo), logistyczny i budowlany generuje duże zapotrzebowanie na inspekcje dronem, fotogrametrię terenów inwestycyjnych i monitoring obiektów przemysłowych. Aero Metric obsługuje klientów z Wrocławia i całego Dolnego Śląska.",
      en: "Wrocław is one of Poland's largest industrial and technological centres. A developed automotive (Volkswagen, Volvo), logistics and construction sector generates high demand for drone inspections, photogrammetric surveys and industrial facility monitoring. Aero Metric serves clients from Wrocław and all of Lower Silesia.",
      de: "Breslau ist eines der größten Industrie- und Technologiezentren Polens. Der entwickelte Automobil- (Volkswagen, Volvo), Logistik- und Bausektor erzeugt hohe Nachfrage nach Drohneninspektionen, fotogrammetrischen Vermessungen und industriellem Objektmonitoring. Wir bedienen Kunden aus Breslau und ganz Niederschlesien.",
    },
    industries: {
      pl: [
        "Przemysł motoryzacyjny",
        "Logistyka i magazyny",
        "Budownictwo",
        "Energetyka odnawialna",
        "Rolnictwo",
      ],
      en: [
        "Automotive industry",
        "Logistics and warehousing",
        "Construction",
        "Renewable energy",
        "Agriculture",
      ],
      de: [
        "Automobilindustrie",
        "Logistik und Lager",
        "Bauwesen",
        "Erneuerbare Energien",
        "Landwirtschaft",
      ],
    },
    localContext: {
      pl: "Dolny Śląsk to region z dużym udziałem terenów rolniczych i przemysłowych, gdzie inspekcje dronem i fotogrametria są coraz powszechniejsze. Obsługujemy Wrocław, Legnicę, Jelenią Górę, Wałbrzych i całe województwo dolnośląskie.",
      en: "Lower Silesia is a region with extensive agricultural and industrial areas where drone inspections and photogrammetry are increasingly common. We serve Wrocław, Legnica, Jelenia Góra, Wałbrzych and the entire Lower Silesian voivodeship.",
      de: "Niederschlesien ist eine Region mit umfangreichen Landwirtschafts- und Industriegebieten, in denen Drohneninspektionen und Fotogrammetrie immer häufiger werden. Wir betreuen Breslau, Liegnitz, Hirschberg, Waldenburg und die gesamte Woiwodschaft.",
    },
  },
  {
    slug: "poznan",
    names: { pl: "Poznań", en: "Poznań", de: "Posen" },
    region: {
      pl: "Wielkopolskie",
      en: "Greater Poland",
      de: "Großpolen",
    },
    lat: 52.4064,
    lng: 16.9252,
    seo: {
      titles: {
        pl: "Usługi dronowe Poznań | Fotogrametria i monitoring upraw Wielkopolska",
        en: "Drone Services Poznań | Photogrammetry & Crop Monitoring in Greater Poland",
        de: "Drohnendienstleistungen Posen | Fotogrammetrie und Erntemonitoring Großpolen",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Poznaniu i Wielkopolsce. Fotogrametria, inspekcje, monitoring stanu zdrowotnego zbóż, mapy NDVI, szacowanie szkód łowieckich. Cała Wielkopolska.",
        en: "Professional drone services in Poznań and Greater Poland. Photogrammetry, inspections, crop health monitoring, NDVI maps and wildlife damage estimation. Covering all of Greater Poland.",
        de: "Professionelle Drohnendienstleistungen in Posen und Großpolen. Fotogrammetrie, Inspektionen, Erntemonitoring und NDVI-Karten.",
      },
    },
    intro: {
      pl: "Poznań leży w centrum Wielkopolski — jednego z najważniejszych regionów rolniczych Polski. Tutejsze duże gospodarstwa rolne i przedsiębiorstwa agrotechniczne korzystają z dronów do monitorowania stanu zdrowotności zbóż, tworzenia map NDVI i szacowania szkód łowieckich. Aero Metric obsługuje klientów z Poznania i całego województwa wielkopolskiego.",
      en: "Poznań is located in the heart of Greater Poland — one of Poland's most important agricultural regions. Large local farms and agro-technical enterprises use drones for crop health monitoring, NDVI mapping and wildlife damage estimation. Aero Metric serves clients from Poznań and all of Greater Poland.",
      de: "Posen liegt im Herzen Großpolens — einer der wichtigsten Agrarregionen Polens. Große landwirtschaftliche Betriebe und Agrartechnikunternehmen nutzen Drohnen zur Überwachung des Pflanzengesundheitszustands, NDVI-Kartierung und Wildschadenbewertung. Wir bedienen Kunden aus Posen und der gesamten Woiwodschaft Großpolen.",
    },
    industries: {
      pl: [
        "Rolnictwo i agrotechnika",
        "Przemysł spożywczy",
        "Budownictwo",
        "Logistyka",
        "Ubezpieczenia rolne",
      ],
      en: [
        "Agriculture and agrotechnology",
        "Food industry",
        "Construction",
        "Logistics",
        "Agricultural insurance",
      ],
      de: [
        "Landwirtschaft und Agrartechnik",
        "Lebensmittelindustrie",
        "Bauwesen",
        "Logistik",
        "Landwirtschaftliche Versicherung",
      ],
    },
    localContext: {
      pl: "Wielkopolska to kraina wielkich pól uprawnych, gdzie precyzyjne monitorowanie upraw dronem jest coraz popularniejsze. Obsługujemy Poznań, Konin, Kalisz, Gniezno, Piłę i całe województwo wielkopolskie. Szczególnie polecamy usługę monitorowania zbóż i rzepaku z mapami NDVI.",
      en: "Greater Poland is a land of large arable fields where precision crop monitoring by drone is increasingly popular. We serve Poznań, Konin, Kalisz, Gniezno, Piła and the entire Greater Poland voivodeship. We especially recommend our cereal and rapeseed monitoring service with NDVI maps.",
      de: "Großpolen ist ein Land großer Ackerflächen, wo Präzisions-Erntemonitoring mit Drohnen immer beliebter wird. Wir betreuen Posen, Konin, Kalisch, Gnesen, Schneidemühl und die gesamte Woiwodschaft.",
    },
  },
  {
    slug: "gdansk",
    names: { pl: "Gdańsk", en: "Gdańsk", de: "Danzig" },
    region: { pl: "Pomorskie", en: "Pomerania", de: "Pommern" },
    lat: 54.352,
    lng: 18.6466,
    seo: {
      titles: {
        pl: "Usługi dronowe Gdańsk | Inspekcje infrastruktury i turbin wiatrowych Pomorze",
        en: "Drone Services Gdańsk | Infrastructure & Wind Turbine Inspections Pomerania",
        de: "Drohnendienstleistungen Danzig | Infrastruktur und Windkraftinspektionen Pommern",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Gdańsku i na Pomorzu. Inspekcje infrastruktury portowej, turbin wiatrowych, fotogrametria, termowizja. Trójmiasto i cała Polska.",
        en: "Professional drone services in Gdańsk and Pomerania. Port infrastructure inspections, wind turbine surveys, photogrammetry and thermal imaging. Tri-City and all of Poland.",
        de: "Professionelle Drohnendienstleistungen in Danzig und Pommern. Hafen- und Windkraftinspektionen, Fotogrammetrie und Thermografie.",
      },
    },
    intro: {
      pl: "Gdańsk i Trójmiasto to morski i przemysłowy hub północnej Polski. Rozległa infrastruktura portowa, liczne zakłady produkcyjne, a przede wszystkim rozwijający się sektor morskiej energetyki wiatrowej na Bałtyku tworzą wyjątkowe zapotrzebowanie na profesjonalne usługi dronowe. Aero Metric obsługuje klientów z Gdańska, Gdyni, Sopotu i całego Pomorza.",
      en: "Gdańsk and the Tri-City are the maritime and industrial hub of northern Poland. Extensive port infrastructure, numerous production facilities, and especially the developing offshore wind energy sector in the Baltic create unique demand for professional drone services. Aero Metric serves clients from Gdańsk, Gdynia, Sopot and all of Pomerania.",
      de: "Danzig und die Dreistadt sind das maritime und industrielle Zentrum Nordpolens. Die umfangreiche Hafeninfrastruktur, zahlreiche Produktionsanlagen und insbesondere der sich entwickelnde Offshore-Windenergiesektor in der Ostsee schaffen einzigartigen Bedarf an professionellen Drohnendienstleistungen. Wir bedienen Kunden aus Danzig, Gdingen, Zoppot und ganz Pommern.",
    },
    industries: {
      pl: [
        "Infrastruktura portowa",
        "Energetyka wiatrowa morska i lądowa",
        "Stocznie i przemysł morski",
        "Budownictwo",
        "Turystyka i nieruchomości",
      ],
      en: [
        "Port infrastructure",
        "Offshore and onshore wind energy",
        "Shipyards and maritime industry",
        "Construction",
        "Tourism and real estate",
      ],
      de: [
        "Hafeninfrastruktur",
        "Offshore- und Onshore-Windenergie",
        "Werften und maritime Industrie",
        "Bauwesen",
        "Tourismus und Immobilien",
      ],
    },
    localContext: {
      pl: "Gdańsk jest centrum inwestycji w offshore wind na Bałtyku — inspekcja turbin wiatrowych dronem to jedna z kluczowych usług dla tego rynku. Obsługujemy Trójmiasto (Gdańsk, Gdynia, Sopot), Słupsk, Tczew, Starogard Gdański i całe Pomorze.",
      en: "Gdańsk is the centre of Baltic offshore wind investment — drone wind turbine inspection is one of the key services for this market. We serve the Tri-City (Gdańsk, Gdynia, Sopot), Słupsk, Tczew, Starogard Gdański and all of Pomerania.",
      de: "Danzig ist das Zentrum der Offshore-Windindvestitionen in der Ostsee — Drohnen-Windkraftinspektion ist ein Schlüsseldienst für diesen Markt. Wir betreuen die Dreistadt (Danzig, Gdingen, Zoppot), Stolp, Dirschau und ganz Pommern.",
    },
  },
  {
    slug: "slupsk",
    names: { pl: "Słupsk", en: "Słupsk", de: "Stolp" },
    region: { pl: "Pomorskie", en: "Pomerania", de: "Pommern" },
    lat: 54.4641,
    lng: 17.0285,
    seo: {
      titles: {
        pl: "Usługi dronowe Słupsk | Inspekcja turbin wiatrowych Środkowe Pomorze",
        en: "Drone Services Słupsk | Wind Turbine Inspections Central Pomerania",
        de: "Drohnendienstleistungen Stolp | Windkraftinspektionen Mittelpommern",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Słupsku i środkowym Pomorzu. Inspekcje turbin wiatrowych, fotogrametria, szacowanie szkód łowieckich, monitoring upraw. Lokalni operatorzy.",
        en: "Professional drone services in Słupsk and central Pomerania. Wind turbine inspections, photogrammetry, wildlife damage estimation and crop monitoring. Local operators.",
        de: "Professionelle Drohnendienstleistungen in Stolp und Mittelpommern. Windkraftinspektionen, Fotogrammetrie und Erntemonitoring. Lokale Piloten.",
      },
    },
    intro: {
      pl: "Słupsk i środkowe Pomorze to region z jedną z największych koncentracji lądowych farm wiatrowych w Polsce. Inspekcja łopat turbin wiatrowych dronem to tutaj szczególnie ważna usługa — pozwala na szybkie i bezpieczne wykrywanie uszkodzeń bez kosztownego demontażu. Aero Metric obsługuje operatorów wiatraków i rolników ze Słupska i całego Pomorza Środkowego.",
      en: "Słupsk and central Pomerania is a region with one of the highest concentrations of onshore wind farms in Poland. Drone inspection of wind turbine blades is an especially important service here — enabling fast and safe damage detection without costly dismantling. Aero Metric serves wind farm operators and farmers from Słupsk and all of central Pomerania.",
      de: "Stolp und Mittelpommern ist eine Region mit einer der höchsten Konzentrationen von Onshore-Windparks in Polen. Die Drohneninspektion von Windturbinenblättern ist hier ein besonders wichtiger Dienst — sie ermöglicht schnelle und sichere Schadenserkennung ohne kostspielige Demontage. Wir bedienen Windparkbetreiber und Landwirte aus Stolp und ganz Mittelpommern.",
    },
    industries: {
      pl: [
        "Energetyka wiatrowa lądowa",
        "Rolnictwo i leśnictwo",
        "Infrastruktura drogowa",
        "Szacowanie szkód łowieckich",
        "Monitoring upraw",
      ],
      en: [
        "Onshore wind energy",
        "Agriculture and forestry",
        "Road infrastructure",
        "Wildlife damage estimation",
        "Crop monitoring",
      ],
      de: [
        "Onshore-Windenergie",
        "Landwirtschaft und Forstwirtschaft",
        "Straßeninfrastruktur",
        "Wildschadenbewertung",
        "Erntemonitoring",
      ],
    },
    localContext: {
      pl: "W regionie Słupska i Pomorza Środkowego (Bytów, Lębork, Miastko, Człuchów) znajdują się liczne farmy wiatrowe i rozległe tereny rolnicze. Specjalizujemy się tu w inspekcjach turbin wiatrowych, szacowaniu szkód łowieckich i monitorowaniu zbóż z powietrza.",
      en: "The Słupsk and central Pomerania region (Bytów, Lębork, Miastko, Człuchów) has numerous wind farms and extensive agricultural areas. We specialise here in wind turbine inspections, wildlife damage estimation and aerial crop monitoring.",
      de: "Die Region Stolp und Mittelpommern (Bütow, Lauenburg, Rummelsburg, Schlochau) hat zahlreiche Windparks und weitläufige Agrarflächen. Wir sind hier auf Windkraftinspektionen, Wildschadenbewertung und Lufterntemonitoring spezialisiert.",
    },
  },
  {
    slug: "krakow",
    names: { pl: "Kraków", en: "Kraków", de: "Krakau" },
    region: {
      pl: "Małopolskie",
      en: "Lesser Poland",
      de: "Kleinpolen",
    },
    lat: 50.0647,
    lng: 19.945,
    seo: {
      titles: {
        pl: "Usługi dronowe Kraków | Inspekcje dronem Małopolska",
        en: "Drone Services Kraków | Drone Inspections in Lesser Poland",
        de: "Drohnendienstleistungen Krakau | Drohneninspektionen Kleinpolen",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Krakowie i Małopolsce. Inspekcje budowlane, fotogrametria, termowizja, modele 3D i monitoring upraw. Szybka realizacja, licencjonowani piloci.",
        en: "Professional drone services in Kraków and Lesser Poland. Building inspections, photogrammetry, thermal imaging and 3D models. Fast turnaround, licensed pilots.",
        de: "Professionelle Drohnendienstleistungen in Krakau und Kleinpolen. Bauinspektionen, Fotogrammetrie und Thermografie.",
      },
    },
    intro: {
      pl: "Kraków to historyczna stolica Polski i ważne centrum gospodarcze Południa. Rozwijający się rynek nieruchomości, inwestycje infrastrukturalne i bliskość terenów górskich (Tatry, Beskidy) tworzą specyficzne zapotrzebowanie na usługi dronowe — od inspekcji budowlanych po fotogrametrię terenową. Aero Metric realizuje zlecenia w Krakowie i całej Małopolsce.",
      en: "Kraków is Poland's historic capital and an important economic centre of the south. A growing real estate market, infrastructure investments and the proximity of mountain areas (Tatras, Beskids) create specific demand for drone services — from building inspections to terrain photogrammetry. Aero Metric carries out assignments in Kraków and all of Lesser Poland.",
      de: "Krakau ist Polens historische Hauptstadt und ein wichtiges Wirtschaftszentrum des Südens. Ein wachsender Immobilienmarkt, Infrastrukturinvestitionen und die Nähe von Berggebieten (Tatra, Beskiden) schaffen spezifische Nachfrage nach Drohnendienstleistungen — von Bauinspektionen bis zur Geländefotogrammetrie. Wir führen Aufträge in Krakau und ganz Kleinpolen durch.",
    },
    industries: {
      pl: [
        "Budownictwo i nieruchomości",
        "Turystyka i dziedzictwo kulturowe",
        "Energetyka odnawialna",
        "Rolnictwo Małopolski",
        "Infrastruktura",
      ],
      en: [
        "Construction and real estate",
        "Tourism and cultural heritage",
        "Renewable energy",
        "Lesser Poland agriculture",
        "Infrastructure",
      ],
      de: [
        "Bauwesen und Immobilien",
        "Tourismus und Kulturerbe",
        "Erneuerbare Energien",
        "Landwirtschaft Kleinpolens",
        "Infrastruktur",
      ],
    },
    localContext: {
      pl: "Kraków i Małopolska to rynek z dużym popytem na dokumentację fotogrametryczną obiektów zabytkowych, inspekcje dachów i elewacji w gęstej zabudowie miejskiej oraz monitoring upraw na pogórzu. Obsługujemy Kraków, Tarnów, Nowy Sącz, Oświęcim, Zakopane i całe województwo małopolskie.",
      en: "Kraków and Lesser Poland is a market with strong demand for photogrammetric documentation of heritage buildings, roof and facade inspections in dense urban areas, and crop monitoring in the foothills. We serve Kraków, Tarnów, Nowy Sącz, Oświęcim, Zakopane and the entire Lesser Poland voivodeship.",
      de: "Krakau und Kleinpolen sind ein Markt mit großer Nachfrage nach fotogrammetrischer Dokumentation von Denkmalgebäuden, Dach- und Fassadeninspektionen in dicht bebauten Stadtgebieten und Erntemonitoring im Vorgebirge. Wir betreuen Krakau, Tarnów, Nowy Sącz, Oświęcim, Zakopane und die gesamte Woiwodschaft Kleinpolen.",
    },
  },
  {
    slug: "bydgoszcz",
    names: { pl: "Bydgoszcz", en: "Bydgoszcz", de: "Bromberg" },
    region: {
      pl: "Kujawsko-Pomorskie",
      en: "Kuyavian-Pomerania",
      de: "Kujawien-Pommern",
    },
    lat: 53.1235,
    lng: 18.0084,
    seo: {
      titles: {
        pl: "Usługi dronowe Bydgoszcz | Inspekcje i fotogrametria Kujawy Pomorze",
        en: "Drone Services Bydgoszcz | Inspections & Photogrammetry Kuyavian-Pomerania",
        de: "Drohnendienstleistungen Bromberg | Inspektionen Kujawien-Pommern",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Bydgoszczy, Toruniu i regionie Kujaw i Pomorza. Inspekcje, fotogrametria, monitoring zbóż, szacowanie szkód łowieckich.",
        en: "Professional drone services in Bydgoszcz, Toruń and the Kuyavian-Pomeranian region. Inspections, photogrammetry, crop monitoring and wildlife damage estimation.",
        de: "Professionelle Drohnendienstleistungen in Bromberg, Thorn und der Region Kujawien-Pommern.",
      },
    },
    intro: {
      pl: "Bydgoszcz i Kujawy to region o dużym znaczeniu rolniczym i przemysłowym. Żyzne ziemie Kujaw — jedno z najbardziej produktywnych rolniczo obszarów Polski — generują duże zapotrzebowanie na monitoring upraw dronem, szacowanie szkód łowieckich i dokumentację fotogrametryczną. Aero Metric obsługuje klientów z Bydgoszczy, Torunia, Włocławka i całego województwa.",
      en: "Bydgoszcz and Kujawy is a region of great agricultural and industrial significance. The fertile Kujawy lands — one of Poland's most productive agricultural areas — generate high demand for drone crop monitoring, wildlife damage estimation and photogrammetric documentation. Aero Metric serves clients from Bydgoszcz, Toruń, Włocławek and the entire voivodeship.",
      de: "Bromberg und Kujawien ist eine Region von großer landwirtschaftlicher und industrieller Bedeutung. Die fruchtbaren Kujawien-Böden — eines der produktivsten Agrargebiete Polens — erzeugen hohen Bedarf an Drohnen-Erntemonitoring, Wildschadenbewertung und fotogrammetrischer Dokumentation. Wir bedienen Kunden aus Bromberg, Thorn, Leslau und der gesamten Woiwodschaft.",
    },
    industries: {
      pl: [
        "Rolnictwo — pszenica, buraki, kukurydza",
        "Przemysł chemiczny i spożywczy",
        "Budownictwo",
        "Energetyka wiatrowa",
        "Szacowanie szkód łowieckich",
      ],
      en: [
        "Agriculture — wheat, sugar beet, maize",
        "Chemical and food industry",
        "Construction",
        "Wind energy",
        "Wildlife damage estimation",
      ],
      de: [
        "Landwirtschaft — Weizen, Zuckerrüben, Mais",
        "Chemie- und Lebensmittelindustrie",
        "Bauwesen",
        "Windenergie",
        "Wildschadenbewertung",
      ],
    },
    localContext: {
      pl: "Kujawy to jeden z najbardziej rolniczych regionów Polski — monitoring zbóż, rzepaku i buraków cukrowych dronem jest tu szczególnie opłacalny. Obsługujemy Bydgoszcz, Toruń, Włocławek, Inowrocław, Grudziądz i cały region Kujaw i Pomorza.",
      en: "Kujawy is one of Poland's most agricultural regions — drone monitoring of cereals, rapeseed and sugar beet is particularly cost-effective here. We serve Bydgoszcz, Toruń, Włocławek, Inowrocław, Grudziądz and the entire Kuyavian-Pomeranian region.",
      de: "Kujawien ist eine der landwirtschaftlichsten Regionen Polens — Drohnenmonitoring von Getreide, Raps und Zuckerrüben ist hier besonders rentabel. Wir betreuen Bromberg, Thorn, Leslau, Hohensalza, Graudenz und die gesamte Region Kujawien-Pommern.",
    },
  },

  // ─── POLISH CITIES ─────────────────────────────────────────────────────────

  {
    slug: "lodz",
    names: { pl: "Łódź", en: "Łódź", de: "Lodsch" },
    region: { pl: "Łódzkie", en: "Łódź Voivodeship", de: "Woiwodschaft Lodsch" },
    lat: 51.7592,
    lng: 19.4560,
    seo: {
      titles: {
        pl: "Usługi dronowe Łódź | Inspekcje, fotogrametria — województwo łódzkie",
        en: "Drone Services Łódź | Inspections & Photogrammetry — Central Poland",
        de: "Drohnendienstleistungen Lodsch | Inspektionen Zentralpolen",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Łodzi i województwie łódzkim. Inspekcje dronem, fotogrametria, termowizja, monitoring upraw i szacowanie szkód łowieckich.",
        en: "Professional drone services in Łódź and the Łódź region. Drone inspections, photogrammetry, thermal imaging and crop monitoring. Licensed operators.",
        de: "Professionelle Drohnendienstleistungen in Lodsch und der Region. Drohneninspektionen, Fotogrammetrie und Thermografie.",
      },
    },
    intro: {
      pl: "Łódź to czwarte co do wielkości miasto Polski — dawna stolica przemysłu włókienniczego, dziś dynamicznie przekształcane centrum logistyki, nowych technologii i kultury. Liczne centra dystrybucyjne, hale produkcyjne i rewitalizowane obiekty poprzemysłowe stwarzają duże zapotrzebowanie na inspekcje dronem i dokumentację fotogrametryczną. Aero Metric obsługuje klientów z Łodzi i całego województwa łódzkiego.",
      en: "Łódź is Poland's fourth largest city — once the capital of the textile industry, now a dynamically transforming hub of logistics, new technologies and culture. Numerous distribution centres, production halls and revitalised post-industrial buildings create strong demand for drone inspections and photogrammetric documentation. Aero Metric serves clients from Łódź and the entire Łódź voivodeship.",
      de: "Lodsch ist Polens viertgrößte Stadt — einst die Hauptstadt der Textilindustrie, heute ein sich dynamisch wandelndes Zentrum für Logistik und neue Technologien. Wir bedienen Kunden aus Lodsch und der gesamten Woiwodschaft.",
    },
    industries: {
      pl: ["Logistyka i centra dystrybucji", "Nowe technologie i IT", "Rewitalizacja obiektów przemysłowych", "Budownictwo", "Rolnictwo regionu łódzkiego"],
      en: ["Logistics and distribution centres", "New technologies and IT", "Post-industrial revitalisation", "Construction", "Agriculture of the Łódź region"],
      de: ["Logistik und Verteilzentren", "Neue Technologien und IT", "Postindustrielle Revitalisierung", "Bauwesen", "Landwirtschaft der Region Lodsch"],
    },
    localContext: {
      pl: "Łódź leży w centrum Polski — to idealne miejsce wypadowe do obsługi zleceń dronowych z całego kraju. W regionie łódzkim inspekcje dachów hal magazynowych i dokumentacja obiektów logistycznych to najczęstsze zlecenia. Obsługujemy Łódź, Piotrków Trybunalski, Skierniewice, Sieradz i całe województwo łódzkie.",
      en: "Łódź is located in the centre of Poland — an ideal base for drone assignments across the country. In the Łódź region, roof inspections of warehouse halls and documentation of logistics facilities are the most common jobs. We serve Łódź, Piotrków Trybunalski, Skierniewice, Sieradz and the entire Łódź voivodeship.",
      de: "Lodsch liegt im Zentrum Polens — ein idealer Ausgangspunkt für Drohneneinsätze im ganzen Land. Wir bedienen Lodsch, Petrikau, Skierniewice, Sieradz und die gesamte Woiwodschaft.",
    },
  },
  {
    slug: "katowice",
    names: { pl: "Katowice", en: "Katowice", de: "Kattowitz" },
    region: { pl: "Śląskie", en: "Silesia", de: "Schlesien" },
    lat: 50.2649,
    lng: 19.0238,
    seo: {
      titles: {
        pl: "Usługi dronowe Katowice | Inspekcje przemysłowe Śląsk",
        en: "Drone Services Katowice | Industrial Inspections Silesia",
        de: "Drohnendienstleistungen Kattowitz | Industrieinspektionen Schlesien",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Katowicach i na Śląsku. Inspekcje przemysłowe, fotogrametria, termowizja budynków i instalacji, monitoring infrastruktury. Cały GOP.",
        en: "Professional drone services in Katowice and Silesia. Industrial inspections, photogrammetry, thermal imaging of buildings and installations, infrastructure monitoring. The entire Upper Silesian agglomeration.",
        de: "Professionelle Drohnendienstleistungen in Kattowitz und Schlesien. Industrieinspektionen, Fotogrammetrie und Thermografie für Gebäude und Anlagen.",
      },
    },
    intro: {
      pl: "Katowice i Górnośląski Okręg Przemysłowy to największa aglomeracja przemysłowa w Polsce — obszar o wyjątkowo wysokim zapotrzebowaniu na inspekcje dronem. Kopalnie, huty, elektrociepłownie, hale produkcyjne i rozległa infrastruktura przemysłowa wymagają regularnych przeglądów technicznych, w których drony zastępują tradycyjne rusztowania i pracę na wysokościach. Aero Metric obsługuje klientów z Katowic i całego Górnego Śląska.",
      en: "Katowice and the Upper Silesian Industrial Region is Poland's largest industrial agglomeration — an area with exceptionally high demand for drone inspections. Mines, steelworks, power plants, production halls and extensive industrial infrastructure require regular technical inspections where drones replace traditional scaffolding and work at heights. Aero Metric serves clients from Katowice and all of Upper Silesia.",
      de: "Kattowitz und das Oberschlesische Industrierevier ist Polens größte Industrieagglomeration. Bergwerke, Stahlwerke, Kraftwerke und weitläufige Industrieinfrastruktur benötigen regelmäßige technische Inspektionen, bei denen Drohnen traditionelles Gerüst ersetzen. Wir bedienen Kunden aus Kattowitz und ganz Oberschlesien.",
    },
    industries: {
      pl: ["Przemysł wydobywczy i hutniczy", "Energetyka i elektrociepłownie", "Automotive i produkcja", "Budownictwo i rewitalizacja", "Logistyka i magazyny"],
      en: ["Mining and metallurgy", "Energy and power plants", "Automotive and manufacturing", "Construction and revitalisation", "Logistics and warehousing"],
      de: ["Bergbau und Metallurgie", "Energie und Kraftwerke", "Automotive und Fertigung", "Bauwesen und Revitalisierung", "Logistik und Lager"],
    },
    localContext: {
      pl: "Śląsk to rynek z najwyższym w Polsce zapotrzebowaniem na inspekcje przemysłowe dronem. Specjalizujemy się w inspekcji kominów, chłodni, hałd, hal przemysłowych i infrastruktury energetycznej. Obsługujemy Katowice, Sosnowiec, Gliwice, Bytom, Zabrze, Chorzów, Tychy, Rybnik i całe województwo śląskie.",
      en: "Silesia is Poland's market with the highest demand for industrial drone inspections. We specialise in inspections of chimneys, cooling towers, slag heaps, industrial halls and energy infrastructure. We serve Katowice, Sosnowiec, Gliwice, Bytom, Zabrze, Chorzów, Tychy, Rybnik and the entire Silesian voivodeship.",
      de: "Schlesien ist Polens Markt mit der höchsten Nachfrage nach industriellen Drohneninspektionen. Wir spezialisieren uns auf Inspektionen von Schornsteinen, Kühltürmen, Industriehallen und Energieinfrastruktur. Wir bedienen Kattowitz, Sosnowitz, Gleiwitz, Beuthen, Hindenburg und die gesamte Woiwodschaft Schlesien.",
    },
  },
  {
    slug: "lublin",
    names: { pl: "Lublin", en: "Lublin", de: "Lublin" },
    region: { pl: "Lubelskie", en: "Lublin Voivodeship", de: "Woiwodschaft Lublin" },
    lat: 51.2465,
    lng: 22.5684,
    seo: {
      titles: {
        pl: "Usługi dronowe Lublin | Szacowanie szkód łowieckich i monitoring upraw — Lubelszczyzna",
        en: "Drone Services Lublin | Wildlife Damage & Crop Monitoring — Lublin Region",
        de: "Drohnendienstleistungen Lublin | Wildschaden und Erntemonitoring — Region Lublin",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Lublinie i na Lubelszczyźnie. Szacowanie szkód łowieckich, monitoring upraw dronem, mapy NDVI, fotogrametria. Rolnicy z całej Polski.",
        en: "Professional drone services in Lublin and the Lublin region. Wildlife damage estimation, crop monitoring, NDVI maps and photogrammetry. Farmers across Poland.",
        de: "Professionelle Drohnendienstleistungen in Lublin und der Region. Wildschadenbewertung, Erntemonitoring, NDVI-Karten und Fotogrammetrie.",
      },
    },
    intro: {
      pl: "Lublin i Lubelszczyzna to jeden z największych i najbardziej produktywnych rolniczo regionów Polski wschodniej. Rozległa Wyżyna Lubelska pokryta polami pszenicy, rzepaku, buraków cukrowych i warzyw to idealny teren dla dronowych usług rolniczych — monitorowania stanu zdrowotności zbóż, szacowania szkód łowieckich i tworzenia map NDVI. Aero Metric obsługuje klientów z Lublina i całej Lubelszczyzny.",
      en: "Lublin and the Lublin region is one of the largest and most agriculturally productive areas in eastern Poland. The extensive Lublin Upland covered with wheat, rapeseed, sugar beet and vegetable fields is ideal territory for agricultural drone services — crop health monitoring, wildlife damage estimation and NDVI mapping. Aero Metric serves clients from Lublin and all of the Lublin region.",
      de: "Lublin und die Lubliner Region ist eines der größten und landwirtschaftlich produktivsten Gebiete Ostpolens. Wir bedienen Kunden aus Lublin und der gesamten Woiwodschaft Lublin.",
    },
    industries: {
      pl: ["Rolnictwo — pszenica, rzepak, buraki, warzywa", "Przetwórstwo spożywcze", "Szacowanie szkód łowieckich", "Monitoring upraw NDVI", "Budownictwo regionalne"],
      en: ["Agriculture — wheat, rapeseed, sugar beet, vegetables", "Food processing", "Wildlife damage estimation", "NDVI crop monitoring", "Regional construction"],
      de: ["Landwirtschaft — Weizen, Raps, Zuckerrüben, Gemüse", "Lebensmittelverarbeitung", "Wildschadenbewertung", "NDVI-Erntemonitoring", "Regionales Bauwesen"],
    },
    localContext: {
      pl: "Lubelszczyzna jest szczególnie ważna dla usługi szacowania szkód łowieckich — region ten ma jedną z najwyższych w Polsce liczb zgłoszeń szkód przez dziki, sarny i jelenie. Operaty szacunkowe z dokumentacją fotograficzną z drona to tu standard. Obsługujemy Lublin, Zamość, Chełm, Biała Podlaska, Puławy i całe województwo lubelskie.",
      en: "The Lublin region is especially important for wildlife damage estimation — it has one of Poland's highest rates of crop damage reports from wild boar, roe deer and red deer. Estimation reports with drone photographic documentation are standard here. We serve Lublin, Zamość, Chełm, Biała Podlaska, Puławy and the entire Lublin voivodeship.",
      de: "Die Region Lublin ist besonders wichtig für die Wildschadenbewertung — sie hat eine der höchsten Raten von Ernteschadenmeldungen durch Wildschweine, Rehe und Hirsche in Polen. Wir bedienen Lublin, Zamość, Chelm, Biała Podlaska und die gesamte Woiwodschaft.",
    },
  },
  {
    slug: "szczecin",
    names: { pl: "Szczecin", en: "Szczecin", de: "Stettin" },
    region: { pl: "Zachodniopomorskie", en: "West Pomerania", de: "Westpommern" },
    lat: 53.4285,
    lng: 14.5528,
    seo: {
      titles: {
        pl: "Usługi dronowe Szczecin | Aero Metric — inspekcje, fotogrametria, termowizja",
        en: "Drone Services Szczecin | Aero Metric — Inspections, Photogrammetry, Thermal Imaging",
        de: "Drohnendienstleistungen Stettin | Aero Metric — Inspektionen, Fotogrammetrie, Thermografie",
      },
      descriptions: {
        pl: "Aero Metric Szczecin — profesjonalne usługi dronowe w Szczecinie i zachodniopomorskim. Inspekcje budowlane, fotogrametria, termowizja, modele 3D, monitoring upraw, szacowanie szkód łowieckich.",
        en: "Aero Metric Szczecin — professional drone services in Szczecin and West Pomerania. Building inspections, photogrammetry, thermal imaging, 3D models, crop monitoring and wildlife damage estimation.",
        de: "Aero Metric Stettin — professionelle Drohnendienstleistungen in Stettin und Westpommern. Bauinspektionen, Fotogrammetrie, Thermografie, 3D-Modelle und Erntemonitoring.",
      },
    },
    intro: {
      pl: "Szczecin to siedziba Aero Metric i nasze miasto bazowe — tutaj jesteśmy dostępni najszybciej i realizujemy zlecenia w najkrótszym czasie. Szczecin i Zachodniopomorskie to region z bogatą infrastrukturą portową, licznymi zakładami przemysłowymi, farmami wiatrowymi i rozległymi terenami rolniczymi. Obsługujemy wszystkie rodzaje zleceń dronowych w Szczecinie i całym regionie zachodniopomorskim.",
      en: "Szczecin is Aero Metric's headquarters and home city — we are available here fastest and complete assignments in the shortest time. Szczecin and West Pomerania is a region with rich port infrastructure, numerous industrial plants, wind farms and extensive agricultural areas. We handle all types of drone assignments in Szczecin and the entire West Pomeranian region.",
      de: "Stettin ist der Hauptsitz von Aero Metric und unsere Heimatstadt — hier sind wir am schnellsten verfügbar und führen Aufträge in kürzester Zeit durch. Stettin und Westpommern ist eine Region mit reicher Hafeninfrastruktur, zahlreichen Industriebetrieben, Windparks und weitläufigen Agrarflächen.",
    },
    industries: {
      pl: ["Infrastruktura portowa i stoczniowa", "Energetyka wiatrowa", "Rolnictwo i leśnictwo", "Budownictwo i deweloperzy", "Przemysł chemiczny i spożywczy"],
      en: ["Port and shipyard infrastructure", "Wind energy", "Agriculture and forestry", "Construction and developers", "Chemical and food industry"],
      de: ["Hafen- und Werftinfrastruktur", "Windenergie", "Landwirtschaft und Forstwirtschaft", "Bauwesen und Projektentwicklung", "Chemie- und Lebensmittelindustrie"],
    },
    localContext: {
      pl: "Jako firma z Szczecina doskonale znamy lokalny rynek i specyfikę regionu. Realizujemy inspekcje obiektów przemysłowych w Porcie Szczecin-Świnoujście, dokumentujemy inwestycje budowlane, monitorujemy farmy wiatrowe na Pomorzu Zachodnim i szacujemy szkody łowieckie na polach całego województwa. Szczecin, Police, Goleniów, Stargard, Świnoujście — jesteśmy na miejscu.",
      en: "As a company from Szczecin, we know the local market and regional specifics excellently. We carry out industrial facility inspections at the Port of Szczecin-Świnoujście, document construction investments, monitor wind farms in West Pomerania and estimate wildlife damage on fields throughout the voivodeship. Szczecin, Police, Goleniów, Stargard, Świnoujście — we are on-site.",
      de: "Als Unternehmen aus Stettin kennen wir den lokalen Markt und die regionalen Besonderheiten ausgezeichnet. Wir führen Industrieinspektionen im Hafen Stettin-Swinemünde durch, dokumentieren Bauinvestitionen, überwachen Windparks in Westpommern und bewerten Wildschäden auf Feldern in der gesamten Woiwodschaft.",
    },
  },
  {
    slug: "torun",
    names: { pl: "Toruń", en: "Toruń", de: "Thorn" },
    region: { pl: "Kujawsko-Pomorskie", en: "Kuyavian-Pomerania", de: "Kujawien-Pommern" },
    lat: 53.0138,
    lng: 18.5981,
    seo: {
      titles: {
        pl: "Usługi dronowe Toruń | Inspekcje i fotogrametria Kujawy-Pomorze",
        en: "Drone Services Toruń | Inspections & Photogrammetry Kuyavian-Pomerania",
        de: "Drohnendienstleistungen Thorn | Inspektionen Kujawien-Pommern",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Toruniu i regionie kujawsko-pomorskim. Inspekcje dronowe, fotogrametria, monitoring upraw, szacowanie szkód łowieckich. Szybka realizacja.",
        en: "Professional drone services in Toruń and the Kuyavian-Pomeranian region. Drone inspections, photogrammetry, crop monitoring and wildlife damage estimation. Fast turnaround.",
        de: "Professionelle Drohnendienstleistungen in Thorn und der Region Kujawien-Pommern. Drohneninspektionen, Fotogrammetrie und Erntemonitoring.",
      },
    },
    intro: {
      pl: "Toruń to historyczne miasto nad Wisłą — rodzinne miasto Mikołaja Kopernika i jeden z najlepiej zachowanych gotyckich kompleksów miejskich w Europie. Obok walorów historycznych, Toruń i region kujawsko-pomorski to ważny węzeł przemysłowy i rolniczy. Aero Metric realizuje tu zlecenia inspekcyjne, fotogrametryczne i rolnicze.",
      en: "Toruń is a historic city on the Vistula — the birthplace of Nicolaus Copernicus and one of Europe's best-preserved Gothic urban complexes. Alongside its historic values, Toruń and the Kuyavian-Pomeranian region is an important industrial and agricultural hub. Aero Metric carries out inspection, photogrammetric and agricultural assignments here.",
      de: "Thorn ist eine historische Stadt an der Weichsel — die Geburtsstadt von Nikolaus Kopernikus und eines der besterhaltenen gotischen Stadtensembles Europas. Neben historischen Werten ist Thorn ein wichtiges Industrie- und Agrarzentrum. Wir führen hier Inspektions-, fotogrammetrische und landwirtschaftliche Aufträge durch.",
    },
    industries: {
      pl: ["Przemysł chemiczny — CIECH", "Rolnictwo Kujaw", "Budownictwo i infrastruktura", "Turystyka i dziedzictwo", "Szacowanie szkód łowieckich"],
      en: ["Chemical industry — CIECH", "Kujawy agriculture", "Construction and infrastructure", "Tourism and heritage", "Wildlife damage estimation"],
      de: ["Chemieindustrie — CIECH", "Kujawische Landwirtschaft", "Bauwesen und Infrastruktur", "Tourismus und Kulturerbe", "Wildschadenbewertung"],
    },
    localContext: {
      pl: "Toruń leży między Bydgoszczą a Włocławkiem — w centrum regionu kujawsko-pomorskiego, jednego z najbardziej rolniczych w Polsce. Razem z sąsiednią Bydgoszczą tworzymy kompletne pokrycie całego regionu. Obsługujemy Toruń, Włocławek, Inowrocław, Grudziądz, Brodnicę i całe Kujawy.",
      en: "Toruń lies between Bydgoszcz and Włocławek — at the centre of the Kuyavian-Pomeranian region, one of Poland's most agricultural areas. Together with neighbouring Bydgoszcz we provide complete coverage of the entire region. We serve Toruń, Włocławek, Inowrocław, Grudziądz, Brodnica and all of Kujawy.",
      de: "Thorn liegt zwischen Bromberg und Weichselburg — im Zentrum der Region Kujawien-Pommern. Zusammen mit dem benachbarten Bromberg decken wir die gesamte Region ab. Wir bedienen Thorn, Weichselburg, Inowrazlaw, Graudenz und ganz Kujawien.",
    },
  },

  // ─── GERMAN CITIES ─────────────────────────────────────────────────────────

  {
    slug: "berlin",
    names: { pl: "Berlin", en: "Berlin", de: "Berlin" },
    region: { pl: "Brandenburgia / Berlin", en: "Brandenburg / Berlin", de: "Brandenburg / Berlin" },
    lat: 52.5200,
    lng: 13.4050,
    seo: {
      titles: {
        pl: "Usługi dronowe Berlin | Inspekcje dronem Niemcy",
        en: "Drone Services Berlin | Professional Drone Inspections Germany",
        de: "Drohnendienstleistungen Berlin | Professionelle Drohneninspektionen",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Berlinie i Brandenburgii. Inspekcje budowlane, fotogrametria, termowizja, monitoring upraw. Licencjonowani piloci, szybka realizacja.",
        en: "Professional drone services in Berlin and Brandenburg. Building inspections, photogrammetry, thermal imaging and crop monitoring. Licensed pilots, fast turnaround.",
        de: "Professionelle Drohnendienstleistungen in Berlin und Brandenburg. Bauinspektionen, Fotogrammetrie, Thermografie und Erntemonitoring. Lizenzierte Piloten.",
      },
    },
    intro: {
      pl: "Berlin — stolica Niemiec, zaledwie 130 km od Szczecina — to jeden z największych rynków budowlanych i inwestycyjnych Europy. Dynamiczna metropolia z tysiącami placów budów, obiektów przemysłowych i historycznych kamienic wymaga precyzyjnej dokumentacji dronem. Aero Metric realizuje zlecenia dronowe w Berlinie i całej Brandenburgii.",
      en: "Berlin — the capital of Germany, just 130 km from Szczecin — is one of Europe's largest construction and investment markets. The dynamic metropolis with thousands of construction sites, industrial facilities and historic tenement buildings requires precise drone documentation. Aero Metric carries out drone assignments in Berlin and all of Brandenburg.",
      de: "Berlin — Deutschlands Hauptstadt, nur 130 km von Stettin entfernt — ist einer der größten Bau- und Investitionsmärkte Europas. Die dynamische Metropole mit Tausenden von Baustellen, Industrieanlagen und historischen Mietshäusern benötigt präzise Drohnendokumentation. Aero Metric führt Drohneneinsätze in Berlin und ganz Brandenburg durch.",
    },
    industries: {
      pl: ["Budownictwo i deweloperzy", "Infrastruktura miejska", "Nieruchomości komercyjne", "Energetyka odnawialna Brandenburgii", "Rolnictwo Brandenburgii"],
      en: ["Construction and developers", "Urban infrastructure", "Commercial real estate", "Brandenburg renewable energy", "Brandenburg agriculture"],
      de: ["Bauwesen und Projektentwicklung", "Städtische Infrastruktur", "Gewerbeimmobilien", "Erneuerbare Energien Brandenburg", "Brandenburger Landwirtschaft"],
    },
    localContext: {
      pl: "Berlin jest oddalony od naszej bazy w Szczecinie o jedynie 130 km — to sprawia, że jesteśmy jednym z bliższych licencjonowanych operatorów dronów dla rynku berlińskiego. Działamy zgodnie z regulacjami EASA i rozporządzeniami LuftVO. Obsługujemy Berlin, Poczddam i teren Brandenburgii.",
      en: "Berlin is just 130 km from our Szczecin base — making us one of the closest licensed drone operators for the Berlin market. We operate in compliance with EASA regulations and LuftVO. We serve Berlin, Potsdam and the Brandenburg region.",
      de: "Berlin ist nur 130 km von unserem Standort in Stettin entfernt — das macht uns zu einem der nächsten lizenzierten Drohnenoperatoren für den Berliner Markt. Wir arbeiten gemäß EASA-Vorschriften und LuftVO. Wir bedienen Berlin, Potsdam und die Region Brandenburg.",
    },
  },
  {
    slug: "hamburg",
    names: { pl: "Hamburg", en: "Hamburg", de: "Hamburg" },
    region: { pl: "Hamburg / Schleswig-Holstein", en: "Hamburg / Schleswig-Holstein", de: "Hamburg / Schleswig-Holstein" },
    lat: 53.5753,
    lng: 10.0153,
    seo: {
      titles: {
        pl: "Usługi dronowe Hamburg | Inspekcje infrastruktury portowej i turbin",
        en: "Drone Services Hamburg | Port Infrastructure & Wind Turbine Inspections",
        de: "Drohnendienstleistungen Hamburg | Hafeninspektionen und Windkraft",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Hamburgu. Inspekcje infrastruktury portowej, turbin wiatrowych, budynków przemysłowych. Fotogrametria i termowizja. Licencjonowani piloci.",
        en: "Professional drone services in Hamburg. Port infrastructure inspections, wind turbine surveys, industrial building inspections. Photogrammetry and thermal imaging. Licensed pilots.",
        de: "Professionelle Drohnendienstleistungen in Hamburg. Hafen- und Windkraftinspektionen, Industriegebäude, Fotogrammetrie und Thermografie. Lizenzierte Piloten.",
      },
    },
    intro: {
      pl: "Hamburg to jeden z największych portów morskich Europy i ważne centrum przemysłowe północnych Niemiec. Rozległa infrastruktura portowa, liczne zakłady przemysłowe i silnie rozwinięta energetyka wiatrowa na wybrzeżu Morza Północnego tworzą wyjątkowe zapotrzebowanie na profesjonalne usługi dronowe. Aero Metric realizuje zlecenia w Hamburgu i regionie Schleswig-Holstein.",
      en: "Hamburg is one of Europe's largest seaports and an important industrial centre of northern Germany. Extensive port infrastructure, numerous industrial plants and strongly developed wind energy on the North Sea coast create exceptional demand for professional drone services. Aero Metric carries out assignments in Hamburg and the Schleswig-Holstein region.",
      de: "Hamburg ist einer der größten Seehäfen Europas und ein wichtiges Industriezentrum Norddeutschlands. Umfangreiche Hafeninfrastruktur, zahlreiche Industriebetriebe und stark entwickelte Windenergie an der Nordseeküste schaffen außergewöhnlichen Bedarf an professionellen Drohnendienstleistungen. Aero Metric führt Einsätze in Hamburg und Schleswig-Holstein durch.",
    },
    industries: {
      pl: ["Infrastruktura portowa i logistyka morska", "Energetyka wiatrowa offshore", "Przemysł lotniczy — Airbus", "Budownictwo i nieruchomości", "Rolnictwo Schleswig-Holstein"],
      en: ["Port infrastructure and maritime logistics", "Offshore wind energy", "Aviation industry — Airbus", "Construction and real estate", "Schleswig-Holstein agriculture"],
      de: ["Hafeninfrastruktur und maritime Logistik", "Offshore-Windenergie", "Luftfahrtindustrie — Airbus", "Bauwesen und Immobilien", "Schleswig-Holsteinische Landwirtschaft"],
    },
    localContext: {
      pl: "Hamburg to kluczowy rynek dla inspekcji turbin wiatrowych offshore i infrastruktury portowej dronem. Posiadamy doświadczenie w inspekcjach łopat turbin i dużych obiektów przemysłowych. Działamy zgodnie z regulacjami EASA i LuftVO. Obsługujemy Hamburg, Lubekę, Kilonię i region Schleswig-Holstein.",
      en: "Hamburg is a key market for offshore wind turbine and port infrastructure drone inspections. We have experience in turbine blade inspections and large industrial facilities. We operate in compliance with EASA and LuftVO. We serve Hamburg, Lübeck, Kiel and the Schleswig-Holstein region.",
      de: "Hamburg ist ein Schlüsselmarkt für Offshore-Windkraft- und Hafeninspektionen mit Drohnen. Wir arbeiten gemäß EASA-Vorschriften und LuftVO. Wir bedienen Hamburg, Lübeck, Kiel und die Region Schleswig-Holstein.",
    },
  },
  {
    slug: "rostock",
    names: { pl: "Rostock", en: "Rostock", de: "Rostock" },
    region: { pl: "Meklemburgia-Pomorze Przednie", en: "Mecklenburg-Vorpommern", de: "Mecklenburg-Vorpommern" },
    lat: 54.0887,
    lng: 12.1400,
    seo: {
      titles: {
        pl: "Usługi dronowe Rostock | Inspekcje Meklemburgia Pomorze Przednie",
        en: "Drone Services Rostock | Inspections Mecklenburg-Vorpommern",
        de: "Drohnendienstleistungen Rostock | Inspektionen Mecklenburg-Vorpommern",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Rostocku i Meklemburgii. Inspekcje turbin wiatrowych, infrastruktury portowej, fotogrametria i monitoring upraw. Szybka realizacja.",
        en: "Professional drone services in Rostock and Mecklenburg-Vorpommern. Wind turbine inspections, port infrastructure, photogrammetry and crop monitoring. Fast turnaround.",
        de: "Professionelle Drohnendienstleistungen in Rostock und Mecklenburg-Vorpommern. Windkraftinspektionen, Hafen, Fotogrammetrie und Erntemonitoring.",
      },
    },
    intro: {
      pl: "Rostock to największe miasto Meklemburgii-Pomorza Przedniego — nadmorskiego landu graniczącego bezpośrednio z Polską. Region jest jednym z europejskich liderów lądowej i morskiej energetyki wiatrowej, a jednocześnie ważnym centrum rolniczym. Aero Metric obsługuje klientów z Rostocku, Schwerina, Greifswaldu, Stralsundu i całego Meklemburgia-Pomorza Przedniego.",
      en: "Rostock is the largest city in Mecklenburg-Vorpommern — a coastal German state bordering Poland directly. The region is one of Europe's leaders in onshore and offshore wind energy, while also being an important agricultural centre. Aero Metric serves clients from Rostock, Schwerin, Greifswald, Stralsund and all of Mecklenburg-Vorpommern.",
      de: "Rostock ist die größte Stadt in Mecklenburg-Vorpommern — einem Küstenland, das direkt an Polen grenzt. Die Region ist einer der europäischen Vorreiter bei der Onshore- und Offshore-Windenergie sowie ein wichtiges Agrarzentrum. Aero Metric bedient Kunden aus Rostock, Schwerin, Greifswald, Stralsund und ganz Mecklenburg-Vorpommern.",
    },
    industries: {
      pl: ["Energetyka wiatrowa offshore i lądowa", "Rolnictwo i monitoring upraw", "Infrastruktura portowa", "Turystyka bałtycka", "Budownictwo i nieruchomości"],
      en: ["Offshore and onshore wind energy", "Agriculture and crop monitoring", "Port infrastructure", "Baltic tourism", "Construction and real estate"],
      de: ["Offshore- und Onshore-Windenergie", "Landwirtschaft und Erntemonitoring", "Hafeninfrastruktur", "Ostseetourismus", "Bauwesen und Immobilien"],
    },
    localContext: {
      pl: "Meklemburgia-Pomorze Przednie bezpośrednio graniczy z Polską i Szczecinem — jesteśmy w stanie dotrzeć do Rostocku w ok. 2 godziny. Region ten jest wyjątkowo ważny dla usługi inspekcji turbin wiatrowych i monitorowania upraw dronem. Obsługujemy Rostock, Schwerin, Greifswald, Stralsund, Neubrandenburg i całe Meklemburgia-Pomorze Przednie.",
      en: "Mecklenburg-Vorpommern directly borders Poland and Szczecin — we can reach Rostock in approximately 2 hours. This region is exceptionally important for wind turbine inspection and drone crop monitoring services. We serve Rostock, Schwerin, Greifswald, Stralsund, Neubrandenburg and all of Mecklenburg-Vorpommern.",
      de: "Mecklenburg-Vorpommern grenzt direkt an Polen und Stettin — wir können Rostock in ca. 2 Stunden erreichen. Diese Region ist außerordentlich wichtig für Windkraftinspektionen und Drohnen-Erntemonitoring. Wir bedienen Rostock, Schwerin, Greifswald, Stralsund, Neubrandenburg und ganz Mecklenburg-Vorpommern.",
    },
  },
  {
    slug: "drezno",
    names: { pl: "Drezno", en: "Dresden", de: "Dresden" },
    region: { pl: "Saksonia", en: "Saxony", de: "Sachsen" },
    lat: 51.0504,
    lng: 13.7373,
    seo: {
      titles: {
        pl: "Usługi dronowe Drezno | Inspekcje i fotogrametria Saksonia",
        en: "Drone Services Dresden | Inspections & Photogrammetry Saxony",
        de: "Drohnendienstleistungen Dresden | Inspektionen und Fotogrammetrie Sachsen",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe w Dreźnie i Saksonii. Inspekcje dronem, fotogrametria, termowizja, modele 3D. Blisko granicy polskiej, szybka realizacja.",
        en: "Professional drone services in Dresden and Saxony. Drone inspections, photogrammetry, thermal imaging and 3D models. Close to the Polish border, fast turnaround.",
        de: "Professionelle Drohnendienstleistungen in Dresden und Sachsen. Drohneninspektionen, Fotogrammetrie, Thermografie und 3D-Modelle. Nahe der polnischen Grenze.",
      },
    },
    intro: {
      pl: "Drezno — stolica Saksonii i ważne centrum przemysłowe wschodniej części Niemiec — leży zaledwie kilkadziesiąt kilometrów od granicy z Polską. Silna baza przemysłowa (półprzewodniki, samochodownictwo, optyka) oraz rozwijający się rynek budowlany i nieruchomości tworzą zapotrzebowanie na nowoczesne usługi inspekcyjne z wykorzystaniem dronów. Aero Metric realizuje zlecenia w Dreźnie i Saksonii.",
      en: "Dresden — the capital of Saxony and an important industrial centre of eastern Germany — lies just a few dozen kilometres from the Polish border. A strong industrial base (semiconductors, automotive, optics) and a growing construction and real estate market create demand for modern drone inspection services. Aero Metric carries out assignments in Dresden and Saxony.",
      de: "Dresden — die Hauptstadt Sachsens und ein wichtiges Industriezentrum Ostdeutschlands — liegt nur wenige Dutzend Kilometer von der polnischen Grenze entfernt. Eine starke Industriebasis (Halbleiter, Automobil, Optik) und ein wachsender Bau- und Immobilienmarkt schaffen Nachfrage nach modernen Drohneninspektionen. Aero Metric führt Einsätze in Dresden und Sachsen durch.",
    },
    industries: {
      pl: ["Przemysł półprzewodnikowy — TSMC, Infineon", "Automotive — Volkswagen Gläserne Manufaktur", "Budownictwo i rewitalizacja", "Energetyka odnawialna Saksonii", "Turystyka i obiekty zabytkowe"],
      en: ["Semiconductor industry — TSMC, Infineon", "Automotive — Volkswagen Gläserne Manufaktur", "Construction and revitalisation", "Saxony renewable energy", "Tourism and heritage buildings"],
      de: ["Halbleiterindustrie — TSMC, Infineon", "Automotive — Volkswagen Gläserne Manufaktur", "Bauwesen und Revitalisierung", "Sächsische erneuerbare Energien", "Tourismus und Denkmalgebäude"],
    },
    localContext: {
      pl: "Drezno jest oddalone od Polski o zaledwie kilkadziesiąt kilometrów — Zgorzelec/Görlitz i Jelenia Góra są w zasięgu jednej godziny jazdy. Saksonia jest ważnym rynkiem dla inspekcji obiektów przemysłowych, dokumentacji budowlanej i inspekcji farm wiatrowych. Obsługujemy Drezno, Lipsk, Chemnitz i całą Saksonię.",
      en: "Dresden is just a few dozen kilometres from Poland — Zgorzelec/Görlitz and Jelenia Góra are within one hour's drive. Saxony is an important market for industrial facility inspections, construction documentation and wind farm inspections. We serve Dresden, Leipzig, Chemnitz and all of Saxony.",
      de: "Dresden ist nur wenige Dutzend Kilometer von Polen entfernt — Görlitz und Hirschberg sind in einer Fahrstunde erreichbar. Sachsen ist ein wichtiger Markt für Industrieinspektionen und Windparkdokumentationen. Wir bedienen Dresden, Leipzig, Chemnitz und ganz Sachsen.",
    },
  },
  {
    slug: "frankfurt-oder",
    names: { pl: "Frankfurt nad Odrą", en: "Frankfurt (Oder)", de: "Frankfurt (Oder)" },
    region: { pl: "Brandenburgia", en: "Brandenburg", de: "Brandenburg" },
    lat: 52.3418,
    lng: 14.5505,
    seo: {
      titles: {
        pl: "Usługi dronowe Frankfurt nad Odrą | Polsko-Niemieckie pogranicze",
        en: "Drone Services Frankfurt (Oder) | Polish-German Border Region",
        de: "Drohnendienstleistungen Frankfurt (Oder) | Deutsch-Polnisches Grenzgebiet",
      },
      descriptions: {
        pl: "Profesjonalne usługi dronowe we Frankfurcie nad Odrą i regionie pogranicza polsko-niemieckiego. Inspekcje, fotogrametria, termowizja. Operatorzy po obu stronach granicy.",
        en: "Professional drone services in Frankfurt (Oder) and the Polish-German border region. Inspections, photogrammetry and thermal imaging. Operators on both sides of the border.",
        de: "Professionelle Drohnendienstleistungen in Frankfurt (Oder) und dem deutsch-polnischen Grenzgebiet. Inspektionen, Fotogrammetrie und Thermografie. Piloten auf beiden Seiten der Grenze.",
      },
    },
    intro: {
      pl: "Frankfurt nad Odrą leży bezpośrednio na granicy polsko-niemieckiej, naprzeciwko polskiego Słubic. To wyjątkowy rynek dla operatorów dronów działających po obu stronach granicy — zlecenia z Niemiec i Polski realizujemy tu jednakowo sprawnie. Aero Metric obsługuje klientów z Frankfurtu nad Odrą, Słubic i całego pogranicza brandenbursko-lubuskiego.",
      en: "Frankfurt (Oder) lies directly on the Polish-German border, opposite the Polish town of Słubice. This is a unique market for drone operators working on both sides of the border — we handle assignments from Germany and Poland equally efficiently. Aero Metric serves clients from Frankfurt (Oder), Słubice and the entire Brandenburg-Lubusz border region.",
      de: "Frankfurt (Oder) liegt direkt an der deutsch-polnischen Grenze, gegenüber der polnischen Stadt Słubice. Dies ist ein einzigartiger Markt für Drohnenoperatoren, die auf beiden Seiten der Grenze tätig sind. Aero Metric bedient Kunden aus Frankfurt (Oder), Słubice und der gesamten brandenburgisch-lebusischen Grenzregion.",
    },
    industries: {
      pl: ["Logistyka transgraniczna", "Rolnictwo Brandenburgii i Lubuskiego", "Infrastruktura drogowa i kolejowa", "Energetyka odnawialna", "Budownictwo i nieruchomości"],
      en: ["Cross-border logistics", "Brandenburg and Lubusz agriculture", "Road and rail infrastructure", "Renewable energy", "Construction and real estate"],
      de: ["Grenzüberschreitende Logistik", "Brandenburger und Lebuser Landwirtschaft", "Straßen- und Schieneninfrastruktur", "Erneuerbare Energien", "Bauwesen und Immobilien"],
    },
    localContext: {
      pl: "Frankfurt nad Odrą to dosłownie polsko-niemiecka granica — idealne miejsce dla firmy dronowej działającej w obu krajach. Znamy regulacje prawne po obu stronach granicy (polskie prawo lotnicze i EASA/LuftVO po stronie niemieckiej). Obsługujemy Frankfurt nad Odrą, Słubice, Kostrzyn nad Odrą, Gorzów Wielkopolski i całe pogranicze brandenbursko-lubuskie.",
      en: "Frankfurt (Oder) is literally the Polish-German border — an ideal location for a drone company operating in both countries. We know the legal regulations on both sides of the border (Polish aviation law and EASA/LuftVO on the German side). We serve Frankfurt (Oder), Słubice, Kostrzyn nad Odrą, Gorzów Wielkopolski and the entire Brandenburg-Lubusz border region.",
      de: "Frankfurt (Oder) ist buchstäblich die deutsch-polnische Grenze — ein idealer Standort für ein Drohnenunternehmen, das in beiden Ländern tätig ist. Wir kennen die rechtlichen Vorschriften auf beiden Seiten der Grenze (polnisches Luftrecht und EASA/LuftVO auf deutscher Seite). Wir bedienen Frankfurt (Oder), Słubice, Küstrin und den gesamten brandenburgisch-lebusischen Grenzraum.",
    },
  },
];

/** All city slugs for use in generateStaticParams and sitemap generation. */
export const citySlugs = cities.map((c) => c.slug);
