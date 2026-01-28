"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FadeUp,
  TextReveal,
  ScrollScale,
  HorizontalGallery,
  useCursor,
} from "@/components/effects";
import { Lightbox } from "@/components/ui";
import { useLightbox } from "@/hooks";
import type { CollectionProduct } from "@/types";

interface CollectionProductSectionProps {
  product: CollectionProduct;
  index: number;
}

export function CollectionProductSection({
  product,
  index,
}: CollectionProductSectionProps) {
  const isEven = index % 2 === 0;
  const { setCursorState } = useCursor();

  // Prepare all images for lightbox
  const allImages = product.images.map((img) => ({
    url: img.url,
    alt: img.alt || product.name,
  }));

  const lightbox = useLightbox({ images: allImages });

  return (
    <>
      <section className="py-24 md:py-32 bg-bg">
        <div className="max-w-7xl mx-auto px-8">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 ${!isEven ? "lg:flex-row-reverse" : ""}`}
          >
            {/* Product Images Column */}
            <div className={`space-y-8 ${!isEven ? "lg:order-2" : ""}`}>
              {/* Main product image */}
              {product.images[0] && (
                <ScrollScale scaleFrom={0.95} scaleTo={1}>
                  <div
                    className="relative aspect-square bg-[#f8f8f6] overflow-hidden cursor-pointer group"
                    onClick={() => lightbox.open(0)}
                    onMouseEnter={() => setCursorState("hover-image")}
                    onMouseLeave={() => setCursorState("default")}
                  >
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                </ScrollScale>
              )}

              {/* Second image if available */}
              {product.images[1] && (
                <ScrollScale scaleFrom={0.95} scaleTo={1}>
                  <div
                    className="relative aspect-[4/3] bg-[#f8f8f6] overflow-hidden cursor-pointer group"
                    onClick={() => lightbox.open(1)}
                    onMouseEnter={() => setCursorState("hover-image")}
                    onMouseLeave={() => setCursorState("default")}
                  >
                    <Image
                      src={product.images[1].url}
                      alt={product.images[1].alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                </ScrollScale>
              )}
            </div>

            {/* Details Column */}
            <div
              className={`lg:sticky lg:top-32 lg:self-start ${!isEven ? "lg:order-1" : ""}`}
            >
              {/* Collection Name */}
              {product.collectionName && (
                <FadeUp>
                  <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
                    {product.collectionName}
                  </p>
                </FadeUp>
              )}

              {/* Product Name */}
              <div className="mb-8">
                <TextReveal
                  text={product.name}
                  by="word"
                  className="font-heading text-3xl md:text-4xl font-light tracking-tight text-text"
                  as="h2"
                  stagger={0.06}
                />
              </div>

              {/* Divider */}
              <FadeUp delay={0.2}>
                <div className="w-16 h-px bg-border mb-8" />
              </FadeUp>

              {/* Materials */}
              {product.materials && (
                <FadeUp delay={0.3}>
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-3">
                      Materials
                    </p>
                    <p className="text-text-secondary leading-relaxed">
                      {product.materials}
                    </p>
                  </div>
                </FadeUp>
              )}

              {/* Dimensions */}
              {product.dimensions && product.dimensions.length > 0 && (
                <FadeUp delay={0.4}>
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-3">
                      Dimensions
                    </p>
                    <ul className="space-y-1">
                      {product.dimensions.map((dimension, idx) => (
                        <li key={idx} className="text-text-secondary">
                          {dimension}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              )}

              {/* CTA Section */}
              <FadeUp delay={0.5}>
                <div className="pt-8 border-t border-border">
                  <p className="text-sm text-text-tertiary mb-6">
                    Available in custom sizes and finishes.
                    <br />
                    Contact us for pricing and lead times.
                  </p>
                  <motion.a
                    href="mailto:collection@ozadesign.com"
                    className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-text hover:text-accent transition-colors group"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Enquire</span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </motion.a>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>

        {/* Product Gallery - horizontal scroll */}
        {product.images.length > 2 && (
          <div className="mt-16 md:mt-24">
            <HorizontalGallery
              images={product.images.slice(2).map((img) => ({
                src: img.url,
                alt: img.alt,
                aspectRatio: "1/1",
              }))}
            />
          </div>
        )}
      </section>

      {/* Lightbox */}
      <Lightbox
        images={allImages}
        currentIndex={lightbox.currentIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrevious={lightbox.previous}
        onGoTo={lightbox.goTo}
      />
    </>
  );
}
