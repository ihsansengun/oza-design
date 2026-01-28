"use client";

import { useState, useEffect, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryScrollHintProps {
  containerRef: RefObject<HTMLDivElement | null>;
  dark?: boolean;
}

export function GalleryScrollHint({
  containerRef,
  dark = false,
}: GalleryScrollHintProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    };

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [containerRef]);

  const gradientColor = dark ? "from-[#111111]" : "from-[#F8F7F4]";

  return (
    <>
      {/* Left fade gradient */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r ${gradientColor} to-transparent z-10 pointer-events-none`}
          />
        )}
      </AnimatePresence>

      {/* Right fade gradient */}
      <AnimatePresence>
        {canScrollRight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l ${gradientColor} to-transparent z-10 pointer-events-none`}
          />
        )}
      </AnimatePresence>
    </>
  );
}
