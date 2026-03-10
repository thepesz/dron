import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { getTranslations } from "next-intl/server";
import { AccountPageContent } from "@/components/jobs/AccountPageContent";

interface AccountPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AccountPageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "pl";
  const t = await getTranslations({ locale: validLocale, namespace: "account" });
  return generateLocalizedMetadata({
    locale: validLocale,
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/account",
  });
}

export default function AccountPage() {
  return <AccountPageContent />;
}
