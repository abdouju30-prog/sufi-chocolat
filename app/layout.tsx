import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from '@/components/layout/ClientProviders'

export const metadata: Metadata = {
  title:       'Sufi Chocolat — Bouquets · Peluches · Chocolats Artisanaux',
  description: 'Offrez des cadeaux inoubliables : bouquets de fleurs fraîches, grosses peluches XXL et chocolats artisanaux faits main. Livraison le jour même disponible.',
  keywords:    'bouquet fleurs, peluche géante, chocolat artisanal, cadeau original, livraison fleurs',
  openGraph: {
    title:       'Sufi Chocolat — Des cadeaux qui restent gravés',
    description: 'Bouquets · Peluches XXL · Chocolats faits main',
    type:        'website',
    locale:      'fr_FR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-white text-charcoal font-body antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
