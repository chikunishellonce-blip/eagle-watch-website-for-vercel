"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { companyInfo } from "@/lib/data/content";
import { useNavigation, type SectionId } from "@/components/NavigationContext";

const links: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "fieldlog", label: "Field Log" },
  { id: "industries", label: "Industries" },
  { id: "technology", label: "Technology" },
  { id: "why", label: "Why Us" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const { activeSection, setActiveSection } = useNavigation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="wrap flex items-center gap-8 h-[74px]">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="lg:hidden text-white p-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveSection(l.id)}
              className={`text-[13.5px] font-medium transition-colors ${
                activeSection === l.id ? "text-white" : "text-steel-light hover:text-white"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button onClick={() => setActiveSection("hero")} className="flex items-center gap-3 group cursor-pointer">
          <Image
            src="/images/eagle-watch-logo.svg"
            alt="Eagle Watch Security logo"
            width={45}
            height={45}
            className="h-11 w-auto"
            priority
          />
          <span className="font-display font-semibold text-[15px] leading-tight text-white">
            Eagle Watch Security
            <span className="block font-mono font-normal text-[10px] tracking-[0.12em] uppercase text-steel-light mt-0.5">
              {companyInfo.tagline}
            </span>
          </span>
        </button>

        <button
          onClick={() => setActiveSection("contact")}
          className="ml-auto hidden lg:inline-flex items-center gap-2 bg-signal text-white text-[13px] font-semibold px-[18px] py-2.5 rounded-[3px] hover:bg-signal-dim transition-colors"
        >
          Request a Quote
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden bg-ink border-b border-line overflow-hidden"
          >
            <div className="wrap flex flex-col py-4 gap-1">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setActiveSection(l.id);
                    setOpen(false);
                  }}
                  className={`text-left py-2.5 text-sm font-medium transition-colors ${
                    activeSection === l.id ? "text-white" : "text-steel-light hover:text-white"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setActiveSection("contact");
                  setOpen(false);
                }}
                className="mt-2 w-full inline-flex justify-center items-center gap-2 bg-signal text-white text-sm font-semibold px-4 py-3 rounded-[3px]"
              >
                Request a Quote
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
