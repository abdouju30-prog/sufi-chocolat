'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface CartItem {
  id:       number
  slug:     string
  name:     string
  price:    number
  image:    string
  category: string
  quantity: number
}

interface CartContextType {
  items:        CartItem[]
  totalItems:   number
  totalPrice:   number
  drawerOpen:   boolean
  openDrawer:   () => void
  closeDrawer:  () => void
  addItem:      (item: Omit<CartItem, 'quantity'>) => void
  removeItem:   (id: number) => void
  updateQty:    (id: number, qty: number) => void
  clearCart:    () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items,       setItems]       = useState<CartItem[]>([])
  const [drawerOpen,  setDrawerOpen]  = useState(false)

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const openDrawer  = useCallback(() => setDrawerOpen(true),  [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === newItem.id)
      if (existing) {
        return prev.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
    setDrawerOpen(true)
  }, [])

  const removeItem = useCallback((id: number) =>
    setItems(prev => prev.filter(i => i.id !== id)), [])

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty < 1) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider value={{
      items, totalItems, totalPrice,
      drawerOpen, openDrawer, closeDrawer,
      addItem, removeItem, updateQty, clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
