"use client";

/**
 * Registration form with name, email, password fields and Google sign-in alternative.
 * Redirects to /[locale]/jobs on successful registration.
 */
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Mail, Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth-context";
import { Header } from "@/components/ui/Header";

export function RegisterForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const { signInWithGoogle, signUpWithEmail, user, loading: authLoading } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (!authLoading && user) {
    router.push(`/${locale}/jobs`);
    return null;
  }

  async function handleGoogleSignIn() {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push(`/${locale}/jobs`);
    } catch (err) {
      setError(t("errors.googleFailed"));
      console.error("Google sign-in error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailRegister(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!displayName || !email || !password) {
      setError(t("errors.fieldsRequired"));
      return;
    }

    if (password.length < 6) {
      setError(t("errors.passwordTooShort"));
      return;
    }

    setLoading(true);
    try {
      await signUpWithEmail(email, password, displayName);
      router.push(`/${locale}/jobs`);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/email-already-in-use") {
        setError(t("errors.emailInUse"));
      } else if (code === "auth/weak-password") {
        setError(t("errors.passwordTooShort"));
      } else if (code === "auth/invalid-email") {
        setError(t("errors.invalidEmail"));
      } else {
        setError(t("errors.registerFailed"));
      }
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 pt-[88px] lg:pt-[96px]">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-8">
            <h1 className="mb-2 text-2xl font-bold text-white">
              {t("register.heading")}
            </h1>
            <p className="mb-8 text-sm text-slate-400">
              {t("register.subheading")}
            </p>

            {/* Error message */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Google sign-in */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex min-h-[48px] w-full items-center justify-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {t("register.google")}
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-800" />
              <span className="text-xs text-slate-500">{t("register.or")}</span>
              <div className="h-px flex-1 bg-slate-800" />
            </div>

            {/* Registration form */}
            <form onSubmit={handleEmailRegister} className="space-y-4">
              <div>
                <label
                  htmlFor="displayName"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  {t("register.nameLabel")}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t("register.namePlaceholder")}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  {t("register.emailLabel")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("register.emailPlaceholder")}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  {t("register.passwordLabel")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("register.passwordPlaceholder")}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    autoComplete="new-password"
                    minLength={6}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {t("register.passwordHint")}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  t("register.submit")
                )}
              </button>
            </form>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-slate-400">
              {t("register.hasAccount")}{" "}
              <a
                href={`/${locale}/auth/login`}
                className="font-medium text-brand-400 transition-colors hover:text-brand-300"
              >
                {t("register.loginLink")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
