import type { Metadata } from 'next'
import AuthShell from '@/components/auth/AuthShell'

export const metadata: Metadata = {
  title: 'Connexion — Sufi Chocolat',
  description: 'Connectez-vous à votre compte Sufi Chocolat.',
  robots: { index: false, follow: false },
}

export default function ConnexionPage() {
  return <AuthShell defaultTab="login" />
}
