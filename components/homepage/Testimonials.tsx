'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name:   'Sophie M.',
    avatar: 'https://i.pravatar.cc/80?img=44',
    rating: 5,
    date:   'Il y a 3 jours',
    text:   "Un bouquet absolument magnifique, livré frais et bien emballé. La peluche géante a fait craquer toute la famille ! Je recommande Sufi les yeux fermés.",
    tag:    'Coffret + Bouquet',
    verified: true,
  },
  {
    name:   'Karim B.',
    avatar: 'https://i.pravatar.cc/80?img=67',
    rating: 5,
    date:   'Il y a 1 semaine',
    text:   "Commande reçue le jour même comme promis. Les chocolats artisanaux sont à tomber par terre — les ganaches sont d'une finesse incroyable. Ma femme était aux anges.",
    tag:    'Chocolats Maison',
    verified: true,
  },
  {
    name:   'Laura D.',
    avatar: 'https://i.pravatar.cc/80?img=12',
    rating: 5,
    date:   'Il y a 2 semaines',
    text:   "Le configurateur est trop bien fait ! J'ai créé un coffret bouquet + ours + chocolats en 5 minutes et le résultat était parfait pour l'anniversaire de ma mère.",
    tag:    'Coffret 3 en 1',
    verified: true,
  },
  {
    name:   'Nadia F.',
    avatar: 'https://i.pravatar.cc/80?img=29',
    rating: 5,
    date:   'Il y a 3 semaines',
    text:   "Qualité premium à prix accessible. Le bouquet Pivoine & Roses est encore plus beau qu'en photo. L'emballage luxe était parfait pour offrir, rien ne manquait.",
    tag:    'Bouquet Pivoine',
    verified: true,
  },
  {
    name:   'Thomas R.',
    avatar: 'https://i.pravatar.cc/80?img=55',
    rating: 5,
    date:   'Il y a 1 mois',
    text:   "Service client réactif, livraison ponctuelle, produits de qualité supérieure. L'ours caramel 80cm est le meilleur achat de l'année pour ma petite. Merci !",
    tag:    'Peluche XXL',
    verified: true,
  },
  {
    name:   'Marie-Claire O.',
    avatar: 'https://i.pravatar.cc/80?img=39',
    rating: 5,
    date:   'Il y a 1 mois',
    text:   "Commande pour la Saint-Valentin : livraison à 10h le matin, fleurs magnifiques, message manuscrit inclus. Mon copain en a eu les larmes aux yeux. Parfait.",
    tag:    'Saint-Valentin',
    verified: true,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-gold text-gold" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const sectionRef  = useRef<HTMLElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const visibleCount = 3

  const maxIndex = REVIEWS.length - visibleCount

  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('[data-reveal]').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80)
          })
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.offsetWidth / visibleCount
      trackRef.current.scrollTo({ left: current * cardWidth, behavior: 'smooth' })
    }
  }, [current])

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-pivoine-900 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div data-reveal className="section-reveal">
            <p className="text-shimmer font-accent italic text-lg mb-2 tracking-wide">
              Ils nous font confiance
            </p>
            <h2
              id="testimonials-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight"
            >
              Ce qu&apos;ils disent
              <br className="hidden sm:block" />
              de nous
            </h2>
          </div>

          {/* Score summary */}
          <div data-reveal className="section-reveal flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-3">
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-white leading-none">4.9</p>
              <div className="flex justify-center mt-1">
                <StarRating rating={5} />
              </div>
              <p className="text-white/55 text-xs mt-1">2 143 avis</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-gold leading-none">98%</p>
              <p className="text-white/55 text-xs mt-1.5">satisfaits</p>
            </div>
          </div>
        </div>

        {/* Reviews carousel */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          aria-label="Témoignages clients"
          role="list"
        >
          {REVIEWS.map((review, i) => (
            <article
              key={i}
              role="listitem"
              data-reveal
              className="section-reveal flex-shrink-0 w-[85vw] sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-14px)] snap-start"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 h-full flex flex-col hover:bg-white/15 transition-colors duration-300">

                {/* Quote icon */}
                <Quote size={28} className="text-gold/60 mb-3 flex-shrink-0" aria-hidden="true" />

                {/* Review text */}
                <p className="font-accent italic text-white/90 text-base leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Tag */}
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/10 text-white/70 rounded-full px-3 py-1 border border-white/10">
                    {review.tag}
                  </span>
                </div>

                {/* Reviewer */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                  <img
                    src={review.avatar}
                    alt={`Photo de ${review.name}`}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-semibold">{review.name}</p>
                      {review.verified && (
                        <span className="text-[10px] text-green-400 font-medium">✓ Vérifié</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarRating rating={review.rating} />
                      <span className="text-white/40 text-[11px]">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Avis précédents"
            className="w-10 h-10 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-1.5" role="tablist" aria-label="Navigation avis">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                role="tab"
                aria-selected={current === i}
                aria-label={`Aller à la page ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  current === i ? 'bg-gold w-6 h-2' : 'bg-white/30 w-2 h-2 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={current === maxIndex}
            aria-label="Avis suivants"
            className="w-10 h-10 rounded-full border border-white/25 text-white flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
