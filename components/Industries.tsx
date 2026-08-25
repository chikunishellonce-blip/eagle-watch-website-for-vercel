import ScrollReveal from "./ScrollReveal";
import { industries } from "@/lib/data/content";

export default function Industries() {
  return (
    <section id="industries" className="bg-paper py-24">
      <div className="wrap">
        <ScrollReveal>
          <div className="eyebrow text-steel mb-4">Sectors served</div>
          <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl">
            Deployed across every environment that needs us
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line-dark border border-line-dark">
          {industries.map((name, i) => (
            <ScrollReveal
              key={name}
              delay={(i % 4) * 0.05}
              className="bg-paper p-7 hover:bg-paper-dim transition-colors"
            >
              <div className="font-mono text-xs text-steel">{String(i + 1).padStart(2, "0")}</div>
              <h5 className="text-[15px] font-semibold mt-3">{name}</h5>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
