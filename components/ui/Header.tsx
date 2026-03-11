"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Phone } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { AccountButton } from "@/components/jobs/AccountButton";

interface NavLink {
  key: string;
  section: string;
}

const navLinkDefs: NavLink[] = [
  { key: "services", section: "services" },
  { key: "whyUs", section: "why-us" },
  { key: "about", section: "about" },
  { key: "process", section: "process" },
  { key: "contact", section: "contact" },
];

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <header
      className="fixed left-0 right-0 top-0 z-30 border-b border-gray-200 bg-white shadow-sm"
      role="banner"
    >
      <div className="container-wide flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo / Company name */}
        <a href={`/${locale}`} className="flex items-center rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
          <Image
            src="/images/logo.png"
            alt="Aero Metric"
            width={560}
            height={305}
            sizes="147px"
            className="h-20 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinkDefs.map(({ key, section }) => (
            <a
              key={key}
              href={`/${locale}#${section}`}
              className="inline-flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-gray-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* Right side: phone + language switcher + CTA + mobile menu */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+48785917573"
            className="hidden min-h-[44px] items-center gap-1.5 rounded-lg px-2 text-sm text-slate-600 transition-colors hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 lg:flex"
          >
            <Phone className="h-4 w-4" />
            {t("phone")}
          </a>

          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <AccountButton />

          <a
            href={`/${locale}/jobs`}
            className="hidden min-h-[44px] items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400 lg:inline-flex"
          >
            {t("jobs")}
          </a>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
