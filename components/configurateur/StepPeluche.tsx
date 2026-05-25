'use client'

import { useState } from 'react'
import { Check, ArrowRight, ArrowLeft, SkipForward } from 'lucide-react'
import { useConfigurator, ConfigItem } from './ConfiguratorContext'

const PELUCHES: (ConfigItem & { animal: string; size: string; cm: string })[] = [
  {
    id: 10, name: 'Ours Caramel Petit', price: 29, size: 'S', cm: '40 cm', animal: 'Ours',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&q=80&auto=format',
    extra: { desc: 'Peluche ultra-douce, idéal à offrir' },
  },
  {
    id: 11, name: 'Ours Caramel Grand', price: 49, size: 'L', cm: '80 cm', animal: 'Ours',
    image: 'https://images.unsplash.com/photo-1565101046168-8a9b56aa1e1c?w=500&q=80&auto=format',
    extra: { desc: 'Le classique irrésistible' },
  },
  {
    id: 12, name: 'Ours Caramel XXL', price: 79, size: 'XXL', cm: '120 cm', animal: 'Ours',
    image: 'https://images.unsplash.com/photo-1559715511-25b7a7c5de0d?w=500&q=80&auto=format',
    extra: { desc: 'Pour un effet WOW garanti !' },
  },
  {
    id: 13, name: 'Lapin Blanc Doux', price: 35, size: 'M', cm: '60 cm', animal: 'Lapin',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80&auto=format',
    extra: { desc: 'Fourrure soyeuse & oreilles longues' },
  },
  {
    id: 14, name: 'Panda Kawaii', price: 32, size: 'S', cm: '40 cm', animal: 'Panda',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=500&q=80&auto=format',
    extra: { desc: 'Style asiatique ultra-mignon' },
  },
  {
    id: 15, name: 'Éléphant Géant', price: 65, size: 'XL', cm: '100 cm', animal: 'Éléphant',
    image: 'https://images.unsplash.com/photo-1550358864-518f202c02ba?w=500&q=80&auto=format',
    extra: { desc: 'Douceur et majesté réunis' },
  },
]

const SIZE_FILTERS = ['Tous', 'S', 'M', 'L', 'XL', 'XXL']
const ANIMAL_FILTERS = ['Tous', 'Ours', 'Lapin', 'Panda', 'Éléphant']

export default function StepPeluche() {
  const { state, setPeluche, setStep } = useConfigurator()
  const [sizeFilter,   setSizeFilter]   = useState('Tous')
  const [animalFilter, setAnimalFilter] = useState('Tous')

  const filtered = PELUCHES.filter(p => {
    const sizeOk   = sizeFilter   === 'Tous' || p.size   === sizeFilter
    const animalOk = animalFilter === 'Tous' || p.animal === animalFilter
    return sizeOk && animalOk
  })

  const handleSelect = (peluche: ConfigItem) => {
    setPeluche(state.peluche?.id === peluche.id ? null : peluche)
  }

  const handleSkip = () => {
    setPeluche(null)
    setStep(3)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl" aria-hidden="true">🧸</span>
          <h2 className="font-display text-2xl font-semibold text-charcoal">
            Ajoutez une peluche
          </h2>
          <span className="bg-gray-100 text-charcoal/60 text-xs font-bold px-2.5 py-1 rounded-full ml-1">
            Optionnel
          </span>
        </div>
        <p className="text-charcoal/60 text-sm">
          Une peluche géante pour amplifier l&apos;émotion. Chaque peluche est livrée dans un emballage soigné.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-6">
        {/* Size filter */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par taille">
          <span className="text-xs font-semibold text-charcoal/50 self-center mr-1">Taille :</span>
          {SIZE_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setSizeFilter(f)}
              aria-pressed={sizeFilter === f}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                sizeFilter === f
                  ? 'bg-pivoine text-white border-pivoine'
                  : 'bg-white text-charcoal/70 border-gray-200 hover:border-pivoine/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        {/* Animal filter */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par animal">
          <span className="text-xs font-semibold text-charcoal/50 self-center mr-1">Animal :</span>
          {ANIMAL_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setAnimalFilter(f)}
              aria-pressed={animalFilter === f}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                animalFilter === f
                  ? 'bg-charcoal text-white border-charcoal'
                  : 'bg-white text-charcoal/70 border-gray-200 hover:border-charcoal/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filtered.map(peluche => {
          const selected = state.peluche?.id === peluche.id
          return (
            <button
              key={peluche.id}
              onClick={() => handleSelect(peluche)}
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
              <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '1' }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${peluche.image}')`, transform: 'scale(1.01)' }}
                  role="img"
                  aria-label={peluche.name}
                />
                {selected && (
                  <div className="absolute inset-0 bg-pivoine/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-pivoine rounded-full flex items-center justify-center shadow-gold animate-bounce-in">
                      <Check size={24} className="text-white" aria-hidden="true" />
                    </div>
                  </div>
                )}
                {/* Size tag */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    selected ? 'bg-pivoine text-white' : 'bg-white/90 text-charcoal'
                  }`}>
                    {peluche.size}
                  </span>
                  <span className="bg-white/90 text-charcoal text-xs font-medium px-2 py-1 rounded-full">
                    {peluche.cm}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className={`p-3.5 transition-colors ${selected ? 'bg-blush' : 'bg-white'}`}>
                <h3 className="font-semibold text-sm text-charcoal leading-snug mb-0.5">
                  {peluche.name}
                </h3>
                <p className="text-xs text-charcoal/55 mb-2">{peluche.extra?.desc}</p>
                <span className="font-display text-lg font-bold text-charcoal">
                  {peluche.price}€
                </span>
              </div>

              {selected && (
                <div className="absolute inset-0 rounded-2xl border-2 border-pivoine pointer-events-none" />
              )}
            </button>
          )
        })}
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
        <div className="flex flex-col gap-1">
          {state.peluche ? (
            <p className="text-sm text-charcoal/70">
              Sélectionnée : <strong className="text-charcoal">{state.peluche.name}</strong>
              <span className="text-pivoine ml-2 font-semibold">{state.peluche.price}€</span>
            </p>
          ) : (
            <p className="text-sm text-charcoal/50">Aucune peluche sélectionnée</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal transition-colors"
            aria-label="Retour à l'étape bouquet"
          >
            <ArrowLeft size={15} /> Retour
          </button>
          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-charcoal/60 hover:border-pivoine hover:text-pivoine transition-all duration-200"
          >
            <SkipForward size={15} /> Ignorer cette étape
          </button>
          <button
            onClick={() => setStep(3)}
            className="btn-pivoine"
          >
            Suivant <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
