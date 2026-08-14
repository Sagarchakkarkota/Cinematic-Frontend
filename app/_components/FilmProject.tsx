'use client'

import { useEffect, useRef } from 'react'
import type { PortfolioItem } from '../portfolio/_hooks/usePortfolio'

export function FilmProject({ item, index }: { item: PortfolioItem; index: number }) {
  const video = useRef<HTMLVideoElement>(null)
  const handleError = () => { if (video.current) video.current.style.display = 'none' }
  useEffect(() => {
    const node = video.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) node.play().catch(() => undefined); else node.pause() }, { threshold: .15 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <article className="film-project" data-reveal data-cursor="cursor-play"><div className="film-project-media"><img loading="lazy" decoding="async" src={item.thumbnailUrl || '/goldenFeather.png'} alt={item.title} /><video ref={video} onError={handleError} src={item.videoUrl} muted loop playsInline preload="none" /></div><div className="film-project-info"><span>FILM {String(index + 1).padStart(2, '0')} / {item.category}</span><h3>{item.title}</h3><p>{item.description || 'A story told through light, movement and emotion.'}</p><span>{item.createdAt ? new Date(item.createdAt).getFullYear() : 'Utsavam'} · Utsavam studio</span></div></article>
}
