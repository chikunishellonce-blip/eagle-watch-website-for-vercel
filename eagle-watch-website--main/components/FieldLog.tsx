import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { fieldLog } from "@/lib/data/content";

export default function FieldLog() {
  return (
    <section id="fieldlog" className="bg-ink text-white py-24">
      <div className="wrap">
        <ScrollReveal>
          <div className="eyebrow text-signal mb-4">On site</div>
          <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl">From the field log</h2>
          <p className="mt-3 max-w-xl text-steel-light leading-relaxed">
            Our investigators and technicians keep logs of every deployment — in image and
            statement form. A sample of recent installation work from our own technical teams.
          </p>
        </ScrollReveal>
      </div>

      <div className="mt-12 flex gap-5 overflow-x-auto px-7 sm:px-5 pb-4 snap-x snap-mandatory lg:wrap lg:grid lg:grid-cols-4 lg:overflow-visible">
        {fieldLog.map((entry, i) => (
          <ScrollReveal
            key={entry.code}
            delay={i * 0.06}
            className="relative shrink-0 w-[78vw] sm:w-[340px] lg:w-auto snap-start bg-panel border border-line rounded overflow-hidden"
          >
            <span className="absolute top-3 left-3 z-10 font-mono text-[11px] tracking-wide text-signal bg-ink/70 backdrop-blur px-2 py-1 rounded">
              ● ACTIVE
            </span>
            <div className="relative aspect-[4/3] bg-navy">
              <Image
                src={entry.image}
                alt={entry.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 78vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <div className="font-mono text-[11px] text-steel-light">{entry.code}</div>
              <h4 className="text-[15px] font-semibold mt-2 mb-1.5">{entry.title}</h4>
              <p className="text-[13px] text-steel-light leading-relaxed">{entry.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
