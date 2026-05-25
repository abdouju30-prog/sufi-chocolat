'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Package, ArrowRight, Mail, Truck, PartyPopper } from 'lucide-react'
import { useCheckout } from './CheckoutContext'

/* ── Minimal canvas confetti ── */
function ConfettiCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const COLORS = ['#B5275C', '#C9A84C', '#F9E4EC', '#D4527E', '#fff', '#FFC0D0']
    const COUNT  = 140

    const particles = Array.from({ length: COUNT }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * -canvas.height,
      w:    6 + Math.random() * 8,
      h:    3 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot:  Math.random() * Math.PI * 2,
      vx:   (Math.random() - 0.5) * 3,
      vy:   2 + Math.random() * 4,
      vr:   (Math.random() - 0.5) * 0.15,
    }))

    let rafId: number
    let done  = false

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let anyVisible = false
      for (const p of particles) {
        p.x  += p.vx
        p.y  += p.vy
        p.rot += p.vr
        if (p.y < canvas.height + 20) anyVisible = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }
      if (anyVisible && !done) rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    const timer = setTimeout(() => { done = true }, 5000)

    return () => { cancelAnimationFrame(rafId); clearTimeout(timer) }
  }, [])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  )
}

export default function StepConfirmation() {
  const { state } = useCheckout()
  const { orderRef, delivery } = state
  const [showConfetti, setShowConfetti] = useState(true)

  const formattedDate = new Date(delivery.date).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 5500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {showConfetti && <ConfettiCanvas />}

      <div className="flex flex-col items-center text-center py-8 gap-6">

        {/* Success icon */}
        <div className="relative">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce-in">
            <PartyPopper size={44} className="text-green-600" aria-hidden="true" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-gold rounded-full flex items-center justify-center shadow-gold animate-scale-in">
            <span className="text-white text-base" aria-hidden="true">🎉</span>
          </div>
        </div>

        {/* Message */}
        <div className="animate-fade-up max-w-md" style={{ animationDelay: '200ms' }}>
          <h1 className="font-display text-3xl font-semibold text-charcoal mb-2">
            Commande confirmée !
          </h1>
          <p className="text-charcoal/65 leading-relaxed">
            Merci pour votre commande. Votre coffret cadeau va être préparé avec soin
            par notre équipe et livré
            <strong className="text-charcoal"> {formattedDate}</strong>
            {' '}· créneau <strong className="text-charcoal">{delivery.slot}</strong>.
          </p>
        </div>

        {/* Order card */}
        <div
          className="w-full max-w-sm bg-cream border border-blush rounded-2xl p-5 animate-fade-up"
          style={{ animationDelay: '350ms' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-pivoine/10 rounded-xl flex items-center justify-center">
              <Package size={18} className="text-pivoine" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-xs text-charcoal/50 font-medium">Numéro de commande</p>
              <p className="font-mono font-bold text-charcoal tracking-wider">#{orderRef}</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Email */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <Mail size={15} className="text-pivoine flex-shrink-0" aria-hidden="true" />
              <div className="text-left min-w-0">
                <p className="text-xs text-charcoal/50 font-medium">Confirmation envoyée à</p>
                <p className="text-sm font-semibold text-charcoal truncate">
                  {delivery.recipient.email || 'votre email'}
                </p>
              </div>
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <Truck size={15} className="text-pivoine flex-shrink-0" aria-hidden="true" />
              <div className="text-left">
                <p className="text-xs text-charcoal/50 font-medium">Livraison prévue</p>
                <p className="text-sm font-semibold text-charcoal capitalize">{formattedDate}</p>
              </div>
            </div>

            {/* Address */}
            {delivery.recipient.street && (
              <div className="p-3 bg-white rounded-xl border border-gray-100 text-left">
                <p className="text-xs text-charcoal/50 font-medium mb-0.5">Adresse de livraison</p>
                <p className="text-sm text-charcoal">
                  {delivery.recipient.firstName} {delivery.recipient.lastName}<br />
                  {delivery.recipient.street}
                  {delivery.recipient.complement && `, ${delivery.recipient.complement}`}<br />
                  {delivery.recipient.postalCode} {delivery.recipient.city}
                </p>
              </div>
            )}

            {/* Surprise flag */}
            {delivery.isSurprise && (
              <div className="flex items-center gap-2 p-3 bg-pivoine/5 border border-pivoine/15 rounded-xl">
                <span className="text-base" aria-hidden="true">🎁</span>
                <p className="text-xs text-pivoine font-semibold">
                  Mode cadeau surprise activé — aucun prix visible sur le bon de livraison
                </p>
              </div>
            )}
          </div>
        </div>

        {/* What's next */}
        <div
          className="w-full max-w-sm animate-fade-up"
          style={{ animationDelay: '500ms' }}
        >
          <p className="text-xs text-charcoal/45 font-semibold uppercase tracking-wider mb-3">
            Et maintenant ?
          </p>
          <div className="space-y-2 text-left">
            {[
              { emoji: '📧', text: 'Un email de confirmation vous a été envoyé' },
              { emoji: '🌸', text: 'Nos fleuristes préparent votre bouquet ce matin' },
              { emoji: '📦', text: 'Vous recevrez un SMS de suivi avant la livraison' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-lg flex-shrink-0" aria-hidden="true">{item.emoji}</span>
                <p className="text-sm text-charcoal/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 w-full max-w-sm animate-fade-up"
          style={{ animationDelay: '650ms' }}
        >
          <Link href="/compte" className="btn-pivoine flex-1 justify-center py-3">
            Suivre ma commande <ArrowRight size={16} />
          </Link>
          <Link
            href="/boutique"
            className="flex-1 border-2 border-gray-200 rounded-full px-5 py-3 text-sm font-semibold text-charcoal hover:border-pivoine hover:text-pivoine transition-all text-center"
          >
            Retour à la boutique
          </Link>
        </div>

        {/* Sharing prompt */}
        <div
          className="animate-fade-up mt-2"
          style={{ animationDelay: '800ms' }}
          aria-hidden="true"
        >
          <p className="text-xs text-charcoal/35">
            Partagez l&apos;amour → <span className="text-pivoine font-medium">@sufi.cadeaux</span>
          </p>
        </div>
      </div>
    </>
  )
}
