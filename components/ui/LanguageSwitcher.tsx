"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

/**
 * Compact language switcher rendered as small text buttons.
 * Highlights the current locale and navigates to the same path
 * in the target locale on click.
 */
export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function handleSwitch(targetLocale: Locale) {
    if (targetLocale === locale) return;

    // Replace the current locale prefix with the target locale
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    const newPath = segments.join("/");

    router.push(newPath);
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleSwitch(loc)}
          aria-current={loc === locale ? "true" : undefined}
          className={`rounded px-2 py-1 text-xs font-medium uppercase tracking-wider transition-colors ${
            loc === locale
              ? "bg-brand-600 text-white"
              : "text-zinc-400 hover:bg-slate-800 hover:text-white"
          }`}
          title={localeNames[loc]}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
