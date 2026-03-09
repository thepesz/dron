"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";

export function ContactSection() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");

  return (
    <section
      id="contact"
      className="section-padding bg-slate-900/30"
      aria-labelledby="contact-heading"
    >
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 id="contact-heading" className="heading-section">
            {t("heading")}
          </h2>
          <p className="text-body mx-auto mt-4 max-w-2xl">{t("subtitle")}</p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
              <h3 className="mb-6 text-lg font-semibold text-white">
                {tFooter("company")}
              </h3>

              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                  <div>
                    <p className="font-medium text-zinc-200">
                      {tFooter("location")}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                  <div>
                    <a
                      href={`mailto:${tFooter("email")}`}
                      className="font-medium text-zinc-200 transition-colors hover:text-brand-400"
                    >
                      {tFooter("email")}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                  <div>
                    <a
                      href={`tel:${tFooter("phone")}`}
                      className="font-medium text-zinc-200 transition-colors hover:text-brand-400"
                    >
                      {tFooter("phone")}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="my-6 border-t border-slate-800" />

              <p className="text-sm leading-relaxed text-zinc-400">
                {tFooter("description")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
