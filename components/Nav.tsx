"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { companyInfo } from "@/lib/data/content";
import { useNavigation, type SectionId } from "@/components/NavigationContext";

const links: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "industries", label: "Industries" },
  { id: "technology", label: "Technology" },
  { id: "why", label: "Why Us" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const { activeSection, setActiveSection } = useNavigation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && event.target instanceof Node && !headerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 inset-x-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-md border-b border-white/10 shadow-[0_8px_25px_rgba(0,0,0,0.22)]"
          : "bg-ink/55 backdrop-blur-md border-b border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
      }`}
    >
      <div className="wrap flex items-center h-[74px]">
        <button
          ref={menuButtonRef}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden text-white p-2 shrink-0 mr-3"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <button onClick={() => setActiveSection("hero")} className="flex items-center gap-3 group cursor-pointer shrink-0">
          <Image
            src="/images/eagle-watch-logo.svg"
            alt="Eagle Watch Security logo"
            width={45}
            height={45}
            className="h-11 w-auto"
            priority
          />
          <span className="font-display font-semibold text-[15px] leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            Eagle Watch Security
            <span className="block font-mono font-normal text-[10px] tracking-[0.12em] uppercase text-steel-light mt-0.5">
              {companyInfo.tagline}
            </span>
          </span>
        </button>

        <nav className="hidden md:flex items-center justify-center gap-6 flex-1 mx-6">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveSection(l.id)}
              className={`relative text-[13.5px] font-semibold transition-all duration-200 tracking-[0.04em] whitespace-nowrap ${
                activeSection === l.id
                  ? "text-white"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {l.label}
              {activeSection === l.id && (
                <span className="absolute -bottom-2 left-0 right-0 mx-auto h-px w-full bg-gold" />
              )}
            </button>
          ))}
        </nav>

      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden bg-ink/80 border-b border-white/10 overflow-hidden backdrop-blur-md"
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
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
