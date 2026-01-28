"use client";

import { useState, useCallback } from "react";

interface MediaItem {
  url: string;
  alt: string;
  type?: "image" | "video";
}

interface UseLightboxOptions {
  images: MediaItem[];
}

export function useLightbox({ images }: UseLightboxOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const previous = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  }, [images.length]);

  return {
    isOpen,
    currentIndex,
    open,
    close,
    next,
    previous,
    goTo,
  };
}
