"use client";

import { companyInfo } from "@/lib/data/content";

const year = new Date().getFullYear();

export default function Footer() {
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
            <li>
              <a href={`tel:${companyInfo.emergencyPhone}`} className="hover:text-white transition-colors">
                {companyInfo.phones[0]}  |  {companyInfo.phones[3]}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wide text-steel mb-3">Quick links</div>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href="/?section=services" className="hover:text-white transition-colors">
                Services
              </a>
            </li>
            <li>
              <a href="/?section=industries" className="hover:text-white transition-colors">
                Industries
              </a>
            </li>
            <li>
              <a href="/?section=contact" className="hover:text-white transition-colors">
                Request a quote
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-6">
        <div className="wrap text-xs text-steel">
          © {year} {companyInfo.name}. All rights reserved.
          <span className="block mt-2 max-w-2xl leading-relaxed">
            Website information is general guidance and does not replace a site-specific security assessment or agreed service contract.
          </span>
        </div>
      </div>
    </footer>
  );
}
