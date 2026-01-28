import type { Project } from "@/types";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OZA Design",
    description:
      "Award-winning architecture and interior design studio based in London and Istanbul",
    url: "https://ozadesign.com",
    logo: "https://ozadesign.com/logo.png",
    sameAs: [
      "https://instagram.com/ozadesign_official",
      "https://linkedin.com/company/oza-studio",
    ],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressCountry: "UK",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Istanbul",
        addressCountry: "Turkey",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "studio@ozadesign.com",
      contactType: "customer service",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "InteriorDecorator",
    name: "OZA Design",
    image: "https://ozadesign.com/og-image.jpg",
    url: "https://ozadesign.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    priceRange: "$$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProjectSchema({ project }: { project: Project }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.heroImage.url,
    author: {
      "@type": "Organization",
      name: "OZA Design",
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    dateCreated: project.year,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
