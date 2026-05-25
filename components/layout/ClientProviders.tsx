'use client'

import { CartProvider } from '@/components/cart/CartContext'
import CartDrawer from '@/components/cart/CartDrawer'
import Navbar from './Navbar'
import Footer from './Footer'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </CartProvider>
  )
}
