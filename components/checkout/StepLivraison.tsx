'use client'

import { useState } from 'react'
import { ArrowRight, MapPin, User, Phone, Mail, Info, Gift, CalendarDays, Clock, AlertCircle } from 'lucide-react'
import { useCheckout, Address } from './CheckoutContext'

const SLOTS = [
  { id: 'matin',     label: 'Matin',      sub: '8h – 12h',  extra: 0 },
  { id: 'apresmidi', label: 'Après-midi', sub: '12h – 18h', extra: 0 },
  { id: 'express',   label: 'Express',    sub: '+4€',        extra: 4 },
]

const NEXT_DAYS = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() + i)
  return {
    date:  d.toISOString().split('T')[0],
    short: i === 0 ? 'Auj.' : i === 1 ? 'Dem.'
      : d.toLocaleDateString('fr-FR', { weekday: 'short' }),
    day:   i === 0 ? 'Auj.' : d.toLocaleDateString('fr-FR', { day: 'numeric' }),
  }
})

type Errors = Partial<Record<keyof Address | 'date' | 'slot', string>>

export default function StepLivraison() {
  const { state: { delivery }, updateDelivery, setStep } = useCheckout()
  const [errors, setErrors] = useState<Errors>({})

  const r = delivery.recipient
  const set = (field: keyof Address, value: string) => {
    updateDelivery({ recipient: { ...r, [field]: value } })
    setErrors(e => { const n = { ...e }; delete n[field as keyof Errors]; return n })
  }

  const validate = () => {
    const e: Errors = {}
    if (!r.firstName.trim())  e.firstName  = 'Prénom requis'
    if (!r.lastName.trim())   e.lastName   = 'Nom requis'
    if (!r.phone.trim())      e.phone      = 'Téléphone requis'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) e.email = 'Email invalide'
    if (!r.street.trim())     e.street     = 'Adresse requise'
    if (!r.city.trim())       e.city       = 'Ville requise'
    if (!/^\d{5}$/.test(r.postalCode)) e.postalCode = 'Code postal invalide (5 chiffres)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validate()) setStep(2) }

  return (
    <div className="space-y-8">

      {/* Section: Destinataire */}
      <fieldset>
        <legend className="flex items-center gap-2 text-base font-semibold text-charcoal mb-4">
          <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
            <User size={14} className="text-pivoine" aria-hidden="true" />
          </div>
          Destinataire du cadeau
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Prénom */}
          <Field
            id="firstName" label="Prénom" required
            value={r.firstName} onChange={v => set('firstName', v)}
            error={errors.firstName} placeholder="Sophie"
          />
          {/* Nom */}
          <Field
            id="lastName" label="Nom" required
            value={r.lastName} onChange={v => set('lastName', v)}
            error={errors.lastName} placeholder="Martin"
          />
          {/* Téléphone */}
          <Field
            id="phone" label="Téléphone" type="tel" required
            value={r.phone} onChange={v => set('phone', v)}
            error={errors.phone} placeholder="06 12 34 56 78"
            autoComplete="tel"
          />
          {/* Email */}
          <Field
            id="email" label="Email de confirmation" type="email" required
            value={r.email} onChange={v => set('email', v)}
            error={errors.email} placeholder="sophie@email.fr"
            autoComplete="email"
          />
        </div>
      </fieldset>

      {/* Section: Adresse */}
      <fieldset>
        <legend className="flex items-center gap-2 text-base font-semibold text-charcoal mb-4">
          <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
            <MapPin size={14} className="text-pivoine" aria-hidden="true" />
          </div>
          Adresse de livraison
        </legend>

        <div className="space-y-4">
          <Field
            id="street" label="Adresse" required
            value={r.street} onChange={v => set('street', v)}
            error={errors.street} placeholder="12 rue des Fleurs"
            autoComplete="street-address"
          />
          <Field
            id="complement" label="Complément d'adresse"
            value={r.complement} onChange={v => set('complement', v)}
            placeholder="Bâtiment B, appartement 3"
            autoComplete="address-line2"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field
              id="postalCode" label="Code postal" required
              value={r.postalCode} onChange={v => set('postalCode', v)}
              error={errors.postalCode} placeholder="75001"
              autoComplete="postal-code" className="sm:col-span-1"
            />
            <Field
              id="city" label="Ville" required
              value={r.city} onChange={v => set('city', v)}
              error={errors.city} placeholder="Paris"
              autoComplete="address-level2" className="sm:col-span-2"
            />
          </div>
          <Field
            id="instructions" label="Instructions de livraison"
            value={r.instructions} onChange={v => set('instructions', v)}
            placeholder="Code d'entrée, étage, digicode…"
            multiline
          />
        </div>
      </fieldset>

      {/* Section: Surprise */}
      <div className="bg-cream rounded-2xl p-5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="mt-0.5">
            <input
              type="checkbox"
              checked={delivery.isSurprise}
              onChange={e => updateDelivery({ isSurprise: e.target.checked })}
              className="w-4 h-4 accent-pivoine rounded"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Gift size={15} className="text-gold" aria-hidden="true" />
              <span className="font-semibold text-sm text-charcoal">
                C&apos;est un cadeau surprise
              </span>
            </div>
            <p className="text-xs text-charcoal/55 mt-1">
              Le bon de livraison n&apos;affichera aucun prix et sera glissé dans
              une enveloppe scellée.
            </p>
          </div>
        </label>
      </div>

      {/* Section: Date + créneau */}
      <fieldset>
        <legend className="flex items-center gap-2 text-base font-semibold text-charcoal mb-4">
          <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
            <CalendarDays size={14} className="text-pivoine" aria-hidden="true" />
          </div>
          Date et créneau de livraison
        </legend>

        {/* Date picker */}
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-4"
          role="radiogroup"
          aria-label="Date de livraison"
        >
          {NEXT_DAYS.map(day => (
            <button
              key={day.date}
              onClick={() => updateDelivery({ date: day.date })}
              role="radio"
              aria-checked={delivery.date === day.date}
              className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-4 py-3 rounded-xl border-2 text-center min-w-[70px] transition-all duration-200 ${
                delivery.date === day.date
                  ? 'border-pivoine bg-blush text-pivoine'
                  : 'border-gray-200 hover:border-pivoine/40 text-charcoal bg-white'
              }`}
            >
              <span className="text-[11px] font-medium opacity-70">{day.short}</span>
              <span className="font-bold text-sm">{day.day}</span>
            </button>
          ))}
        </div>

        {/* Time slot */}
        <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Créneau horaire">
          {SLOTS.map(slot => (
            <label
              key={slot.id}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 cursor-pointer text-center transition-all duration-200 ${
                delivery.slot === slot.label
                  ? 'border-pivoine bg-blush text-pivoine'
                  : 'border-gray-200 hover:border-pivoine/40 text-charcoal bg-white'
              }`}
            >
              <input
                type="radio"
                name="checkout-slot"
                value={slot.id}
                checked={delivery.slot === slot.label}
                onChange={() => updateDelivery({ slot: slot.label })}
                className="sr-only"
              />
              <Clock size={14} className="opacity-60" aria-hidden="true" />
              <span className="text-sm font-semibold">{slot.label}</span>
              <span className="text-xs opacity-60">{slot.sub}</span>
            </label>
          ))}
        </div>

        {delivery.date === NEXT_DAYS[0].date && (
          <div className="mt-3 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
            <Info size={13} className="flex-shrink-0" aria-hidden="true" />
            <p className="text-xs font-medium">
              Livraison aujourd&apos;hui disponible si commande passée avant 14h00.
            </p>
          </div>
        )}
      </fieldset>

      {/* Error summary */}
      {Object.keys(errors).length > 0 && (
        <div
          role="alert"
          className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-4"
        >
          <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-red-700 mb-1">
              Veuillez corriger les champs suivants :
            </p>
            <ul className="list-disc list-inside space-y-0.5">
              {Object.values(errors).map((msg, i) => (
                <li key={i} className="text-xs text-red-600">{msg}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex justify-end pt-2">
        <button onClick={handleNext} className="btn-pivoine text-base py-3.5 px-8">
          Continuer vers le paiement <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}

/* ── Reusable field ── */
interface FieldProps {
  id:           string
  label:        string
  value:        string
  onChange:     (v: string) => void
  required?:    boolean
  type?:        string
  placeholder?: string
  error?:       string
  autoComplete?: string
  multiline?:   boolean
  className?:   string
}

function Field({
  id, label, value, onChange, required, type = 'text',
  placeholder, error, autoComplete, multiline, className = '',
}: FieldProps) {
  const base = `w-full border rounded-xl px-4 py-3 text-sm text-charcoal placeholder-charcoal/35 outline-none transition-colors bg-gray-50 focus:bg-white ${
    error ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-pivoine'
  }`

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-semibold text-charcoal/70 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (obligatoire)</span>}
      </label>
      {multiline ? (
        <textarea
          id={id} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} rows={2}
          className={`${base} resize-none`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          autoComplete={autoComplete}
        />
      ) : (
        <input
          id={id} type={type} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} required={required}
          className={base}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          autoComplete={autoComplete}
        />
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
