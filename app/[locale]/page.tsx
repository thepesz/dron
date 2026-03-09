import { getTranslations } from "next-intl/server";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { FloatingPhoneButton } from "@/components/ui/FloatingPhoneButton";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * Main landing page. Assembles all section components in order.
 * Each section is a separate component for maintainability.
 * This is a React Server Component; client interactivity lives
 * in the individual section components marked "use client".
 *
 * Section order:
 *  1. Header (sticky)
 *  2. HeroSection
 *  3. ClientLogosSection (trust strip)
 *  4. ServicesSection
 *  5. StatsSection (experience numbers)
 *  6. PhotoStrip (infinite scrolling marquee)
 *  7. WhyChooseUsSection
 *  8. PortfolioSection
 *  9. TestimonialsSection
 * 10. AboutSection
 * 11. ProcessSection
 * 12. ContactSection
 * 13. Footer
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
