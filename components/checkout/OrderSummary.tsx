'use client'

import { useState } from 'react'
import { Tag, ChevronDown, ChevronUp, Lock } from 'lucide-react'

const CART_ITEMS = [
  {
    name:     'Bouquet Signature Rosa — M',
    category: 'Bouquet',
    price:    55,
    image:    'https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=120&q=70&auto=format',
  },
  {
    name:     'Ours Caramel Grand — 80cm',
    category: 'Peluche',
    price:    49,
    image:    'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=120&q=70&auto=format',
  },
  {
    name:     'Coffret Ganaches Maison',
    category: 'Chocolats',
    price:    24,
    image:    'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=120&q=70&auto=format',
  },
]

const SUBTOTAL  = CART_ITEMS.reduce((a, b) => a + b.price, 0)
const DELIVERY  = SUBTOTAL >= 65 ? 0 : 4.9
const TOTAL     = SUBTOTAL + DELIVERY

export default function OrderSummary({ compact = false }: { compact?: boolean }) {
  const [open,        setOpen]       = useState(!compact)
  const [promoCode,   setPromoCode]  = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError,   setPromoError]   = useState('')
  const discount = promoApplied ? Math.round(TOTAL * 0.1) : 0

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SUFI10') {
      setPromoApplied(true); setPromoError('')
    } else {
      setPromoError('Code invalide ou déjà utilisé.')
    }
  }

  return (
    <aside
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card"
      aria-label="Résumé de commande"
    >
      {/* Header — collapsible on mobile */}
      <button
        className="w-full flex items-center justify-between px-5 py-4 bg-cream hover:bg-blush transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="order-summary-panel"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-charcoal">Résumé de commande</span>
          <span className="bg-pivoine text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {CART_ITEMS.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-bold text-charcoal">
            {(TOTAL - discount).toFixed(2).replace('.', ',')}€
          </span>
          {open ? <ChevronUp size={16} className="text-charcoal/50" /> : <ChevronDown size={16} className="text-charcoal/50" />}
        </div>
      </button>

      {open && (
        <div id="order-summary-panel" className="px-5 pb-5 pt-3 space-y-4">

          {/* Items */}
          <ul className="space-y-3" aria-label="Articles commandés">
            {CART_ITEMS.map(item => (
              <li key={item.name} className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-xl bg-cover bg-center border border-gray-100"
                    style={{ backgroundImage: `url('${item.image}')` }}
                    role="img"
                    aria-label={item.name}
                  />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-pivoine text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    1
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-charcoal/45 font-medium">{item.category}</p>
                  <p className="text-sm font-medium text-charcoal leading-snug">{item.name}</p>
                </div>
                <p className="text-sm font-semibold text-charcoal flex-shrink-0">{item.price}€</p>
              </li>
            ))}
          </ul>

          {/* Promo code */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/35" aria-hidden="true" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoError(''); setPromoApplied(false) }}
                  placeholder="Code promo"
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-xl text-sm outline-none transition-colors ${
                    promoApplied
                      ? 'border-green-400 bg-green-50'
                      : promoError
                        ? 'border-red-300'
                        : 'border-gray-200 focus:border-pivoine'
                  }`}
                  aria-label="Code promo"
                  aria-describedby={promoError ? 'promo-error' : promoApplied ? 'promo-success' : undefined}
                  aria-invalid={!!promoError}
                />
              </div>
              <button
                onClick={applyPromo}
                disabled={!promoCode.trim() || promoApplied}
                className="px-4 py-2.5 bg-charcoal text-white rounded-xl text-sm font-semibold hover:bg-pivoine transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Appliquer
              </button>
            </div>
            {promoError && (
              <p id="promo-error" role="alert" className="text-red-500 text-xs mt-1.5">{promoError}</p>
            )}
            {promoApplied && (
              <p id="promo-success" className="text-green-600 text-xs mt-1.5 font-medium">
                ✓ Code SUFI10 appliqué — −10% sur votre commande
              </p>
            )}
          </div>

          {/* Price breakdown */}
          <div className="space-y-2 pt-1 border-t border-gray-100">
            <div className="flex justify-between text-sm text-charcoal/65">
              <span>Sous-total</span>
              <span>{SUBTOTAL}€</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>Réduction (SUFI10 –10%)</span>
                <span>–{discount}€</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-charcoal/65">
              <span>Livraison</span>
              {DELIVERY === 0
                ? <span className="text-green-600 font-medium">Offerte</span>
                : <span>{DELIVERY}€</span>
              }
            </div>
            {DELIVERY === 0 && (
              <p className="text-green-600 text-[11px]">✓ Livraison offerte dès 65€</p>
            )}

            {/* Total */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="font-semibold text-charcoal">Total TTC</span>
              <div className="text-right">
                <p className="font-display text-2xl font-bold text-charcoal leading-none">
                  {(TOTAL - discount).toFixed(2).replace('.', ',')}€
                </p>
                <p className="text-[11px] text-charcoal/40 mt-0.5">TVA incluse</p>
              </div>
            </div>
          </div>

          {/* Secure payment badge */}
          <div className="flex items-center justify-center gap-2 pt-2 text-charcoal/40">
            <Lock size={12} aria-hidden="true" />
            <span className="text-[11px]">Paiement 100% sécurisé via Stripe</span>
          </div>
        </div>
      )}
    </aside>
  )
}
