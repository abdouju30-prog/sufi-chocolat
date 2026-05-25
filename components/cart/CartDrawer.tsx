'use client'

import Link from 'next/link'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Gift } from 'lucide-react'
import { useCart } from './CartContext'
import { useState } from 'react'

const DELIVERY_THRESHOLD = 65

export default function CartDrawer() {
  const { items, totalItems, totalPrice, drawerOpen, closeDrawer, removeItem, updateQty } = useCart()
  const [promoCode,    setPromoCode]    = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError,   setPromoError]   = useState('')

  const discount     = promoApplied ? Math.round(totalPrice * 0.1) : 0
  const finalPrice   = totalPrice - discount
  const deliveryFree = finalPrice >= DELIVERY_THRESHOLD
  const toFreeShip   = DELIVERY_THRESHOLD - finalPrice
  const progress     = Math.min((finalPrice / DELIVERY_THRESHOLD) * 100, 100)

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SUFI10') {
      setPromoApplied(true); setPromoError('')
    } else {
      setPromoError('Code invalide ou déjà utilisé.')
    }
  }

  if (!drawerOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-50 flex flex-col shadow-2xl animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label="Votre panier"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-pivoine" aria-hidden="true" />
            <h2 className="font-display text-lg font-semibold text-charcoal">
              Mon panier
            </h2>
            {totalItems > 0 && (
              <span className="bg-pivoine text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Fermer le panier"
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        {/* Free shipping progress */}
        {totalItems > 0 && (
          <div className="px-5 py-3 bg-cream border-b border-blush">
            {deliveryFree ? (
              <p className="text-xs font-semibold text-green-600 flex items-center gap-1.5">
                <span aria-hidden="true">✓</span> Livraison offerte débloquée !
              </p>
            ) : (
              <>
                <p className="text-xs text-charcoal/60 mb-2">
                  Plus que <strong className="text-charcoal">{toFreeShip.toFixed(0)}€</strong> pour la livraison gratuite
                </p>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-pivoine rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                    role="progressbar"
                    aria-valuenow={Math.round(progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center pb-10">
              <div className="w-20 h-20 bg-blush rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-pivoine/40" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-charcoal mb-1">
                  Votre panier est vide
                </p>
                <p className="text-sm text-charcoal/50">
                  Découvrez nos créations et ajoutez vos favoris.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-[240px]">
                <Link href="/boutique" onClick={closeDrawer} className="btn-pivoine justify-center py-3">
                  Explorer la boutique
                </Link>
                <Link
                  href="/configurateur"
                  onClick={closeDrawer}
                  className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-full py-3 text-sm font-semibold text-charcoal hover:border-pivoine hover:text-pivoine transition-all"
                >
                  <Gift size={14} aria-hidden="true" />
                  Créer un coffret
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-4" aria-label="Articles dans le panier">
              {items.map(item => (
                <li key={item.id} className="flex gap-3">
                  {/* Image */}
                  <Link href={`/produit/${item.slug}`} onClick={closeDrawer} className="flex-shrink-0">
                    <div
                      className="w-18 h-18 w-[72px] h-[72px] rounded-xl bg-cover bg-center border border-gray-100"
                      style={{ backgroundImage: `url('${item.image}')` }}
                      role="img"
                      aria-label={item.name}
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-charcoal/40 font-medium uppercase tracking-wider capitalize">
                      {item.category}
                    </p>
                    <Link
                      href={`/produit/${item.slug}`}
                      onClick={closeDrawer}
                      className="text-sm font-semibold text-charcoal hover:text-pivoine transition-colors line-clamp-2 leading-snug"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm font-bold text-charcoal mt-1">
                      {(item.price * item.quantity).toFixed(2).replace('.', ',')}€
                    </p>
                  </div>

                  {/* Qty + remove */}
                  <div className="flex flex-col items-end justify-between flex-shrink-0 gap-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Supprimer ${item.name}`}
                      className="text-charcoal/25 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={13} aria-hidden="true" />
                    </button>

                    <div className="flex items-center gap-0.5 border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        aria-label="Diminuer la quantité"
                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors text-charcoal/60"
                      >
                        <Minus size={11} aria-hidden="true" />
                      </button>
                      <span className="text-xs font-bold text-charcoal w-5 text-center" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        aria-label="Augmenter la quantité"
                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors text-charcoal/60"
                      >
                        <Plus size={11} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-4 bg-white">

            {/* Promo */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/35" aria-hidden="true" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoError(''); setPromoApplied(false) }}
                  placeholder="Code promo"
                  className={`w-full pl-8 pr-3 py-2 border rounded-xl text-xs outline-none transition-colors ${
                    promoApplied ? 'border-green-400 bg-green-50' : promoError ? 'border-red-300' : 'border-gray-200 focus:border-pivoine'
                  }`}
                  aria-label="Code promo"
                  aria-invalid={!!promoError}
                />
              </div>
              <button
                onClick={applyPromo}
                disabled={!promoCode.trim() || promoApplied}
                className="px-3 py-2 bg-charcoal text-white rounded-xl text-xs font-semibold hover:bg-pivoine transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                OK
              </button>
            </div>
            {promoError   && <p role="alert" className="text-red-500 text-xs -mt-2">{promoError}</p>}
            {promoApplied && <p className="text-green-600 text-xs -mt-2 font-medium">✓ SUFI10 — −10% appliqué</p>}

            {/* Price summary */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-charcoal/60">
                <span>Sous-total</span>
                <span>{totalPrice.toFixed(2).replace('.', ',')}€</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-sm text-green-600 font-medium">
                  <span>Réduction SUFI10</span>
                  <span>−{discount}€</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-charcoal/60">
                <span>Livraison</span>
                {deliveryFree
                  ? <span className="text-green-600 font-medium">Offerte</span>
                  : <span>4,90€</span>
                }
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-100">
                <span className="font-semibold text-charcoal">Total</span>
                <span className="font-display text-xl font-bold text-charcoal">
                  {(finalPrice + (deliveryFree ? 0 : 4.9)).toFixed(2).replace('.', ',')}€
                </span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="btn-pivoine w-full justify-center py-3.5 text-base"
            >
              Commander <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <Link
              href="/boutique"
              onClick={closeDrawer}
              className="block text-center text-xs text-charcoal/40 hover:text-pivoine transition-colors"
            >
              Continuer mes achats
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
