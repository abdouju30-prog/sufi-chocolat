'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Zap, Star, ChevronDown, ChevronUp, Minus, Plus, Check, Truck, RefreshCcw } from 'lucide-react'

const SIZES = [
  { label: 'S',   desc: '20–25 tiges',  price: 35,  id: 's'   },
  { label: 'M',   desc: '30–40 tiges',  price: 55,  id: 'm'   },
  { label: 'L',   desc: '50–60 tiges',  price: 75,  id: 'l'   },
  { label: 'XXL', desc: '80+ tiges',    price: 110, id: 'xxl' },
]

const RECENT_BUYERS = [
  'https://i.pravatar.cc/32?img=44',
  'https://i.pravatar.cc/32?img=12',
  'https://i.pravatar.cc/32?img=67',
]

export default function ProductInfo() {
  const [selectedSize, setSelectedSize]   = useState('m')
  const [qty,          setQty]            = useState(1)
  const [expanded,     setExpanded]       = useState(false)
  const [addedToCart,  setAddedToCart]    = useState(false)

  const currentSize  = SIZES.find(s => s.id === selectedSize)!
  const totalPrice   = currentSize.price * qty
  const oldPrice     = Math.round(currentSize.price * 1.2)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <div>

      {/* Category */}
      <p className="text-pivoine text-xs font-semibold uppercase tracking-widest mb-2">
        Bouquets de Fleurs
      </p>

      {/* Product name */}
      <h1 className="font-display text-3xl lg:text-4xl font-semibold text-charcoal leading-tight mb-3">
        Bouquet Signature Rosa
      </h1>

      {/* Rating row */}
      <div className="flex items-center flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5" aria-label="Note : 4.9 sur 5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-gold text-gold" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="font-semibold text-charcoal text-sm">4.9</span>
          <a href="#avis" className="text-charcoal/50 text-sm hover:text-pivoine transition-colors">
            (312 avis)
          </a>
        </div>

        <div className="w-px h-4 bg-gray-200" aria-hidden="true" />

        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1.5" aria-hidden="true">
            {RECENT_BUYERS.map((src, i) => (
              <img key={i} src={src} alt="" width={22} height={22} className="w-5 h-5 rounded-full border border-white object-cover" />
            ))}
          </div>
          <span className="text-charcoal/55 text-xs">
            <strong className="text-charcoal">48 personnes</strong> l&apos;ont offert cette semaine
          </span>
        </div>
      </div>

      {/* Short description */}
      <div className="mb-5">
        <p className="text-charcoal/70 text-[15px] leading-relaxed">
          Une création florale emblématique mêlant roses de jardin, pivoines saisonnières
          et feuillage délicat. Chaque bouquet est assemblé à la main par nos fleuristes
          le matin de la livraison pour une fraîcheur maximale.
        </p>
        {expanded && (
          <p className="text-charcoal/70 text-[15px] leading-relaxed mt-2">
            Les fleurs sont sourcées auprès de producteurs locaux et européens engagés
            dans une démarche durable. L&apos;emballage utilise du papier kraft recyclé
            et une ficelle naturelle. Durée de vie moyenne : 7 à 10 jours avec eau fraîche.
          </p>
        )}
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1 text-pivoine text-sm font-medium mt-2 hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? (
            <><ChevronUp size={14} /> Voir moins</>
          ) : (
            <><ChevronDown size={14} /> Lire plus</>
          )}
        </button>
      </div>

      {/* Size selector */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-sm font-semibold text-charcoal">
            Taille du bouquet
          </label>
          <span className="text-xs text-charcoal/50">
            Actuellement : <strong className="text-charcoal">{currentSize.label} — {currentSize.desc}</strong>
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Choisissez une taille">
          {SIZES.map(size => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size.id)}
              role="radio"
              aria-checked={selectedSize === size.id}
              className={`relative flex flex-col items-center py-3 px-2 rounded-xl border-2 transition-all duration-200 ${
                selectedSize === size.id
                  ? 'border-pivoine bg-blush text-pivoine'
                  : 'border-gray-200 hover:border-pivoine/40 text-charcoal'
              }`}
            >
              <span className="font-bold text-sm">{size.label}</span>
              <span className="text-[11px] mt-0.5 opacity-70">{size.desc}</span>
              <span className="text-xs font-semibold mt-1">{size.price}€</span>
              {selectedSize === size.id && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-pivoine rounded-full flex items-center justify-center" aria-hidden="true">
                  <Check size={9} className="text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-display text-4xl font-bold text-charcoal">
          {totalPrice}€
        </span>
        <span className="text-lg text-charcoal/35 line-through">{Math.round(oldPrice * qty)}€</span>
        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
          –17% {qty > 1 ? `× ${qty}` : ''}
        </span>
      </div>

      {/* Qty + Add to cart */}
      <div className="flex items-center gap-3 mb-4">
        {/* Quantity stepper */}
        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden h-12">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            aria-label="Diminuer la quantité"
            disabled={qty === 1}
            className="w-12 h-12 flex items-center justify-center text-charcoal hover:bg-blush disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={16} />
          </button>
          <span
            className="w-10 text-center font-semibold text-charcoal text-sm"
            aria-live="polite"
            aria-label={`Quantité : ${qty}`}
          >
            {qty}
          </span>
          <button
            onClick={() => setQty(q => Math.min(10, q + 1))}
            aria-label="Augmenter la quantité"
            disabled={qty === 10}
            className="w-12 h-12 flex items-center justify-center text-charcoal hover:bg-blush disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className={`flex-1 h-12 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            addedToCart
              ? 'bg-green-500 text-white shadow-none'
              : 'bg-gradient-pivoine text-white shadow-gold hover:shadow-gold-hover hover:-translate-y-0.5'
          }`}
          aria-label={addedToCart ? 'Ajouté au panier' : 'Ajouter au panier'}
        >
          {addedToCart ? (
            <><Check size={18} /> Ajouté au panier</>
          ) : (
            <><ShoppingBag size={18} /> Ajouter au panier</>
          )}
        </button>
      </div>

      {/* Express buy */}
      <button
        className="w-full h-12 rounded-full border-2 border-charcoal/15 text-charcoal font-semibold text-sm flex items-center justify-center gap-2 hover:border-pivoine hover:text-pivoine transition-all duration-200 mb-5"
        aria-label="Acheter maintenant via paiement rapide"
      >
        <Zap size={16} className="text-gold" />
        Acheter maintenant — paiement express
      </button>

      {/* Delivery info strip */}
      <div className="bg-cream rounded-2xl p-4 space-y-2.5">
        <div className="flex items-start gap-2.5">
          <Truck size={16} className="text-pivoine mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-charcoal">
              Livraison aujourd&apos;hui si commande avant 14h
            </p>
            <p className="text-xs text-charcoal/55 mt-0.5">
              Livraison express disponible · Frais calculés au checkout
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <RefreshCcw size={16} className="text-pivoine mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-charcoal">Satisfait ou remboursé</p>
            <p className="text-xs text-charcoal/55 mt-0.5">
              Fleurs abîmées à la livraison ? Remplacement gratuit garanti.
            </p>
          </div>
        </div>
      </div>

      {/* Stock urgency */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: '72%' }} aria-hidden="true" />
        </div>
        <p className="text-xs text-orange-600 font-semibold whitespace-nowrap">
          🔥 Plus que 7 disponibles
        </p>
      </div>
    </div>
  )
}
