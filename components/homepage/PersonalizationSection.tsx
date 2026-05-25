'use client'

import { useEffect, useRef, useState } from 'react'
import { Pencil, Ribbon, Gift, Check } from 'lucide-react'

const RIBBON_COLORS = [
  { name: 'Rose Pivoine',  value: '#B5275C' },
  { name: 'Or',           value: '#C9A84C' },
  { name: 'Bordeaux',     value: '#7B1F35' },
  { name: 'Blanc Crème',  value: '#F7F4F0', border: '#D1C5BB' },
  { name: 'Bleu Nuit',    value: '#1E3A5F' },
  { name: 'Vert Sauge',   value: '#6B8E7B' },
]

const WRAPPING_OPTIONS = [
  { label: 'Standard',     price: 0,  desc: 'Papier kraft recyclé & ruban' },
  { label: 'Premium',      price: 3,  desc: 'Boîte cartonnée + papier de soie' },
  { label: 'Luxe',         price: 8,  desc: 'Boîte magnétique veloutée + faveur' },
]

export default function PersonalizationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedColor,    setSelectedColor]    = useState(0)
  const [selectedWrapping, setSelectedWrapping] = useState(0)
  const [message,          setMessage]          = useState("Je t'offre ce moment de douceur avec tout mon amour ✨")
  const maxChars = 160

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

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white overflow-hidden"
      aria-labelledby="perso-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — Visual preview */}
          <div data-reveal className="section-reveal order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-sm">

              {/* Main card — message preview */}
              <div className="bg-cream rounded-3xl p-8 shadow-soft-xl border border-blush relative z-10 animate-float">
                {/* Header */}
                <div className="flex items-center gap-2 mb-5">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: RIBBON_COLORS[selectedColor].value }}
                  />
                  <p className="text-charcoal/40 text-xs font-semibold uppercase tracking-widest">
                    Carte message
                  </p>
                </div>

                {/* Sufi logo mini */}
                <div className="flex items-center gap-1.5 mb-6">
                  <svg width="20" height="20" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                    <circle cx="18" cy="18" r="17" fill="#FDF2F6" stroke="#B5275C" strokeWidth="1.5"/>
                    <path d="M18 8C18 8 14 12 14 16C14 18.2 15.8 20 18 20C20.2 20 22 18.2 22 16C22 12 18 8 18 8Z" fill="#B5275C"/>
                  </svg>
                  <span className="font-display text-sm font-semibold text-pivoine">Sufi Chocolat</span>
                </div>

                {/* Message */}
                <p
                  className="font-accent italic text-charcoal text-lg leading-relaxed min-h-[80px]"
                  style={{ color: '#2D1B1B' }}
                >
                  &ldquo;{message}&rdquo;
                </p>

                {/* Signature line */}
                <div
                  className="mt-6 pt-4 border-t"
                  style={{ borderColor: `${RIBBON_COLORS[selectedColor].value}30` }}
                >
                  <div
                    className="h-0.5 w-16 rounded-full mb-2"
                    style={{ backgroundColor: RIBBON_COLORS[selectedColor].value }}
                  />
                  <p className="text-charcoal/50 text-xs">Avec affection</p>
                </div>
              </div>

              {/* Ribbon decoration */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 blur-xl"
                style={{ backgroundColor: RIBBON_COLORS[selectedColor].value }}
                aria-hidden="true"
              />

              {/* Wrapping badge */}
              <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl shadow-card border border-blush px-4 py-3 z-20 animate-float-slow">
                <div className="flex items-center gap-2">
                  <Gift size={16} className="text-gold" />
                  <div>
                    <p className="text-[10px] text-charcoal/50 font-medium">Emballage</p>
                    <p className="text-xs font-semibold text-charcoal">{WRAPPING_OPTIONS[selectedWrapping].label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Options */}
          <div className="order-1 lg:order-2 space-y-8">
            <div data-reveal className="section-reveal">
              <p className="text-pivoine font-accent italic text-lg mb-1 tracking-wide">
                Rendez-le unique
              </p>
              <h2
                id="perso-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight"
              >
                Personnalisez
                <br />
                chaque détail
              </h2>
              <p className="text-charcoal/65 text-base leading-relaxed mt-4">
                Un cadeau devient inoubliable quand il porte votre empreinte.
                Rédigez votre message, choisissez votre ruban, sélectionnez l&apos;emballage.
              </p>
            </div>

            {/* Message */}
            <div data-reveal className="section-reveal">
              <label
                htmlFor="message-perso"
                className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-2"
              >
                <Pencil size={14} className="text-pivoine" />
                Message carte personnalisé
              </label>
              <div className="relative">
                <textarea
                  id="message-perso"
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
                  rows={3}
                  className="w-full border border-gray-200 focus:border-pivoine rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/35 resize-none outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Écrivez votre message ici..."
                  aria-describedby="message-count"
                />
                <p
                  id="message-count"
                  className={`absolute bottom-2 right-3 text-[11px] font-medium ${
                    message.length > maxChars * 0.9 ? 'text-orange-500' : 'text-charcoal/35'
                  }`}
                >
                  {message.length}/{maxChars}
                </p>
              </div>
            </div>

            {/* Ribbon color */}
            <div data-reveal className="section-reveal">
              <p className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3">
                <Ribbon size={14} className="text-pivoine" />
                Couleur du ruban
                <span className="ml-auto text-charcoal/50 font-normal">{RIBBON_COLORS[selectedColor].name}</span>
              </p>
              <div className="flex flex-wrap gap-2.5" role="group" aria-label="Choisissez une couleur de ruban">
                {RIBBON_COLORS.map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(i)}
                    aria-label={color.name}
                    aria-pressed={selectedColor === i}
                    className={`relative w-9 h-9 rounded-full transition-all duration-200 ${
                      selectedColor === i ? 'ring-2 ring-offset-2 ring-pivoine scale-110' : 'hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: color.value,
                      border: color.border ? `1.5px solid ${color.border}` : 'none',
                    }}
                  >
                    {selectedColor === i && (
                      <Check
                        size={14}
                        className="absolute inset-0 m-auto"
                        style={{ color: i === 3 ? '#6B6B6B' : 'white' }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Wrapping */}
            <div data-reveal className="section-reveal">
              <p className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3">
                <Gift size={14} className="text-pivoine" />
                Type d&apos;emballage
              </p>
              <div className="space-y-2" role="radiogroup" aria-label="Type d'emballage">
                {WRAPPING_OPTIONS.map((opt, i) => (
                  <label
                    key={opt.label}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedWrapping === i
                        ? 'border-pivoine bg-blush'
                        : 'border-gray-200 hover:border-pivoine/40 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="wrapping"
                        value={opt.label}
                        checked={selectedWrapping === i}
                        onChange={() => setSelectedWrapping(i)}
                        className="w-4 h-4 accent-pivoine"
                      />
                      <div>
                        <p className="text-sm font-semibold text-charcoal">{opt.label}</p>
                        <p className="text-xs text-charcoal/55">{opt.desc}</p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-semibold ml-4 ${opt.price === 0 ? 'text-green-600' : 'text-charcoal'}`}
                    >
                      {opt.price === 0 ? 'Offert' : `+${opt.price}€`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
