"use client";

import { createContext, useContext, useState, useMemo, type ReactNode } from "react";

export type SectionId =
  | "hero"
  | "about"
  | "services"
  | "fieldlog"
  | "industries"
  | "technology"
  | "why"
  | "contact";

interface NavigationContextValue {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<SectionId>("hero");

  const setActiveSection = (section: SectionId) => {
    setActiveSectionState(section);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const value = useMemo(() => ({ activeSection, setActiveSection }), [activeSection]);

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

// Every section-switching control (Nav links, the Hero "Request a Quote" CTA,
// Footer quick links) reads/writes through this hook instead of using bare
// `href="#id"` anchors — since only one section is mounted in the DOM at a
// time, a plain anchor jump has nothing to scroll to unless that section is
// already showing.
export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return ctx;
}
