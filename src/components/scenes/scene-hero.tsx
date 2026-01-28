"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "@/components/ui";

export function SceneHero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 15;
    video.addEventListener("canplay", () => setVideoReady(true));
    video.addEventListener("ended", () => {
      video.currentTime = 15;
      video.play();
    });
  }, []);

  return (
    <section ref={ref} className="relative h-screen">
      <motion.div className="absolute inset-0" style={{ opacity, scale }}>
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source
            src="/videos/projects/cranleigh-lodge/video-1.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/30" />
      </motion.div>

      {/* Centered content - FIXED CENTERING */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center w-full"
        >
          <p className="text-label text-[var(--color-accent)] mb-4">
            Architecture & Interior Design
          </p>
          <div className="flex justify-center">
            <Logo variant="light" size="hero" />
          </div>
          <p className="mt-6 text-sm text-white/40">London · Istanbul</p>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
