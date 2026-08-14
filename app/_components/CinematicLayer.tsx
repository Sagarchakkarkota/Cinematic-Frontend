"use client";

import { usePathname } from "next/navigation";

export function CinematicLayer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return <div className="film-grain" aria-hidden="true" />;
}
