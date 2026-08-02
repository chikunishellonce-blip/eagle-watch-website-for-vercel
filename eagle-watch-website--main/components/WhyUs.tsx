import ScrollReveal from "./ScrollReveal";
import { whyChecklist, trainingTags } from "@/lib/data/content";

export default function WhyUs() {
  return (
    <section id="why" className="bg-paper py-24">
      <div className="wrap">
        <ScrollReveal>
          <div className="eyebrow text-steel mb-4">Why Eagle Watch</div>
          <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl">What clients get with us</h2>
        </ScrollReveal>

        <div className="mt-12 grid md:grid-cols-2 gap-14">
          <ScrollReveal className="flex flex-col gap-5">
            {whyChecklist.map((item) => (
              <div key={item} className="flex items-start gap-3.5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-signal shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <p className="text-steel leading-relaxed">{item}</p>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h3 className="text-[15px] uppercase tracking-wide text-steel mb-4 font-semibold">
              Our people are trained in
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {trainingTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[13px] font-medium bg-paper-dim border border-line-dark rounded-full px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
