import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Mail, Phone } from "lucide-react";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";

interface NavLinkDef {
  key: string;
  section: string;
}

const footerNavLinks: NavLinkDef[] = [
  { key: "services", section: "services" },
  { key: "whyUs", section: "why-us" },
  { key: "about", section: "about" },
  { key: "process", section: "process" },
  { key: "contact", section: "contact" },
];

/** Service page slugs for the footer service links column. */
const serviceSlugs = [
  "photogrammetry",
  "thermal-imaging",
  "3d-models",
  "wildlife-damage",
  "wind-turbines",
] as const;

/** City slugs for the footer locations column. */
const footerCitySlugs = [
  "warszawa",
  "wroclaw",
  "poznan",
  "gdansk",
  "slupsk",
  "krakow",
  "bydgoszcz",
  "lodz",
  "katowice",
  "lublin",
  "szczecin",
  "torun",
  "berlin",
  "hamburg",
  "rostock",
  "drezno",
  "frankfurt-oder",
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950" role="contentinfo">
      <div className="container-wide section-padding">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Company description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3">
              <Image
                src="/images/logo.png"
                alt="Aero Metric"
                width={560}
                height={305}
                sizes="66px"
                className="h-9 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-zinc-400">
              {t("description")}
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {t("navHeading")}
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-1">
                {footerNavLinks.map(({ key, section }) => (
                  <li key={key}>
                    <a
                      href={`/${locale}#${section}`}
                      className="inline-block py-1.5 text-sm text-zinc-400 transition-colors hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {tNav(key)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Service page links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {t("servicesHeading")}
            </h3>
            <nav aria-label="Service pages">
              <ul className="space-y-1">
                {serviceSlugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/${locale}/services/${slug}`}
                      className="inline-block py-1.5 text-sm text-zinc-400 transition-colors hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {t(`serviceLinks.${slug}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* City landing page links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {t("locationsHeading")}
            </h3>
            <nav aria-label="City pages">
              <ul className="space-y-1">
                {footerCitySlugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/${locale}/lokalizacje/${slug}`}
                      className="inline-block py-1.5 text-sm text-zinc-400 transition-colors hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {t(`cityLinks.${slug}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {t("contactHeading")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span className="text-sm text-zinc-400">{t("location")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <ObfuscatedEmail
                  user="info"
                  domain="loty-dronem.pl"
                  className="text-sm text-zinc-400 transition-colors hover:text-brand-400"
                />
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <a
                  href={`tel:${t("phone")}`}
                  className="text-sm text-zinc-400 transition-colors hover:text-brand-400"
                >
                  {t("phone")}
                </a>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-300">
              {t("social")}
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 text-zinc-400 transition-colors hover:border-brand-500 hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 text-zinc-400 transition-colors hover:border-brand-500 hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center">
          <p className="text-xs text-zinc-500">
            &copy; {currentYear} {t("company")}. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
