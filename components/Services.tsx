"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { services } from "@/lib/data/services";

const serviceImages = [
  "/images/static mannered guarding.jpeg",
  "/images/armed security guards.webp",
  "/images/unarmed guards.webp",
  "/images/cctv_installation.webp",
  "/images/field-gate-cabling.jpg",
  "/images/field-electric-fence.jpg",
  "/images/alarm system.jpeg",
  "/images/investgators n undercover.jpeg",
  "/images/WhatsApp Image 2026-08-26 at 13.10.56.jpeg",
  "/images/parading.webp",
];

export default function Services() {
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
      const nextIndex = (activeIndex + 1) % services.length;
      changeSlide(nextIndex);
    }, 7000);

    return () => clearInterval(interval);
  }, [activeIndex, changeSlide]);

  const activeService = services[activeIndex];

  const goToService = (index: number) => changeSlide(index);
  const goToPrevious = () =>
    changeSlide((activeIndex - 1 + services.length) % services.length);
  const goToNext = () => changeSlide((activeIndex + 1) % services.length);

  return (
    <section id="services" className="bg-paper-dim py-24">
      <div className="wrap">
        <ScrollReveal>
          <div className="eyebrow text-steel mb-4">What we deploy</div>
          <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl">
            A full range of security services
          </h2>
          <p className="mt-3 max-w-xl text-steel leading-relaxed">
            Protection for people, property and perimeter, delivered by one team.
          </p>
        </ScrollReveal>

        <div className="mt-12 rounded-2xl border border-ink/10 bg-paper p-4 shadow-sm sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="relative overflow-hidden rounded-2xl bg-ink/5">
              <div className="relative aspect-[16/10] overflow-hidden">
                {previousIndex !== null && isTransitioning && (
                  <div className="slide-fade-out absolute inset-0">
                    <Image
                      src={serviceImages[previousIndex % serviceImages.length]}
                      alt={services[previousIndex].title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className={`${isTransitioning ? "slide-fade-in" : "cinematic-image"} absolute inset-0`}>
                  <Image
                    key={activeService.number}
                    src={serviceImages[activeIndex % serviceImages.length]}
                    alt={activeService.title}
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
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-steel">Featured service</p>
                <h3 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
                  {activeService.title}
                </h3>
              </div>

              <p className="text-reveal text-base leading-relaxed text-steel">{activeService.description}</p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-lg text-ink transition hover:border-gold hover:text-gold"
                  aria-label="Previous service"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white text-lg text-ink transition hover:border-gold hover:text-gold"
                  aria-label="Next service"
                >
                  →
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {services.map((service, index) => (
                  <button
                    key={service.number}
                    type="button"
                    onClick={() => goToService(index)}
                    className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                      index === activeIndex
                        ? "border-gold bg-gold text-ink"
                        : "border-ink/15 bg-white text-steel hover:border-gold hover:text-gold"
                    }`}
                    aria-label={`Show ${service.title}`}
                  >
                    {service.number}
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
