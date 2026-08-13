'use client'

import { useState } from 'react'
import { useCreateBooking } from '../_hooks/useBooking'
import { Input } from '@/shared/components/Input'
import { Textarea } from '@/shared/components/Textarea'
import { Button } from '@/shared/components/Button'
import { useToast } from '@/shared/hooks/useToast'
import { Toast } from '@/shared/components/Toast'
import { motion } from 'framer-motion'

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    location: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const createBooking = useCreateBooking()
  const { toast, showToast, hideToast } = useToast()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required'
    if (!formData.eventType.trim()) newErrors.eventType = 'Event type is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      await createBooking.mutateAsync(formData)
      showToast('Booking request submitted successfully! We will contact you soon.', 'success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        location: '',
        message: '',
      })
    } catch (error) {
      showToast('Failed to submit booking. Please try again.', 'error')
    }
  }

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="glass rounded-lg p-8 space-y-6"
      >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <Input
          label="Email *"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Phone Number *"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
        <Input
          label="Event Date *"
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          error={errors.eventDate}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Event Type *
        </label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
          required
        >
          <option value="">Select event type</option>
          <option value="wedding">Wedding</option>
          <option value="pre-wedding">Pre-Wedding</option>
          <option value="reception">Reception</option>
          <option value="engagement">Engagement</option>
          <option value="other">Other</option>
        </select>
        {errors.eventType && (
          <p className="mt-1 text-sm text-red-400">{errors.eventType}</p>
        )}
      </div>

      <Input
        label="Event Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        error={errors.location}
        placeholder="City, Venue name (optional)"
      />

      <Textarea
        label="Additional Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows={5}
        placeholder="Tell us about your vision, special requirements, or any questions..."
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={createBooking.isPending}
      >
        {createBooking.isPending ? 'Submitting...' : 'Submit Booking Request'}
      </Button>
    </motion.form>
    <Toast
      message={toast.message}
      type={toast.type}
      isOpen={toast.isOpen}
      onClose={hideToast}
    />
    </>
  )
}
