import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title:       'Sufi — Bouquets · Peluches · Chocolats Artisanaux',
  description: 'Offrez des cadeaux inoubliables : bouquets de fleurs fraîches, grosses peluches XXL et chocolats artisanaux faits main. Livraison le jour même disponible.',
  keywords:    'bouquet fleurs, peluche géante, chocolat artisanal, cadeau original, livraison fleurs',
  openGraph: {
    title:       'Sufi — Des cadeaux qui restent gravés',
    description: 'Bouquets · Peluches XXL · Chocolats faits main',
    type:        'website',
    locale:      'fr_FR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-white text-charcoal font-body antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
