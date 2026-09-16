import type { Metadata, Viewport } from 'next';
import { Inter, Poppins, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CartToastProvider } from '@/components/CartToast';
import CartDrawer from '@/components/CartDrawer';
import ReservationModal from '@/components/ReservationModal';
import FloatingActions from '@/components/FloatingActions';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollProgress from '@/components/ScrollProgress';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bengali',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aaroshihotel.com'),
  title: {
    default: 'Aaroshi Hotel & Family Restaurant | Chalsa, Dooars',
    template: '%s | Aaroshi Hotel & Family Restaurant',
  },
  description: 'Experience delicious Bengali, Tandoori, and Nepali-Indian food at Aaroshi Hotel & Family Restaurant in Chalsa Mahabari, Dooars. Spacious parking, AC family dining, table reservations & takeaway.',
  keywords: ['Aaroshi Hotel', 'Aaroshi Restaurant Chalsa', 'Family restaurant Chalsa', 'Dooars highway restaurant', 'Bengali food Chalsa', 'Tandoori chicken Chalsa', 'Dhaba Chalsa Mahabari'],
  authors: [{ name: 'Aaroshi Hotel & Family Restaurant' }],
  creator: 'Aaroshi Hotel & Family Restaurant',
  publisher: 'Aaroshi Hotel & Family Restaurant',
  robots: 'index, follow',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aaroshihotel.com',
    title: 'Aaroshi Hotel & Family Restaurant | Authentic Food & Table Booking in Chalsa',
    description: 'Family restaurant on Dooars Highway in Chalsa Mahabari. Tandoori chicken, mutton kosha, Bengali thalis, momos & spacious parking facility.',
    siteName: 'Aaroshi Hotel & Family Restaurant',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Aaroshi Hotel & Family Restaurant - Chalsa Mahabari, Dooars',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aaroshi Hotel & Family Restaurant | Chalsa Mahabari',
    description: 'Top-rated family restaurant in Chalsa, Dooars. Delicious Bengali, Tandoori & Nepali-Indian food.',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
};

export const viewport: Viewport = {
  themeColor: '#ed741f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${notoBengali.variable} motion-safe:scroll-smooth`}>
      <body className="font-sans antialiased text-dark-900 bg-white selection:bg-primary-500 selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <CartProvider>
          <CartToastProvider>
            <ScrollProgress />
            {children}
            <CartDrawer />
            <ReservationModal />
            <FloatingActions />
            <WhatsAppButton />
            <ScrollToTop />
          </CartToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}