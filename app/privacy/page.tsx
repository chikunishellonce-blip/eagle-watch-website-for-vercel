import type { Metadata } from "next";
import { companyInfo } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${companyInfo.name} handles information submitted through this website.`,
};

export default function PrivacyPage() {
  return (
    <main className="bg-paper min-h-screen pt-[74px]">
      <div className="wrap max-w-3xl py-20">
        <div className="eyebrow text-signal mb-4">Legal</div>
        <h1 className="text-4xl sm:text-5xl font-semibold">Privacy policy</h1>
        <p className="mt-5 text-steel leading-relaxed">
          {companyInfo.name} uses the information you submit through this website to respond to enquiries,
          prepare quotations, and provide requested security services.
        </p>

        <div className="mt-12 flex flex-col gap-9 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">Information we collect</h2>
            <p className="text-steel">
              We may collect your name, email address, phone number, site type, and the details you include
              in a contact enquiry. We also receive basic technical information needed to keep the website
              secure and functioning.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">How we use it</h2>
            <p className="text-steel">
              We use enquiry information to contact you about your request, assess your security needs, and
              follow up about services you have asked us to discuss. We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Retention and sharing</h2>
            <p className="text-steel">
              We keep information only for as long as reasonably necessary for the purpose it was submitted
              or to meet legal and operational requirements. We share it only with service providers or
              authorities where needed to operate the service, respond to your request, or comply with law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Your choices</h2>
            <p className="text-steel">
              To ask what information we hold, request a correction, or ask us to stop contacting you, email
              <a href={`mailto:${companyInfo.email}`} className="text-signal hover:underline"> {companyInfo.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}