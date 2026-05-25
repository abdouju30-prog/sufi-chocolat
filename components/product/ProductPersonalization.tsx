'use client'

import { useState } from 'react'
import { Pencil, Ribbon, Gift, CalendarDays, Clock, ChevronDown, ChevronUp, Check } from 'lucide-react'

const RIBBON_COLORS = [
  { name: 'Rose Pivoine',  value: '#B5275C' },
  { name: 'Or Chaud',      value: '#C9A84C' },
  { name: 'Bordeaux',      value: '#7B1F35' },
  { name: 'Blanc Crème',   value: '#F7F4F0', border: '#D1C5BB' },
  { name: 'Bleu Nuit',     value: '#1E3A5F' },
  { name: 'Vert Sauge',    value: '#6B8E7B' },
]

const WRAPPING = [
  { id: 'standard', label: 'Standard',  price: 0,  desc: 'Papier kraft recyclé & ruban' },
  { id: 'premium',  label: 'Premium',   price: 3,  desc: 'Boîte cartonnée + papier de soie' },
  { id: 'luxe',     label: 'Luxe',      price: 8,  desc: 'Boîte magnétique veloutée + faveur' },
]

const SLOTS = ['Matin (8h–12h)', 'Après-midi (12h–18h)', 'Express (+4€)']

const NEXT_DAYS = Array.from({ length: 7 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  return {
    date:  d.toISOString().split('T')[0],
    label: i === 0 ? 'Aujourd\'hui' : i === 1 ? 'Demain' : d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }),
    short: i === 0 ? "Auj." : i === 1 ? "Dem." : d.toLocaleDateString('fr-FR', { weekday: 'short' }),
    day:   i === 0 ? "Auj." : d.toLocaleDateString('fr-FR', { day: 'numeric' }),
  }
})

export default function ProductPersonalization() {
  const [open,          setOpen]          = useState(true)
  const [message,       setMessage]       = useState('')
  const [ribbonColor,   setRibbonColor]   = useState(0)
  const [wrapping,      setWrapping]      = useState('standard')
  const [selectedDate,  setSelectedDate]  = useState(NEXT_DAYS[0].date)
  const [selectedSlot,  setSelectedSlot]  = useState(SLOTS[0])
  const maxChars = 160

  const wrappingExtra = WRAPPING.find(w => w.id === wrapping)?.price ?? 0
  const slotExtra = selectedSlot.includes('Express') ? 4 : 0

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">

      {/* Header toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-cream hover:bg-blush transition-colors"
        aria-expanded={open}
        aria-controls="personalization-panel"
      >
        <div className="flex items-center gap-2">
          <Pencil size={16} className="text-pivoine" aria-hidden="true" />
          <span className="font-semibold text-sm text-charcoal">Personnaliser ce cadeau</span>
          <span className="bg-pivoine/10 text-pivoine text-[11px] font-bold px-2 py-0.5 rounded-full">
            Optionnel
          </span>
        </div>
        {open
          ? <ChevronUp   size={16} className="text-charcoal/50" />
          : <ChevronDown size={16} className="text-charcoal/50" />
        }
      </button>

      {/* Panel */}
      {open && (
        <div id="personalization-panel" className="px-5 py-5 space-y-6 bg-white">

          {/* Message */}
          <div>
            <label
              htmlFor="product-message"
              className="flex items-center gap-1.5 text-sm font-semibold text-charcoal mb-2"
            >
              <Pencil size={13} className="text-pivoine" aria-hidden="true" />
              Message sur la carte
            </label>
            <div className="relative">
              <textarea
                id="product-message"
                value={message}
                onChange={e => setMessage(e.target.value.slice(0, maxChars))}
                rows={3}
                placeholder="Ex : Joyeux anniversaire ! Je t'aime fort…"
                className="w-full border border-gray-200 focus:border-pivoine rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/35 resize-none outline-none transition-colors bg-gray-50 focus:bg-white"
                aria-describedby="message-count-product"
              />
              <p
                id="message-count-product"
                className={`absolute bottom-2.5 right-3 text-[11px] font-medium ${
                  message.length > maxChars * 0.9 ? 'text-orange-500' : 'text-charcoal/35'
                }`}
              >
                {message.length}/{maxChars}
              </p>
            </div>
            {message.length === 0 && (
              <p className="text-xs text-charcoal/45 mt-1.5">
                Laissez vide pour un bon de livraison sans message.
              </p>
            )}
          </div>

          {/* Ribbon color */}
          <div>
            <p className="flex items-center justify-between text-sm font-semibold text-charcoal mb-2.5">
              <span className="flex items-center gap-1.5">
                <Ribbon size={13} className="text-pivoine" aria-hidden="true" />
                Couleur du ruban
              </span>
              <span className="text-charcoal/50 font-normal text-xs">
                {RIBBON_COLORS[ribbonColor].name}
              </span>
            </p>
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Choisissez une couleur de ruban">
              {RIBBON_COLORS.map((color, i) => (
                <button
                  key={color.name}
                  onClick={() => setRibbonColor(i)}
                  aria-label={color.name}
                  aria-pressed={ribbonColor === i}
                  className={`relative w-9 h-9 rounded-full transition-all duration-200 ${
                    ribbonColor === i ? 'ring-2 ring-offset-2 ring-pivoine scale-110' : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: color.value,
                    border: color.border ? `1.5px solid ${color.border}` : 'none',
                  }}
                >
                  {ribbonColor === i && (
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
          <div>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-charcoal mb-2.5">
              <Gift size={13} className="text-pivoine" aria-hidden="true" />
              Emballage cadeau
            </p>
            <div className="space-y-2" role="radiogroup" aria-label="Type d'emballage">
              {WRAPPING.map(opt => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                    wrapping === opt.id
                      ? 'border-pivoine bg-blush'
                      : 'border-gray-200 hover:border-pivoine/40 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="product-wrapping"
                      value={opt.id}
                      checked={wrapping === opt.id}
                      onChange={() => setWrapping(opt.id)}
                      className="w-4 h-4 accent-pivoine"
                    />
                    <div>
                      <p className="text-sm font-semibold text-charcoal leading-tight">{opt.label}</p>
                      <p className="text-xs text-charcoal/55">{opt.desc}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-bold flex-shrink-0 ml-4 ${opt.price === 0 ? 'text-green-600' : 'text-charcoal'}`}>
                    {opt.price === 0 ? 'Offert' : `+${opt.price}€`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Delivery date */}
          <div>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-charcoal mb-2.5">
              <CalendarDays size={13} className="text-pivoine" aria-hidden="true" />
              Date de livraison souhaitée
            </p>
            <div
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5"
              role="radiogroup"
              aria-label="Choisissez une date de livraison"
            >
              {NEXT_DAYS.map(day => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  role="radio"
                  aria-checked={selectedDate === day.date}
                  className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-xl border-2 text-center transition-all duration-200 min-w-[64px] ${
                    selectedDate === day.date
                      ? 'border-pivoine bg-blush text-pivoine'
                      : 'border-gray-200 hover:border-pivoine/40 text-charcoal'
                  }`}
                >
                  <span className="text-[11px] font-medium opacity-70">{day.short}</span>
                  <span className="font-bold text-sm">{day.day}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery slot */}
          <div>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-charcoal mb-2.5">
              <Clock size={13} className="text-pivoine" aria-hidden="true" />
              Créneau de livraison
            </p>
            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Choisissez un créneau">
              {SLOTS.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  role="radio"
                  aria-checked={selectedSlot === slot}
                  className={`py-2.5 px-2 rounded-xl border-2 text-xs font-semibold text-center transition-all duration-200 ${
                    selectedSlot === slot
                      ? 'border-pivoine bg-blush text-pivoine'
                      : 'border-gray-200 hover:border-pivoine/40 text-charcoal'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Price summary */}
          {(wrappingExtra > 0 || slotExtra > 0) && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
              <p className="text-xs text-amber-800 font-medium">Options supplémentaires</p>
              <p className="text-sm font-bold text-amber-800">
                +{wrappingExtra + slotExtra}€
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
