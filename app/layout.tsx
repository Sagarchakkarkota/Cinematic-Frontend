import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/shared/providers/Providers'
import { Navigation } from '@/shared/components/Navigation'
import { ConditionalFooter } from '@/shared/components/ConditionalFooter'
import { IntroWrapper } from '@/shared/components/IntroWrapper'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Utsavam - Premium Cinematography',
  description: 'Royal, cultural, and cinematic wedding cinematography',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Providers>
          <IntroWrapper>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <ConditionalFooter />
          </IntroWrapper>
        </Providers>
      </body>
    </html>
  )
}
