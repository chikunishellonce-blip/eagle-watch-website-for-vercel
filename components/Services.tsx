import ScrollReveal from "./ScrollReveal";
import { services } from "@/lib/data/services";

export default function Services() {
  return (
    <section id="services" className="bg-paper-dim py-24">
      <div className="wrap">
        <ScrollReveal>
          <div className="eyebrow text-steel mb-4">What we deploy</div>
          <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl">
            A full range of security services
          </h2>
          <p className="mt-3 max-w-xl text-steel leading-relaxed">
            Permanent or temporary manned guarding contracts, deployed across corporate, retail,
            public sector, logistics and residential sites.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ScrollReveal
              key={s.number}
              delay={(i % 3) * 0.06}
              className="bg-paper border border-line-dark rounded p-6 hover:border-signal/50 transition-colors"
            >
              <span className="font-mono text-xs text-signal">{s.number}</span>
              <h4 className="text-[15px] font-semibold mt-3 mb-2">{s.title}</h4>
              <p className="text-[13.5px] text-steel leading-relaxed">{s.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
