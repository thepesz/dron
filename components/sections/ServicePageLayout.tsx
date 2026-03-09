import Link from "next/link";
import { ChevronRight, ArrowRight, Check } from "lucide-react";

/**
 * Slug identifiers for all dedicated service landing pages.
 * Used by generateStaticParams and for type-safe slug validation.
 */
export const serviceSlugs = [
  "photogrammetry",
  "thermal-imaging",
  "3d-models",
  "wildlife-damage",
  "wind-turbines",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

interface BenefitItem {
  title: string;
  description: string;
  link?: { url: string; text: string };
}

interface UseCaseItem {
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface DeliverablesData {
  heading: string;
  items: string[];
}

interface AreaData {
  heading: string;
  text: string;
}

interface ServicePageLayoutProps {
  locale: string;
  breadcrumbLabel: string;
  heroHeading: string;
  heroSubheading: string;
  introParagraphs: string[];
  benefits: BenefitItem[];
  useCases: UseCaseItem[];
  processSteps: ProcessStep[];
  processHeading: string;
  deliverables: DeliverablesData;
  area: AreaData;
  ctaHeading: string;
  ctaText: string;
  /** Translation labels for shared UI text */
  labels: {
    home: string;
    servicesLabel: string;
    backToHome: string;
  };
}

/**
 * Full-page layout for dedicated service landing pages.
 * Renders breadcrumb, hero, intro, benefits grid, use cases,
 * process steps, deliverables checklist, area of operation,
 * and a call-to-action section. This is a Server Component
 * (no "use client" directive) — no Framer Motion animations
 * to keep service pages fast and lightweight.
 */
export function ServicePageLayout({
  locale,
  breadcrumbLabel,
  heroHeading,
  heroSubheading,
  introParagraphs,
  benefits,
  useCases,
  processSteps,
  processHeading,
  deliverables,
  area,
  ctaHeading,
  ctaText,
  labels,
}: ServicePageLayoutProps) {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="bg-slate-900 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-400">
              <li>
                <Link
                  href={`/${locale}`}
                  className="rounded transition-colors hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {labels.home}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
              </li>
              <li>
                <Link
                  href={`/${locale}#services`}
                  className="rounded transition-colors hover:text-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {labels.servicesLabel}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
              </li>
              <li>
                <span className="text-zinc-200" aria-current="page">
                  {breadcrumbLabel}
                </span>
              </li>
            </ol>
          </nav>

          {/* Hero heading and subheading */}
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {heroHeading}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
            {heroSubheading}
          </p>
        </div>
      </section>

      {/* ── Intro Section ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-5">
            {introParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-slate-700 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits Section ── */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="border-l-4 border-l-brand-500 bg-white p-6 shadow-sm sm:p-8"
              >
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
                {benefit.link && (
                  <a
                    href={benefit.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-brand-600 underline hover:text-brand-500"
                  >
                    {benefit.link.text}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases Section ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <ol className="space-y-8">
              {useCases.map((useCase, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {useCase.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {useCase.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {processHeading}
          </h2>
          <div className="mx-auto max-w-3xl">
            <ol className="relative space-y-8 border-l-2 border-brand-200 pl-8">
              {processSteps.map((step, i) => (
                <li key={i} className="relative">
                  {/* Step number circle positioned on the border line */}
                  <span className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white ring-4 ring-gray-50">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Deliverables Section ── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {deliverables.heading}
          </h2>
          <div className="mx-auto max-w-2xl">
            <ul className="space-y-4">
              {deliverables.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-base leading-relaxed text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Area of Operation Section ── */}
      <section className="bg-slate-800 py-16 sm:py-20 lg:py-24">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
              {area.heading}
            </h2>
            <p className="text-lg leading-relaxed text-zinc-300">
              {area.text}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-slate-950 py-16 sm:py-20 lg:py-24">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {ctaHeading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-300">
              {ctaText}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
              >
                {labels.backToHome}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
