'use client'

import { useEffect, useRef } from 'react'
import { ConfiguratorProvider, useConfigurator } from './ConfiguratorContext'
import ConfiguratorStepper  from './ConfiguratorStepper'
import StepBouquet          from './StepBouquet'
import StepPeluche          from './StepPeluche'
import StepChocolats        from './StepChocolats'
import StepPersonalisation  from './StepPersonalisation'
import StepRecap            from './StepRecap'
import CoffretPreview       from './CoffretPreview'

function Inner() {
  const { state: { step } } = useConfigurator()
  const panelRef = useRef<HTMLDivElement>(null)

  /* Scroll to top of panel on step change */
  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [step])

  return (
    <div className="min-h-screen bg-cream pb-24 lg:pb-12">

      {/* Stepper */}
      <ConfiguratorStepper />

      {/* Hero banner */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-charcoal leading-tight">
              Créez votre coffret cadeau unique
            </h1>
            <p className="text-charcoal/55 text-sm mt-1">
              Combinez bouquet · peluche · chocolats et personnalisez chaque détail — aperçu en temps réel
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true" />
              <span className="text-sm font-medium text-charcoal/70">Livraison J+0 disponible</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-gray-200" aria-hidden="true" />
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-gold/10 text-gold-dark text-xs font-bold px-3 py-1.5 rounded-full border border-gold/20">
              ✨ –10% sur le coffret complet
            </span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Step panel — 2 cols */}
          <div
            ref={panelRef}
            className="lg:col-span-2 bg-white rounded-2xl shadow-soft border border-gray-100 p-6 lg:p-8 scroll-mt-48"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Step transition wrapper */}
            <div key={step} className="animate-fade-up">
              {step === 1 && <StepBouquet />}
              {step === 2 && <StepPeluche />}
              {step === 3 && <StepChocolats />}
              {step === 4 && <StepPersonalisation />}
              {step === 5 && <StepRecap />}
            </div>
          </div>

          {/* Sidebar preview — 1 col */}
          <CoffretPreview />
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '🌸', text: 'Fleurs coupées ce matin'     },
            { icon: '🍫', text: 'Chocolat fait main chaque jour' },
            { icon: '🚚', text: 'Livraison soignée & rapide'  },
            { icon: '🔒', text: 'Paiement 100% sécurisé'      },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2.5">
              <span className="text-xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
              <p className="text-xs font-medium text-charcoal/65 leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ConfiguratorShell() {
  return (
    <ConfiguratorProvider>
      <Inner />
    </ConfiguratorProvider>
  )
}
