'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { HeroVideo } from './HeroVideo'
import { defaultHomeContent, useHomeContent } from '../_hooks/useHomeContent'

export function LandingHero() {
  const { data } = useHomeContent()
  const content = { ...defaultHomeContent, ...data }
  return <section className="studio-hero" id="top"><HeroVideo /><div className="hero-shade" aria-hidden="true" /><div className="hero-grid" aria-hidden="true" /><div className="hero-copy"><motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}>{content.eyebrow}</motion.p><motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>{content.heroTitle}<br /><em>{content.heroAccent}</em></motion.h1><motion.p className="hero-intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }}>{content.heroDescription}</motion.p><motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }}><Link href="/booking" className="button button-light">Start a story <span>↗</span></Link><Link href="#work" className="text-link">Explore the work <span>↓</span></Link></motion.div></div><div className="hero-meta"><span>{content.heroMeta[0]}</span><span className="meta-line" /><span>{content.heroMeta[1]}</span></div><div className="hero-scroll"><span>Scroll to explore</span><span className="scroll-line" /></div><div className="hero-index">01 / 04</div></section>
}
