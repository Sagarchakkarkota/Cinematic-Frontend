import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/shared/providers/Providers'
import { Navigation } from '@/shared/components/Navigation'
import { ConditionalFooter } from '@/shared/components/ConditionalFooter'
import { IntroWrapper } from '@/shared/components/IntroWrapper'
import { CinematicLayer } from '@/app/_components/CinematicLayer'

export const metadata: Metadata = {
  title: 'Utsavam - Premium Cinematography',
  description: 'Royal, cultural, and cinematic wedding cinematography',
  icons: { icon: '/goldenFeather.png' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <IntroWrapper>
            <Navigation />
            <CinematicLayer />
            <main>
              {children}
            </main>
            <ConditionalFooter />
          </IntroWrapper>
        </Providers>
      </body>
    </html>
  )
}
