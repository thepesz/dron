"use client";

/**
 * Form for creating a new job listing.
 * Protected — redirects to login if user is not authenticated.
 * Posts to /api/jobs with Firebase ID token in Authorization header.
 */
import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/lib/firebase/auth-context";
import { Header } from "@/components/ui/Header";

/**
 * Map of Polish city names to coordinates and province.
 * Covers the Szczecin / zachodniopomorskie area.
 */
const CITY_COORDINATES: Record<
  string,
  { lat: number; lng: number; province: string }
> = {
  Szczecin: { lat: 53.4285, lng: 14.5528, province: "zachodniopomorskie" },
  Stargard: { lat: 53.3364, lng: 15.0491, province: "zachodniopomorskie" },
  "Swinoujscie": { lat: 53.9107, lng: 14.2478, province: "zachodniopomorskie" },
  Koszalin: { lat: 54.1944, lng: 16.1715, province: "zachodniopomorskie" },
  Police: { lat: 53.5544, lng: 14.5689, province: "zachodniopomorskie" },
  "Goleniow": { lat: 53.5647, lng: 14.8282, province: "zachodniopomorskie" },
  Gryfino: { lat: 53.2549, lng: 14.4877, province: "zachodniopomorskie" },
  "Mysliborz": { lat: 52.9236, lng: 14.8647, province: "zachodniopomorskie" },
  Pyrzyce: { lat: 53.1449, lng: 14.8936, province: "zachodniopomorskie" },
  "Darlowo": { lat: 54.4248, lng: 16.4112, province: "zachodniopomorskie" },
  Kolobrzeg: { lat: 54.1759, lng: 15.5833, province: "zachodniopomorskie" },
  Walcz: { lat: 53.2708, lng: 16.4700, province: "zachodniopomorskie" },
};

const SERVICE_OPTIONS = [
  "photogrammetry",
  "thermal",
  "inspection",
  "aerial",
  "wildlife_damage",
  "wind_turbines",
] as const;

const DRONE_OPTIONS = [
  "dji_mavic",
  "dji_phantom",
  "dji_matrice",
  "fixed_wing",
] as const;

const LICENSE_OPTIONS = ["a1a3", "a2", "sts"] as const;

export function NewJobForm() {
  const t = useTranslations("jobs");
  const tAuth = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Form state
  const [type, setType] = useState<"seeking_operator" | "seeking_job">(
    "seeking_operator"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Szczecin");
  const [radius, setRadius] = useState(50);
  const [services, setServices] = useState<string[]>([]);
  const [droneTypes, setDroneTypes] = useState<string[]>([]);
  const [licenses, setLicenses] = useState<string[]>([]);
  const [rate, setRate] = useState<string>("");
  const [rateType, setRateType] = useState<"day" | "project" | "negotiable">(
    "day"
  );
  const [rateNegotiable, setRateNegotiable] = useState(false);
  const [contactName, setContactName] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Pre-fill contact name from user profile
  useEffect(() => {
    if (user?.displayName) {
      setContactName(user.displayName);
    }
  }, [user]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/${locale}/auth/login`);
    }
  }, [authLoading, user, locale, router]);

  if (authLoading) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen items-center justify-center bg-slate-950 pt-[88px]">
          <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
      </>
    );
  }

  if (!user) return null;

  function toggleArrayValue(arr: string[], value: string): string[] {
    return arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate
    if (!title.trim()) {
      setError(t("newJob.errorTitle"));
      return;
    }
    if (!description.trim()) {
      setError(t("newJob.errorDescription"));
      return;
    }
    if (services.length === 0) {
      setError(t("newJob.errorServices"));
      return;
    }

    setSubmitting(true);

    try {
      // Get Firebase ID token — use user from context (already resolved via
      // onAuthStateChanged) then force-refresh to ensure a valid token.
      const idToken = await user.getIdToken(/* forceRefresh */ true);
      if (!idToken) {
        setError(tAuth("errors.loginFailed"));
        return;
      }

      // Look up coordinates for the selected city
      const cityData = CITY_COORDINATES[location] ?? CITY_COORDINATES.Szczecin;

      const body = {
        type,
        title: title.trim(),
        description: description.trim(),
        location,
        coordinates: { lat: cityData.lat, lng: cityData.lng },
        radius,
        province: cityData.province,
        services,
        droneTypes,
        licenses,
        rate: rate ? parseInt(rate, 10) : null,
        rateType: rateNegotiable ? "negotiable" : rateType,
        rateNegotiable,
        contactName: contactName.trim() || user?.displayName || "Anonymous",
        locale,
      };

      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create job");
      }

      setSuccess(true);
      // Redirect to jobs page after short delay
      setTimeout(() => {
        router.push(`/${locale}/jobs`);
      }, 1500);
    } catch (err) {
      console.error("Create job error:", err);
      setError(
        err instanceof Error ? err.message : t("newJob.errorGeneric")
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-950 pt-[88px] lg:pt-[96px]">
        {/* Top bar */}
        <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
          <div className="container-wide px-4 py-3 sm:px-6">
            <a
              href={`/${locale}/jobs`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("backToList")}
            </a>
          </div>
        </div>

        <div className="container-wide px-4 py-8 sm:px-6 lg:py-12">
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
              {t("newJob.heading")}
            </h1>
            <p className="mb-8 text-sm text-slate-400">
              {t("newJob.subheading")}
            </p>

            {/* Success message */}
            {success && (
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                <p className="text-sm text-green-400">{t("newJob.success")}</p>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Type toggle */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">
                  {t("newJob.typeLabel")}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType("seeking_operator")}
                    className={`min-h-[48px] rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                      type === "seeking_operator"
                        ? "border-brand-500 bg-brand-500/15 text-brand-400"
                        : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {t("seekingOperator")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("seeking_job")}
                    className={`min-h-[48px] rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
                      type === "seeking_job"
                        ? "border-sky-500 bg-sky-500/15 text-sky-400"
                        : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {t("seekingJob")}
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-1.5 block text-sm font-semibold text-white"
                >
                  {t("newJob.titleLabel")}
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t("newJob.titlePlaceholder")}
                  maxLength={200}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-sm font-semibold text-white"
                >
                  {t("newJob.descriptionLabel")}
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("newJob.descriptionPlaceholder")}
                  rows={5}
                  maxLength={2000}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              {/* Contact name */}
              <div>
                <label
                  htmlFor="contactName"
                  className="mb-1.5 block text-sm font-semibold text-white"
                >
                  {t("newJob.contactNameLabel")}
                </label>
                <input
                  id="contactName"
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder={t("newJob.contactNamePlaceholder")}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-1.5 block text-sm font-semibold text-white"
                >
                  {t("newJob.locationLabel")}
                </label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  {Object.keys(CITY_COORDINATES).map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Radius */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-white">
                  {t("newJob.radiusLabel")} — {radius} km
                </label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value, 10))}
                  className="w-full accent-brand-500"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>10 km</span>
                  <span>200 km</span>
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">
                  {t("services")}
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {SERVICE_OPTIONS.map((service) => (
                    <label
                      key={service}
                      className={`flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
                        services.includes(service)
                          ? "border-brand-500 bg-brand-500/15 text-brand-400"
                          : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={services.includes(service)}
                        onChange={() =>
                          setServices((prev) => toggleArrayValue(prev, service))
                        }
                        className="sr-only"
                      />
                      {t(`serviceLabels.${service}`)}
                    </label>
                  ))}
                </div>
              </div>

              {/* Drone types */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">
                  {t("droneType")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {DRONE_OPTIONS.map((drone) => (
                    <label
                      key={drone}
                      className={`flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
                        droneTypes.includes(drone)
                          ? "border-brand-500 bg-brand-500/15 text-brand-400"
                          : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={droneTypes.includes(drone)}
                        onChange={() =>
                          setDroneTypes((prev) =>
                            toggleArrayValue(prev, drone)
                          )
                        }
                        className="sr-only"
                      />
                      {t(`droneLabels.${drone}`)}
                    </label>
                  ))}
                </div>
              </div>

              {/* Licenses */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">
                  {t("license")}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {LICENSE_OPTIONS.map((license) => (
                    <label
                      key={license}
                      className={`flex min-h-[44px] cursor-pointer items-center justify-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
                        licenses.includes(license)
                          ? "border-brand-500 bg-brand-500/15 text-brand-400"
                          : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={licenses.includes(license)}
                        onChange={() =>
                          setLicenses((prev) =>
                            toggleArrayValue(prev, license)
                          )
                        }
                        className="sr-only"
                      />
                      {t(`licenseLabels.${license}`)}
                    </label>
                  ))}
                </div>
              </div>

              {/* Rate */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">
                  {t("rate")}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="PLN"
                    min="0"
                    max="50000"
                    disabled={rateNegotiable}
                    className="w-32 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:opacity-50"
                  />
                  <select
                    value={rateType}
                    onChange={(e) =>
                      setRateType(e.target.value as "day" | "project")
                    }
                    disabled={rateNegotiable}
                    className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-3 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:opacity-50"
                  >
                    <option value="day">{t("perDay")}</option>
                    <option value="project">{t("perProject")}</option>
                  </select>
                  <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-slate-400">
                    <input
                      type="checkbox"
                      checked={rateNegotiable}
                      onChange={(e) => setRateNegotiable(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-brand-500 focus:ring-brand-500"
                    />
                    {t("negotiable")}
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || success}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400 disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  t("newJob.submit")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
