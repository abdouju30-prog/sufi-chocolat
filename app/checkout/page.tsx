import type { Metadata } from 'next'
import CheckoutShell from '@/components/checkout/CheckoutShell'

export const metadata: Metadata = {
  title: 'Commande — Sufi Chocolat',
  description: 'Finalisez votre commande Sufi Chocolat en toute sécurité.',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return <CheckoutShell />
}
