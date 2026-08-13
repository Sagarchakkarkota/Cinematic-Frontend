'use client'

import { useState } from 'react'
import { useBookingsAdmin, useUpdateBooking, useDeleteBooking } from '../_hooks/useBookingsAdmin'
import { Button } from '@/shared/components/Button'
import { Modal } from '@/shared/components/Modal'
import { motion } from 'framer-motion'
import type { Booking } from '../_hooks/useBookingsAdmin'

export function BookingsList() {
  const { data: bookings, isLoading } = useBookingsAdmin()
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const updateBooking = useUpdateBooking()
  const deleteBooking = useDeleteBooking()

  const handleStatusChange = async (id: string, status: Booking['status']) => {
    await updateBooking.mutateAsync({ id, data: { status } })
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      await deleteBooking.mutateAsync(id)
    }
  }

  if (isLoading) {
    return <div className="text-foreground/70">Loading...</div>
  }

  return (
    <>
      <div className="glass rounded-lg p-6">
        {!bookings || bookings.length === 0 ? (
          <p className="text-foreground/70 text-center py-8">No bookings yet</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-foreground">{booking.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'pending'
                            ? 'bg-accent/20 text-accent'
                            : booking.status === 'confirmed'
                            ? 'bg-secondary/20 text-secondary'
                            : booking.status === 'completed'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-foreground/20 text-foreground/70'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70 mb-1">
                      {booking.email} • {booking.phone}
                    </p>
                    <p className="text-sm text-foreground/70 mb-1">
                      {booking.eventType} • {new Date(booking.eventDate).toLocaleDateString()}
                    </p>
                    {booking.location && (
                      <p className="text-sm text-foreground/70">📍 {booking.location}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      View
                    </Button>
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking._id, e.target.value as Booking['status'])}
                      className="px-3 py-1 text-xs bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        size="md"
      >
        {selectedBooking && (
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Booking Details
            </h2>
            <div className="space-y-3 text-foreground/80">
              <div>
                <span className="font-medium">Name:</span> {selectedBooking.name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {selectedBooking.email}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {selectedBooking.phone}
              </div>
              <div>
                <span className="font-medium">Event Type:</span> {selectedBooking.eventType}
              </div>
              <div>
                <span className="font-medium">Event Date:</span>{' '}
                {new Date(selectedBooking.eventDate).toLocaleDateString()}
              </div>
              {selectedBooking.location && (
                <div>
                  <span className="font-medium">Location:</span> {selectedBooking.location}
                </div>
              )}
              {selectedBooking.message && (
                <div>
                  <span className="font-medium">Message:</span>
                  <p className="mt-1 text-foreground/70">{selectedBooking.message}</p>
                </div>
              )}
              <div>
                <span className="font-medium">Status:</span>{' '}
                <span className="capitalize">{selectedBooking.status}</span>
              </div>
              <div>
                <span className="font-medium">Submitted:</span>{' '}
                {new Date(selectedBooking.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
