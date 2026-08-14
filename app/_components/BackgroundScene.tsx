'use client'

import { useEffect, useRef, useState } from 'react'

export function BackgroundScene({ src, fallbackClass, preload = 'none' }: { src?: string; fallbackClass: string; preload?: 'none' | 'metadata' | 'auto' }) {
  const [failed, setFailed] = useState(false)
  const [inView, setInView] = useState(false)
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = sceneRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, { rootMargin: '250px 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  if (!src || failed) return <div className={`${fallbackClass} scene-skeleton`} aria-hidden="true" />
  return <div ref={sceneRef} className={`${fallbackClass} scene-lazy-shell`} aria-hidden="true">
    {inView && <video src={src} onError={() => setFailed(true)} autoPlay muted loop playsInline preload={preload} />}
  </div>
}
