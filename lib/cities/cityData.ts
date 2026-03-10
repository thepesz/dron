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
];

/** All city slugs for use in generateStaticParams and sitemap generation. */
export const citySlugs = cities.map((c) => c.slug);
