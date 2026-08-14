'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePortfolio } from '../portfolio/_hooks/usePortfolio'
import { defaultHomeContent, useHomeContent } from '../_hooks/useHomeContent'

const fallbackWork = [{ title: 'The Mehta wedding', location: 'Jaipur, 2024', thumbnailUrl: '', className: 'photo-one' }, { title: 'A summer in Goa', location: 'Goa, 2024', thumbnailUrl: '', className: 'photo-two' }, { title: 'The in-between', location: 'Udaipur, 2023', thumbnailUrl: '', className: 'photo-three' }]

export function LandingFeatures() {
  const { data: portfolio } = usePortfolio()
  const { data } = useHomeContent()
  const content = { ...defaultHomeContent, ...data }
  const work = (portfolio || []).filter((item) => item.featured).sort((a, b) => a.order - b.order).slice(0, 3)
  const selectedWork = work.length ? work : fallbackWork

  return <>
    <section className="manifesto section-pad"><div className="section-kicker">{content.manifestoKicker}</div><div className="manifesto-content"><h2>{content.manifestoTitle}<br /><em>{content.manifestoAccent}</em></h2><div className="manifesto-copy"><p>{content.manifestoDescription}</p><Link href="/about" className="arrow-link">Our approach <span>↗</span></Link></div></div></section>
    <section className="image-break" aria-label="A wedding moment"><div className="image-break-photo" /><div className="image-caption">{content.imageCaption[0]}<br />{content.imageCaption[1]}</div></section>
    <section className="process section-pad" id="process"><div className="section-kicker">{content.processKicker}</div><div className="process-heading"><h2>{content.processTitle}<br /><em>{content.processAccent}</em></h2><p>{content.processDescription}</p></div><div className="step-list">{content.processSteps.map(({ number, title, description }) => <motion.div className="step" key={number} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}><span className="step-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="step-arrow">↗</span></motion.div>)}</div></section>
    <section className="work-section section-pad" id="work"><div className="work-top"><div className="section-kicker">{content.workKicker}</div><Link href="/portfolio" className="arrow-link">{content.workLinkLabel} <span>↗</span></Link></div><div className="work-grid">{selectedWork.map((item, index) => <Link href="/portfolio" className={`work-card ${index === 0 ? 'work-card-tall' : ''}`} key={item.title}><div className={`work-photo ${'className' in item ? item.className : ''}`} style={'thumbnailUrl' in item && item.thumbnailUrl ? { backgroundImage: `url(${item.thumbnailUrl})` } : undefined} /><div className="work-label"><span>{String(index + 1).padStart(2, '0')} / {item.title}</span><span>{'location' in item ? item.location : item.category} ↗</span></div></Link>)}</div></section>
    <section className="quote-section section-pad"><p className="quote">“{content.quote}”</p><span>{content.quoteAuthor}</span></section>
  </>
}
