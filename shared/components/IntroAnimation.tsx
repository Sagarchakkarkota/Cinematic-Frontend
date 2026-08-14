'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap/dist/gsap'

interface IntroAnimationProps { onComplete: () => void }

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const root = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressTween = gsap.to({ value: 0 }, { value: 100, duration: .55, ease: 'power2.out', onUpdate() { setProgress(Math.round(this.targets()[0].value)) } })
    const exitTimer = window.setTimeout(() => {
      if (!root.current) return
      gsap.timeline({ onComplete }).to(root.current.querySelector('.preloader-percent'), { opacity: 0, y: -10, duration: .16, ease: 'power2.in' }).to(root.current.querySelector('.preloader-title'), { opacity: 1, y: 0, scale: 1, duration: .4, ease: 'power3.out' }, '<').to(root.current.querySelector('.preloader-panel-left'), { xPercent: -100, duration: .6, ease: 'power3.inOut' }, '+=.12').to(root.current.querySelector('.preloader-panel-right'), { xPercent: 100, duration: .6, ease: 'power3.inOut' }, '<')
    }, 650)
    return () => { progressTween.kill(); window.clearTimeout(exitTimer) }
  }, [onComplete])

  return <div ref={root} className="preloader"><div className="preloader-panel preloader-panel-left" /><div className="preloader-panel preloader-panel-right" /><div className="preloader-content"><p className="preloader-label">LOADING FILM</p><p className="preloader-percent">{String(progress).padStart(2, '0')}</p><div className="preloader-title"><Image src="/goldenFeather.png" alt="Utsavam" width={28} height={52} /><span>UTSAVAM</span></div></div></div>
}
