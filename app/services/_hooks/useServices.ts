import { useQuery } from '@tanstack/react-query'
import api from '@/shared/lib/api'

export interface Service {
  _id: string
  title: string
  description: string
  price: number
  features: string[]
  duration?: string
  order: number
  active: boolean
  createdAt: string
  updatedAt: string
}

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get('/services')
      return response.data.data
    },
  })
}
