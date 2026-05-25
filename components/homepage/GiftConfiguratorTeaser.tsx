'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Flower2, PackageOpen, ChevronRight, Sparkles } from 'lucide-react'

const STEPS = [
  {
    icon: <Flower2   size={26} className="text-pivoine" />,
    step: '01',
    label: 'Choisir un bouquet',
    desc:  'Parmi nos créations fraîches du jour',
    color: '#FFF0F5',
  },
  {
    icon: <span className="text-2xl" aria-hidden="true">🧸</span>,
    step: '02',
    label: 'Ajouter une peluche',
    desc:  'De la S à la XXL — en option',
    color: '#F5F0FF',
  },
  {
    icon: <span className="text-2xl" aria-hidden="true">🍫</span>,
    step: '03',
    label: 'Sélectionner des chocolats',
    desc:  'Ganaches, pralinés, assortiments',
    color: '#FFF8F0',
  },
  {
    icon: <PackageOpen size={26} className="text-gold" />,
    step: '04',
    label: 'Personnaliser & commander',
    desc:  'Message, ruban, emballage cadeau',
    color: '#FFFBF0',
  },
]

const PREVIEW_ITEMS = [
  { name: 'Bouquet Romantique',  price: 45, img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=120&q=70&auto=format' },
  { name: 'Peluche Ours XXL',    price: 38, img: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=120&q=70&auto=format' },
  { name: 'Assortiment Chocolat',price: 24, img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=120&q=70&auto=format' },
]

export default function GiftConfiguratorTeaser() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('[data-reveal]').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % STEPS.length), 2500)
    return () => clearInterval(t)
  }, [])

  const total = PREVIEW_ITEMS.reduce((a, b) => a + b.price, 0)

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-gradient-to-br from-pivoine-900 via-pivoine-800 to-pivoine-700 relative overflow-hidden"
      aria-labelledby="configurator-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Heading + Steps */}
          <div>
            <div data-reveal className="section-reveal mb-10">
              <p className="text-shimmer font-accent italic text-lg mb-2 tracking-wide">
                Notre outil phare
              </p>
              <h2
                id="configurator-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight"
              >
                Créez votre
                <br />
                <span className="italic">coffret unique</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed mt-4 max-w-md">
                En 4 étapes simples, composez un cadeau personnalisé qui
                ne ressemble qu&apos;à vous. Aperçu en temps réel, prix mis à jour instantanément.
              </p>
            </div>

            {/* Steps */}
            <ol className="space-y-3">
              {STEPS.map((s, i) => (
                <li
                  key={s.step}
                  data-reveal
                  className={`section-reveal flex items-center gap-4 p-4 rounded-2xl transition-all duration-400 cursor-pointer ${
                    activeStep === i
                      ? 'bg-white/15 scale-[1.02] shadow-gold'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveStep(i)}
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/40 text-[11px] font-mono font-semibold tracking-widest mb-0.5">
                      ÉTAPE {s.step}
                    </p>
                    <p className="text-white font-semibold text-sm leading-tight">{s.label}</p>
                    <p className="text-white/55 text-xs mt-0.5">{s.desc}</p>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`text-white/40 transition-opacity ${activeStep === i ? 'opacity-100' : 'opacity-0'}`}
                  />
                </li>
              ))}
            </ol>

            {/* CTA */}
            <div data-reveal className="section-reveal mt-8">
              <Link href="/configurateur" className="btn-pivoine bg-white text-pivoine hover:bg-white/90 shadow-gold-hover">
                <Sparkles size={18} />
                Commencer mon coffret
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right — Live preview card */}
          <div data-reveal className="section-reveal flex justify-center lg:justify-end">
            <div className="bg-white rounded-3xl shadow-soft-xl p-6 w-full max-w-sm">

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="font-display text-lg font-semibold text-charcoal">Mon Coffret</p>
                  <p className="text-charcoal/50 text-xs mt-0.5">Aperçu en temps réel</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-5">
                {PREVIEW_ITEMS.map((item, i) => (
                  <div
                    key={item.name}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                      activeStep === i ? 'border-pivoine/30 bg-blush' : 'border-gray-100 bg-gray-50/50'
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url('${item.img}')` }}
                      role="img"
                      aria-label={item.name}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">{item.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, s) => (
                          <svg key={s} className="w-3 h-3 fill-gold" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-pivoine flex-shrink-0">{item.price}€</p>
                  </div>
                ))}
              </div>

              {/* Message card preview */}
              <div className="border border-dashed border-gold/50 rounded-xl p-3 mb-5 bg-amber-50/50">
                <p className="text-[11px] text-charcoal/50 font-medium mb-1 uppercase tracking-wider">Message carte</p>
                <p className="text-sm text-charcoal/70 font-accent italic">
                  &ldquo;Je t&apos;offre ce moment de douceur avec tout mon amour...&rdquo;
                </p>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-charcoal/50">Total coffret</p>
                  <p className="font-display text-2xl font-semibold text-charcoal">{total}€</p>
                </div>
                <Link
                  href="/configurateur"
                  className="bg-gradient-pivoine text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity shadow-card"
                >
                  Commander
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
