import type { Metadata } from 'next'
import BoutiqueShell from '@/components/boutique/BoutiqueShell'

export const metadata: Metadata = {
  title: 'Boutique — Sufi Chocolat',
  description: 'Bouquets de fleurs frais, peluches XXL et chocolats artisanaux. Livraison le jour même disponible.',
}

export default function BoutiquePage() {
  return <BoutiqueShell />
}
