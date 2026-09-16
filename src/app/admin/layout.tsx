import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manager Portal | Aaroshi Hotel & Family Restaurant',
  description: 'Kitchen & Reservation Management Portal for Aaroshi Hotel & Family Restaurant staff.',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
