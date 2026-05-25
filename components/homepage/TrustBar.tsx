'use client'

import { useEffect, useRef } from 'react'
import { Leaf, HandHeart, Truck, Star } from 'lucide-react'

const TRUST_ITEMS = [
  {
    icon: <Leaf   size={22} className="text-pivoine" />,
    title: 'Fleurs fraîches',
    desc:  'Coupées le matin même, livrées en pleine floraison',
  },
  {
    icon: <HandHeart size={22} className="text-pivoine" />,
    title: 'Fait à la main',
    desc:  'Chocolats et bouquets préparés par nos artisans',
  },
  {
    icon: <Truck  size={22} className="text-pivoine" />,
    title: 'Livraison J+0',
    desc:  'Commandez avant 14h, livré aujourd\'hui dans votre ville',
  },
  {
    icon: <Star   size={22} className="text-gold fill-gold" />,
    title: '4.9 / 5 étoiles',
    desc:  'Plus de 2 000 clients enchantés depuis 2019',
  },
]

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.querySelectorAll('[data-reveal]').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="bg-blush border-y border-pivoine/10 py-8"
      aria-label="Nos engagements"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={i}
              data-reveal
              className="section-reveal flex flex-col sm:flex-row items-start sm:items-center gap-3 group"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-white shadow-card flex items-center justify-center group-hover:shadow-card-hover transition-shadow duration-300">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-charcoal text-sm leading-tight">{item.title}</p>
                <p className="text-charcoal/60 text-xs leading-snug mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
