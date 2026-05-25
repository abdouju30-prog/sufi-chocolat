'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, CheckCircle2, Zap } from 'lucide-react'

export interface Product {
  id:        number
  slug:      string
  name:      string
  category:  'bouquets' | 'peluches' | 'chocolats'
  price:     number
  oldPrice?: number
  rating:    number
  reviews:   number
  image:     string
  badge?:    string
  badgeColor?: string
  occasion?: string[]
  isNew?:    boolean
  inStock:   boolean
  sizes?:    string[]
}

export default function ProductCard({ product }: { product: Product }) {
  const [wished,  setWished]  = useState(false)
  const [added,   setAdded]   = useState(false)

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault()
    setWished(v => !v)
  }

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="product-card group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${product.image}')` }}
          role="img"
          aria-label={product.name}
        />

        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="text-[10px] font-bold bg-charcoal text-white px-2.5 py-1 rounded-full">
              Nouveau
            </span>
          )}
          {product.badge && (
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: product.badgeColor ?? '#B5275C', color: '#fff' }}
            >
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="text-[10px] font-bold bg-red-500 text-white px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Express badge */}
        {product.inStock && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full px-2.5 py-1">
            <Zap size={9} aria-hidden="true" />
            J+0 dispo
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWish}
          aria-label={wished ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
        >
          <Heart
            size={14}
            className={wished ? 'fill-pivoine text-pivoine' : 'text-charcoal/50'}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category label */}
        <p className="text-[10px] font-semibold text-charcoal/40 uppercase tracking-widest">
          {product.category === 'bouquets'  ? 'Bouquet'
          : product.category === 'peluches' ? 'Peluche'
          : 'Chocolats'}
        </p>

        <h3 className="text-sm font-semibold text-charcoal leading-snug group-hover:text-pivoine transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5" aria-hidden="true">
            {[1,2,3,4,5].map(n => (
              <Star
                key={n}
                size={10}
                className={n <= Math.round(product.rating) ? 'text-gold fill-gold' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-xs text-charcoal/45">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <p className="font-display text-lg font-bold text-charcoal">{product.price}€</p>
            {product.oldPrice && (
              <p className="text-xs text-charcoal/35 line-through">{product.oldPrice}€</p>
            )}
          </div>

          <button
            onClick={handleCart}
            aria-label={added ? 'Ajouté' : `Ajouter ${product.name} au panier`}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full transition-all duration-200 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-pivoine/10 text-pivoine hover:bg-pivoine hover:text-white'
            }`}
          >
            {added
              ? <><CheckCircle2 size={13} aria-hidden="true" /> Ajouté</>
              : <><ShoppingBag size={13} aria-hidden="true" /> Ajouter</>
            }
          </button>
        </div>
      </div>
    </Link>
  )
}
