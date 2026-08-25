import ScrollReveal from "./ScrollReveal";
import { eagleValues, visionMission } from "@/lib/data/values";

export default function About() {
  return (
    <section id="about" className="bg-paper py-24">
      <div className="wrap">
        <ScrollReveal>
          <div className="eyebrow text-steel mb-4">About the company</div>
          <h2 className="text-3xl sm:text-4xl font-semibold">Vision &amp; mission</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <ScrollReveal delay={0.05}>
            <h3 className="text-lg font-semibold mb-3">Vision</h3>
            <p className="text-steel leading-relaxed">{visionMission.vision}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h3 className="text-lg font-semibold mb-3">Mission</h3>
            <p className="text-steel leading-relaxed">{visionMission.mission}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-24">
          <div className="eyebrow text-steel mb-4">Our values</div>
          <h2 className="text-3xl sm:text-4xl font-semibold">Built on EAGLE</h2>
          <p className="mt-3 max-w-xl text-steel leading-relaxed">
            We pride ourselves on being both customer and staff-centric, enshrining five values,
            aptly acronymed EAGLE.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-line-dark border border-line-dark">
          {eagleValues.map((v, i) => (
            <ScrollReveal key={`${v.letter}-${v.title}`} delay={i * 0.05} className="bg-paper p-7">
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
