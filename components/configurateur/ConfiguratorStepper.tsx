'use client'

import { useConfigurator } from './ConfiguratorContext'
import { Check } from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Bouquet',        emoji: '🌸', required: true  },
  { id: 2, label: 'Peluche',        emoji: '🧸', required: false },
  { id: 3, label: 'Chocolats',      emoji: '🍫', required: false },
  { id: 4, label: 'Personnaliser',  emoji: '✉️', required: false },
  { id: 5, label: 'Récapitulatif',  emoji: '🎁', required: false },
]

export default function ConfiguratorStepper() {
  const { state, setStep, canProceed } = useConfigurator()
  const { step, bouquet, peluche, chocolats } = state

  const isCompleted = (id: number) => {
    if (id === 1) return bouquet !== null
    if (id === 2) return step > 2
    if (id === 3) return step > 3
    if (id === 4) return step > 4
    return false
  }

  const isAccessible = (id: number) => {
    if (id === 1) return true
    if (!canProceed) return false
    return id <= step + 1
  }

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="bg-white border-b border-gray-100 sticky top-[105px] z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* Progress bar */}
        <div className="relative mb-4">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-pivoine rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progression : étape ${step} sur ${STEPS.length}`}
            />
          </div>
        </div>

        {/* Step indicators */}
        <nav aria-label="Étapes du configurateur">
          <ol className="flex items-center justify-between">
            {STEPS.map((s, i) => {
              const completed  = isCompleted(s.id)
              const current    = step === s.id
              const accessible = isAccessible(s.id)

              return (
                <li key={s.id} className="flex flex-col items-center gap-1.5">
                  <button
                    onClick={() => accessible && setStep(s.id)}
                    disabled={!accessible}
                    aria-current={current ? 'step' : undefined}
                    className={`
                      relative flex items-center justify-center w-9 h-9 rounded-full border-2 text-sm font-bold
                      transition-all duration-300
                      ${completed
                        ? 'bg-pivoine border-pivoine text-white'
                        : current
                          ? 'bg-white border-pivoine text-pivoine shadow-gold'
                          : accessible
                            ? 'bg-white border-gray-200 text-charcoal/50 hover:border-pivoine/50'
                            : 'bg-gray-50 border-gray-100 text-charcoal/25 cursor-not-allowed'
                      }
                    `}
                    aria-label={`${s.label}${completed ? ' (complété)' : current ? ' (étape actuelle)' : ''}`}
                  >
                    {completed
                      ? <Check size={15} aria-hidden="true" />
                      : <span aria-hidden="true">{s.id}</span>
                    }

                    {/* Required dot */}
                    {s.required && !completed && (
                      <span
                        className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gold rounded-full border border-white"
                        aria-label="Étape obligatoire"
                      />
                    )}
                  </button>

                  <div className="text-center hidden sm:block">
                    <p className={`text-[11px] font-semibold transition-colors ${
                      current ? 'text-pivoine' : completed ? 'text-charcoal' : 'text-charcoal/40'
                    }`}>
                      {s.label}
                    </p>
                    {!s.required && (
                      <p className="text-[10px] text-charcoal/30">Optionnel</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </div>
  )
}
