import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { NavigationProvider } from "@/components/NavigationContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.eaglewatchsecurity.co.zw";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eagle Watch Security Services | Protecting People. Securing Tomorrow.",
    template: "%s | Eagle Watch Security Services",
  },
  description:
    "Licensed armed and unarmed guarding, CCTV, access control, electric fencing, alarm response and investigations for homes, sites and businesses across Harare and Zimbabwe.",
  keywords: [
    "security company Harare",
    "armed guards Zimbabwe",
    "CCTV installation Harare",
    "electric fencing Zimbabwe",
    "access control",
    "alarm monitoring Harare",
  ],
  authors: [{ name: "Eagle Watch Security Services (Pvt) Ltd" }],
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: siteUrl,
    siteName: "Eagle Watch Security Services",
    title: "Eagle Watch Security Services | Protecting People. Securing Tomorrow.",
    description:
      "Licensed manned guarding, CCTV, access control, electric fencing, alarms and investigations across Harare and Zimbabwe.",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630, alt: "Eagle Watch Security Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eagle Watch Security Services",
    description: "Protecting People. Securing Tomorrow.",
    images: ["/images/og-cover.jpg"],
  },
  icons: {
    icon: [{ url: "/images/eagle-watch-logo.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-sans">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-signal focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <NavigationProvider>
          <main id="main">{children}</main>
          <Footer />
        </NavigationProvider>
      </body>
    </html>
  );
}
