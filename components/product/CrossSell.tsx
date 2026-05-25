'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Plus, Check, ArrowRight } from 'lucide-react'

const CROSS_SELL = [
  {
    id: 10,
    name:     'Ours Caramel 80cm',
    category: 'Peluches',
    price:    49,
    rating:   4.8,
    reviews:  198,
    image:    'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&q=75&auto=format',
    tag:      '🧸 Parfait avec ce bouquet',
  },
  {
    id: 11,
    name:     'Coffret Ganaches Maison',
    category: 'Chocolats',
    price:    32,
    rating:   5.0,
    reviews:  421,
    image:    'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=75&auto=format',
    tag:      '🍫 Le duo idéal',
  },
  {
    id: 12,
    name:     'Bouquet Pivoine & Roses',
    category: 'Bouquets',
    price:    72,
    rating:   4.9,
    reviews:  156,
    image:    'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&q=75&auto=format',
    tag:      '✨ Dans la même gamme',
  },
]

export default function CrossSell() {
  const [added, setAdded] = useState<Set<number>>(new Set())

  const handleAdd = (id: number) => {
    setAdded(prev => new Set(prev).add(id))
    setTimeout(() => setAdded(prev => { const n = new Set(prev); n.delete(id); return n }), 2000)
  }

  return (
    <section className="bg-cream py-16 lg:py-20" aria-labelledby="crosssell-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-pivoine font-accent italic text-base mb-1">À associer</p>
            <h2
              id="crosssell-heading"
              className="font-display text-2xl sm:text-3xl font-semibold text-charcoal"
            >
              Complétez votre cadeau
            </h2>
          </div>
          <Link
            href="/boutique"
            className="hidden sm:flex items-center gap-1.5 text-pivoine text-sm font-semibold hover:gap-2.5 transition-all duration-200"
          >
            Voir tout <ArrowRight size={15} />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CROSS_SELL.map(product => (
            <article
              key={product.id}
              className="product-card bg-white rounded-2xl overflow-hidden group"
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-108"
                  style={{ backgroundImage: `url('${product.image}')`, transform: 'scale(1.01)' }}
                  role="img"
                  aria-label={product.name}
                />
                {/* Tag */}
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-charcoal text-xs font-semibold px-3 py-1.5 rounded-full">
                    {product.tag}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-[11px] text-charcoal/45 font-medium uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <h3 className="font-semibold text-charcoal text-sm mb-2">
                  <Link href={`/produit/${product.id}`} className="hover:text-pivoine transition-colors">
                    {product.name}
                  </Link>
                </h3>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-gold' : 'fill-gray-200'}`} viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-[11px] text-charcoal/50 ml-1">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-semibold text-charcoal">{product.price}€</span>
                  <button
                    onClick={() => handleAdd(product.id)}
                    aria-label={added.has(product.id) ? `${product.name} ajouté` : `Ajouter ${product.name}`}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full transition-all duration-300 ${
                      added.has(product.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-blush text-pivoine hover:bg-pivoine hover:text-white'
                    }`}
                  >
                    {added.has(product.id)
                      ? <><Check size={13} /> Ajouté</>
                      : <><Plus  size={13} /> Ajouter</>
                    }
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bundle CTA */}
        <div className="mt-8 bg-white rounded-2xl border border-pivoine/15 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-charcoal text-sm">
              Créez un coffret complet → Bouquet + Peluche + Chocolats
            </p>
            <p className="text-charcoal/55 text-xs mt-0.5">
              Économisez 10% sur l&apos;ensemble avec notre configurateur
            </p>
          </div>
          <Link
            href="/configurateur"
            className="btn-pivoine text-sm py-2.5 px-5 flex-shrink-0"
          >
            <ShoppingBag size={15} />
            Composer le coffret
          </Link>
        </div>
      </div>
    </section>
  )
}
