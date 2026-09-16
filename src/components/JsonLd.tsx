export default function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Aaroshi Hotel & Family Restaurant',
    alternateName: 'আরসি হোটেল & ফ্যামিলি রেস্টুরেন্ট',
    description: 'Popular family restaurant & highway dhaba in Chalsa Mahabari, Dooars. Serving delicious Tandoori Chicken, Chicken Masala, Mutton Kosha, Bengali thalis, and momos with spacious parking.',
    url: 'https://aaroshihotel.com',
    telephone: '+91-95631-61422',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mahabari, Chalsa',
      addressLocality: 'Chalsa Mahabari',
      addressRegion: 'West Bengal',
      postalCode: '735206',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.8833,
      longitude: 88.7833,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '23:00',
      },
    ],
    servesCuisine: ['Bengali', 'North Indian', 'Dhaba', 'Nepali', 'Tandoori', 'Chinese'],
    priceRange: '₹200-400',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Digital Wallets',
    hasMenu: 'https://aaroshihotel.com/#menu',
    menu: 'https://aaroshihotel.com/#menu',
    acceptsReservations: true,
    hasOnlineOrdering: true,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 3.9,
      reviewCount: 997,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Anirban Dutta',
        },
        datePublished: '2024-02-15',
        reviewBody: 'Well maintained rooms, restaurants and facilities with good staff',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Prakash Sharma',
        },
        datePublished: '2024-01-20',
        reviewBody: 'Good place food quality is good with spacious parking facility',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Deepak Thapa',
        },
        datePublished: '2023-12-18',
        reviewBody: 'The meal was delicious, Nepali -indian foods are served with reasonable price',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
    image: [
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    ],
    featureList: ['Dine-in', 'Drive-through', 'Delivery', 'Takeaway', 'Spacious Parking', 'AC Family Dining'],
    knowsAbout: ['Tandoori Chicken', 'Chicken Masala', 'Mutton Kosha', 'Chicken Momo', 'Bengali Thali', 'Fish Thali', 'Butter Naan', 'Mishti Doi'],
    areaServed: {
      '@type': 'City',
      name: 'Chalsa, Dooars',
    },
    sameAs: [
      'https://maps.app.goo.gl/UCf5PsNf7h8sLZ6W6',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}