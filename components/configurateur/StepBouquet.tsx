'use client'

import { useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { useConfigurator, ConfigItem } from './ConfiguratorContext'

const BOUQUETS: (ConfigItem & { colors: string[]; occasion: string; size: string })[] = [
  {
    id: 1, name: 'Bouquet Signature Rosa', price: 55,
    image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=500&q=80&auto=format',
    colors: ['rose', 'blanc'], occasion: 'Romantique', size: 'M',
    extra: { desc: 'Roses de jardin & pivoines', freshness: '7–10 jours' },
  },
  {
    id: 2, name: 'Bouquet Champêtre', price: 42,
    image: 'https://images.unsplash.com/photo-1470509037663-253d2d33765a?w=500&q=80&auto=format',
    colors: ['jaune', 'rose', 'violet'], occasion: 'Anniversaire', size: 'M',
    extra: { desc: 'Mélange sauvage & coloré', freshness: '7 jours' },
  },
  {
    id: 3, name: 'Bouquet Pivoine Luxe', price: 72,
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=500&q=80&auto=format',
    colors: ['rose', 'fuchsia'], occasion: 'Luxe', size: 'L',
    extra: { desc: 'Pivoines exclusives saison', freshness: '5–8 jours' },
  },
  {
    id: 4, name: 'Bouquet Blanc Immaculé', price: 65,
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=500&q=80&auto=format',
    colors: ['blanc', 'crème'], occasion: 'Mariage', size: 'L',
    extra: { desc: 'Roses blanches & lisianthus', freshness: '7–10 jours' },
  },
  {
    id: 5, name: 'Bouquet Soleil d\'Été', price: 38,
    image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=500&q=80&auto=format',
    colors: ['jaune', 'orange'], occasion: 'Joyeux', size: 'S',
    extra: { desc: 'Tournesols & gerberas joyeux', freshness: '7 jours' },
  },
  {
    id: 6, name: 'Bouquet Grenadine', price: 48,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&q=80&auto=format',
    colors: ['rouge', 'bordeaux'], occasion: 'Saint-Valentin', size: 'M',
    extra: { desc: 'Roses rouges passion', freshness: '7–9 jours' },
  },
]

const COLOR_FILTERS = [
  { id: 'tous',      label: 'Tous',    dot: null },
  { id: 'rose',      label: 'Rose',    dot: '#E8A0BC' },
  { id: 'rouge',     label: 'Rouge',   dot: '#C0392B' },
  { id: 'blanc',     label: 'Blanc',   dot: '#F5F5F5' },
  { id: 'jaune',     label: 'Jaune',   dot: '#F1C40F' },
  { id: 'violet',    label: 'Violet',  dot: '#9B59B6' },
]

export default function StepBouquet() {
  const { state, setBouquet, setStep } = useConfigurator()
  const [colorFilter, setColorFilter] = useState('tous')

  const filtered = colorFilter === 'tous'
    ? BOUQUETS
    : BOUQUETS.filter(b => b.colors.includes(colorFilter))

  const handleSelect = (bouquet: ConfigItem) => {
    setBouquet(bouquet)
  }

  const handleNext = () => {
    if (state.bouquet) setStep(2)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl" aria-hidden="true">🌸</span>
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            Choisissez votre bouquet
          </h2>
          <span className="bg-pivoine/10 text-pivoine text-xs font-bold px-2.5 py-1 rounded-full ml-1">
            Obligatoire
          </span>
        </div>
        <p className="text-charcoal/60 text-sm">
          Tous nos bouquets sont composés le matin de la livraison. Fraîcheur garantie.
        </p>
      </div>

      {/* Color filter */}
      <div
        className="flex flex-wrap gap-2 mb-6"
        role="group"
        aria-label="Filtrer par couleur"
      >
        {COLOR_FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setColorFilter(f.id)}
            aria-pressed={colorFilter === f.id}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
              colorFilter === f.id
                ? 'bg-pivoine text-white border-pivoine'
                : 'bg-white text-charcoal/70 border-gray-200 hover:border-pivoine/40'
            }`}
          >
            {f.dot && (
              <span
                className="w-3 h-3 rounded-full border border-gray-200 flex-shrink-0"
                style={{ backgroundColor: f.dot }}
                aria-hidden="true"
              />
            )}
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filtered.map(bouquet => {
          const selected = state.bouquet?.id === bouquet.id
          return (
            <button
              key={bouquet.id}
              onClick={() => handleSelect(bouquet)}
              aria-pressed={selected}
              className={`
                relative text-left rounded-2xl overflow-hidden border-2 transition-all duration-300 group
                ${selected
                  ? 'border-pivoine shadow-card-hover scale-[1.02]'
                  : 'border-transparent hover:border-pivoine/30 hover:shadow-card'
                }
              `}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${bouquet.image}')`, transform: 'scale(1.01)' }}
                  role="img"
                  aria-label={bouquet.name}
                />
                {/* Selected checkmark */}
                {selected && (
                  <div className="absolute inset-0 bg-pivoine/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-pivoine rounded-full flex items-center justify-center shadow-gold animate-bounce-in">
                      <Check size={24} className="text-white" aria-hidden="true" />
                    </div>
                  </div>
                )}
                {/* Occasion badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-white/90 text-charcoal text-[11px] font-semibold px-2 py-1 rounded-full">
                    {bouquet.occasion}
                  </span>
                </div>
                {/* Size badge */}
                <div className="absolute top-2 right-2">
                  <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                    selected ? 'bg-pivoine text-white' : 'bg-charcoal/60 text-white'
                  }`}>
                    {bouquet.size}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className={`p-3.5 transition-colors ${selected ? 'bg-blush' : 'bg-white'}`}>
                <h3 className="font-semibold text-sm text-charcoal leading-snug mb-0.5">
                  {bouquet.name}
                </h3>
                <p className="text-xs text-charcoal/55 mb-2">{bouquet.extra?.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-charcoal">
                    {bouquet.price}€
                  </span>
                  <span className="text-[11px] text-green-600 font-medium">
                    🌿 {bouquet.extra?.freshness}
                  </span>
                </div>
              </div>

              {/* Selected border overlay */}
              {selected && (
                <div className="absolute inset-0 rounded-2xl border-2 border-pivoine pointer-events-none" />
              )}
            </button>
          )
        })}
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          {state.bouquet ? (
            <p className="text-sm text-charcoal/70">
              Sélectionné : <strong className="text-charcoal">{state.bouquet.name}</strong>
              <span className="text-pivoine ml-2 font-semibold">{state.bouquet.price}€</span>
            </p>
          ) : (
            <p className="text-sm text-charcoal/50">Aucun bouquet sélectionné</p>
          )}
        </div>
        <button
          onClick={handleNext}
          disabled={!state.bouquet}
          className="btn-pivoine disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Étape suivante <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
