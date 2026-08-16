"use client";

import { useEffect, useRef, useState } from "react";
import { useHeroMedia } from "../_hooks/useHeroMedia";

export function HeroVideo() {
  const { data: media, isLoading } = useHeroMedia();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [canLoadVideo, setCanLoadVideo] = useState(true);
  const activeMedia = (media || [])
    .filter((item) => item.isActive)
    .sort((a, b) => a.order - b.order);
  const heroVideo = activeMedia.find((item) => item.type === "video");
  const heroPoster = activeMedia.find((item) => item.type === "image")?.url;

  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    setCanLoadVideo(!connection?.saveData && connection?.effectiveType !== "2g");
    setVideoFailed(false);
    setIsVisible(false);
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.play().catch(() => undefined);
    };

    const pauseVideo = () => {
      video.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else {
          pauseVideo();
        }
      },
      { threshold: 0.05, rootMargin: "120px 0px" },
    );

    observer.observe(video);
    const handleVisibility = () => {
      if (document.hidden) pauseVideo();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [heroVideo?.url]);

  if (isLoading)
    return (
      <div className="hero-media hero-media-skeleton" aria-hidden="true" />
    );

  return (
    <div className="hero-media" aria-label="Utsavam showreel background">
      {heroVideo && !videoFailed && canLoadVideo ? (
        <video
          key={heroVideo._id}
          onError={() => setVideoFailed(true)}
          onCanPlay={() => setIsVisible(true)}
          ref={videoRef}
          className={`hero-media-fill ${isVisible ? "is-visible" : ""}`}
          muted
          playsInline
          loop
          poster={heroPoster}
          preload="none"
        >
          <source src={heroVideo.url} />
        </video>
      ) : (
        <div className="hero-media-skeleton" aria-hidden="true" />
      )}
    </div>
  );
}
