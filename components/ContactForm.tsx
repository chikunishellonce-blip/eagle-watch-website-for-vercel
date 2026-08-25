"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { companyInfo } from "@/lib/data/content";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", siteType: "", message: "", company_website: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    setServerMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerMessage(data.message || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerMessage("We couldn't reach the server. Please try again or use WhatsApp below.");
    }
  };

  const values = watch();
  const whatsappMessage = encodeURIComponent(
    `Hi Eagle Watch, my name is ${values.name || "___"}. I need help with: ${values.message || "___"}`
  );
  const whatsappHref = `https://wa.me/${companyInfo.whatsapp}?text=${whatsappMessage}`;

  if (status === "success") {
    return (
      <div className="bg-paper-dim border border-line-dark rounded p-8 text-center">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="text-signal mx-auto mb-4"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l3 3 5-6" />
        </svg>
        <h3 className="font-semibold text-lg mb-2">Message sent</h3>
        <p className="text-steel text-sm">
          Thanks — our team will get back to you shortly. For anything urgent, call the emergency
          line above or message us on WhatsApp.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-signal hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from real visitors, catches simple bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" tabIndex={-1} autoComplete="off" {...register("company_website")} />
      </div>

      <Field label="Full name" error={errors.name?.message}>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          className={inputClass(!!errors.name)}
          {...register("name")}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            className={inputClass(!!errors.email)}
            {...register("email")}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            placeholder="+263 7XX XXX XXX"
            className={inputClass(!!errors.phone)}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label="Company / site" error={errors.siteType?.message}>
        <input
          id="siteType"
          type="text"
          placeholder="e.g. residential, retail, corporate"
          className={inputClass(!!errors.siteType)}
          {...register("siteType")}
        />
      </Field>

      <Field label="What do you need?" error={errors.message?.message}>
        <textarea
          id="message"
          rows={4}
          placeholder="Guards, CCTV, electric fencing, investigations..."
          className={inputClass(!!errors.message)}
          {...register("message")}
        />
      </Field>

      {status === "error" && serverMessage && (
        <p role="alert" className="text-sm text-red-600">
          {serverMessage}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex justify-center items-center gap-2 bg-signal hover:bg-signal-dim disabled:opacity-60 transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-[3px]"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center items-center gap-2 border border-line-dark hover:border-signal transition-colors text-ink font-semibold text-sm px-6 py-3.5 rounded-[3px]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.6 6.3A8.9 8.9 0 0 0 12 4a8.9 8.9 0 0 0-7.7 13.4L3 21l3.7-1.3A8.9 8.9 0 0 0 12 21a8.9 8.9 0 0 0 5.6-15.7zM12 19.3a7.2 7.2 0 0 1-3.7-1l-.3-.2-2.6.9.9-2.5-.2-.3A7.3 7.3 0 1 1 19.3 12 7.2 7.2 0 0 1 12 19.3z" />
          </svg>
          Or message us on WhatsApp
        </a>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full bg-paper border rounded px-4 py-3 text-sm text-ink placeholder:text-steel-light focus:border-signal outline-none transition-colors ${
    hasError ? "border-red-500" : "border-line-dark"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-steel mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
