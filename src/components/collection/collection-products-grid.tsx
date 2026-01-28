"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/effects";
import type { CollectionProduct } from "@/types";

interface CollectionProductsGridProps {
  products: CollectionProduct[];
  categoryTitle: string;
}

export function CollectionProductsGrid({ products, categoryTitle }: CollectionProductsGridProps) {
  if (products.length <= 1) {
    return null;
  }

  const scrollToProduct = (productId: string) => {
    const element = document.getElementById(`product-${productId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#f8f8f6]">
      <div className="max-w-7xl mx-auto px-8">
        <FadeUp>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary mb-4">
              {categoryTitle} Collection
            </p>
            <p className="text-xl md:text-2xl font-light text-text-secondary">
              {products.length} designs available
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <FadeUp key={product.id} delay={index * 0.1}>
              <motion.button
                onClick={() => scrollToProduct(product.id)}
                className="group block w-full text-left"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-square overflow-hidden mb-4 bg-bg">
                  {product.images[0] && (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </div>
                <h3 className="font-heading text-lg text-text group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                {product.collectionName && (
                  <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary mt-1">
                    {product.collectionName}
                  </p>
                )}
              </motion.button>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
