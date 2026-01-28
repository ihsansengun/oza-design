"use client";

import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
  className?: string;
  poster?: string;
}

export function VideoPlayer({ src, className = "", poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when in viewport
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay may be blocked, that's ok
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      poster={poster}
      autoPlay
      playsInline
      loop
      muted
      preload="metadata"
    />
  );
}
