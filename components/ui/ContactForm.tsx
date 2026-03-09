"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

function createContactSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(1, t("nameRequired")).min(2, t("nameMin")),
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^[+]?[\d\s()-]{7,20}$/.test(val), {
        message: "",
      }),
    message: z.string().min(1, t("messageRequired")).min(10, t("messageMin")),
  });
}

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");

  const schema = createContactSchema((key) => t(`validation.${key}`));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-green-800/50 bg-green-900/10 p-8 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-green-400" />
        <p className="text-lg font-medium text-green-300">{t("success")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-lg border border-slate-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          &larr;
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === "error" && (
        <div className="flex items-center gap-3 rounded-lg border border-red-800/50 bg-red-900/10 p-4">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
          <p className="text-sm text-red-300">{t("error")}</p>
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-zinc-300">
          {t("fields.name")} <span className="text-red-400">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder={t("placeholders.name")}
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-zinc-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-zinc-300">
          {t("fields.email")} <span className="text-red-400">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder={t("placeholders.email")}
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-zinc-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-zinc-300">
          {t("fields.phone")}
        </label>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          placeholder={t("placeholders.phone")}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          aria-invalid={!!errors.phone}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-zinc-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          {...register("phone")}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-400" role="alert">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-zinc-300">
          {t("fields.message")} <span className="text-red-400">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={t("placeholders.message")}
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-zinc-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <><Loader2 className="h-5 w-5 animate-spin" />{t("sending")}</>
        ) : (
          <><Send className="h-5 w-5" />{t("submit")}</>
        )}
      </button>
    </form>
  );
}
