'use client'

import { useState } from 'react'
import { Check, ArrowRight, ArrowLeft, SkipForward, Info } from 'lucide-react'
import { useConfigurator, ConfigItem } from './ConfiguratorContext'

const BOXES: (ConfigItem & { pieces: string; type: string })[] = [
  {
    id: 20, name: 'Assortiment Ganaches', price: 24, pieces: '16 pièces', type: 'Ganaches',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80&auto=format',
    extra: { desc: 'Ganaches fraîches aux parfums variés', highlight: 'Le plus populaire' },
  },
  {
    id: 21, name: 'Coffret Pralinés', price: 28, pieces: '20 pièces', type: 'Pralinés',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=500&q=80&auto=format',
    extra: { desc: 'Pralinés noisette & amande maison', highlight: null },
  },
  {
    id: 22, name: 'Boîte Découverte', price: 38, pieces: '32 pièces', type: 'Mixte',
    image: 'https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=500&q=80&auto=format',
    extra: { desc: 'Ganaches + pralinés + truffes', highlight: 'Coup de cœur équipe' },
  },
  {
    id: 23, name: 'Tablettes Artisanales', price: 22, pieces: '3 tablettes', type: 'Tablettes',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&q=80&auto=format',
    extra: { desc: '70% cacao Grand Cru + lait + blanc', highlight: null },
  },
]

const FLAVORS: Record<number, string[]> = {
  20: ['Framboise', 'Passion', 'Caramel fleur de sel', 'Citron', 'Vanille Bourbon', 'Praliné rose'],
  21: ['Noisette', 'Amande', 'Pistache', 'Coco', 'Café', 'Spéculoos'],
  22: ['Assortiment varié — surprise du chef'],
  23: ['Noir 70% Grand Cru', 'Lait Caramel', 'Blanc Framboise'],
}

export default function StepChocolats() {
  const { state, setChocolats, setStep } = useConfigurator()
  const [hoveredFlavors, setHoveredFlavors] = useState<number | null>(null)

  const handleSelect = (box: ConfigItem) => {
    setChocolats(state.chocolats?.id === box.id ? null : box)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl" aria-hidden="true">🍫</span>
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            Sélectionnez des chocolats
          </h2>
          <span className="bg-gray-100 text-charcoal/60 text-xs font-bold px-2.5 py-1 rounded-full ml-1">
            Optionnel
          </span>
        </div>
        <p className="text-charcoal/60 text-sm">
          Préparés chaque matin par notre maître chocolatier. Ingrédients 100% naturels, sans conservateurs.
        </p>
      </div>

      {/* Chocolats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {BOXES.map(box => {
          const selected = state.chocolats?.id === box.id
          return (
            <button
              key={box.id}
              onClick={() => handleSelect(box)}
              onMouseEnter={() => setHoveredFlavors(box.id)}
              onMouseLeave={() => setHoveredFlavors(null)}
              aria-pressed={selected}
              className={`
                relative text-left rounded-2xl overflow-hidden border-2 flex transition-all duration-300 group
                ${selected
                  ? 'border-pivoine shadow-card-hover'
                  : 'border-transparent hover:border-pivoine/30 hover:shadow-card'
                }
              `}
            >
              {/* Image */}
              <div
                className="w-28 flex-shrink-0 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url('${box.image}')` }}
                role="img"
                aria-label={box.name}
              >
                {selected && (
                  <div className="absolute inset-0 bg-pivoine/30 flex items-center justify-center">
                    <Check size={22} className="text-white" aria-hidden="true" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className={`flex-1 p-4 transition-colors ${selected ? 'bg-blush' : 'bg-white'}`}>
                {/* Highlight badge */}
                {box.extra?.highlight && (
                  <span className="inline-block bg-gold/15 text-gold-dark text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                    ⭐ {box.extra.highlight}
                  </span>
                )}

                <h3 className="font-semibold text-sm text-charcoal leading-snug mb-0.5">
                  {box.name}
                </h3>

                <p className="text-xs text-charcoal/55 mb-1">{box.extra?.desc}</p>

                <div className="flex items-center gap-2 text-xs text-charcoal/50 mb-3">
                  <span className="bg-gray-100 rounded-full px-2 py-0.5 font-medium">{box.pieces}</span>
                  <span className="bg-gray-100 rounded-full px-2 py-0.5 font-medium">{box.type}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-bold text-charcoal">{box.price}€</span>
                  <button
                    onClick={e => { e.stopPropagation(); setHoveredFlavors(hoveredFlavors === box.id ? null : box.id) }}
                    className="flex items-center gap-1 text-[11px] text-charcoal/40 hover:text-pivoine transition-colors"
                    aria-label="Voir les parfums disponibles"
                  >
                    <Info size={12} /> Parfums
                  </button>
                </div>

                {/* Flavors tooltip */}
                {hoveredFlavors === box.id && (
                  <div className="mt-2 p-2.5 bg-white rounded-xl border border-pivoine/15 shadow-soft animate-fade-up">
                    <p className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider mb-1.5">
                      Parfums inclus
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {FLAVORS[box.id].map(f => (
                        <span key={f} className="text-[11px] bg-blush text-pivoine rounded-full px-2 py-0.5 font-medium">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selected && (
                <div className="absolute inset-0 rounded-2xl border-2 border-pivoine pointer-events-none" />
              )}
            </button>
          )
        })}
      </div>

      {/* Allergen note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 mb-6">
        <Info size={14} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-xs text-amber-800">
          <strong>Allergènes :</strong> Nos chocolats peuvent contenir des traces de lait, gluten, fruits à coque et soja.
          Contactez-nous pour les besoins diététiques spécifiques.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
        <div>
          {state.chocolats ? (
            <p className="text-sm text-charcoal/70">
              Sélectionné : <strong className="text-charcoal">{state.chocolats.name}</strong>
              <span className="text-pivoine ml-2 font-semibold">{state.chocolats.price}€</span>
            </p>
          ) : (
            <p className="text-sm text-charcoal/50">Aucun chocolat sélectionné</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal transition-colors"
          >
            <ArrowLeft size={15} /> Retour
          </button>
          <button
            onClick={() => { setChocolats(null); setStep(4) }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-charcoal/60 hover:border-pivoine hover:text-pivoine transition-all duration-200"
          >
            <SkipForward size={15} /> Ignorer
          </button>
          <button onClick={() => setStep(4)} className="btn-pivoine">
            Suivant <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
