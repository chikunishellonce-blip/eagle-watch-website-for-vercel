import ScrollReveal from "./ScrollReveal";
import { technology } from "@/lib/data/content";

const icons: Record<string, JSX.Element> = {
  cctv: (
    <>
      <rect x="2" y="6" width="15" height="11" rx="1.5" />
      <path d="M17 10l5-3v10l-5-3" />
    </>
  ),
  access: (
    <>
      <rect x="3" y="10" width="18" height="10" rx="2" />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
    </>
  ),
  alarms: (
    <>
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
      <circle cx="12" cy="9" r="2.4" />
    </>
  ),
  fence: <path d="M4 21V9M9 21V4M14 21v-9M19 21V7" />,
  gate: (
    <>
      <path d="M3 21h11M14 21V4l7 3v14" />
      <circle cx="9" cy="12" r="1" />
    </>
  ),
};

export default function Technology() {
  return (
    <section id="technology" className="bg-navy text-white py-24">
      <div className="wrap">
        <ScrollReveal>
          <div className="eyebrow text-signal mb-4">Electronic security</div>
          <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl">
            Technology behind the guard
          </h2>
          <p className="mt-3 max-w-xl text-steel-light leading-relaxed">
            We install and upgrade electronic systems at affordable prices, backed by our own
            field technicians.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {technology.map((t, i) => (
            <ScrollReveal
              key={t.key}
              delay={i * 0.05}
              className="flex flex-col items-center text-center gap-3 border border-line rounded p-7 hover:border-signal/50 transition-colors"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="text-signal"
                aria-hidden="true"
              >
                {icons[t.key]}
              </svg>
              <span className="text-sm font-medium">{t.label}</span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
