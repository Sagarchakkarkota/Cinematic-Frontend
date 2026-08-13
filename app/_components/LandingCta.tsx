'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/shared/components/Button'

export function LandingCta() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-tertiary/20 to-primary/20" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Create <span className="text-gradient">Magic</span>?
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with cinematic excellence
          </p>
          <Link href="/booking">
            <Button size="lg" variant="primary">
              Start Your Journey
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
