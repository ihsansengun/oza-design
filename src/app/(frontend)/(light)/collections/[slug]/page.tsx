import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionBySlug, getCollections } from "@/lib/data";
import {
  CollectionHero,
  CollectionProductSection,
  CollectionProductsGrid,
  CollectionQuote,
  NextCollection,
} from "@/components/collection";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    return {
      title: "Not Found",
    };
  }

  const productNames = collection.products.map((p) => p.name).join(", ");
  const collectionName = collection.products[0]?.collectionName || "OZA Collection";

  return {
    title: `${collection.title} | ${collectionName}`,
    description: `Explore our ${collection.title} collection featuring ${productNames}. Part of the ${collectionName}.`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  const allCollections = await getCollections();

  if (!collection) {
    notFound();
  }

  // Find next collection (loop to first if at end)
  const currentIndex = allCollections.findIndex((c) => c.slug === slug);
  const nextIndex = (currentIndex + 1) % allCollections.length;
  const nextCollection = allCollections[nextIndex];

  const collectionName = collection.products[0]?.collectionName || "OZA Collection";

  return (
    <>
      {/* Pinned hero with collection showcase */}
      <CollectionHero collection={collection} />

      {/* Products grid navigation (only if multiple products) */}
      <CollectionProductsGrid
        products={collection.products}
        categoryTitle={collection.title}
      />

      {/* Individual product sections */}
      {collection.products.map((product, index) => (
        <div key={product.id} id={`product-${product.id}`}>
          <CollectionProductSection product={product} index={index} />
        </div>
      ))}

      {/* Designer quote */}
      <CollectionQuote collectionName={collectionName} />

      {/* Next collection teaser */}
      {nextCollection && <NextCollection collection={nextCollection} />}
    </>
  );
}
