"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";
import { useInView } from "@/lib/hooks/useInView";

/**
 * Contact section with form and sidebar info card.
 * Uses CSS-based entrance animations via useInView instead of Framer Motion
 * to reduce DOM node count and JS bundle.
 */
export function ContactSection() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const { ref: headerRef, isInView: headerInView } = useInView();
  const { ref: formRef, isInView: formInView } = useInView();
  const { ref: sidebarRef, isInView: sidebarInView } = useInView();

  return (
    <section
      id="contact"
      className="section-padding bg-slate-900/30"
      aria-labelledby="contact-heading"
    >
      <div className="container-wide">
        <div
          ref={headerRef}
          className={`animate-on-scroll mb-14 text-center ${headerInView ? "in-view" : ""}`}
        >
          <h2 id="contact-heading" className="heading-section">
            {t("heading")}
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">{t("subtitle")}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <div
            ref={formRef}
            className={`animate-on-scroll-left lg:col-span-3 ${formInView ? "in-view" : ""}`}
          >
            <ContactForm />
          </div>

          <div
            ref={sidebarRef}
            className={`animate-on-scroll-right lg:col-span-2 ${sidebarInView ? "in-view" : ""}`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
              <h3 className="mb-6 text-lg font-semibold text-white">
                {tFooter("company")}
              </h3>

              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                  <p className="font-medium text-zinc-200">
                    {tFooter("location")}
                  </p>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                  <ObfuscatedEmail
                    user="info"
                    domain="loty-dronem.pl"
                    className="font-medium text-zinc-200 transition-colors hover:text-brand-400"
                  />
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                  <a
                    href={`tel:${tFooter("phone")}`}
                    className="font-medium text-zinc-200 transition-colors hover:text-brand-400"
                  >
                    {tFooter("phone")}
                  </a>
                </li>
              </ul>

              <div className="my-6 border-t border-slate-800" />

              <p className="text-sm leading-relaxed text-zinc-400">
                {tFooter("description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
