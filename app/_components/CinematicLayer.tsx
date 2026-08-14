"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function CinematicLayer() {
  const cursor = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!prefersFinePointer) return;

    let rafId: number | null = null;
    const move = (event: MouseEvent) => {
      const node = cursor.current;
      if (!node) return;

      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        rafId = null;
      });
    };

    const enter = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement;
      cursor.current?.classList.add(target.dataset.cursor || "cursor-play");
    };

    const leave = () =>
      cursor.current?.classList.remove("cursor-play", "cursor-view");
    const watched = Array.from(
      document.querySelectorAll<HTMLElement>("[data-cursor]"),
    );

    window.addEventListener("mousemove", move, { passive: true });
    watched.forEach((item) => {
      item.addEventListener("mouseenter", enter);
      item.addEventListener("mouseleave", leave);
    });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
      watched.forEach((item) => {
        item.removeEventListener("mouseenter", enter);
        item.removeEventListener("mouseleave", leave);
      });
    };
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;
  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <div ref={cursor} className="cinematic-cursor" aria-hidden="true">
        <span />
      </div>
    </>
  );
}
