import dynamic from "next/dynamic";
import ScrollReveal from "./ScrollReveal";
import ContactForm from "./ContactForm";
import { companyInfo } from "@/lib/data/content";

const SiteMap = dynamic(() => import("./SiteMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded bg-paper-dim animate-pulse motion-reduce:animate-none" />
  ),
});

const rows = [
  {
    icon: (
      <>
        <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    k: "Address",
    v: companyInfo.addressLine,
  },
  {
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    k: "Phone",
    v: companyInfo.phones.join("  |  "),
  },
  {
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 6 10 7L22 6" />
      </>
    ),
    k: "Email",
    v: companyInfo.email,
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
    k: "Availability",
    v: "24/7 round-the-clock protection",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-paper-dim py-24">
      <div className="wrap">
        <ScrollReveal>
          <div className="eyebrow text-signal mb-4">Get in touch</div>
          <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl">
            Talk to us about securing your site
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-14">
          <ScrollReveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {rows.map((row) => (
                <div key={row.k} className="flex items-start gap-4">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="text-signal shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {row.icon}
                  </svg>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-steel">{row.k}</div>
                    <div className="text-sm font-medium mt-0.5">{row.v}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-[280px] lg:h-[320px] border border-line-dark rounded overflow-hidden">
              <SiteMap />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="bg-paper border border-line-dark rounded p-7 sm:p-8">
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
