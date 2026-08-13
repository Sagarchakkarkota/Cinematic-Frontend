import { useQuery } from '@tanstack/react-query'
import api from '@/shared/lib/api'

export interface PortfolioItem {
  _id: string
  title: string
  description?: string
  videoUrl: string
  thumbnailUrl?: string
  category: 'wedding' | 'pre-wedding' | 'reception' | 'other'
  featured: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export function usePortfolio() {
  return useQuery<PortfolioItem[]>({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const response = await api.get('/portfolio')
      return response.data.data
    },
  })
}
