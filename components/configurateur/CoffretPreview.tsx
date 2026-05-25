'use client'

import { useState } from 'react'
import { useConfigurator } from './ConfiguratorContext'
import { ChevronUp, ChevronDown, ShoppingBag, Sparkles } from 'lucide-react'

const WRAPPING_PRICE: Record<string, number> = {
  standard: 0, premium: 3, luxe: 8,
}

export default function CoffretPreview() {
  const { state, totalPrice, totalItems, setStep } = useConfigurator()
  const { bouquet, peluche, chocolats, personalization: p, step } = state
  const [mobileOpen, setMobileOpen] = useState(false)

  const delivery     = totalPrice >= 65 ? 0 : 4.9
  const orderTotal   = totalPrice + delivery
  const wrappingPrice = WRAPPING_PRICE[p.wrapping] ?? 0

  const items = [
    bouquet   && { emoji: '🌸', name: bouquet.name,   price: bouquet.price   },
    peluche   && { emoji: '🧸', name: peluche.name,   price: peluche.price   },
    chocolats && { emoji: '🍫', name: chocolats.name, price: chocolats.price },
    wrappingPrice > 0 && { emoji: '🎁', name: `Emballage ${p.wrapping}`, price: wrappingPrice },
  ].filter(Boolean) as { emoji: string; name: string; price: number }[]

  const isEmpty = !bouquet && !peluche && !chocolats

  return (
    <>
      {/* ── Desktop sidebar (sticky) ── */}
      <aside
        className="hidden lg:block sticky top-52 self-start"
        aria-label="Aperçu du coffret"
      >
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card">
          {/* Header */}
          <div className="bg-gradient-to-br from-pivoine-900 to-pivoine-700 px-5 py-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center gap-2 mb-0.5">
                <Sparkles size={14} className="text-gold" aria-hidden="true" />
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">
                  Votre coffret
                </p>
              </div>
              <p className="font-display text-2xl font-bold text-white leading-none">
                {isEmpty ? '—' : `${totalPrice}€`}
              </p>
              {!isEmpty && (
                <p className="text-white/55 text-xs mt-0.5">
                  {totalItems} article{totalItems > 1 ? 's' : ''}
                  {delivery === 0
                    ? ' · livraison offerte'
                    : ` · +${delivery}€ livraison`}
                </p>
              )}
            </div>
          </div>

          {/* Items list */}
          <div className="p-4">
            {isEmpty ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-2" aria-hidden="true">🎁</div>
                <p className="text-sm text-charcoal/40 font-medium">
                  Votre coffret est vide
                </p>
                <p className="text-xs text-charcoal/30 mt-0.5">
                  Commencez par choisir un bouquet
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    {/* Miniature image or emoji */}
                    <div className="w-10 h-10 rounded-xl bg-cream border border-blush flex items-center justify-center flex-shrink-0 text-base">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-charcoal truncate leading-tight">
                        {item.name}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-charcoal flex-shrink-0">
                      {item.price}€
                    </span>
                  </div>
                ))}

                {/* Divider */}
                <div className="border-t border-gray-100 pt-2.5 mt-1">
                  {delivery === 0 ? (
                    <div className="flex justify-between text-xs">
                      <span className="text-green-600 font-medium">✓ Livraison offerte</span>
                      <span className="text-green-600 font-bold">0€</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-xs text-charcoal/55">
                      <span>Livraison estimée</span>
                      <span>{delivery}€</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="bg-cream rounded-xl px-3 py-2.5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-charcoal">Total</span>
                  <span className="font-display text-xl font-bold text-charcoal">
                    {orderTotal.toFixed(2).replace('.', ',')}€
                  </span>
                </div>
              </div>
            )}

            {/* CTA */}
            {step < 5 ? (
              <button
                onClick={() => setStep(5)}
                disabled={isEmpty}
                className="w-full mt-3 btn-pivoine justify-center py-3 text-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                <ShoppingBag size={15} />
                {isEmpty ? 'Ajoutez un bouquet' : 'Voir le récap & Commander'}
              </button>
            ) : (
              <p className="text-center text-xs text-charcoal/40 mt-3 pt-3 border-t border-gray-100">
                Finalisez votre commande ci-contre
              </p>
            )}

            {/* Message preview */}
            {p.message && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-[10px] text-charcoal/40 font-semibold uppercase tracking-wider mb-1.5">
                  Message carte
                </p>
                <p className="font-accent italic text-charcoal/70 text-xs leading-relaxed">
                  &ldquo;{p.message.slice(0, 60)}{p.message.length > 60 ? '…' : ''}&rdquo;
                </p>
              </div>
            )}

            {/* Ribbon indicator */}
            <div className="mt-3 flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: p.ribbonColor }}
                aria-hidden="true"
              />
              <span className="text-[11px] text-charcoal/45">Ruban {p.ribbonName}</span>
              <span className="mx-1 text-charcoal/20">·</span>
              <span className="text-[11px] text-charcoal/45 capitalize">
                Emballage {p.wrapping}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Mobile floating bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
        {/* Expandable panel */}
        {mobileOpen && (
          <div className="bg-white border-t border-gray-200 px-4 py-4 shadow-soft-xl animate-fade-up">
            <div className="max-w-sm mx-auto space-y-2">
              {isEmpty ? (
                <p className="text-center text-sm text-charcoal/50 py-2">
                  Votre coffret est vide — commencez par un bouquet.
                </p>
              ) : (
                items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/70">{item.emoji} {item.name}</span>
                    <span className="font-semibold text-charcoal">{item.price}€</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Sticky bottom bar */}
        <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3">
          {/* Toggle */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="flex items-center gap-1.5 text-sm font-medium text-charcoal/70"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Masquer le détail' : 'Voir le détail du coffret'}
          >
            {mobileOpen
              ? <ChevronDown size={16} aria-hidden="true" />
              : <ChevronUp   size={16} aria-hidden="true" />
            }
            <span>{totalItems} article{totalItems !== 1 ? 's' : ''}</span>
          </button>

          {/* Total */}
          <div className="flex-1 text-center">
            <span className="font-display text-xl font-bold text-charcoal">
              {isEmpty ? '—' : `${orderTotal.toFixed(2).replace('.', ',')}€`}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={() => setStep(step < 5 ? step + 1 : 5)}
            disabled={isEmpty}
            className="btn-pivoine py-2.5 px-4 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {step === 5 ? 'Commander' : 'Suivant'}
          </button>
        </div>
      </div>
    </>
  )
}
