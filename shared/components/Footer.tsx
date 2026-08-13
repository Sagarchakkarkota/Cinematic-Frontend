import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-gradient mb-4">
              Utsavam
            </h3>
            <p className="text-foreground/70 text-sm max-w-md">
              Capturing the essence of your most precious moments with royal elegance
              and cinematic artistry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/portfolio" className="text-foreground/70 hover:text-secondary text-sm">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground/70 hover:text-secondary text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-foreground/70 hover:text-secondary text-sm">
                  Book Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>info@utsavam.com</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Utsavam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
