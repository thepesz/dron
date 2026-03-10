import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import { generateLocalizedMetadata } from "@/lib/seo/metadata";
import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/components/auth/LoginForm";

interface LoginPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: LoginPageProps): Promise<Metadata> {
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "pl";
  const t = await getTranslations({ locale: validLocale, namespace: "auth" });

  return generateLocalizedMetadata({
    locale: validLocale,
    title: t("login.metaTitle"),
    description: t("login.metaDescription"),
    path: "/auth/login",
  });
}

export default function LoginPage() {
  return <LoginForm />;
}
