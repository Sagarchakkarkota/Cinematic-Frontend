'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    title: 'Cinematic Excellence',
    description: 'Every frame tells a story, crafted with the precision of a master filmmaker.',
    icon: '🎬',
  },
  {
    title: 'Cultural Authenticity',
    description: 'Honoring traditions while creating timeless memories that resonate across generations.',
    icon: '🕉️',
  },
  {
    title: 'Premium Quality',
    description: '4K resolution, professional color grading, and studio-quality audio production.',
    icon: '✨',
  },
  {
    title: 'Personal Touch',
    description: 'Every project is unique, tailored to reflect your personal story and vision.',
    icon: '💎',
  },
]

export function LandingFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Why Choose <span className="text-gradient">Utsavam</span>?
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We blend traditional values with modern cinematic techniques
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass rounded-lg p-6 hover:border-secondary transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
