'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const OCCASIONS = [
  { label: 'Anniversaire',    emoji: '🎂', href: '/occasions/anniversaire',    bg: '#FFF0F5', border: '#FFCFE0' },
  { label: 'Saint-Valentin',  emoji: '💝', href: '/occasions/saint-valentin',  bg: '#FFF5F0', border: '#FFCFB8' },
  { label: 'Fête des Mères',  emoji: '👑', href: '/occasions/fete-des-meres',  bg: '#F5F0FF', border: '#D8BFFF' },
  { label: 'Mariage',         emoji: '💍', href: '/occasions/mariage',         bg: '#FFFBF0', border: '#FFE9A0' },
  { label: 'Naissance',       emoji: '🍼', href: '/occasions/naissance',       bg: '#F0FFF8', border: '#A8F0CC' },
  { label: 'Félicitations',   emoji: '🥂', href: '/occasions/felicitations',   bg: '#FFFDF0', border: '#FFE9A0' },
  { label: 'Je t\'aime',      emoji: '🌹', href: '/occasions/je-t-aime',       bg: '#FFF0F5', border: '#FFB3CC' },
  { label: 'Désolé',          emoji: '🕊️', href: '/occasions/desole',          bg: '#F0F8FF', border: '#B3D9FF' },
]

export default function OccasionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('[data-reveal]').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 60)
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
      className="py-16 lg:py-20 bg-cream"
      aria-labelledby="occasions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div data-reveal className="section-reveal">
            <p className="text-pivoine font-accent italic text-lg mb-1 tracking-wide">Pour chaque moment</p>
            <h2
              id="occasions-heading"
              className="font-display text-3xl lg:text-4xl font-semibold text-charcoal leading-tight"
            >
              Trouvez le cadeau
              <br className="hidden sm:block" /> parfait
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Précédent"
              className="w-9 h-9 rounded-full border border-pivoine/20 flex items-center justify-center text-pivoine hover:bg-pivoine hover:text-white transition-colors duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Suivant"
              className="w-9 h-9 rounded-full border border-pivoine/20 flex items-center justify-center text-pivoine hover:bg-pivoine hover:text-white transition-colors duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
          role="list"
          aria-label="Occasions cadeaux"
        >
          {OCCASIONS.map((occ, i) => (
            <Link
              key={occ.label}
              href={occ.href}
              role="listitem"
              data-reveal
              className="section-reveal flex-shrink-0 flex flex-col items-center gap-3 px-5 py-4 rounded-2xl border hover:shadow-card transition-all duration-300 hover:-translate-y-1 group min-w-[110px]"
              style={{ backgroundColor: occ.bg, borderColor: occ.border }}
              style={{ backgroundColor: occ.bg, borderColor: occ.border, ['--index' as string]: i } as React.CSSProperties}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200" role="img" aria-label={occ.label}>
                {occ.emoji}
              </span>
              <span className="text-charcoal text-xs font-semibold text-center leading-tight whitespace-nowrap">
                {occ.label}
              </span>
            </Link>
          ))}

          {/* Voir tout */}
          <Link
            href="/occasions"
            className="flex-shrink-0 flex flex-col items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-dashed border-pivoine/30 hover:border-pivoine hover:bg-blush transition-all duration-300 min-w-[110px] text-pivoine group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">✨</span>
            <span className="text-xs font-semibold text-center whitespace-nowrap">Voir tout</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
