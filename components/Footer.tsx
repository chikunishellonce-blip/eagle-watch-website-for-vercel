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
            <li>{companyInfo.phones[0]}</li>
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
