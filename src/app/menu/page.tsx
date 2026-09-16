import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuPageContent from '@/components/MenuPageContent';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Menu | Aaroshi Hotel & Family Restaurant - Tandoori, Bengali & Nepali-Indian',
  description: 'Explore our complete menu featuring Tandoori Chicken, Chicken Masala, Mutton Kosha, Bengali thalis, steamed momos, breakfast items, and sweets. Affordable ₹200–400 per person in Chalsa.',
  openGraph: {
    title: 'Menu | Aaroshi Hotel & Family Restaurant Chalsa',
    description: 'Explore our complete menu featuring authentic Tandoori, Bengali thalis, and Nepali-Indian specialties in Chalsa Mahabari.',
    type: 'website',
  },
};

export default function MenuPage() {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1">
          <MenuPageContent />
        </main>
        <Footer />
      </div>
    </>
  );
}