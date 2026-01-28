import type { Metadata } from "next";
import {
  ContactHero,
  ContactInfo,
  ContactSocial,
  ContactFooter,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with OZA Design studio for architecture, interior design, and collection enquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col justify-center">
        <ContactHero />
        <ContactInfo />
        <ContactSocial />
      </main>

      {/* Footer */}
      <ContactFooter />
    </div>
  );
}
