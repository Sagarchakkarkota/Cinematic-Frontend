'use client'

import { useDashboardStats } from '../_hooks/useDashboard'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function DashboardStats() {
  const { data: stats, isLoading } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass rounded-lg p-6 h-32 animate-pulse" />
        ))}
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats?.totalBookings || 0,
      link: '/admin/bookings',
      color: 'text-secondary',
    },
    {
      title: 'Pending Bookings',
      value: stats?.pendingBookings || 0,
      link: '/admin/bookings',
      color: 'text-accent',
    },
    {
      title: 'Portfolio Items',
      value: stats?.totalPortfolioItems || 0,
      link: '/admin/portfolio',
      color: 'text-secondary',
    },
    {
      title: 'Services',
      value: stats?.totalServices || 0,
      link: '/admin/services',
      color: 'text-secondary',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={stat.link}>
            <div className="glass rounded-lg p-6 hover:border-secondary transition-colors cursor-pointer">
              <h3 className="text-sm font-medium text-foreground/70 mb-2">
                {stat.title}
              </h3>
              <p className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
