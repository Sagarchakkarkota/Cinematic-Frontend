'use client'

import Link from 'next/link'
import { defaultHomeContent, useHomeContent } from '../_hooks/useHomeContent'

export function LandingCta() {
  const { data } = useHomeContent()
  const content = { ...defaultHomeContent, ...data }
  return <section className="final-cta section-pad"><div className="section-kicker">{content.ctaKicker}</div><h2>{content.ctaTitle}<br /><em>{content.ctaAccent}</em></h2><Link href="/booking" className="button button-dark">{content.ctaLabel} <span>↗</span></Link></section>
}
