'use client'

import { motion } from 'framer-motion'

export function AboutHero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
          About <span className="text-gradient">Utsavam</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
          Where tradition meets cinematic artistry
        </p>
      </motion.div>
    </section>
  )
}
