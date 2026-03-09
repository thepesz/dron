import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { generateStructuredData } from "@/lib/seo/structuredData";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

/**
 * Generate localized metadata for each locale at build time.
 */
export async function generateMetadata({
  params: { locale },
}: LocaleLayoutProps): Promise<Metadata> {
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "pl";
  const t = await getTranslations({ locale: validLocale, namespace: "meta" });

  return generateLocalizedMetadata({
    locale: validLocale,
    title: t("title"),
    description: t("description"),
  });
}

/**
 * Pre-generate all locale variants at build time.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const structuredData = generateStructuredData(locale as Locale);

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
