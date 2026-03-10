"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { LogOut, ListChecks, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth-context";

/**
 * Auth-aware button for the Header.
 * - Logged in: shows avatar initials + dropdown (My account, Sign out)
 * - Not logged in: shows "Login" link
 */
export function AccountButton() {
  const { user, loading, signOut } = useAuth();
  const t = useTranslations("nav");
  const tAccount = useTranslations("account");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (loading) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />;
  }

  if (!user) {
    return (
      <a
        href={`/${locale}/auth/login`}
        className="hidden min-h-[44px] items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-gray-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 lg:inline-flex"
      >
        {t("login")}
      </a>
    );
  }

  const initials = (user.displayName || user.email || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div ref={ref} className="relative hidden lg:block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
          {initials}
        </span>
        <span className="max-w-[100px] truncate">
          {user.displayName || user.email?.split("@")[0]}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          <a
            href={`/${locale}/account`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-gray-50"
          >
            <ListChecks className="h-4 w-4 text-slate-500" />
            {t("account")}
          </a>
          <hr className="my-1 border-slate-100" />
          <button
            onClick={async () => {
              setOpen(false);
              await signOut();
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            {tAccount("signOut")}
          </button>
        </div>
      )}
    </div>
  );
}
