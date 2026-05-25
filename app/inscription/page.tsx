import type { Metadata } from 'next'
import AuthShell from '@/components/auth/AuthShell'

export const metadata: Metadata = {
  title: 'Créer un compte — Sufi Chocolat',
  description: 'Rejoignez Sufi Chocolat et profitez d\'offres exclusives.',
  robots: { index: false, follow: false },
}

export default function InscriptionPage() {
  return <AuthShell defaultTab="signup" />
}
