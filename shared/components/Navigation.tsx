'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  if (pathname?.startsWith('/admin')) return null
  const links = [['/portfolio', 'Work'], ['/services', 'Services'], ['/about', 'About']]
  return <header className="site-nav"><Link href="/" className="wordmark" onClick={() => setOpen(false)}><Image src="/goldenFeather.png" alt="Utsavam logo" width={26} height={38} className="wordmark-logo" priority /> <span>Utsavam</span></Link><nav className={open ? 'nav-links open' : 'nav-links'}>{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/booking" className="nav-cta" onClick={() => setOpen(false)}>Book a film <span>↗</span></Link></nav><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu"><span /><span /></button></header>
}
