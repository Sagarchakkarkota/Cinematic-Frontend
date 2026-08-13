import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/shared/lib/api'
import { HeroMedia } from '@/app/_hooks/useHeroMedia'

export function useHeroMediaAdmin() {
  return useQuery<HeroMedia[]>({
    queryKey: ['hero-media', 'admin'],
    queryFn: async () => {
      const response = await api.get('/hero-media')
      return response.data.data
    },
  })
}

export function useCreateHeroMedia() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Partial<HeroMedia>) => {
      const response = await api.post('/hero-media', data)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-media'] })
    },
  })
}

export function useUpdateHeroMedia() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<HeroMedia> }) => {
      const response = await api.put(`/hero-media/${id}`, data)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-media'] })
    },
  })
}

export function useDeleteHeroMedia() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/hero-media/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero-media'] })
    },
  })
}
