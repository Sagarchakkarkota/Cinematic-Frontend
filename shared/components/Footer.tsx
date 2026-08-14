import Link from 'next/link'

export function Footer() {
  return <footer className="site-footer"><div><Link href="/" className="footer-brand">Utsavam</Link><p>Visual stories, made with feeling.</p></div><div className="footer-links"><Link href="/portfolio">Work</Link><Link href="/services">Services</Link><Link href="/about">About</Link><Link href="/booking">Contact ↗</Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Utsavam Studio</span><span>Jaipur · India</span></div></footer>
}
