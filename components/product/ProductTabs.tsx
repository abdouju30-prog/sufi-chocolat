'use client'

import { useState } from 'react'
import { Leaf, Truck, RotateCcw, MessageSquare } from 'lucide-react'

const TABS = [
  { id: 'description', label: 'Description',   icon: <Leaf       size={15} /> },
  { id: 'composition', label: 'Composition',   icon: <Leaf       size={15} /> },
  { id: 'livraison',   label: 'Livraison',      icon: <Truck      size={15} /> },
  { id: 'avis',        label: 'Avis (312)',     icon: <MessageSquare size={15} /> },
]

const FLOWERS = [
  { name: 'Roses de jardin',    origin: 'France',   qty: '15–20 tiges', color: '#E8B4C8' },
  { name: 'Pivoines',           origin: 'Pays-Bas', qty: '5–8 tiges',   color: '#F4C2C2' },
  { name: 'Gypsophile',         origin: 'Espagne',  qty: 'Garniture',   color: '#FFFFFF' },
  { name: 'Eucalyptus',         origin: 'Portugal', qty: 'Feuillage',   color: '#8FAF8A' },
  { name: 'Ruscus',             origin: 'Italie',   qty: 'Feuillage',   color: '#5C7A5C' },
]

const DELIVERY_INFO = [
  {
    icon: <Truck size={20} className="text-pivoine" />,
    title: 'Livraison le jour même',
    body: 'Commandez avant 14h pour une livraison dans la journée. Disponible dans les grandes villes françaises. Un SMS de suivi est envoyé à la confirmation.',
  },
  {
    icon: <span className="text-xl">📦</span>,
    title: 'Livraison standard J+1/J+2',
    body: 'Livraison assurée partout en France métropolitaine via Chronopost. Les fleurs voyagent dans un emballage isotherme conçu pour maintenir leur fraîcheur.',
  },
  {
    icon: <RotateCcw size={20} className="text-pivoine" />,
    title: 'Garantie fraîcheur',
    body: 'Si vos fleurs arrivent abîmées ou fanées, nous vous offrons un remplacement gratuit ou un remboursement intégral — sans conditions.',
  },
  {
    icon: <span className="text-xl">🎁</span>,
    title: 'Livraison cadeau surprise',
    body: 'Cochez "cadeau surprise" au checkout : le bon de livraison n\'affiche aucun prix et est glissé dans une enveloppe scellée.',
  },
]

export default function ProductTabs() {
  const [active, setActive] = useState('description')

  return (
    <div className="mt-10 border border-gray-100 rounded-2xl overflow-hidden">

      {/* Tab bar */}
      <div
        className="flex overflow-x-auto scrollbar-hide border-b border-gray-100"
        role="tablist"
        aria-label="Informations produit"
      >
        {TABS.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-medium flex-shrink-0 border-b-2 transition-all duration-200 ${
              active === tab.id
                ? 'border-pivoine text-pivoine bg-blush/50'
                : 'border-transparent text-charcoal/60 hover:text-charcoal hover:bg-gray-50'
            }`}
          >
            <span aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="p-6 lg:p-8">

        {/* Description */}
        {active === 'description' && (
          <div
            id="panel-description"
            role="tabpanel"
            aria-labelledby="tab-description"
            className="prose prose-sm max-w-none"
          >
            <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
              Une ode à la beauté naturelle
            </h3>
            <p className="text-charcoal/70 leading-relaxed mb-4">
              Le Bouquet Signature Rosa est notre création la plus emblématique. Né de
              l&apos;alliance entre les roses de jardin à la fragrance délicate et les pivoines
              luxuriantes, ce bouquet incarne l&apos;élégance française dans toute sa splendeur.
            </p>
            <p className="text-charcoal/70 leading-relaxed mb-4">
              Chaque composition est réalisée à la main par nos fleuristes le matin même
              de la livraison. Aucune fleur ne séjourne plus de 24h dans notre atelier :
              c&apos;est notre engagement pour votre satisfaction.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                { label: 'Durée de vie estimée',  value: '7 à 10 jours' },
                { label: 'Hauteur du bouquet',    value: '40–55 cm selon taille' },
                { label: 'Saisonnalité',          value: 'Disponible toute l\'année' },
                { label: 'Parfum',                value: 'Délicat, floral & doux' },
                { label: 'Conditionnement',       value: 'Papier kraft aquatique' },
                { label: 'Entretien',             value: 'Eau fraîche, recouper les tiges' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 p-3 bg-cream rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-pivoine mt-1.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-charcoal/50 font-medium">{item.label}</p>
                    <p className="text-sm font-semibold text-charcoal">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">🌿</span>
              <div>
                <p className="text-sm font-semibold text-green-800">Démarche éco-responsable</p>
                <p className="text-sm text-green-700 mt-0.5">
                  Fleurs sourcées chez des producteurs certifiés (Label Fleur de France
                  et MPS-A). Emballage 100% recyclable. Transport CO₂ compensé.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Composition */}
        {active === 'composition' && (
          <div
            id="panel-composition"
            role="tabpanel"
            aria-labelledby="tab-composition"
          >
            <h3 className="font-display text-xl font-semibold text-charcoal mb-5">
              Composition florale
            </h3>
            <p className="text-charcoal/65 text-sm mb-5">
              La composition varie légèrement selon la saison et l&apos;arrivage du jour
              pour garantir une fraîcheur optimale. Les espèces principales restent constantes.
            </p>

            <div className="space-y-3">
              {FLOWERS.map(flower => (
                <div
                  key={flower.name}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-soft flex-shrink-0"
                    style={{ backgroundColor: flower.color }}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-charcoal">{flower.name}</p>
                    <p className="text-xs text-charcoal/50 mt-0.5">Origine : {flower.origin}</p>
                  </div>
                  <span className="text-xs font-medium text-charcoal/60 bg-white border border-gray-200 rounded-full px-2.5 py-1 flex-shrink-0">
                    {flower.qty}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1">
                Conseils de conservation
              </p>
              <ul className="text-sm text-amber-800 space-y-1">
                {[
                  'Recouper les tiges en diagonale à la réception',
                  'Changer l\'eau tous les 2 jours avec un peu de sucre',
                  'Tenir à l\'écart des sources de chaleur et du soleil direct',
                  'Retirer les feuilles sous le niveau d\'eau',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-600 mt-0.5" aria-hidden="true">·</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Livraison */}
        {active === 'livraison' && (
          <div
            id="panel-livraison"
            role="tabpanel"
            aria-labelledby="tab-livraison"
          >
            <h3 className="font-display text-xl font-semibold text-charcoal mb-5">
              Livraison & retours
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {DELIVERY_INFO.map((item, i) => (
                <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span aria-hidden="true">{item.icon}</span>
                    <p className="font-semibold text-sm text-charcoal">{item.title}</p>
                  </div>
                  <p className="text-sm text-charcoal/65 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-cream rounded-2xl p-5">
              <p className="font-semibold text-sm text-charcoal mb-3">Tarifs de livraison</p>
              <div className="space-y-2">
                {[
                  { label: 'Livraison standard (J+1/J+2)',   price: '4,90€' },
                  { label: 'Livraison express (J+0)',         price: '9,90€' },
                  { label: 'Livraison offerte',               price: 'dès 65€ d\'achat' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/70">{row.label}</span>
                    <span className="font-semibold text-charcoal">{row.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Avis */}
        {active === 'avis' && (
          <div
            id="panel-avis"
            role="tabpanel"
            aria-labelledby="tab-avis"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-semibold text-charcoal">
                Avis clients
              </h3>
              <a
                href="#avis"
                className="text-sm text-pivoine font-medium hover:underline"
              >
                Voir tous les avis
              </a>
            </div>

            {/* Score summary */}
            <div className="flex items-start gap-8 mb-8 p-5 bg-cream rounded-2xl">
              <div className="text-center">
                <p className="font-display text-5xl font-bold text-charcoal leading-none">4.9</p>
                <div className="flex justify-center my-1.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-gold text-gold" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-charcoal/55">312 avis vérifiés</p>
              </div>

              <div className="flex-1 space-y-1.5">
                {[
                  { stars: 5, pct: 89 },
                  { stars: 4, pct: 8  },
                  { stars: 3, pct: 2  },
                  { stars: 2, pct: 1  },
                  { stars: 1, pct: 0  },
                ].map(row => (
                  <div key={row.stars} className="flex items-center gap-2">
                    <span className="text-xs text-charcoal/60 w-5 text-right">{row.stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gold h-1.5 rounded-full"
                        style={{ width: `${row.pct}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-xs text-charcoal/50 w-7">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-sm text-charcoal/50">
              Les avis sont vérifiés et publiés uniquement après achat confirmé.
              <a href="#avis" className="text-pivoine ml-1 hover:underline">Voir les 312 avis complets →</a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
