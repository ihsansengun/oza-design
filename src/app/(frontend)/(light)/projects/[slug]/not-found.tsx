import { Container, Heading, Text, Button } from "@/components/ui";

export default function ProjectNotFound() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32">
      <Container>
        <div className="text-center max-w-lg mx-auto">
          <Heading level={1} className="mb-4">
            Project Not Found
          </Heading>
          <Text muted className="mb-8">
            The project you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </Text>
          <Button href="/projects">View All Projects</Button>
        </div>
      </Container>
    </section>
  );
}
