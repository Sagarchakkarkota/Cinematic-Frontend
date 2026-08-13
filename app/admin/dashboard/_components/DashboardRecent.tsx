'use client'

import { useQuery } from '@tanstack/react-query'
import api from '@/shared/lib/api'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function DashboardRecent() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', 'recent'],
    queryFn: async () => {
      const response = await api.get('/bookings')
      return response.data.data.slice(0, 5) // Get latest 5
    },
  })

  if (isLoading) {
    return (
      <div className="glass rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Recent Bookings</h2>
        <Link href="/admin/bookings">
          <span className="text-secondary hover:text-accent text-sm font-medium cursor-pointer">
            View All →
          </span>
        </Link>
      </div>

      {!bookings || bookings.length === 0 ? (
        <p className="text-foreground/70 text-center py-8">No bookings yet</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking: any, index: number) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div>
                <p className="font-medium text-foreground">{booking.name}</p>
                <p className="text-sm text-foreground/70">
                  {booking.eventType} • {new Date(booking.eventDate).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'pending'
                    ? 'bg-accent/20 text-accent'
                    : booking.status === 'confirmed'
                    ? 'bg-secondary/20 text-secondary'
                    : 'bg-foreground/20 text-foreground/70'
                }`}
              >
                {booking.status}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
