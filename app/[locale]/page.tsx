import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

/**
 * Below-the-fold sections are dynamically imported to defer their JS.
 * This reduces the initial JS bundle and speeds up First Input Delay (FID)
 * and Interaction to Next Paint (INP).
 *
 * - WhyChooseUsSection: uses useInView + setInterval for background photos
 * - AboutSection: uses useInView + next/image
 * - ProcessSection: uses useInView
 * - ContactSection: heaviest — pulls in React Hook Form + Zod via ContactForm
 * - FloatingPhoneButton: small but not needed at page load
 */
const WhyChooseUsSection = dynamic(
  () =>
    import("@/components/sections/WhyChooseUsSection").then(
      (mod) => mod.WhyChooseUsSection
    ),
  { ssr: true }
);

const AboutSection = dynamic(
  () =>
    import("@/components/sections/AboutSection").then(
      (mod) => mod.AboutSection
    ),
  { ssr: true }
);

const ProcessSection = dynamic(
  () =>
    import("@/components/sections/ProcessSection").then(
      (mod) => mod.ProcessSection
    ),
  { ssr: true }
);

const ContactSection = dynamic(
  () =>
    import("@/components/sections/ContactSection").then(
      (mod) => mod.ContactSection
    ),
  { ssr: false }
);

const FloatingPhoneButton = dynamic(
  () =>
    import("@/components/ui/FloatingPhoneButton").then(
      (mod) => mod.FloatingPhoneButton
    ),
  { ssr: false }
);

/**
 * Main landing page. Assembles all section components in order.
 * Each section is a separate component for maintainability.
 * This is a React Server Component; client interactivity lives
 * in the individual section components marked "use client".
 *
 * Section order:
 *  1. Header (sticky)
 *  2. HeroSection
 *  3. ServicesSection
 *  4. WhyChooseUsSection
 *  5. AboutSection
 *  6. ProcessSection
 *  7. ContactSection
 *  8. Footer
 *
 * Heavy below-fold sections use next/dynamic for code splitting:
 * - ContactSection (ssr: false) — includes React Hook Form + Zod
 * - FloatingPhoneButton (ssr: false) — mobile-only, not needed at page load
 * - WhyChooseUsSection, AboutSection, ProcessSection (ssr: true) — deferred JS
 */
export default async function HomePage() {
  const t = await getTranslations();

  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <AboutSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <FloatingPhoneButton />
      <Footer />
    </>
  );
}
