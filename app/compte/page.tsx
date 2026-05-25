import type { Metadata } from 'next'
import AccountShell from '@/components/compte/AccountShell'

export const metadata: Metadata = {
  title: 'Mon compte — Sufi Chocolat',
  description: 'Gérez vos commandes, suivez vos livraisons et personnalisez votre profil.',
  robots: { index: false, follow: false },
}

export default function ComptePage() {
  return <AccountShell />
}
