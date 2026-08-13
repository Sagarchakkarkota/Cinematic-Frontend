import { ServicesList } from './_components/ServicesList'

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Comprehensive cinematography packages tailored to your needs
          </p>
        </div>
        <ServicesList />
      </div>
    </div>
  )
}
