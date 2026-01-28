"use client";

import Image from "next/image";
import { VideoPlayer, Lightbox } from "@/components/ui";
import { RevealImage, useCursor } from "@/components/effects";
import { useLightbox } from "@/hooks";
import type { Project, ProjectMedia } from "@/types";

interface ProjectGalleryAdvancedProps {
  project: Project;
}

// Placeholder media for demonstration
const placeholderMedia: ProjectMedia[] = [
  {
    id: "1",
    type: "image",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80",
    alt: "Interior design detail",
  },
  {
    id: "2",
    type: "image",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    alt: "Living space",
  },
  {
    id: "3",
    type: "image",
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80",
    alt: "Architectural detail",
  },
  {
    id: "4",
    type: "image",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    alt: "Exterior view",
  },
  {
    id: "5",
    type: "image",
    url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1920&q=80",
    alt: "Kitchen design",
  },
];

// Helper to render image or video
function MediaItem({
  media,
  className,
  sizes,
  width,
  height,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  media: ProjectMedia;
  className: string;
  sizes: string;
  width: number;
  height: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  if (media.type === "video") {
    return (
      <VideoPlayer
        src={media.url}
        className={className}
        poster={media.poster}
      />
    );
  }

  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Image
        src={media.url}
        alt={media.alt || "Project media"}
        width={width}
        height={height}
        className={`${className} transition-transform duration-700 group-hover:scale-[1.02]`}
        sizes={sizes}
      />
      {/* Subtle overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
    </div>
  );
}

export function ProjectGalleryAdvanced({
  project,
}: ProjectGalleryAdvancedProps) {
  const { setCursorState } = useCursor();
  const media =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : placeholderMedia;

  // Filter only images for lightbox (not videos)
  const images = media
    .filter((item) => item.type === "image")
    .map((item) => ({ url: item.url, alt: item.alt || project.title }));

  const lightbox = useLightbox({ images });

  // Get image index for lightbox (accounting for videos)
  const getImageIndex = (mediaItem: ProjectMedia) => {
    const imageItems = media.filter((m) => m.type === "image");
    return imageItems.findIndex((m) => m.id === mediaItem.id);
  };

  // Create a consistent editorial layout pattern:
  // - Videos always full-width
  // - First image: full-width (establishes the space)
  // - Then alternate: pair of images, single full-width
  // - This creates rhythm: FULL → PAIR → FULL → PAIR...
  const sections: { type: "pair" | "single"; media: ProjectMedia[] }[] = [];
  let mediaIndex = 0;
  let imageCount = 0; // Track non-video items for pattern

  while (mediaIndex < media.length) {
    const current = media[mediaIndex];
    const remaining = media.length - mediaIndex;

    // Videos always get full width for impact
    if (current.type === "video") {
      sections.push({ type: "single", media: [current] });
      mediaIndex += 1;
      continue;
    }

    // First image is always full-width (establishes the project)
    if (imageCount === 0) {
      sections.push({ type: "single", media: [current] });
      mediaIndex += 1;
      imageCount += 1;
      continue;
    }

    // Alternate pattern: pairs then single
    // Pattern position: 1,2 = pair, 3 = single, 4,5 = pair, 6 = single...
    const patternPosition = (imageCount - 1) % 3;

    if (patternPosition < 2 && remaining >= 2) {
      // Check if next item is also an image (not video)
      const next = media[mediaIndex + 1];
      if (next && next.type === "image") {
        sections.push({ type: "pair", media: [current, next] });
        mediaIndex += 2;
        imageCount += 2;
      } else {
        // Next is video, make current single
        sections.push({ type: "single", media: [current] });
        mediaIndex += 1;
        imageCount += 1;
      }
    } else {
      // Single full-width
      sections.push({ type: "single", media: [current] });
      mediaIndex += 1;
      imageCount += 1;
    }
  }

  const handleImageClick = (item: ProjectMedia) => {
    if (item.type === "image") {
      const index = getImageIndex(item);
      if (index >= 0) {
        lightbox.open(index);
      }
    }
  };

  return (
    <>
      <section className="py-12 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="space-y-16 md:space-y-24">
            {sections.map((section, sectionIndex) => {
              if (section.type === "pair") {
                return (
                  <div
                    key={sectionIndex}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                  >
                    {section.media.map((item, itemIndex) => (
                      <RevealImage
                        key={item.id}
                        delay={itemIndex * 0.1}
                      >
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <MediaItem
                            media={item}
                            className="w-full h-full object-cover"
                            sizes="(max-width: 768px) 100vw, 45vw"
                            width={800}
                            height={1000}
                            onClick={() => handleImageClick(item)}
                            onMouseEnter={() =>
                              item.type === "image" &&
                              setCursorState("hover-image")
                            }
                            onMouseLeave={() => setCursorState("default")}
                          />
                        </div>
                      </RevealImage>
                    ))}
                  </div>
                );
              }

              // Single full-width media - landscape aspect ratio
              const isVideo = section.media[0].type === "video";
              return (
                <RevealImage key={sectionIndex}>
                  <div className={`relative ${isVideo ? "aspect-video" : "aspect-[16/10]"} overflow-hidden`}>
                    <MediaItem
                      media={section.media[0]}
                      className="w-full h-full object-cover"
                      sizes="100vw"
                      width={1600}
                      height={1000}
                      onClick={() => handleImageClick(section.media[0])}
                      onMouseEnter={() =>
                        section.media[0].type === "image" &&
                        setCursorState("hover-image")
                      }
                      onMouseLeave={() => setCursorState("default")}
                    />
                  </div>
                </RevealImage>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={images}
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
