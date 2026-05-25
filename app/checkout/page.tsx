import type { Metadata } from 'next'
import CheckoutShell from '@/components/checkout/CheckoutShell'

export const metadata: Metadata = {
  title: 'Commande — Sufi',
  description: 'Finalisez votre commande Sufi en toute sécurité.',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return <CheckoutShell />
}
