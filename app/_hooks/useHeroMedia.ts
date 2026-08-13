import { useQuery } from '@tanstack/react-query'
import api from '@/shared/lib/api'

export interface HeroMedia {
  _id: string
  type: 'video' | 'image'
  url: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export function useHeroMedia() {
  return useQuery<HeroMedia[]>({
    queryKey: ['hero-media'],
    queryFn: async () => {
      const response = await api.get('/hero-media')
      return response.data.data
    },
  })
}
