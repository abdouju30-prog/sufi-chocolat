'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Truck, Sparkles } from 'lucide-react'

const PETALS = [
  { left: '8%',  animClass: 'petal-1', size: 14, delay: '0s',   drift: '60px',  rotation: '600deg' },
  { left: '22%', animClass: 'petal-2', size: 10, delay: '2.5s', drift: '-50px', rotation: '720deg' },
  { left: '38%', animClass: 'petal-3', size: 16, delay: '4s',   drift: '90px',  rotation: '500deg' },
  { left: '55%', animClass: 'petal-4', size: 11, delay: '1s',   drift: '-70px', rotation: '800deg' },
  { left: '70%', animClass: 'petal-5', size: 13, delay: '3s',   drift: '55px',  rotation: '650deg' },
  { left: '84%', animClass: 'petal-1', size: 9,  delay: '5s',   drift: '-40px', rotation: '700deg' },
  { left: '94%', animClass: 'petal-3', size: 12, delay: '1.5s', drift: '75px',  rotation: '550deg' },
]

function PetalSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 12 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 0C6 0 0 5 0 10C0 13.3 2.7 16 6 16C9.3 16 12 13.3 12 10C12 5 6 0 6 0Z"
        fill="rgba(181,39,92,0.6)"
      />
      <path
        d="M6 16C6 16 6 17 6 18"
        stroke="rgba(181,39,92,0.4)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('[data-reveal]').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 150)
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
      className="relative min-h-[92dvh] flex items-center overflow-hidden"
      aria-label="Bienvenue chez Sufi Chocolat"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=1800&q=85&auto=format')`,
        }}
        role="img"
        aria-label="Composition florale luxueuse"
      />

      {/* Gradient overlay — deeper at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/50 to-charcoal/80" />

      {/* Warm pink tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-pivoine/20 via-transparent to-transparent" />

      {/* Falling petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {PETALS.map((p, i) => (
          <span
            key={i}
            className={`petal animate-${p.animClass}`}
            style={{
              left: p.left,
              animationDelay: p.delay,
              '--petal-drift': p.drift,
              '--petal-rotation': p.rotation,
            } as React.CSSProperties}
          >
            <PetalSVG size={p.size} />
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="max-w-3xl">

          {/* Live badge */}
          <div
            data-reveal
            className="section-reveal inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-white text-sm font-medium">
              Livraison aujourd&apos;hui disponible
            </span>
          </div>

          {/* Main headline */}
          <h1
            data-reveal
            className="section-reveal font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.08] tracking-tight mb-4"
          >
            Offrez ce qui
            <br />
            <span className="italic font-medium">reste gravé</span>
          </h1>

          {/* Sub-tagline */}
          <p
            data-reveal
            className="section-reveal font-accent text-xl sm:text-2xl italic text-white/80 mb-3 tracking-wide"
          >
            Bouquets fraîchement coupés
            <span className="mx-2 text-gold opacity-80">·</span>
            Peluches XXL
            <span className="mx-2 text-gold opacity-80">·</span>
            Chocolats artisanaux
          </p>

          {/* Description */}
          <p
            data-reveal
            className="section-reveal text-white/70 text-base sm:text-lg max-w-xl leading-relaxed mb-10"
          >
            Des cadeaux pensés pour émouvoir. Composez votre coffret unique
            ou choisissez parmi nos créations signature, livrées avec soin le jour même.
          </p>

          {/* CTA buttons */}
          <div
            data-reveal
            className="section-reveal flex flex-col sm:flex-row gap-3"
          >
            <Link href="/configurateur" className="btn-pivoine shadow-gold">
              <Sparkles size={18} />
              Composer mon cadeau
              <ArrowRight size={16} className="ml-1" />
            </Link>

            <Link href="/boutique" className="btn-outline">
              Voir les collections
            </Link>
          </div>

          {/* Trust mini-badges */}
          <div
            data-reveal
            className="section-reveal flex flex-wrap gap-4 mt-10"
          >
            {[
              { icon: '🌸', text: 'Fleurs coupées ce matin' },
              { icon: '🍫', text: 'Chocolat fait main' },
              { icon: <Truck size={14} />, text: 'Livraison J+0' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5"
              >
                <span className="text-white/90 text-sm flex items-center">{item.icon}</span>
                <span className="text-white/85 text-xs font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-float"
        aria-hidden="true"
      >
        <span className="text-white/50 text-[11px] font-medium tracking-widest uppercase">Découvrir</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}
