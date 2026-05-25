'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react'

export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null)
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState('')
  const [loading,   setLoading]   = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('[data-reveal]').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Veuillez saisir une adresse email valide.')
      return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-cream relative overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blush rounded-full opacity-60 blur-3xl" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-pivoine/5 rounded-full -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/8 rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">

        {/* Icon */}
        <div data-reveal className="section-reveal flex justify-center mb-5">
          <div className="w-16 h-16 bg-gradient-pivoine rounded-2xl flex items-center justify-center shadow-gold">
            <Mail size={28} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <div data-reveal className="section-reveal mb-2">
          <p className="text-pivoine font-accent italic text-lg tracking-wide mb-2">
            Offres & inspirations
          </p>
          <h2
            id="newsletter-heading"
            className="font-display text-3xl sm:text-4xl font-semibold text-charcoal leading-tight"
          >
            Restez dans
            le secret
          </h2>
        </div>

        <p data-reveal className="section-reveal text-charcoal/65 text-base leading-relaxed mb-3">
          Recevez nos nouvelles créations, idées cadeaux de saison et offres exclusives
          avant tout le monde. Aucun spam, promis.
        </p>

        {/* Discount badge */}
        <div data-reveal className="section-reveal inline-flex items-center gap-2 bg-pivoine/8 border border-pivoine/15 rounded-full px-4 py-2 mb-8">
          <Sparkles size={14} className="text-pivoine" />
          <span className="text-pivoine text-sm font-semibold">
            -10% offert sur votre première commande
          </span>
        </div>

        {/* Form */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            noValidate
            data-reveal
            className="section-reveal"
          >
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <label htmlFor="newsletter-email" className="sr-only">
                  Votre adresse email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="votre@email.fr"
                  className={`w-full border rounded-full px-5 py-3.5 text-sm text-charcoal placeholder-charcoal/40 outline-none transition-all duration-200 bg-white ${
                    error
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-gray-200 focus:border-pivoine'
                  }`}
                  required
                  aria-describedby={error ? 'newsletter-error' : undefined}
                  aria-invalid={!!error}
                  autoComplete="email"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-pivoine flex-shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : (
                  <>S&apos;abonner <ArrowRight size={15} /></>
                )}
              </button>
            </div>

            {error && (
              <p
                id="newsletter-error"
                role="alert"
                className="text-red-500 text-xs mt-2 text-center"
              >
                {error}
              </p>
            )}

            <p className="text-charcoal/40 text-xs mt-3">
              En vous abonnant, vous acceptez notre{' '}
              <a href="/politique-confidentialite" className="underline hover:text-pivoine transition-colors">
                politique de confidentialité
              </a>.
              Désabonnement en un clic.
            </p>
          </form>
        ) : (
          <div
            data-reveal
            className="section-reveal animate-bounce-in flex flex-col items-center gap-3 py-6"
            role="status"
            aria-live="polite"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check size={30} className="text-green-600" />
            </div>
            <h3 className="font-display text-xl font-semibold text-charcoal">
              Bienvenue dans la famille Sufi Chocolat !
            </h3>
            <p className="text-charcoal/65 text-sm">
              Votre code <strong className="text-pivoine">FLORALIA10</strong> vous a été envoyé à{' '}
              <strong>{email}</strong>
            </p>
          </div>
        )}

        {/* Social proof */}
        <div data-reveal className="section-reveal flex items-center justify-center gap-6 mt-10 pt-8 border-t border-pivoine/10">
          {[
            { count: '8 400+', label: 'abonnés newsletter' },
            { count: '12 200+', label: 'followers Instagram' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-display text-2xl font-semibold text-charcoal">{item.count}</p>
              <p className="text-charcoal/50 text-xs mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
