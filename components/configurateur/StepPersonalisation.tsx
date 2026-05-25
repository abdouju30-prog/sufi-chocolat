'use client'

import { ArrowRight, ArrowLeft, Pencil, Ribbon, Gift, CalendarDays, Clock, Check } from 'lucide-react'
import { useConfigurator } from './ConfiguratorContext'

const RIBBON_COLORS = [
  { name: 'Rose Pivoine', value: '#B5275C' },
  { name: 'Or Chaud',     value: '#C9A84C' },
  { name: 'Bordeaux',     value: '#7B1F35' },
  { name: 'Blanc Crème',  value: '#F7F4F0', border: '#D1C5BB' },
  { name: 'Bleu Nuit',    value: '#1E3A5F' },
  { name: 'Vert Sauge',   value: '#6B8E7B' },
]

const WRAPPING = [
  { id: 'standard' as const, label: 'Standard', price: 0, desc: 'Papier kraft recyclé & ruban', icon: '📦' },
  { id: 'premium'  as const, label: 'Premium',  price: 3, desc: 'Boîte cartonnée + papier de soie', icon: '🎀' },
  { id: 'luxe'     as const, label: 'Luxe',     price: 8, desc: 'Boîte magnétique veloutée + faveur', icon: '✨' },
]

const SLOTS = [
  { id: 'matin',     label: 'Matin',         sub: '8h – 12h',  extra: 0 },
  { id: 'apresmidi', label: 'Après-midi',    sub: '12h – 18h', extra: 0 },
  { id: 'express',   label: 'Express',       sub: '+4€',       extra: 4 },
]

const NEXT_DAYS = Array.from({ length: 7 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  return {
    date:  d.toISOString().split('T')[0],
    label: i === 0 ? 'Aujourd\'hui' : i === 1 ? 'Demain'
      : d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }),
    short: i === 0 ? 'Auj.' : i === 1 ? 'Dem.'
      : d.toLocaleDateString('fr-FR', { weekday: 'short' }),
    day:   i === 0 ? 'Auj.' : d.toLocaleDateString('fr-FR', { day: 'numeric' }),
    available: i !== 6,
  }
})

const MAX_CHARS = 160

export default function StepPersonalisation() {
  const { state, setPersonalization, setStep } = useConfigurator()
  const { personalization: p } = state

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl" aria-hidden="true">✉️</span>
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            Personnalisez votre coffret
          </h2>
        </div>
        <p className="text-charcoal/60 text-sm">
          Chaque détail compte pour rendre ce cadeau inoubliable.
        </p>
      </div>

      <div className="space-y-8">

        {/* ── Message card ── */}
        <div>
          <label
            htmlFor="config-message"
            className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3"
          >
            <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
              <Pencil size={13} className="text-pivoine" aria-hidden="true" />
            </div>
            Message sur la carte
            <span className="text-charcoal/40 font-normal text-xs ml-1">Optionnel</span>
          </label>

          {/* Live card preview */}
          <div className="bg-cream border border-blush rounded-2xl p-5 mb-3 relative overflow-hidden">
            <div className="absolute top-3 right-4 flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: p.ribbonColor }}
                aria-hidden="true"
              />
              <span className="text-[10px] text-charcoal/40 font-semibold uppercase tracking-widest">
                Sufi
              </span>
            </div>
            <p className="font-accent italic text-charcoal text-base leading-relaxed min-h-[52px]">
              {p.message
                ? `"${p.message}"`
                : <span className="text-charcoal/30 not-italic text-sm">Votre message apparaîtra ici…</span>
              }
            </p>
          </div>

          <div className="relative">
            <textarea
              id="config-message"
              value={p.message}
              onChange={e => setPersonalization({ message: e.target.value.slice(0, MAX_CHARS) })}
              rows={3}
              placeholder="Ex : Joyeux anniversaire ! Avec tout mon amour…"
              className="w-full border border-gray-200 focus:border-pivoine rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/35 resize-none outline-none transition-colors bg-gray-50 focus:bg-white"
              aria-describedby="config-char-count"
            />
            <p
              id="config-char-count"
              className={`absolute bottom-2.5 right-3 text-[11px] font-medium ${
                p.message.length > MAX_CHARS * 0.9 ? 'text-orange-500' : 'text-charcoal/35'
              }`}
            >
              {p.message.length}/{MAX_CHARS}
            </p>
          </div>
        </div>

        {/* ── Ribbon color ── */}
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3">
            <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
              <Ribbon size={13} className="text-pivoine" aria-hidden="true" />
            </div>
            Couleur du ruban
            <span className="ml-auto text-charcoal/45 font-normal text-xs">{p.ribbonName}</span>
          </p>

          <div className="flex flex-wrap gap-3" role="group" aria-label="Couleur du ruban">
            {RIBBON_COLORS.map((color, i) => (
              <button
                key={color.name}
                onClick={() => setPersonalization({ ribbonColor: color.value, ribbonName: color.name })}
                aria-label={color.name}
                aria-pressed={p.ribbonColor === color.value}
                className={`relative w-10 h-10 rounded-full transition-all duration-200 ${
                  p.ribbonColor === color.value
                    ? 'ring-2 ring-offset-2 ring-pivoine scale-110'
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: color.value,
                  border: color.border ? `1.5px solid ${color.border}` : 'none',
                }}
              >
                {p.ribbonColor === color.value && (
                  <Check
                    size={15}
                    className="absolute inset-0 m-auto"
                    style={{ color: i === 3 ? '#6B6B6B' : 'white' }}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Wrapping ── */}
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3">
            <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
              <Gift size={13} className="text-pivoine" aria-hidden="true" />
            </div>
            Type d&apos;emballage
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Emballage">
            {WRAPPING.map(opt => (
              <label
                key={opt.id}
                className={`flex flex-col gap-1.5 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  p.wrapping === opt.id
                    ? 'border-pivoine bg-blush'
                    : 'border-gray-200 hover:border-pivoine/40 bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="config-wrapping"
                  value={opt.id}
                  checked={p.wrapping === opt.id}
                  onChange={() => setPersonalization({ wrapping: opt.id })}
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xl" aria-hidden="true">{opt.icon}</span>
                  <span className={`text-sm font-bold ${opt.price === 0 ? 'text-green-600' : 'text-charcoal'}`}>
                    {opt.price === 0 ? 'Offert' : `+${opt.price}€`}
                  </span>
                </div>
                <p className="font-semibold text-sm text-charcoal">{opt.label}</p>
                <p className="text-xs text-charcoal/55">{opt.desc}</p>
                {p.wrapping === opt.id && (
                  <div className="flex items-center gap-1 text-pivoine text-xs font-semibold mt-0.5">
                    <Check size={12} /> Sélectionné
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* ── Delivery date ── */}
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3">
            <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
              <CalendarDays size={13} className="text-pivoine" aria-hidden="true" />
            </div>
            Date de livraison souhaitée
          </p>

          <div
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
            role="radiogroup"
            aria-label="Date de livraison"
          >
            {NEXT_DAYS.map(day => (
              <button
                key={day.date}
                onClick={() => day.available && setPersonalization({ deliveryDate: day.date })}
                role="radio"
                aria-checked={p.deliveryDate === day.date}
                disabled={!day.available}
                className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-4 py-3 rounded-xl border-2 text-center min-w-[68px] transition-all duration-200 ${
                  !day.available
                    ? 'border-gray-100 bg-gray-50 text-charcoal/25 cursor-not-allowed'
                    : p.deliveryDate === day.date
                      ? 'border-pivoine bg-blush text-pivoine'
                      : 'border-gray-200 hover:border-pivoine/40 text-charcoal'
                }`}
              >
                <span className="text-[11px] font-medium opacity-70">{day.short}</span>
                <span className="font-bold text-sm">{day.day}</span>
                {!day.available && <span className="text-[9px] text-charcoal/25">Indispo</span>}
              </button>
            ))}
          </div>
        </div>

        {/* ── Time slot ── */}
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3">
            <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
              <Clock size={13} className="text-pivoine" aria-hidden="true" />
            </div>
            Créneau de livraison
          </p>

          <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Créneau">
            {SLOTS.map(slot => (
              <label
                key={slot.id}
                className={`flex flex-col items-center gap-0.5 py-3 px-2 rounded-xl border-2 cursor-pointer text-center transition-all duration-200 ${
                  p.slot === slot.label
                    ? 'border-pivoine bg-blush text-pivoine'
                    : 'border-gray-200 hover:border-pivoine/40 text-charcoal'
                }`}
              >
                <input
                  type="radio"
                  name="config-slot"
                  value={slot.id}
                  checked={p.slot === slot.label}
                  onChange={() => setPersonalization({ slot: slot.label })}
                  className="sr-only"
                />
                <span className="text-sm font-semibold">{slot.label}</span>
                <span className="text-xs opacity-70">{slot.sub}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between pt-8 mt-4 border-t border-gray-100">
        <button
          onClick={() => setStep(3)}
          className="flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <ArrowLeft size={15} /> Retour
        </button>
        <button onClick={() => setStep(5)} className="btn-pivoine">
          Voir le récapitulatif <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
