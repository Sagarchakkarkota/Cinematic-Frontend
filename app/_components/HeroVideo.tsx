"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHeroMedia } from "../_hooks/useHeroMedia";

export function HeroVideo() {
  const { data: media, isLoading } = useHeroMedia();
  const videoRef = useRef<HTMLVideoElement>(null);

  const heroVideo = media?.find((m) => m.type === "video" && m.isActive);
  const fallbackImage = media?.find((m) => m.type === "image" && m.isActive);

  // 🔑 MOBILE AUTOPLAY + LOOP SAFETY
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force attributes (important for iOS)
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.autoplay = true;

    // Try playing (mobile may block silently)
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — poster image will remain visible
      });
    }
  }, [heroVideo]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="absolute inset-0 z-0 bg-muted animate-pulse">
        <div className="w-full h-full bg-primary/20" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Cinematic dark overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      <AnimatePresence mode="wait">
        {/* 🎥 HERO VIDEO */}
        {heroVideo ? (
          <motion.video
            key="hero-video"
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            poster={fallbackImage?.url}
          >
            <source src={heroVideo.url} type="video/mp4" />
          </motion.video>
        ) : fallbackImage ? (
          /* 🖼 IMAGE FALLBACK */
          <motion.div
            key="hero-image"
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${fallbackImage.url})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        ) : (
          /* 🎭 FINAL SAFE FALLBACK */
          <div className="absolute inset-0 bg-primary/30" />
        )}
      </AnimatePresence>
    </div>
  );
}
