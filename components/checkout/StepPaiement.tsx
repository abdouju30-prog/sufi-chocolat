'use client'

import { useState } from 'react'
import { ArrowLeft, Lock, CreditCard, Check, AlertCircle, Info } from 'lucide-react'
import { useCheckout } from './CheckoutContext'

const METHODS = [
  {
    id:    'card'   as const,
    label: 'Carte bancaire',
    icon:  <CreditCard size={18} className="text-charcoal/60" />,
    desc:  'Visa, Mastercard, American Express',
  },
  {
    id:    'apple'  as const,
    label: 'Apple Pay',
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-charcoal/70" aria-hidden="true">
        <path d="M17.05 20.28c-.98.95-2.05.86-3.08.42-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.42C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.53 3.99M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/>
      </svg>
    ),
    desc:  'Paiement rapide avec Touch ID / Face ID',
  },
  {
    id:    'google' as const,
    label: 'Google Pay',
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 10.8v2.4h3.36c-.14.84-.84 2.46-3.36 2.46A3.66 3.66 0 018.34 12a3.66 3.66 0 013.66-3.66c1.08 0 1.8.46 2.22.86l1.52-1.46A5.64 5.64 0 0012 6.36 5.64 5.64 0 006.36 12 5.64 5.64 0 0012 17.64c3.24 0 5.4-2.28 5.4-5.46 0-.36-.04-.64-.08-.94H12v-.44z" fill="#4285F4"/>
      </svg>
    ),
    desc:  'Paiement via votre compte Google',
  },
  {
    id:    'alma'   as const,
    label: 'Payer en 3× sans frais',
    icon:  (
      <span className="text-sm font-black text-[#FA5456] leading-none">alma</span>
    ),
    desc:  '3 × mensualités sans intérêts (dès 100€)',
  },
]

export default function StepPaiement() {
  const { state: { payment }, updatePayment, setStep, placeOrder } = useCheckout()

  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv,    setCardCvv]    = useState('')
  const [cardName,   setCardName]   = useState('')
  const [loading,    setLoading]    = useState(false)
  const [errors,     setErrors]     = useState<Record<string, string>>({})

  const formatCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim()

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  const cardBrand = () => {
    const n = cardNumber.replace(/\s/g, '')
    if (n.startsWith('4'))   return 'VISA'
    if (n.startsWith('5'))   return 'MC'
    if (n.startsWith('34') || n.startsWith('37')) return 'AMEX'
    return null
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (payment.method === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Numéro de carte incomplet'
      if (cardExpiry.length < 5) e.cardExpiry = 'Date invalide'
      if (cardCvv.length < 3)   e.cardCvv    = 'CVV invalide'
      if (!cardName.trim())     e.cardName   = 'Nom requis'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleOrder = async () => {
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    placeOrder()
  }

  return (
    <div className="space-y-8">

      {/* Payment method */}
      <fieldset>
        <legend className="flex items-center gap-2 text-base font-semibold text-charcoal mb-4">
          <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
            <CreditCard size={14} className="text-pivoine" aria-hidden="true" />
          </div>
          Mode de paiement
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Mode de paiement">
          {METHODS.map(m => (
            <label
              key={m.id}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                payment.method === m.id
                  ? 'border-pivoine bg-blush'
                  : 'border-gray-200 hover:border-pivoine/40 bg-white'
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                value={m.id}
                checked={payment.method === m.id}
                onChange={() => updatePayment({ method: m.id })}
                className="sr-only"
              />
              <span aria-hidden="true">{m.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-charcoal leading-tight">{m.label}</p>
                <p className="text-xs text-charcoal/50 mt-0.5">{m.desc}</p>
              </div>
              {payment.method === m.id && (
                <Check size={15} className="text-pivoine flex-shrink-0 ml-auto" aria-label="Sélectionné" />
              )}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Card form */}
      {payment.method === 'card' && (
        <fieldset className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <legend className="text-sm font-semibold text-charcoal mb-4 flex items-center gap-2">
            <Lock size={13} className="text-green-600" aria-hidden="true" />
            Informations de paiement sécurisé
          </legend>

          <div className="space-y-4">
            {/* Card number */}
            <div>
              <label htmlFor="card-number" className="block text-xs font-semibold text-charcoal/70 mb-1.5">
                Numéro de carte <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <input
                  id="card-number"
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={e => {
                    setCardNumber(formatCard(e.target.value))
                    setErrors(err => { const n = { ...err }; delete n.cardNumber; return n })
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={`w-full border rounded-xl px-4 py-3 text-sm font-mono tracking-wider outline-none transition-colors bg-white ${
                    errors.cardNumber ? 'border-red-300' : 'border-gray-200 focus:border-pivoine'
                  }`}
                  aria-invalid={!!errors.cardNumber}
                  aria-describedby={errors.cardNumber ? 'cn-error' : undefined}
                  autoComplete="cc-number"
                />
                {cardBrand() && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-black text-charcoal/50 bg-gray-100 rounded px-1.5 py-0.5">
                    {cardBrand()}
                  </span>
                )}
              </div>
              {errors.cardNumber && <p id="cn-error" role="alert" className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
            </div>

            {/* Name on card */}
            <div>
              <label htmlFor="card-name" className="block text-xs font-semibold text-charcoal/70 mb-1.5">
                Nom sur la carte <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <input
                id="card-name"
                type="text"
                value={cardName}
                onChange={e => {
                  setCardName(e.target.value.toUpperCase())
                  setErrors(err => { const n = { ...err }; delete n.cardName; return n })
                }}
                placeholder="SOPHIE MARTIN"
                className={`w-full border rounded-xl px-4 py-3 text-sm font-mono tracking-wider outline-none transition-colors bg-white uppercase ${
                  errors.cardName ? 'border-red-300' : 'border-gray-200 focus:border-pivoine'
                }`}
                aria-invalid={!!errors.cardName}
                autoComplete="cc-name"
              />
              {errors.cardName && <p role="alert" className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Expiry */}
              <div>
                <label htmlFor="card-expiry" className="block text-xs font-semibold text-charcoal/70 mb-1.5">
                  Date d&apos;expiration <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <input
                  id="card-expiry"
                  type="text"
                  inputMode="numeric"
                  value={cardExpiry}
                  onChange={e => {
                    setCardExpiry(formatExpiry(e.target.value))
                    setErrors(err => { const n = { ...err }; delete n.cardExpiry; return n })
                  }}
                  placeholder="MM/AA"
                  maxLength={5}
                  className={`w-full border rounded-xl px-4 py-3 text-sm font-mono tracking-wider outline-none transition-colors bg-white ${
                    errors.cardExpiry ? 'border-red-300' : 'border-gray-200 focus:border-pivoine'
                  }`}
                  aria-invalid={!!errors.cardExpiry}
                  autoComplete="cc-exp"
                />
                {errors.cardExpiry && <p role="alert" className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
              </div>

              {/* CVV */}
              <div>
                <label htmlFor="card-cvv" className="block text-xs font-semibold text-charcoal/70 mb-1.5 flex items-center gap-1">
                  CVV <span className="text-red-400" aria-hidden="true">*</span>
                  <button
                    type="button"
                    aria-label="Qu'est-ce que le CVV ?"
                    className="text-charcoal/30 hover:text-pivoine transition-colors"
                  >
                    <Info size={12} aria-hidden="true" />
                  </button>
                </label>
                <input
                  id="card-cvv"
                  type="text"
                  inputMode="numeric"
                  value={cardCvv}
                  onChange={e => {
                    setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))
                    setErrors(err => { const n = { ...err }; delete n.cardCvv; return n })
                  }}
                  placeholder="123"
                  maxLength={4}
                  className={`w-full border rounded-xl px-4 py-3 text-sm font-mono tracking-wider outline-none transition-colors bg-white ${
                    errors.cardCvv ? 'border-red-300' : 'border-gray-200 focus:border-pivoine'
                  }`}
                  aria-invalid={!!errors.cardCvv}
                  autoComplete="cc-csc"
                />
                {errors.cardCvv && <p role="alert" className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
              </div>
            </div>

            {/* Stripe badge */}
            <div className="flex items-center gap-2 text-charcoal/40 text-[11px] pt-1">
              <Lock size={11} aria-hidden="true" />
              <span>Vos données sont chiffrées par Stripe · Jamais stockées sur nos serveurs</span>
            </div>
          </div>
        </fieldset>
      )}

      {/* Express methods info */}
      {(payment.method === 'apple' || payment.method === 'google') && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center">
          <p className="text-sm text-charcoal/70">
            {payment.method === 'apple'
              ? 'Vous serez invité à confirmer le paiement avec Face ID ou Touch ID.'
              : 'Vous serez redirigé vers Google Pay pour finaliser le paiement.'}
          </p>
        </div>
      )}

      {/* Alma info */}
      {payment.method === 'alma' && (
        <div className="bg-[#FFF5F5] border border-[#FA5456]/20 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-[#FA5456]">alma</span>
            <span className="text-sm font-semibold text-charcoal">Payer en 3× sans frais</span>
          </div>
          {[
            { label: 'Aujourd\'hui',   amount: '42,60€' },
            { label: 'Dans 30 jours', amount: '42,60€' },
            { label: 'Dans 60 jours', amount: '42,60€' },
          ].map(row => (
            <div key={row.label} className="flex justify-between text-sm">
              <span className="text-charcoal/70">{row.label}</span>
              <span className="font-semibold text-charcoal">{row.amount}</span>
            </div>
          ))}
          <p className="text-[11px] text-charcoal/45">
            Simulation indicative · Montant définitif calculé à la validation
          </p>
        </div>
      )}

      {/* Error summary */}
      {Object.keys(errors).length > 0 && (
        <div role="alert" className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-700">Veuillez corriger les champs en rouge avant de continuer.</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setStep(1)}
          className="flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <ArrowLeft size={15} /> Modifier la livraison
        </button>

        <button
          onClick={handleOrder}
          disabled={loading}
          className={`btn-pivoine text-base py-3.5 px-8 min-w-[200px] justify-center ${
            loading ? 'opacity-80 cursor-wait' : ''
          }`}
          aria-busy={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Traitement en cours…
            </span>
          ) : (
            <>
              <Lock size={16} />
              Confirmer et payer
            </>
          )}
        </button>
      </div>
    </div>
  )
}
