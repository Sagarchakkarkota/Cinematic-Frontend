'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const values = [
  {
    title: 'Excellence',
    description: 'We strive for perfection in every project, ensuring the highest quality in every frame.',
  },
  {
    title: 'Authenticity',
    description: 'We capture genuine emotions and real moments, preserving the true essence of your celebration.',
  },
  {
    title: 'Respect',
    description: 'We honor traditions and cultural values, understanding their significance in your story.',
  },
  {
    title: 'Innovation',
    description: 'We blend traditional storytelling with modern techniques to create timeless cinematic experiences.',
  },
]

export function AboutValues() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          Our Values
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          The principles that guide everything we do
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="glass rounded-lg p-6 text-center"
          >
            <h3 className="text-xl font-semibold mb-3 text-secondary">
              {value.title}
            </h3>
            <p className="text-foreground/70 text-sm">
              {value.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
