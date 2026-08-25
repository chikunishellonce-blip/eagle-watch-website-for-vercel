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
  "/images/armed security guards.webp",
  "/images/parading.webp",
];

export default function Services() {
  return (
    <section id="services" className="bg-paper-dim py-24">
      <div className="wrap">
        <ScrollReveal>
          <div className="eyebrow text-steel mb-4">What we deploy</div>
          <h2 className="text-3xl sm:text-4xl font-semibold max-w-2xl">
            A full range of security services
          </h2>
          <p className="mt-3 max-w-xl text-steel leading-relaxed">Protection for people, property and perimeter, delivered by one team.</p>
        </ScrollReveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <ScrollReveal
              key={s.number}
              delay={(i % 4) * 0.06}
              className="group bg-paper rounded-lg overflow-hidden hover:-translate-y-1 transition-transform"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={serviceImages[i % serviceImages.length]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 font-mono text-xs text-white bg-ink/75 px-2 py-1 rounded">{s.number}</span>
              </div>
              <div className="p-5">
                <h4 className="text-[15px] font-semibold">{s.title}</h4>
                <p className="mt-2 text-[13px] text-steel leading-relaxed line-clamp-2">{s.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
