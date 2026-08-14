'use client'

import { motion } from 'framer-motion'
import { useServices } from '../_hooks/useServices'
import { Button } from '@/shared/components/Button'
import Link from 'next/link'
import { CardSkeleton } from '@/shared/components/Skeleton'

export function ServicesList() {
  const { data: services, isLoading } = useServices()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => <CardSkeleton key={i} className="service-card-skeleton" />)}
      </div>
    )
  }

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/70">No services available yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={service._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-lg p-8 hover:border-secondary transition-colors flex flex-col"
        >
          <h3 className="text-2xl font-serif font-bold mb-3 text-foreground">
            {service.title}
          </h3>
          <p className="text-foreground/70 mb-6 flex-grow">
            {service.description}
          </p>
          
          {service.duration && (
            <p className="text-sm text-secondary mb-4">Duration: {service.duration}</p>
          )}

          {service.features && service.features.length > 0 && (
            <ul className="mb-6 space-y-2">
              {service.features.map((feature, i) => (
                <li key={i} className="text-sm text-foreground/70 flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto">
            <div className="text-3xl font-bold text-secondary mb-4">
              ₹{service.price.toLocaleString()}
            </div>
            <Link href="/booking">
              <Button variant="primary" className="w-full">
                Book Now
              </Button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
