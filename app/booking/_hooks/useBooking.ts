import { useMutation } from '@tanstack/react-query'
import api from '@/shared/lib/api'

export interface BookingFormData {
  name: string
  email: string
  phone: string
  eventDate: string
  eventType: string
  location?: string
  message?: string
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await api.post('/bookings', data)
      return response.data
    },
  })
}
