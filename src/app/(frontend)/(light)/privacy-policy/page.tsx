import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/effects";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "OZA Design privacy policy and data protection information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Back Button */}
      <div className="fixed top-8 left-8 z-40">
        <Link
          href="/"
          className="group flex items-center gap-2 text-text-secondary hover:text-text transition-colors"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform duration-200">
            &larr;
          </span>
          <span className="text-sm uppercase tracking-widest">Back</span>
        </Link>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-8 py-32">
        <FadeUp>
          <h1 className="font-heading text-4xl md:text-5xl text-text mb-12">
            Privacy Policy
          </h1>
        </FadeUp>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          <FadeUp delay={0.1}>
            <p className="text-sm uppercase tracking-widest text-text-tertiary mb-4">
              Last updated: January 2026
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <section>
              <h2 className="font-heading text-xl text-text mb-4">
                Information We Collect
              </h2>
              <p>
                When you contact us through our website or email, we may collect
                personal information such as your name, email address, phone
                number, and any other information you choose to provide.
              </p>
            </section>
          </FadeUp>

          <FadeUp delay={0.3}>
            <section>
              <h2 className="font-heading text-xl text-text mb-4">
                How We Use Your Information
              </h2>
              <p>
                We use the information we collect to respond to your enquiries,
                provide our design services, and communicate with you about
                projects. We do not sell or share your personal information with
                third parties for marketing purposes.
              </p>
            </section>
          </FadeUp>

          <FadeUp delay={0.4}>
            <section>
              <h2 className="font-heading text-xl text-text mb-4">
                Data Security
              </h2>
              <p>
                We implement appropriate security measures to protect your
                personal information. However, no method of transmission over
                the internet is 100% secure.
              </p>
            </section>
          </FadeUp>

          <FadeUp delay={0.5}>
            <section>
              <h2 className="font-heading text-xl text-text mb-4">
                Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal
                information. To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:studio@ozadesign.com"
                  className="text-text hover:text-accent transition-colors"
                >
                  studio@ozadesign.com
                </a>
                .
              </p>
            </section>
          </FadeUp>

          <FadeUp delay={0.6}>
            <section>
              <h2 className="font-heading text-xl text-text mb-4">Cookies</h2>
              <p>
                Our website may use cookies to enhance your browsing experience.
                You can control cookie settings through your browser
                preferences.
              </p>
            </section>
          </FadeUp>

          <FadeUp delay={0.7}>
            <section>
              <h2 className="font-heading text-xl text-text mb-4">Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:studio@ozadesign.com"
                  className="text-text hover:text-accent transition-colors"
                >
                  studio@ozadesign.com
                </a>
                .
              </p>
            </section>
          </FadeUp>
        </div>
      </main>
    </div>
  );
}
