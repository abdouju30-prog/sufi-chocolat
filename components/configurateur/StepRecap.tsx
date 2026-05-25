'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag, Check, Truck, Gift, Pencil, Ribbon, Edit3 } from 'lucide-react'
import { useConfigurator } from './ConfiguratorContext'

const WRAPPING_LABEL: Record<string, { label: string; price: number }> = {
  standard: { label: 'Emballage Standard',  price: 0 },
  premium:  { label: 'Emballage Premium',   price: 3 },
  luxe:     { label: 'Emballage Luxe',      price: 8 },
}

export default function StepRecap() {
  const { state, setStep, totalPrice, totalItems } = useConfigurator()
  const { bouquet, peluche, chocolats, personalization: p } = state
  const [ordered, setOrdered] = useState(false)

  const wrapping     = WRAPPING_LABEL[p.wrapping]
  const deliveryDate = new Date(p.deliveryDate).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  const subtotal     = (bouquet?.price ?? 0) + (peluche?.price ?? 0) + (chocolats?.price ?? 0)
  const delivery     = totalPrice >= 65 ? 0 : 4.9
  const orderTotal   = totalPrice + (totalPrice >= 65 ? 0 : delivery)

  if (ordered) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-5" role="status" aria-live="polite">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce-in">
          <Check size={38} className="text-green-600" aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">
            Coffret commandé avec succès !
          </h2>
          <p className="text-charcoal/60 text-sm max-w-sm">
            Un email de confirmation a été envoyé. Votre coffret sera préparé avec soin
            et livré le <strong>{deliveryDate}</strong>.
          </p>
        </div>
        <div className="bg-cream border border-blush rounded-2xl px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-pivoine/10 rounded-xl flex items-center justify-center">
            <Gift size={18} className="text-pivoine" aria-hidden="true" />
          </div>
          <div className="text-left">
            <p className="text-xs text-charcoal/50 font-medium">Numéro de commande</p>
            <p className="font-semibold text-charcoal">#SUF-{Math.floor(Math.random() * 90000 + 10000)}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/compte" className="btn-pivoine text-sm py-2.5 px-5">
            Suivre ma commande
          </Link>
          <Link href="/boutique" className="border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-charcoal hover:border-pivoine hover:text-pivoine transition-all">
            Retour boutique
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl" aria-hidden="true">🎁</span>
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            Récapitulatif du coffret
          </h2>
        </div>
        <p className="text-charcoal/60 text-sm">
          Vérifiez votre sélection avant de passer commande.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">

        {/* Left — items */}
        <div className="lg:col-span-3 space-y-4">

          {/* Coffret items */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-sm text-charcoal">
                Votre coffret ({totalItems} article{totalItems > 1 ? 's' : ''})
              </h3>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-pivoine hover:underline flex items-center gap-1"
              >
                <Edit3 size={11} /> Modifier
              </button>
            </div>

            <div className="divide-y divide-gray-50">
              {[
                { item: bouquet,   step: 1, emoji: '🌸', label: 'Bouquet'   },
                { item: peluche,   step: 2, emoji: '🧸', label: 'Peluche'   },
                { item: chocolats, step: 3, emoji: '🍫', label: 'Chocolats' },
              ].map(({ item, step, emoji, label }) =>
                item ? (
                  <div key={label} className="flex items-center gap-4 px-5 py-4">
                    {/* Image */}
                    <div
                      className="w-14 h-14 rounded-xl bg-cover bg-center flex-shrink-0 border border-gray-100"
                      style={{ backgroundImage: `url('${item.image}')` }}
                      role="img"
                      aria-label={item.name}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-charcoal/45 font-semibold uppercase tracking-wider mb-0.5">
                        {emoji} {label}
                      </p>
                      <p className="text-sm font-semibold text-charcoal truncate">{item.name}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-display text-base font-semibold text-charcoal">
                        {item.price}€
                      </span>
                      <button
                        onClick={() => setStep(step)}
                        aria-label={`Modifier ${label}`}
                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-blush hover:text-pivoine flex items-center justify-center transition-colors"
                      >
                        <Edit3 size={12} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={label} className="flex items-center gap-4 px-5 py-3.5 opacity-40">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-xl">
                      {emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-charcoal/40">{label} — non sélectionné</p>
                    </div>
                    <button
                      onClick={() => setStep(step)}
                      className="text-xs text-pivoine hover:underline"
                    >
                      + Ajouter
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Personalization recap */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-sm text-charcoal">Personnalisation</h3>
              <button
                onClick={() => setStep(4)}
                className="text-xs text-pivoine hover:underline flex items-center gap-1"
              >
                <Edit3 size={11} /> Modifier
              </button>
            </div>
            <div className="px-5 py-4 space-y-3">
              {/* Message */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-pivoine/10 flex items-center justify-center flex-shrink-0">
                  <Pencil size={12} className="text-pivoine" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-charcoal/45 font-medium mb-0.5">Message carte</p>
                  <p className="text-sm text-charcoal font-accent italic">
                    {p.message ? `"${p.message}"` : <span className="not-italic text-charcoal/35">Aucun message</span>}
                  </p>
                </div>
              </div>
              {/* Ribbon */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-pivoine/10 flex items-center justify-center flex-shrink-0">
                  <Ribbon size={12} className="text-pivoine" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-charcoal/45 font-medium">Ruban :</p>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: p.ribbonColor }}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-charcoal font-medium">{p.ribbonName}</span>
                  </div>
                </div>
              </div>
              {/* Wrapping */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-pivoine/10 flex items-center justify-center flex-shrink-0">
                  <Gift size={12} className="text-pivoine" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <p className="text-xs text-charcoal/45 font-medium">Emballage :</p>
                  <span className="text-sm text-charcoal font-medium capitalize">{p.wrapping}</span>
                  {wrapping.price > 0 && (
                    <span className="text-xs text-charcoal/50">(+{wrapping.price}€)</span>
                  )}
                </div>
              </div>
              {/* Delivery */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-pivoine/10 flex items-center justify-center flex-shrink-0">
                  <Truck size={12} className="text-pivoine" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-charcoal/45 font-medium">Livraison :</p>
                  <span className="text-sm text-charcoal font-medium capitalize">{deliveryDate}</span>
                  <span className="text-xs text-charcoal/45">· {p.slot}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — order summary */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden sticky top-48">
            <div className="px-5 py-4 bg-cream border-b border-blush">
              <h3 className="font-display text-lg font-semibold text-charcoal">
                Résumé de commande
              </h3>
            </div>

            <div className="p-5 space-y-3">
              {/* Line items */}
              {bouquet && (
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">🌸 {bouquet.name}</span>
                  <span className="font-medium text-charcoal">{bouquet.price}€</span>
                </div>
              )}
              {peluche && (
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">🧸 {peluche.name}</span>
                  <span className="font-medium text-charcoal">{peluche.price}€</span>
                </div>
              )}
              {chocolats && (
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">🍫 {chocolats.name}</span>
                  <span className="font-medium text-charcoal">{chocolats.price}€</span>
                </div>
              )}
              {wrapping.price > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">🎁 {wrapping.label}</span>
                  <span className="font-medium text-charcoal">+{wrapping.price}€</span>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex justify-between text-sm text-charcoal/60">
                  <span>Sous-total</span>
                  <span>{subtotal + wrapping.price}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">Livraison</span>
                  <span className={delivery === 0 ? 'text-green-600 font-medium' : 'text-charcoal'}>
                    {delivery === 0 ? 'Offerte' : `${delivery}€`}
                  </span>
                </div>
                {delivery === 0 && (
                  <p className="text-[11px] text-green-600">
                    ✓ Livraison offerte dès 65€ d&apos;achat
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-gray-100 pt-3 flex items-baseline justify-between">
                <span className="font-semibold text-charcoal">Total TTC</span>
                <span className="font-display text-2xl font-bold text-charcoal">
                  {(orderTotal).toFixed(2).replace('.', ',')}€
                </span>
              </div>

              {/* Promo code */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Code promo"
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pivoine transition-colors"
                  aria-label="Code promo"
                />
                <button className="px-4 py-2 bg-gray-100 hover:bg-blush text-charcoal hover:text-pivoine rounded-xl text-sm font-medium transition-colors">
                  Appliquer
                </button>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setOrdered(true)}
                className="w-full btn-pivoine justify-center mt-2 text-base py-3.5"
                aria-label={`Commander le coffret pour ${orderTotal.toFixed(2)}€`}
              >
                <ShoppingBag size={18} />
                Commander — {orderTotal.toFixed(2).replace('.', ',')}€
              </button>

              {/* Pay methods */}
              <div className="flex items-center justify-center gap-2 pt-1" aria-label="Paiements acceptés">
                {['VISA', 'MC', 'AMEX', '🍎 Pay', 'G Pay'].map(m => (
                  <span key={m} className="text-[10px] font-bold text-charcoal/35 bg-gray-100 rounded px-1.5 py-0.5">
                    {m}
                  </span>
                ))}
              </div>

              <p className="text-center text-[11px] text-charcoal/35">
                🔒 Paiement 100% sécurisé via Stripe
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="flex pt-6 mt-4 border-t border-gray-100">
        <button
          onClick={() => setStep(4)}
          className="flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <ArrowLeft size={15} /> Retour à la personnalisation
        </button>
      </div>
    </div>
  )
}
