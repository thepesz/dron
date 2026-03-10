import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { getTranslations } from "next-intl/server";
import { RegisterForm } from "@/components/auth/RegisterForm";

interface RegisterPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: RegisterPageProps): Promise<Metadata> {
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "pl";
  const t = await getTranslations({ locale: validLocale, namespace: "auth" });

  return generateLocalizedMetadata({
    locale: validLocale,
    title: t("register.metaTitle"),
    description: t("register.metaDescription"),
    path: "/auth/register",
  });
}

export default function RegisterPage() {
  return <RegisterForm />;
}
