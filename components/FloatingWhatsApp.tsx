"use client";

import { companyInfo } from "@/lib/data/content";
import { useNavigation } from "@/components/NavigationContext";

export default function FloatingWhatsApp() {
  const { activeSection } = useNavigation();

  if (activeSection === "contact") return null;

  return (
    <a
      href={`https://wa.me/${companyInfo.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Eagle Watch on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group whatsapp-float fixed bottom-5 left-5 z-[200] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-white sm:bottom-7 sm:left-7"
    >
      <span
        className="whatsapp-pulse pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
        aria-hidden="true"
      />
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20.5 11.5a8.5 8.5 0 0 1-12.58 7.46L4 20l1.1-3.74A8.5 8.5 0 1 1 20.5 11.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M8.7 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2.1.4-.1.6l-.5.6c.5 1 1.2 1.7 2.2 2.2l.6-.5c.2-.2.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1.2.3-2.1 0-1-.4-2.1-1.1-3.1-2.1s-1.7-2.1-2.1-3.1c-.3-.9-.2-1.7 0-2.1Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
