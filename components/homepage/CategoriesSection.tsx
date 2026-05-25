'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const CATEGORIES = [
  {
    title:       'Bouquets de Fleurs',
    subtitle:    'Coupées ce matin',
    description: 'Des compositions florales créées par nos fleuristes, avec des fleurs saisonnières sélectionnées pour leur fraîcheur et leur beauté.',
    badge:       '🌸 Fraîcheur garantie 7 jours',
    href:        '/boutique/bouquets',
    count:       '48 créations',
    image:       'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80&auto=format',
    accent:      '#B5275C',
    bg:          '#FFF0F5',
  },
  {
    title:       'Peluches XXL',
    subtitle:    'Douceur garantie',
    description: 'Des peluches géantes ultra-douces, parfaites pour exprimer votre affection. Du petit nounours aux géants de 120 cm.',
    badge:       '🧸 Livraison emballage soigné',
    href:        '/boutique/peluches',
    count:       '32 modèles',
    image:       'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80&auto=format',
    accent:      '#8B6CB3',
    bg:          '#F5F0FF',
  },
  {
    title:       'Chocolats Artisanaux',
    subtitle:    'Fait main chaque jour',
    description: 'Nos maîtres chocolatiers créent des ganaches et pralinés d'exception à partir de cacao d'origine, pour des émotions gustatives uniques.',
    badge:       '🍫 Recettes exclusives maison',
    href:        '/boutique/chocolats',
    count:       '24 créations',
    image:       'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80&auto=format',
    accent:      '#8B5E3C',
    bg:          '#FFF8F0',
  },
]

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('[data-reveal]').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120)
          })
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="categories-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14" data-reveal>
          <p className="text-pivoine font-accent italic text-lg mb-2 tracking-wide section-reveal">
            Nos univers
          </p>
          <h2
            id="categories-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight section-reveal"
          >
            Trois façons d&apos;émouvoir
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CATEGORIES.map((cat, i) => (
            <article
              key={cat.title}
              data-reveal
              className="section-reveal group rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 bg-white"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                  role="img"
                  aria-label={cat.title}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Count badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-charcoal">
                  {cat.count}
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-4 left-4">
                  <p className="text-white/80 text-sm font-medium italic font-accent">{cat.subtitle}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6" style={{ backgroundColor: cat.bg }}>
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-4"
                  style={{ backgroundColor: `${cat.accent}18`, color: cat.accent }}
                >
                  {cat.badge}
                </div>

                <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                  {cat.title}
                </h3>

                <p className="text-charcoal/65 text-sm leading-relaxed mb-5">
                  {cat.description}
                </p>

                <Link
                  href={cat.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group/link"
                  style={{ color: cat.accent }}
                  aria-label={`Voir les ${cat.title.toLowerCase()}`}
                >
                  Découvrir la collection
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
