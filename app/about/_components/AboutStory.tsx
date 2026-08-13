'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function AboutStory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-foreground/80 leading-relaxed">
            <p>
              Utsavam was born from a passion to preserve the most beautiful moments
              of life through the lens of cinematic excellence. We understand that
              weddings and cultural celebrations are not just events—they are the
              threads that weave together the tapestry of family history.
            </p>
            <p>
              With deep respect for tradition and an eye for modern storytelling,
              we create films that honor the past while celebrating the future.
              Every frame is crafted with intention, every moment captured with care.
            </p>
            <p>
              Our team brings together years of experience in cinematography, color
              grading, and post-production to deliver films that are not just watched,
              but experienced and cherished for generations.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="aspect-[4/3] bg-muted rounded-lg border border-border"
        >
          {/* Placeholder for image */}
          <div className="w-full h-full flex items-center justify-center text-foreground/30">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
