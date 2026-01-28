import { Container, Logo } from "@/components/ui";

export function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <Container>
        <div className="flex flex-col items-center text-center">
          {/* Main Title */}
          <Logo variant="dark" size="xl" />

          {/* Tagline */}
          <p className="mt-6 font-heading text-lg md:text-xl italic text-text-secondary max-w-2xl mx-auto">
            We are an architecture and interior design studio offering new
            language achieved by timeless design, sophisticated craftsmanship,
            refined details, and the imperfect beauty of natural materials…
          </p>
        </div>
      </Container>
    </section>
  );
}
