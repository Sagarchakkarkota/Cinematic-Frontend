"use client";

import { useEffect, useRef, useState } from "react";
import { useHeroMedia } from "../_hooks/useHeroMedia";

export function HeroVideo() {
  const { data: media, isLoading } = useHeroMedia();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const activeMedia = (media || [])
    .filter((item) => item.isActive)
    .sort((a, b) => a.order - b.order);
  const heroVideo = activeMedia.find((item) => item.type === "video");

  useEffect(() => {
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
      { threshold: 0.15 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [heroVideo?.url]);

  if (isLoading)
    return (
      <div className="hero-media hero-media-skeleton" aria-hidden="true" />
    );

  return (
    <div className="hero-media" aria-label="Utsavam showreel background">
      {heroVideo && !videoFailed ? (
        <video
          key={heroVideo._id}
          onError={() => setVideoFailed(true)}
          onCanPlay={() => setIsVisible(true)}
          ref={videoRef}
          className={`hero-media-fill ${isVisible ? "is-visible" : ""}`}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
        >
          <source src={heroVideo.url} />
        </video>
      ) : (
        <div className="hero-media-skeleton" aria-hidden="true" />
      )}
    </div>
  );
}
