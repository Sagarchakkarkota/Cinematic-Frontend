import { useQuery } from '@tanstack/react-query'
import api from '@/shared/lib/api'

export interface DashboardStats {
  totalBookings: number
  pendingBookings: number
  totalPortfolioItems: number
  totalServices: number
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      // Calculate stats from individual API endpoints
      const [bookings, portfolio, services] = await Promise.all([
        api.get('/bookings').catch(() => ({ data: { data: [] } })),
        api.get('/portfolio').catch(() => ({ data: { data: [] } })),
        api.get('/services/all').catch(() => ({ data: { data: [] } })),
      ])

      const bookingData = bookings.data.data || []
      const portfolioData = portfolio.data.data || []
      const serviceData = services.data.data || []

      return {
        totalBookings: bookingData.length,
        pendingBookings: bookingData.filter((b: any) => b.status === 'pending').length,
        totalPortfolioItems: portfolioData.length,
        totalServices: serviceData.length,
      }
    },
  })
}
