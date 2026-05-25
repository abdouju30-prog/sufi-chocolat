'use client'

import { CheckoutProvider, useCheckout } from './CheckoutContext'
import CheckoutProgress from './CheckoutProgress'
import OrderSummary from './OrderSummary'
import StepLivraison from './StepLivraison'
import StepPaiement from './StepPaiement'
import StepConfirmation from './StepConfirmation'
import Link from 'next/link'
import { ArrowLeft, Flower2 } from 'lucide-react'

function CheckoutInner() {
  const { state: { step } } = useCheckout()

  return (
    <div className="min-h-screen bg-[#FAFAF9]">

      {/* Minimal header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Retour à l'accueil Sufi">
            <div className="w-7 h-7 bg-gradient-to-br from-pivoine to-rose-400 rounded-full flex items-center justify-center">
              <Flower2 size={14} className="text-white" aria-hidden="true" />
            </div>
            <span className="font-display text-lg font-bold text-charcoal group-hover:text-pivoine transition-colors">
              Sufi
            </span>
          </Link>

          {step < 3 && (
            <Link
              href="/configurateur"
              className="flex items-center gap-1.5 text-sm text-charcoal/55 hover:text-charcoal transition-colors"
            >
              <ArrowLeft size={14} />
              Retour au panier
            </Link>
          )}
        </div>
      </header>

      {/* Progress */}
      <CheckoutProgress />

      {/* Main layout */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${step === 3 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 lg:grid-cols-[1fr_360px]'}`}>

          {/* Step panel */}
          <div
            key={step}
            className="bg-white rounded-2xl shadow-card p-6 sm:p-8 animate-fade-up"
          >
            {/* Step heading */}
            {step < 3 && (
              <div className="mb-6 pb-5 border-b border-gray-100">
                <h1 className="font-display text-2xl font-semibold text-charcoal">
                  {step === 1 ? 'Livraison' : 'Paiement'}
                </h1>
                <p className="text-sm text-charcoal/50 mt-1">
                  {step === 1
                    ? 'Renseignez l\'adresse et le créneau de livraison'
                    : 'Choisissez votre mode de paiement sécurisé'}
                </p>
              </div>
            )}

            {step === 1 && <StepLivraison />}
            {step === 2 && <StepPaiement />}
            {step === 3 && <StepConfirmation />}
          </div>

          {/* Order summary — hidden on confirmation step */}
          {step < 3 && (
            <aside className="lg:sticky lg:top-[130px] lg:self-start">
              <OrderSummary compact />
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}

export default function CheckoutShell() {
  return (
    <CheckoutProvider>
      <CheckoutInner />
    </CheckoutProvider>
  )
}
