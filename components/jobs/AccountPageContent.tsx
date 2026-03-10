"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/lib/firebase/auth-context";
import { Header } from "@/components/ui/Header";
import { User, Mail, LogOut, Plus, ListChecks } from "lucide-react";

/**
 * Client-side content for the /account page.
 * Redirects to login if not authenticated.
 * Shows profile card + user's listings (placeholder for now).
 */
export function AccountPageContent() {
  const { user, loading, signOut } = useAuth();
  const locale = useLocale();
  const t = useTranslations("account");
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/${locale}/auth/login`);
    }
  }, [user, loading, locale, router]);

  if (loading || !user) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen items-center justify-center bg-slate-950 pt-[88px]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-brand-500" />
        </div>
      </>
    );
  }

  const initials = (user.displayName || user.email || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-950 pt-[88px] lg:pt-[96px]">
        {/* Page header bar */}
        <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
          <div className="container-wide flex items-center justify-between px-4 py-3 sm:px-6">
            <h1 className="text-lg font-bold text-white sm:text-xl">
              {t("heading")}
            </h1>
            <button
              onClick={async () => {
                await signOut();
                router.replace(`/${locale}`);
              }}
              className="flex min-h-[44px] items-center gap-2 rounded-lg border border-red-800 px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-900/30"
            >
              <LogOut className="h-4 w-4" />
              {t("signOut")}
            </button>
          </div>
        </div>

        <div className="container-wide px-4 py-8 sm:px-6 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* Profile card */}
            <div className="h-fit rounded-xl border border-slate-800 bg-slate-900 p-6">
              {/* Avatar */}
              <div className="mb-5 flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-600 text-2xl font-bold text-white">
                  {user.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.photoURL}
                      alt={user.displayName ?? "Zdjęcie profilowe"}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-white">
                    {user.displayName || "\u2014"}
                  </p>
                  <p className="text-sm text-slate-400">{user.email}</p>
                </div>
              </div>

              {/* Info rows */}
              <div className="space-y-3 border-t border-slate-800 pt-5">
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 shrink-0 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">{t("nameLabel")}</p>
                    <p className="text-white">
                      {user.displayName || "\u2014"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 shrink-0 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500">{t("emailLabel")}</p>
                    <p className="text-white">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Listings section */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-slate-400" />
                  <h2 className="text-base font-semibold text-white">
                    {t("myListings")}
                  </h2>
                </div>
                <a
                  href={`/${locale}/jobs/new`}
                  className="flex min-h-[40px] items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
                >
                  <Plus className="h-4 w-4" />
                  {t("addListing")}
                </a>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
                <p className="text-sm text-slate-500">{t("noListings")}</p>
                <a
                  href={`/${locale}/jobs/new`}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
                >
                  <Plus className="h-4 w-4" />
                  {t("addFirstListing")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
