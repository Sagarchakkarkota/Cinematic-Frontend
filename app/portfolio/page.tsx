import { PortfolioGrid } from './_components/PortfolioGrid'

export default function PortfolioPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A collection of our finest work, capturing moments of love, tradition, and celebration
          </p>
        </div>
        <PortfolioGrid />
      </div>
    </div>
  )
}
