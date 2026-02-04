import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Aurum Global Commerce',
  description: 'Premium global ecommerce storefront with curated fashion, phones, and accessories.',
  openGraph: {
    title: 'Aurum Global Commerce',
    description: 'Premium global ecommerce storefront with curated fashion, phones, and accessories.',
    url: 'https://aurum.example.com',
    siteName: 'Aurum',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1463107971871-fbac9ddb920f?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Aurum global commerce'
      }
    ],
    type: 'website'
  }
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen bg-white">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
