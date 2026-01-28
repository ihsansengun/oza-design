import { Container, Heading, Text, Button } from "@/components/ui";

export default function CollectionNotFound() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32">
      <Container>
        <div className="text-center max-w-lg mx-auto">
          <Heading level={1} className="mb-4">
            Collection Not Found
          </Heading>
          <Text muted className="mb-8">
            The collection you&apos;re looking for doesn&apos;t exist or may
            have been removed.
          </Text>
          <Button href="/collections">View All Collections</Button>
        </div>
      </Container>
    </section>
  );
}
