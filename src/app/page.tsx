import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TableBookingSection from '@/components/TableBookingSection';
import OrderAheadBanner from '@/components/OrderAheadBanner';
import Features from '@/components/Features';
import PopularDishes from '@/components/PopularDishes';
import GroupCateringSection from '@/components/GroupCateringSection';
import SpecialOffers from '@/components/SpecialOffers';
import About from '@/components/About';
import MenuPreview from '@/components/MenuPreview';
import GoogleReviewBadge from '@/components/GoogleReviewBadge';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1">
          <Hero />
          <TableBookingSection />
          <OrderAheadBanner />
          <Features />
          <PopularDishes />
          <GroupCateringSection />
          <SpecialOffers />
          <About />
          <MenuPreview />
          <GoogleReviewBadge />
          <Testimonials />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}