import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TableBookingSection from '@/components/TableBookingSection';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Book a Table | Aaroshi Hotel & Family Restaurant Chalsa',
  description: 'Reserve your table at Aaroshi Hotel & Family Restaurant (আরসি হোটেল) in Chalsa Mahabari. AC family hall, highway garden seating, authentic Tandoori, Bengali & Nepali food with spacious parking.',
  alternates: {
    canonical: '/book-table',
  },
  openGraph: {
    title: 'Book a Table | Aaroshi Hotel & Family Restaurant Chalsa',
    description: 'Instant table reservation with AC family hall priority, Tandoori specialties, and spacious parking at Chalsa Mahabari.',
    type: 'website',
  },
};

export default function BookTablePage() {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 pt-12">
          <TableBookingSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
