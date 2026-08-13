import { DashboardStats } from './_components/DashboardStats'
import { DashboardRecent } from './_components/DashboardRecent'

export default function DashboardPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">
            <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-foreground/70">Welcome to your admin dashboard</p>
        </div>
        <DashboardStats />
        <DashboardRecent />
      </div>
    </div>
  )
}
