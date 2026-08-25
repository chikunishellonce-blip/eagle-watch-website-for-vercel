import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { eagleValues, visionMission } from "@/lib/data/values";

export default function About() {
  return (
    <section id="about" className="bg-paper py-24">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
          <ScrollReveal className="relative min-h-[390px] overflow-hidden rounded-lg">
            <Image
              src="/images/large_venn_diagram_eagle.webp"
              alt="Eagle Watch values Venn diagram"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 bg-ink/80 p-5 text-white">
              <span className="eyebrow text-signal">Built for the real world</span>
              <p className="mt-2 text-sm text-steel-light">People, process and technology working together.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="eyebrow text-steel mb-4">About the company</div>
            <h2 className="text-3xl sm:text-4xl font-semibold">Security that stays switched on.</h2>
            <div className="mt-8 grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-signal">Vision</h3>
                <p className="text-steel leading-relaxed text-sm">{visionMission.vision}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-signal">Mission</h3>
                <p className="text-steel leading-relaxed text-sm">{visionMission.mission}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-24">
          <div className="eyebrow text-steel mb-4">Our values</div>
          <h2 className="text-3xl sm:text-4xl font-semibold">Built on EAGLE</h2>
          <p className="mt-3 max-w-xl text-steel leading-relaxed">The principles behind every deployment.</p>
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {eagleValues.map((v, i) => (
            <ScrollReveal key={`${v.letter}-${v.title}`} delay={i * 0.05} className="bg-paper-dim rounded-lg p-6">
              <div className="font-display font-bold text-4xl text-signal leading-none">{v.letter}</div>
              <h4 className="text-sm font-semibold mt-3.5 mb-2.5">{v.title}</h4>
              <p className="text-[13px] text-steel leading-relaxed">{v.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
