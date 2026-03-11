"use client";

import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";

/**
 * Floating phone CTA button visible only on mobile/tablet screens (below lg breakpoint).
 * Fixed at bottom-right corner. Links to tel: for direct phone call.
 * Critical mobile conversion signal for local B2B services.
 */
export function FloatingPhoneButton() {
  const t = useTranslations("nav");

  return (
    <a
      href="tel:+48785917573"
      aria-label={t("floatingCta")}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-all hover:bg-brand-500 hover:shadow-brand-500/40 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-slate-950 lg:hidden"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
