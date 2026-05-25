'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface ConfigItem {
  id:    number
  name:  string
  price: number
  image: string
  extra?: Record<string, string>
}

export interface Personalization {
  message:     string
  ribbonColor: string
  ribbonName:  string
  wrapping:    'standard' | 'premium' | 'luxe'
  deliveryDate: string
  slot:        string
}

export interface ConfiguratorState {
  step:          number
  bouquet:       ConfigItem | null
  peluche:       ConfigItem | null
  chocolats:     ConfigItem | null
  personalization: Personalization
}

interface ConfiguratorContextType {
  state:             ConfiguratorState
  setStep:           (step: number) => void
  setBouquet:        (item: ConfigItem | null) => void
  setPeluche:        (item: ConfigItem | null) => void
  setChocolats:      (item: ConfigItem | null) => void
  setPersonalization: (p: Partial<Personalization>) => void
  totalPrice:        number
  totalItems:        number
  canProceed:        boolean
}

const defaultPersonalization: Personalization = {
  message:      '',
  ribbonColor:  '#B5275C',
  ribbonName:   'Rose Pivoine',
  wrapping:     'standard',
  deliveryDate: new Date().toISOString().split('T')[0],
  slot:         'Après-midi (12h–18h)',
}

const ConfiguratorContext = createContext<ConfiguratorContextType | null>(null)

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfiguratorState>({
    step:            1,
    bouquet:         null,
    peluche:         null,
    chocolats:       null,
    personalization: defaultPersonalization,
  })

  const setStep           = useCallback((step: number) => setState(s => ({ ...s, step })), [])
  const setBouquet        = useCallback((bouquet: ConfigItem | null) => setState(s => ({ ...s, bouquet })), [])
  const setPeluche        = useCallback((peluche: ConfigItem | null) => setState(s => ({ ...s, peluche })), [])
  const setChocolats      = useCallback((chocolats: ConfigItem | null) => setState(s => ({ ...s, chocolats })), [])
  const setPersonalization = useCallback(
    (p: Partial<Personalization>) =>
      setState(s => ({ ...s, personalization: { ...s.personalization, ...p } })),
    []
  )

  const wrappingExtra = state.personalization.wrapping === 'premium' ? 3
    : state.personalization.wrapping === 'luxe' ? 8 : 0

  const totalPrice =
    (state.bouquet?.price    ?? 0) +
    (state.peluche?.price    ?? 0) +
    (state.chocolats?.price  ?? 0) +
    wrappingExtra

  const totalItems = [state.bouquet, state.peluche, state.chocolats].filter(Boolean).length

  const canProceed = state.bouquet !== null

  return (
    <ConfiguratorContext.Provider value={{
      state, setStep, setBouquet, setPeluche, setChocolats, setPersonalization,
      totalPrice, totalItems, canProceed,
    }}>
      {children}
    </ConfiguratorContext.Provider>
  )
}

export function useConfigurator() {
  const ctx = useContext(ConfiguratorContext)
  if (!ctx) throw new Error('useConfigurator must be used within ConfiguratorProvider')
  return ctx
}
