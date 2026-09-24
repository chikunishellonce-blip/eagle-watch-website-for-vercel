"use client";

import { useCallback, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";
import { industries } from "@/lib/data/content";

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeSlide = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndex) return;
      setPreviousIndex(activeIndex);
      setActiveIndex(nextIndex);
      setIsTransitioning(true);
    },
    [activeIndex]
  );

  useEffect(() => {
    if (!isTransitioning) return;

    const timeout = setTimeout(() => {
      setPreviousIndex(null);
      setIsTransitioning(false);
    }, 1100);

    return () => clearTimeout(timeout);
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % industries.length;
      changeSlide(nextIndex);
    }, 7000);

    return () => clearInterval(interval);
  }, [activeIndex, changeSlide]);

  const activeIndustry = industries[activeIndex];

  const goToPrevious = () => changeSlide((activeIndex - 1 + industries.length) % industries.length);
  const goToNext = () => changeSlide((activeIndex + 1) % industries.length);

  return (
    <section id="industries" className="bg-paper py-24">
      <div className="wrap">
        <ScrollReveal>
          <div className="eyebrow text-steel mb-4">Sectors served</div>
          <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl">
            Deployed across every environment that needs us
          </h2>
        </ScrollReveal>

        <div className="mt-12 rounded-2xl border border-ink/10 bg-paper p-4 shadow-sm sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="relative overflow-hidden rounded-2xl bg-ink/5">
              <div className="relative aspect-[16/10] overflow-hidden">
                {previousIndex !== null && isTransitioning && (
                  <div className="slide-fade-out absolute inset-0">
                    <Image
                      src={industries[previousIndex].image}
                      alt={industries[previousIndex].alt}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className={`${isTransitioning ? "slide-fade-in" : "cinematic-image"} absolute inset-0`}>
                  <Image
                    key={activeIndustry.name}
                    src={activeIndustry.image}
                    alt={activeIndustry.alt}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink/25 to-transparent" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="text-reveal">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-steel">Sector focus</p>
                <h3 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
                  {activeIndustry.name}
                </h3>
              </div>

              <p className="text-reveal text-base leading-relaxed text-steel">
                {activeIndustry.description}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-lg text-ink transition hover:border-gold hover:text-gold"
                  aria-label="Previous industry"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-lg text-ink transition hover:border-gold hover:text-gold"
                  aria-label="Next industry"
                >
                  →
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {industries.map((industry, index) => (
                  <button
                    key={industry.name}
                    type="button"
                    onClick={() => changeSlide(index)}
                    className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                      index === activeIndex
                        ? "border-gold bg-gold text-ink"
                        : "border-ink/15 bg-white text-steel hover:border-gold hover:text-gold"
                    }`}
                    aria-label={`Show ${industry.name}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
