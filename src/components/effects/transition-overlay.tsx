"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui";
import { usePageTransition, TRANSITION_DURATION } from "@/hooks";

// Power ease for smooth transitions
const powerEase = [0.76, 0, 0.24, 1] as const;

export function TransitionOverlay() {
  const { isTransitioning, transitionType, completeTransition } =
    usePageTransition();

  useEffect(() => {
    if (isTransitioning) {
      // Lock scroll during transition
      document.body.style.overflow = "hidden";

      // Complete transition after full animation
      const timer = setTimeout(() => {
        document.body.style.overflow = "";
        completeTransition();
      }, TRANSITION_DURATION);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [isTransitioning, completeTransition]);

  const getVariants = () => {
    switch (transitionType) {
      case "slide":
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
        };
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case "wipe":
      default:
        return {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };
    }
  };

  const variants = getVariants();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-text flex items-center justify-center"
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{
            duration: TRANSITION_DURATION / 1000,
            ease: powerEase,
          }}
        >
          {/* Optional: Logo during transition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <Logo variant="light" size="lg" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
