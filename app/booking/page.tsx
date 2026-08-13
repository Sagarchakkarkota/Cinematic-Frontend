import { BookingForm } from './_components/BookingForm'

export default function BookingPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Book Your <span className="text-gradient">Event</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Let's discuss how we can capture your special day with cinematic excellence
          </p>
        </div>
        <BookingForm />
      </div>
    </div>
  )
}
