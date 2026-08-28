"use client";

import { companyInfo } from "@/lib/data/content";
import { useNavigation } from "@/components/NavigationContext";

const year = new Date().getFullYear();

export default function Footer() {
  const { setActiveSection } = useNavigation();

  return (
    <footer className="bg-ink text-steel-light border-t border-line">
      <div className="wrap py-14 grid sm:grid-cols-3 gap-10">
        <div>
          <div className="font-display font-semibold text-white text-[15px]">{companyInfo.name}</div>
          <p className="mt-2 text-sm max-w-xs leading-relaxed">{companyInfo.tagline}</p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wide text-steel mb-3">Contact</div>
          <ul className="flex flex-col gap-2 text-sm">
            <li>{companyInfo.addressLine}</li>
            <li>
              <a href={`mailto:${companyInfo.email}`} className="hover:text-white transition-colors">
                {companyInfo.email}
              </a>
            </li>
            <li>{companyInfo.phones[0]}  |  {companyInfo.phones[3]}</li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wide text-steel mb-3">Quick links</div>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <button onClick={() => setActiveSection("services")} className="hover:text-white transition-colors">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection("industries")} className="hover:text-white transition-colors">
                Industries
              </button>
            </li>
            <li>
              <button onClick={() => setActiveSection("contact")} className="hover:text-white transition-colors">
                Request a quote
              </button>
            </li>
            <li>
              <a
                href={`https://wa.me/${companyInfo.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with us on WhatsApp"
                title="Chat with us on WhatsApp"
                className="inline-flex items-center hover:text-white transition-colors"
              >
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M20.5 11.5a8.5 8.5 0 0 1-12.58 7.46L4 20l1.1-3.74A8.5 8.5 0 1 1 20.5 11.5Z" />
                  <path d="M8.7 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2.1.4-.1.6l-.5.6c.5 1 1.2 1.7 2.2 2.2l.6-.5c.2-.2.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1.2.3-2.1 0-1-.4-2.1-1.1-3.1-2.1s-1.7-2.1-2.1-3.1c-.3-.9-.2-1.7 0-2.1Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-6">
        <div className="wrap text-xs text-steel">
          © {year} {companyInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
