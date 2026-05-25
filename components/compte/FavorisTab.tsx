'use client'

import { useState } from 'react'
import { Heart, ShoppingBag, Trash2, Star } from 'lucide-react'

const WISHLIST = [
  {
    id: 1,
    name:     'Bouquet Pivoine Éternel — XL',
    category: 'Bouquet',
    price:    89,
    rating:   4.9,
    reviews:  138,
    badge:    'Best-seller',
    image:    'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=300&q=70&auto=format',
  },
  {
    id: 2,
    name:     'Coffret Truffes Noir & Blanc',
    category: 'Chocolats',
    price:    38,
    rating:   4.8,
    reviews:  72,
    badge:    null,
    image:    'https://images.unsplash.com/photo-1606312619070-d48b6b4c8365?w=300&q=70&auto=format',
  },
  {
    id: 3,
    name:     'Ours Rose Géant — 1m',
    category: 'Peluche',
    price:    129,
    rating:   4.7,
    reviews:  54,
    badge:    'Coup de cœur',
    image:    'https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=300&q=70&auto=format',
  },
  {
    id: 4,
    name:     'Bouquet Blanc Élégance — M',
    category: 'Bouquet',
    price:    55,
    rating:   4.6,
    reviews:  91,
    badge:    null,
    image:    'https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=300&q=70&auto=format',
  },
]

export default function FavorisTab() {
  const [items, setItems] = useState(WISHLIST)
  const [added, setAdded] = useState<Set<number>>(new Set())

  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id))

  const addToCart = (id: number) => {
    setAdded(prev => new Set(prev).add(id))
    setTimeout(() => setAdded(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    }), 2200)
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="w-16 h-16 bg-blush rounded-full flex items-center justify-center">
          <Heart size={28} className="text-pivoine/40" aria-hidden="true" />
        </div>
        <p className="font-display text-xl font-semibold text-charcoal">Votre liste est vide</p>
        <p className="text-sm text-charcoal/50 max-w-xs">
          Ajoutez des produits à vos favoris depuis la boutique pour les retrouver ici.
        </p>
        <a href="/boutique" className="btn-pivoine text-sm py-2.5 px-6 mt-2">
          Explorer la boutique
        </a>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-charcoal/50 mb-5">
        {items.length} article{items.length > 1 ? 's' : ''} sauvegardé{items.length > 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group"
          >
            {/* Image */}
            <div className="relative h-44 bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: `url('${item.image}')` }}
              role="img"
              aria-label={item.name}
            >
              {item.badge && (
                <span className="absolute top-3 left-3 text-[10px] font-bold bg-pivoine text-white px-2.5 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
              <button
                onClick={() => remove(item.id)}
                aria-label={`Retirer ${item.name} des favoris`}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
              >
                <Trash2 size={13} className="text-red-400" aria-hidden="true" />
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-[10px] text-charcoal/40 font-medium uppercase tracking-wider mb-1">{item.category}</p>
              <p className="text-sm font-semibold text-charcoal leading-snug mb-2">{item.name}</p>

              <div className="flex items-center gap-1.5 mb-3">
                <Star size={11} className="text-gold fill-gold" aria-hidden="true" />
                <span className="text-xs font-semibold text-charcoal">{item.rating}</span>
                <span className="text-xs text-charcoal/40">({item.reviews})</span>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-display text-lg font-bold text-charcoal">{item.price}€</p>
                <button
                  onClick={() => addToCart(item.id)}
                  aria-label={added.has(item.id) ? 'Ajouté au panier' : `Ajouter ${item.name} au panier`}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border-2 transition-all ${
                    added.has(item.id)
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-pivoine text-pivoine hover:bg-pivoine hover:text-white'
                  }`}
                >
                  <ShoppingBag size={12} aria-hidden="true" />
                  {added.has(item.id) ? 'Ajouté !' : 'Ajouter'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
