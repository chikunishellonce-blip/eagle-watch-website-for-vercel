import ScrollReveal from "./ScrollReveal";
import Image from "next/image";
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
          {industries.map((industry, i) => (
            <ScrollReveal
              key={industry.name}
              delay={(i % 4) * 0.05}
              className="bg-paper hover:bg-paper-dim transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <div className="font-mono text-xs text-steel">{String(i + 1).padStart(2, "0")}</div>
                <h5 className="text-[15px] font-semibold mt-3">{industry.name}</h5>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
