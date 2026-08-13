import { BookingsList } from './_components/BookingsList'

export default function AdminBookingsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">
            Manage <span className="text-gradient">Bookings</span>
          </h1>
          <p className="text-foreground/70">View and manage all booking requests</p>
        </div>
        <BookingsList />
      </div>
    </div>
  )
}
