'use client'

import { useCheckout } from './CheckoutContext'
import { Check, MapPin, CreditCard, PartyPopper } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Livraison',     icon: <MapPin       size={15} /> },
  { id: 2, label: 'Paiement',      icon: <CreditCard   size={15} /> },
  { id: 3, label: 'Confirmation',  icon: <PartyPopper  size={15} /> },
]

export default function CheckoutProgress() {
  const { state: { step } } = useCheckout()

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Progress bar */}
        <div className="relative h-1 bg-gray-100 rounded-full mb-5 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-pivoine rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-label={`Étape ${step} sur 3`}
          />
        </div>

        <nav aria-label="Étapes du paiement">
          <ol className="flex items-center justify-center gap-4 sm:gap-12">
            {STEPS.map((s, i) => {
              const done    = step > s.id
              const current = step === s.id
              return (
                <li key={s.id} className="flex items-center gap-2 sm:gap-3">
                  {/* Connector */}
                  {i > 0 && (
                    <div
                      className={`hidden sm:block w-16 h-px ${step > i ? 'bg-pivoine' : 'bg-gray-200'}`}
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex items-center gap-2">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0
                      ${done    ? 'bg-pivoine border-pivoine text-white'
                        : current ? 'bg-white border-pivoine text-pivoine shadow-gold'
                        : 'bg-white border-gray-200 text-charcoal/35'}
                    `}
                      aria-hidden="true"
                    >
                      {done ? <Check size={14} /> : s.icon}
                    </div>
                    <span className={`text-sm font-semibold transition-colors hidden sm:block ${
                      current ? 'text-pivoine' : done ? 'text-charcoal' : 'text-charcoal/35'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </div>
  )
}
