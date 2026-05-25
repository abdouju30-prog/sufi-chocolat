'use client'

import { useState } from 'react'
import {
  Package, ChevronDown, ChevronUp, MapPin, Clock,
  CheckCircle2, Circle, Truck, FlowerIcon, Star, RotateCcw,
} from 'lucide-react'

const STATUS_STEPS = [
  { key: 'received',  label: 'Commande reçue',        icon: CheckCircle2, desc: 'Votre paiement a été validé' },
  { key: 'preparing', label: 'En préparation',         icon: FlowerIcon,   desc: 'Nos fleuristes préparent votre bouquet' },
  { key: 'ready',     label: 'Prêt pour livraison',    icon: Package,      desc: 'Votre coffret est emballé avec soin' },
  { key: 'shipping',  label: 'En cours de livraison',  icon: Truck,        desc: 'Votre livreur est en route' },
  { key: 'delivered', label: 'Livré',                  icon: CheckCircle2, desc: 'Commande remise au destinataire' },
]

const ORDERS = [
  {
    ref:      'SUF-A3KF2X',
    date:     '22 mai 2026',
    status:   'shipping',
    eta:      'Aujourd\'hui, créneau 14h–18h',
    total:    '127,90€',
    items: [
      { name: 'Bouquet Signature Rosa — M', price: '55€', image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=80&q=70&auto=format' },
      { name: 'Ours Caramel Grand — 80cm',  price: '49€', image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=80&q=70&auto=format' },
      { name: 'Coffret Ganaches Maison',     price: '24€', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=80&q=70&auto=format' },
    ],
    address:  '12 rue des Fleurs, 75001 Paris',
    rated:    false,
  },
  {
    ref:      'SUF-7T9WMQ',
    date:     '10 avril 2026',
    status:   'delivered',
    eta:      null,
    total:    '79,00€',
    items: [
      { name: 'Bouquet Pivoine Éternel — L', price: '65€', image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=80&q=70&auto=format' },
      { name: 'Coffret Truffes Noir',        price: '14€', image: 'https://images.unsplash.com/photo-1606312619070-d48b6b4c8365?w=80&q=70&auto=format' },
    ],
    address:  '5 avenue Victor Hugo, 69002 Lyon',
    rated:    true,
  },
  {
    ref:      'SUF-2PLC8R',
    date:     '14 février 2026',
    status:   'delivered',
    eta:      null,
    total:    '214,50€',
    items: [
      { name: 'Bouquet Saint-Valentin XXL', price: '110€', image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=80&q=70&auto=format' },
      { name: 'Ours Rose Géant — 1m',       price: '89€',  image: 'https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=80&q=70&auto=format' },
      { name: 'Box Chocolats Luxe',          price: '36€',  image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=80&q=70&auto=format' },
    ],
    address:  '28 rue du Marais, 75003 Paris',
    rated:    true,
  },
]

const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  received:  { label: 'Reçue',          cls: 'bg-blue-50 text-blue-600 border-blue-200' },
  preparing: { label: 'En préparation', cls: 'bg-amber-50 text-amber-600 border-amber-200' },
  ready:     { label: 'Prête',          cls: 'bg-purple-50 text-purple-600 border-purple-200' },
  shipping:  { label: 'En livraison',   cls: 'bg-pivoine/10 text-pivoine border-pivoine/20' },
  delivered: { label: 'Livrée',         cls: 'bg-green-50 text-green-600 border-green-200' },
}

function TrackingTimeline({ status }: { status: string }) {
  const currentIdx = STATUS_STEPS.findIndex(s => s.key === status)

  return (
    <div className="pt-4 pb-2">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-4 bottom-4 w-px bg-gray-100" aria-hidden="true" />

        <ol className="space-y-4">
          {STATUS_STEPS.map((step, i) => {
            const done    = i < currentIdx
            const current = i === currentIdx
            const Icon    = step.icon

            return (
              <li key={step.key} className="flex items-start gap-4 relative">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2
                  ${done    ? 'bg-pivoine border-pivoine text-white'
                    : current ? 'bg-white border-pivoine text-pivoine shadow-sm'
                    : 'bg-white border-gray-200 text-charcoal/25'}
                `}
                  aria-hidden="true"
                >
                  {done
                    ? <CheckCircle2 size={14} />
                    : current
                      ? <Icon size={13} className="animate-pulse" />
                      : <Circle size={13} />
                  }
                </div>
                <div className="pt-1 min-w-0">
                  <p className={`text-sm font-semibold leading-tight ${
                    done || current ? 'text-charcoal' : 'text-charcoal/35'
                  }`}>
                    {step.label}
                    {current && (
                      <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-pivoine align-middle animate-ping" aria-hidden="true" />
                    )}
                  </p>
                  {(done || current) && (
                    <p className="text-xs text-charcoal/50 mt-0.5">{step.desc}</p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

function RatingWidget({ ref: orderRef }: { ref: string }) {
  const [selected, setSelected] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <p className="text-xs text-green-600 font-medium flex items-center gap-1">
        <CheckCircle2 size={12} /> Merci pour votre avis !
      </p>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-charcoal/50">Notez votre commande :</span>
      <div className="flex gap-0.5" role="group" aria-label="Note de 1 à 5 étoiles">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            onClick={() => { setSelected(n); setTimeout(() => setSubmitted(true), 600) }}
            aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
            className="transition-transform hover:scale-125 active:scale-95"
          >
            <Star
              size={16}
              className={n <= selected ? 'text-gold fill-gold' : 'text-gray-300'}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function OrdersTab() {
  const [expanded, setExpanded] = useState<string | null>(ORDERS[0].ref)

  return (
    <div className="space-y-4">
      {ORDERS.map(order => {
        const badge  = STATUS_BADGE[order.status]
        const isOpen = expanded === order.ref

        return (
          <article
            key={order.ref}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
          >
            {/* Header row */}
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50/50 transition-colors"
              onClick={() => setExpanded(isOpen ? null : order.ref)}
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Item thumbnails */}
                <div className="flex -space-x-2 flex-shrink-0">
                  {order.items.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-xl border-2 border-white bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.image}')`, zIndex: order.items.length - i }}
                      role="img"
                      aria-label={item.name}
                    />
                  ))}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-mono text-sm font-bold text-charcoal tracking-wider">
                      #{order.ref}
                    </p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal/50 mt-0.5">
                    {order.date} · {order.items.length} article{order.items.length > 1 ? 's' : ''} · <strong className="text-charcoal">{order.total}</strong>
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 ml-3">
                {isOpen
                  ? <ChevronUp size={16} className="text-charcoal/40" />
                  : <ChevronDown size={16} className="text-charcoal/40" />
                }
              </div>
            </button>

            {/* ETA banner */}
            {order.eta && isOpen && (
              <div className="mx-5 mb-1 flex items-center gap-2 bg-pivoine/8 border border-pivoine/15 rounded-xl px-4 py-2.5">
                <Clock size={13} className="text-pivoine flex-shrink-0" aria-hidden="true" />
                <p className="text-xs font-semibold text-pivoine">
                  Livraison estimée · {order.eta}
                </p>
              </div>
            )}

            {/* Expanded detail */}
            {isOpen && (
              <div className="px-5 pb-5 space-y-5 border-t border-gray-100 pt-4">

                {/* Tracking timeline */}
                <TrackingTimeline status={order.status} />

                {/* Items list */}
                <div>
                  <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-3">
                    Articles
                  </p>
                  <ul className="space-y-2.5">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl bg-cover bg-center border border-gray-100 flex-shrink-0"
                          style={{ backgroundImage: `url('${item.image}')` }}
                          role="img"
                          aria-label={item.name}
                        />
                        <p className="flex-1 text-sm text-charcoal font-medium leading-snug">{item.name}</p>
                        <p className="text-sm font-semibold text-charcoal flex-shrink-0">{item.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2 text-xs text-charcoal/55">
                  <MapPin size={12} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{order.address}</span>
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 flex-wrap gap-3">
                  {order.status === 'delivered' && !order.rated
                    ? <RatingWidget ref={order.ref} />
                    : order.rated
                      ? (
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(n => (
                            <Star key={n} size={13} className="text-gold fill-gold" aria-hidden="true" />
                          ))}
                          <span className="text-xs text-charcoal/45 ml-1">Noté</span>
                        </div>
                      )
                      : <div />
                  }

                  <button className="flex items-center gap-1.5 text-xs font-semibold text-charcoal/55 hover:text-pivoine transition-colors">
                    <RotateCcw size={12} aria-hidden="true" />
                    Recommander
                  </button>
                </div>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
