"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { companyInfo } from "@/lib/data/content";
import { useNavigation } from "@/components/NavigationContext";

const HeroParticles = dynamic(() => import("./HeroParticles"), { ssr: false });

const stats = [
  { k: "Licensing", v: "Private Investigators & Security Guards Act" },
  { k: "Coverage", v: "24/7 round-the-clock protection" },
  { k: "Response", v: "Rapid response & support" },
  { k: "Approach", v: "Technology-driven solutions" },
];

export default function Hero() {
  const { setActiveSection } = useNavigation();

  return (
    <section id="hero" className="relative bg-ink text-white overflow-hidden pt-[74px]">
      <HeroParticles />
      <div className="wrap relative grid lg:grid-cols-[1.2fr_1fr] gap-14 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow text-steel-light mb-6">
            {companyInfo.name} &middot; Harare, Zimbabwe
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.05] font-semibold">
            Protecting <em className="text-signal not-italic">people.</em>
            <br />
            Securing tomorrow.
          </h1>
          <p className="mt-6 max-w-lg text-steel-light text-lg leading-relaxed">
            A licensed security services provider building toward the largest security concern in
            Southern Africa — from traditional static guarding to virtual, technology-driven
            protection.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveSection("contact")}
              className="inline-flex items-center gap-2 bg-signal hover:bg-signal-dim transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-[3px]"
            >
              Request a Quote
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href={`tel:${companyInfo.emergencyPhone}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-line px-6 py-3.5 rounded-[3px] hover:border-signal transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse motion-reduce:animate-none" />
              Emergency Line
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-panel border border-line rounded p-7 self-start lg:mt-8"
        >
          <span className="font-mono text-xs text-signal">Risk & loss & security is our business</span>
          <div className="mt-5 flex flex-col gap-4">
            {stats.map((s) => (
              <div key={s.k} className="flex justify-between gap-4 border-t border-line pt-4 first:border-t-0 first:pt-0">
                <span className="text-xs uppercase tracking-wide text-steel-light">{s.k}</span>
                <span className="text-sm text-right text-white/90">{s.v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
