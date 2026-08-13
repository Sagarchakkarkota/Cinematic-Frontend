import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/shared/lib/api'
import { PortfolioItem } from '@/app/portfolio/_hooks/usePortfolio'

export function usePortfolioAdmin() {
  return useQuery<PortfolioItem[]>({
    queryKey: ['portfolio', 'admin'],
    queryFn: async () => {
      const response = await api.get('/portfolio')
      return response.data.data
    },
  })
}

export function useCreatePortfolioItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Partial<PortfolioItem>) => {
      const response = await api.post('/portfolio', data)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    },
  })
}

export function useUpdatePortfolioItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PortfolioItem> }) => {
      const response = await api.put(`/portfolio/${id}`, data)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    },
  })
}

export function useDeletePortfolioItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/portfolio/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] })
    },
  })
}
