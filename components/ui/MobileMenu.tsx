"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavLinkDef {
  key: string;
  section: string;
}

const navLinkDefs: NavLinkDef[] = [
  { key: "services", section: "services" },
  { key: "whyUs", section: "why-us" },
  { key: "about", section: "about" },
  { key: "process", section: "process" },
  { key: "contact", section: "contact" },
];

/**
 * Mobile hamburger menu with slide-in panel.
 * Traps focus when open and closes on Escape or overlay click.
 */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("nav");
  const locale = useLocale();

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to the trigger button
    triggerRef.current?.focus();
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-gray-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Slide-in panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <LanguageSwitcher />
          <button
            onClick={close}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-gray-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navLinkDefs.map(({ key, section }) => (
            <a
              key={key}
              href={`/${locale}#${section}`}
              onClick={close}
              className="rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-gray-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {t(key)}
            </a>
          ))}

          <a
            href={`/${locale}/jobs`}
            onClick={close}
            className="mt-4 rounded-lg bg-brand-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            {t("jobs")}
          </a>
        </nav>
      </div>
    </div>
  );
}
