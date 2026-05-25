'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface Address {
  firstName:    string
  lastName:     string
  phone:        string
  email:        string
  street:       string
  complement:   string
  city:         string
  postalCode:   string
  country:      string
  instructions: string
}

export interface DeliveryInfo {
  recipient:      Address
  isSurprise:     boolean
  differentBuyer: boolean
  buyer:          Partial<Address>
  date:           string
  slot:           string
}

export interface PaymentInfo {
  method:   'card' | 'apple' | 'google' | 'alma'
  cardName: string
}

export interface CheckoutState {
  step:     1 | 2 | 3
  delivery: DeliveryInfo
  payment:  PaymentInfo
  orderRef: string
}

interface CheckoutContextType {
  state:          CheckoutState
  setStep:        (s: 1 | 2 | 3) => void
  updateDelivery: (d: Partial<DeliveryInfo>) => void
  updatePayment:  (p: Partial<PaymentInfo>) => void
  placeOrder:     () => void
}

const blankAddress = (): Address => ({
  firstName: '', lastName: '', phone: '', email: '',
  street: '', complement: '', city: '', postalCode: '',
  country: 'France', instructions: '',
})

const NEXT_DAYS = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() + i)
  return d.toISOString().split('T')[0]
})

const CheckoutContext = createContext<CheckoutContextType | null>(null)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CheckoutState>({
    step: 1,
    delivery: {
      recipient:      blankAddress(),
      isSurprise:     false,
      differentBuyer: false,
      buyer:          {},
      date:           NEXT_DAYS[0],
      slot:           'Après-midi',
    },
    payment: { method: 'card', cardName: '' },
    orderRef: '',
  })

  const setStep = useCallback((step: 1 | 2 | 3) =>
    setState(s => ({ ...s, step })), [])

  const updateDelivery = useCallback((d: Partial<DeliveryInfo>) =>
    setState(s => ({ ...s, delivery: { ...s.delivery, ...d } })), [])

  const updatePayment = useCallback((p: Partial<PaymentInfo>) =>
    setState(s => ({ ...s, payment: { ...s.payment, ...p } })), [])

  const placeOrder = useCallback(() => {
    const ref = `SUF-${Date.now().toString(36).toUpperCase().slice(-6)}`
    setState(s => ({ ...s, step: 3, orderRef: ref }))
  }, [])

  return (
    <CheckoutContext.Provider value={{ state, setStep, updateDelivery, updatePayment, placeOrder }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider')
  return ctx
}
