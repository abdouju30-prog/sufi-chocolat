'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, ArrowRight, Zap, TrendingUp, Sparkles } from 'lucide-react'

const PRODUCTS = [
  {
    id: 1,
    name:     'Bouquet Signature Rosa',
    category: 'Bouquets',
    price:    55,
    oldPrice: 68,
    rating:   4.9,
    reviews:  312,
    badge:    { label: '⚡ Bestseller', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    image:    'https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=600&q=80&auto=format',
    tag:      'Nouveauté',
    inStock:  true,
    stockLeft: null,
  },
  {
    id: 2,
    name:     'Ours Géant Caramel 80cm',
    category: 'Peluches',
    price:    49,
    oldPrice: null,
    rating:   4.8,
    reviews:  198,
    badge:    { label: '💝 Populaire', color: 'text-pivoine bg-blush border-pivoine/20' },
    image:    'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&q=80&auto=format',
    tag:      null,
    inStock:  true,
    stockLeft: 4,
  },
  {
    id: 3,
    name:     'Coffret Ganaches Maison',
    category: 'Chocolats',
    price:    32,
    oldPrice: 38,
    rating:   5.0,
    reviews:  421,
    badge:    { label: '✨ Coup de cœur', color: 'text-purple-700 bg-purple-50 border-purple-200' },
    image:    'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80&auto=format',
    tag:      null,
    inStock:  true,
    stockLeft: null,
  },
  {
    id: 4,
    name:     'Bouquet Pivoine & Roses',
    category: 'Bouquets',
    price:    72,
    oldPrice: null,
    rating:   4.9,
    reviews:  156,
    badge:    { label: '🌸 Exclusif', color: 'text-rose-700 bg-rose-50 border-rose-200' },
    image:    'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=600&q=80&auto=format',
    tag:      'Édition limitée',
    inStock:  true,
    stockLeft: 7,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Note : ${rating} sur 5`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-gold text-gold' : 'fill-gray-200 text-gray-200'}`} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function BestSellers() {
  const sectionRef = useRef<HTMLElement>(null)
  const [wishlisted, setWishlisted] = useState<Set<number>>(new Set())
  const [added, setAdded] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('[data-reveal]').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
        }
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleWishlist = (id: number) => {
    setWishlisted(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleAddToCart = (id: number) => {
    setAdded(prev => new Set(prev).add(id))
    setTimeout(() => setAdded(prev => { const n = new Set(prev); n.delete(id); return n }), 2000)
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-cream"
      aria-labelledby="bestsellers-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div data-reveal className="section-reveal">
            <p className="text-pivoine font-accent italic text-lg mb-1 tracking-wide">
              Les plus appréciés
            </p>
            <h2
              id="bestsellers-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight"
            >
              Coups de Cœur
            </h2>
          </div>

          <Link
            href="/boutique"
            data-reveal
            className="section-reveal inline-flex items-center gap-2 text-pivoine text-sm font-semibold hover:gap-3 transition-all duration-200"
          >
            Voir toute la boutique <ArrowRight size={16} />
          </Link>
        </div>

        {/* Tabs */}
        <div data-reveal className="section-reveal flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
          {['Tous', 'Bouquets', 'Peluches', 'Chocolats', 'Coffrets'].map((tab) => (
            <button
              key={tab}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                tab === 'Tous'
                  ? 'bg-pivoine text-white border-pivoine'
                  : 'bg-white text-charcoal/70 border-gray-200 hover:border-pivoine hover:text-pivoine'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {PRODUCTS.map((product, i) => (
            <article
              key={product.id}
              data-reveal
              className="section-reveal product-card bg-white rounded-2xl overflow-hidden group"
              style={{ transitionDelay: `${i * 80}ms` }}
              aria-label={product.name}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
                  style={{ backgroundImage: `url('${product.image}')`, transform: 'scale(1.01)' }}
                  role="img"
                  aria-label={product.name}
                />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  {/* Product badge */}
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${product.badge.color}`}>
                    {product.badge.label}
                  </span>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={wishlisted.has(product.id) ? 'Retirer de la liste de souhaits' : 'Ajouter à la liste de souhaits'}
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:scale-110 transition-transform duration-200"
                  >
                    <Heart
                      size={15}
                      className={wishlisted.has(product.id) ? 'fill-pivoine text-pivoine' : 'text-charcoal/60'}
                    />
                  </button>
                </div>

                {/* Tag */}
                {product.tag && (
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-charcoal/80 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                      {product.tag}
                    </span>
                  </div>
                )}

                {/* Stock warning */}
                {product.stockLeft && product.stockLeft <= 5 && (
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      Plus que {product.stockLeft}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-[11px] text-charcoal/45 font-medium uppercase tracking-wider mb-1">
                  {product.category}
                </p>

                <h3 className="font-semibold text-charcoal text-sm leading-snug mb-2 line-clamp-2">
                  <Link href={`/produit/${product.id}`} className="hover:text-pivoine transition-colors">
                    {product.name}
                  </Link>
                </h3>

                <div className="flex items-center gap-1.5 mb-3">
                  <StarRating rating={product.rating} />
                  <span className="text-[11px] text-charcoal/50">({product.reviews})</span>
                </div>

                {/* Price + Cart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-lg font-semibold text-charcoal">
                      {product.price}€
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-charcoal/40 line-through">
                        {product.oldPrice}€
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product.id)}
                    aria-label={`Ajouter ${product.name} au panier`}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      added.has(product.id)
                        ? 'bg-green-500 text-white scale-110'
                        : 'bg-blush text-pivoine hover:bg-pivoine hover:text-white hover:scale-105'
                    }`}
                  >
                    {added.has(product.id) ? (
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <ShoppingBag size={15} />
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12" data-reveal>
          <div className="section-reveal inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-card border border-blush">
            <div className="flex items-center gap-2 text-charcoal/70 text-sm">
              <TrendingUp size={16} className="text-pivoine" />
              <span>Plus de <strong className="text-charcoal">150 produits</strong> disponibles</span>
            </div>
            <div className="w-px h-5 bg-gray-200 hidden sm:block" />
            <Link href="/boutique" className="btn-pivoine text-sm py-2 px-5">
              Explorer la boutique <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
