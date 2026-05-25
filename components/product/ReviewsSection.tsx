'use client'

import { useState } from 'react'
import { Filter, ThumbsUp, Camera, Check } from 'lucide-react'

const REVIEWS = [
  {
    id: 1, name: 'Sophie M.',  avatar: 'https://i.pravatar.cc/60?img=44', rating: 5, date: '18 mai 2025',
    title: 'Absolument parfait !',
    text: 'Le bouquet est arrivé frais, bien emballé et encore plus beau qu\'en photo. J\'ai commandé en taille L et c\'est impressionnant. Ma mère était aux larmes. Le message sur la carte était impeccablement rédigé. Je recommande sans hésiter.',
    tag: 'Taille L', helpful: 24, verified: true, photos: ['https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=120&q=70'],
  },
  {
    id: 2, name: 'Karim B.',  avatar: 'https://i.pravatar.cc/60?img=67', rating: 5, date: '12 mai 2025',
    title: 'Livraison parfaite, fleurs magnifiques',
    text: 'Commande le matin à 10h, livraison à 15h le même jour. Les roses sentent divinement bon et les pivoines sont en pleine floraison. Service client très réactif quand j\'ai eu une question. Parfait de A à Z.',
    tag: 'Taille M', helpful: 18, verified: true, photos: [],
  },
  {
    id: 3, name: 'Laura D.',  avatar: 'https://i.pravatar.cc/60?img=12', rating: 5, date: '5 mai 2025',
    title: 'Le cadeau idéal pour une anniversaire',
    text: 'J\'ai ajouté le coffret chocolats et la peluche ours. L\'ensemble était SUBLIME. La personne qui a reçu était tellement émue. L\'emballage luxe valait vraiment les 8€ en plus, c\'était vraiment du haut de gamme.',
    tag: 'Taille XXL', helpful: 31, verified: true, photos: ['https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=120&q=70', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=120&q=70'],
  },
  {
    id: 4, name: 'Nadia F.',  avatar: 'https://i.pravatar.cc/60?img=29', rating: 4, date: '28 avr. 2025',
    title: 'Très beau, légèrement déçue par un détail',
    text: 'Le bouquet est magnifique et les fleurs étaient très fraîches. Une seule petite déception : une tige de gypsophile était un peu cassée à l\'arrivée. J\'ai contacté le service client qui m\'a proposé un avoir immédiatement. Très réactifs !',
    tag: 'Taille M', helpful: 9, verified: true, photos: [],
  },
]

const FILTERS = ['Tous', '5 étoiles', '4 étoiles', 'Avec photos', 'Vérifié']
const SORTS   = ['Les plus récents', 'Les plus utiles', 'Note : plus haute', 'Note : plus basse']

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'fill-gold text-gold' : 'fill-gray-200 text-gray-200'}`} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [sortBy,       setSortBy]       = useState(SORTS[0])
  const [helpful,      setHelpful]      = useState<Set<number>>(new Set())

  const toggleHelpful = (id: number) => {
    setHelpful(prev => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  return (
    <section id="avis" className="py-16 lg:py-20 bg-white" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2
            id="reviews-heading"
            className="font-display text-2xl sm:text-3xl font-semibold text-charcoal"
          >
            Avis clients
            <span className="ml-3 font-body text-base font-normal text-charcoal/50">(312)</span>
          </h2>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-charcoal/50" aria-hidden="true" />
            <label htmlFor="sort-reviews" className="sr-only">Trier les avis</label>
            <select
              id="sort-reviews"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-charcoal outline-none focus:border-pivoine bg-gray-50"
            >
              {SORTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filtrer les avis">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-pivoine text-white border-pivoine'
                  : 'bg-white text-charcoal/70 border-gray-200 hover:border-pivoine hover:text-pivoine'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Review list */}
        <div className="space-y-5">
          {REVIEWS.map(review => (
            <article
              key={review.id}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-5 lg:p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                {/* Reviewer info */}
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={`Photo de ${review.name}`}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-charcoal">{review.name}</p>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-[11px] text-green-600 font-medium">
                          <Check size={11} /> Achat vérifié
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarDisplay rating={review.rating} />
                      <span className="text-xs text-charcoal/45">{review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Tag */}
                <span className="flex-shrink-0 bg-white border border-gray-200 text-xs font-medium text-charcoal/60 px-2.5 py-1 rounded-full">
                  {review.tag}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-semibold text-charcoal text-sm mb-1.5">{review.title}</h3>
              <p className="text-charcoal/70 text-sm leading-relaxed">{review.text}</p>

              {/* Photos */}
              {review.photos.length > 0 && (
                <div className="flex gap-2 mt-4">
                  {review.photos.map((photo, i) => (
                    <button
                      key={i}
                      className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 hover:border-pivoine transition-colors group"
                      aria-label={`Photo ${i + 1} de l'avis`}
                    >
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundImage: `url('${photo}')` }}
                      />
                    </button>
                  ))}
                  <div className="flex items-center text-xs text-charcoal/45 gap-1 ml-1">
                    <Camera size={13} aria-hidden="true" />
                    {review.photos.length} photo{review.photos.length > 1 ? 's' : ''}
                  </div>
                </div>
              )}

              {/* Helpful */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                <button
                  onClick={() => toggleHelpful(review.id)}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                    helpful.has(review.id) ? 'text-pivoine' : 'text-charcoal/50 hover:text-pivoine'
                  }`}
                  aria-pressed={helpful.has(review.id)}
                >
                  <ThumbsUp size={13} />
                  Utile ({review.helpful + (helpful.has(review.id) ? 1 : 0)})
                </button>
                <p className="text-[11px] text-charcoal/35">Signaler</p>
              </div>
            </article>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-8">
          <button className="border-2 border-gray-200 text-charcoal rounded-full px-8 py-3 text-sm font-semibold hover:border-pivoine hover:text-pivoine transition-all duration-200">
            Charger plus d&apos;avis (308 restants)
          </button>
        </div>

        {/* Write review CTA */}
        <div className="mt-10 bg-cream rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-blush">
          <div>
            <p className="font-semibold text-charcoal">Vous avez acheté ce produit ?</p>
            <p className="text-sm text-charcoal/60 mt-0.5">Partagez votre expérience pour aider les autres acheteurs.</p>
          </div>
          <button className="btn-pivoine text-sm py-2.5 px-6 flex-shrink-0">
            Laisser un avis
          </button>
        </div>
      </div>
    </section>
  )
}
