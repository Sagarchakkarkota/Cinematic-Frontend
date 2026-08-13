import { ServicesManager } from './_components/ServicesManager'

export default function AdminServicesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">
            Manage <span className="text-gradient">Services</span>
          </h1>
          <p className="text-foreground/70">Add, edit, or remove services</p>
        </div>
        <ServicesManager />
      </div>
    </div>
  )
}
