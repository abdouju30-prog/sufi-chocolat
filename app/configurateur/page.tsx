import type { Metadata } from 'next'
import ConfiguratorShell from '@/components/configurateur/ConfiguratorShell'

export const metadata: Metadata = {
  title:       'Créez votre coffret cadeau — Sufi',
  description: 'Composez en 4 étapes un coffret unique : bouquet de fleurs, peluche XXL et chocolats artisanaux. Aperçu en temps réel. Livraison le jour même.',
}

export default function ConfigurateurPage() {
  return <ConfiguratorShell />
}
