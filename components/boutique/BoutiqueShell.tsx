'use client'

import { useState, useMemo } from 'react'
import {
  SlidersHorizontal, X, ChevronDown, Search,
  LayoutGrid, LayoutList, ArrowUpDown,
} from 'lucide-react'
import ProductCard from './ProductCard'
import { PRODUCTS } from './productsData'
import type { Product } from './ProductCard'

/* ── Types ── */
type Category = 'tous' | 'bouquets' | 'peluches' | 'chocolats'
type SortKey  = 'popular' | 'price-asc' | 'price-desc' | 'new'

const OCCASIONS = ['anniversaire', 'saint-valentin', 'mariage', 'naissance', 'remerciement', 'amour', 'noel']

const PRICE_RANGES = [
  { label: 'Moins de 30€', min: 0,   max: 30  },
  { label: '30€ – 60€',    min: 30,  max: 60  },
  { label: '60€ – 100€',   min: 60,  max: 100 },
  { label: 'Plus de 100€', min: 100, max: Infinity },
]

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'popular',    label: 'Les plus populaires' },
  { value: 'price-asc',  label: 'Prix croissant'       },
  { value: 'price-desc', label: 'Prix décroissant'      },
  { value: 'new',        label: 'Nouveautés'            },
]

const CATEGORY_TABS: { value: Category; label: string; count: number }[] = [
  { value: 'tous',       label: 'Tous',       count: PRODUCTS.length },
  { value: 'bouquets',   label: 'Bouquets',   count: PRODUCTS.filter(p => p.category === 'bouquets').length   },
  { value: 'peluches',   label: 'Peluches',   count: PRODUCTS.filter(p => p.category === 'peluches').length   },
  { value: 'chocolats',  label: 'Chocolats',  count: PRODUCTS.filter(p => p.category === 'chocolats').length  },
]

/* ── Filter chip ── */
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all ${
        active
          ? 'bg-pivoine border-pivoine text-white'
          : 'border-gray-200 text-charcoal/60 hover:border-pivoine/40 hover:text-charcoal'
      }`}
    >
      {label}
    </button>
  )
}

/* ── Filters panel (shared desktop sidebar + mobile) ── */
function FiltersContent({
  priceRange, setPriceRange,
  occasions, toggleOccasion,
  onlyNew, setOnlyNew,
  activeCount,
  onClear,
}: {
  priceRange: number | null
  setPriceRange: (i: number | null) => void
  occasions: string[]
  toggleOccasion: (o: string) => void
  onlyNew: boolean
  setOnlyNew: (v: boolean) => void
  activeCount: number
  onClear: () => void
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-charcoal text-sm flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-pivoine" aria-hidden="true" />
          Filtres
          {activeCount > 0 && (
            <span className="w-5 h-5 bg-pivoine text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </p>
        {activeCount > 0 && (
          <button onClick={onClear} className="text-xs text-charcoal/45 hover:text-pivoine transition-colors flex items-center gap-1">
            <X size={11} /> Effacer
          </button>
        )}
      </div>

      {/* Price */}
      <div>
        <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-3">Budget</p>
        <div className="space-y-2">
          {PRICE_RANGES.map((r, i) => (
            <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={priceRange === i}
                onChange={() => setPriceRange(priceRange === i ? null : i)}
                className="accent-pivoine w-3.5 h-3.5"
              />
              <span className={`text-sm transition-colors ${priceRange === i ? 'text-pivoine font-semibold' : 'text-charcoal/65 group-hover:text-charcoal'}`}>
                {r.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-3">Occasion</p>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map(occ => (
            <Chip
              key={occ}
              label={occ.charAt(0).toUpperCase() + occ.slice(1).replace('-', ' ')}
              active={occasions.includes(occ)}
              onClick={() => toggleOccasion(occ)}
            />
          ))}
        </div>
      </div>

      {/* Nouveautés */}
      <div>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyNew}
            onChange={e => setOnlyNew(e.target.checked)}
            className="accent-pivoine w-3.5 h-3.5"
          />
          <span className="text-sm text-charcoal/65">Nouveautés uniquement</span>
        </label>
      </div>
    </div>
  )
}

/* ── Main shell ── */
export default function BoutiqueShell() {
  const [category,     setCategory]    = useState<Category>('tous')
  const [sortKey,      setSortKey]     = useState<SortKey>('popular')
  const [search,       setSearch]      = useState('')
  const [priceRange,   setPriceRange]  = useState<number | null>(null)
  const [occasions,    setOccasions]   = useState<string[]>([])
  const [onlyNew,      setOnlyNew]     = useState(false)
  const [drawerOpen,   setDrawerOpen]  = useState(false)
  const [gridCols,     setGridCols]    = useState<2 | 3>(3)
  const [sortOpen,     setSortOpen]    = useState(false)

  const toggleOccasion = (occ: string) =>
    setOccasions(prev => prev.includes(occ) ? prev.filter(o => o !== occ) : [...prev, occ])

  const activeFilterCount = (priceRange !== null ? 1 : 0) + occasions.length + (onlyNew ? 1 : 0)

  const clearFilters = () => {
    setPriceRange(null)
    setOccasions([])
    setOnlyNew(false)
  }

  const filtered: Product[] = useMemo(() => {
    let list = [...PRODUCTS]

    if (category !== 'tous') list = list.filter(p => p.category === category)

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q))
    }

    if (priceRange !== null) {
      const { min, max } = PRICE_RANGES[priceRange]
      list = list.filter(p => p.price >= min && p.price < max)
    }

    if (occasions.length > 0) {
      list = list.filter(p => occasions.some(o => p.occasion?.includes(o)))
    }

    if (onlyNew) list = list.filter(p => p.isNew)

    list.sort((a, b) => {
      if (sortKey === 'price-asc')  return a.price - b.price
      if (sortKey === 'price-desc') return b.price - a.price
      if (sortKey === 'new')        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      return b.reviews - a.reviews
    })

    return list
  }, [category, search, priceRange, occasions, onlyNew, sortKey])

  return (
    <div className="min-h-screen bg-[#FAFAF9]">

      {/* Hero banner */}
      <div className="bg-gradient-to-r from-cream to-blush border-b border-blush py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-pivoine font-accent italic text-base mb-1">Notre sélection</p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal mb-2">
            La Boutique
          </h1>
          <p className="text-charcoal/55 text-sm max-w-md">
            {PRODUCTS.length} créations artisanales — bouquets frais, peluches XXL et chocolats maison.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Category tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-200 -mx-1 px-1 overflow-x-auto scrollbar-hide">
          {CATEGORY_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setCategory(tab.value)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all flex-shrink-0 ${
                category === tab.value
                  ? 'border-pivoine text-pivoine'
                  : 'border-transparent text-charcoal/50 hover:text-charcoal'
              }`}
            >
              {tab.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                category === tab.value ? 'bg-pivoine/15 text-pivoine' : 'bg-gray-100 text-charcoal/40'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/35" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher…"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-pivoine bg-white transition-colors"
            />
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-charcoal bg-white hover:border-pivoine transition-colors"
            aria-label="Ouvrir les filtres"
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
            Filtres
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-pivoine text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(o => !o)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-charcoal bg-white hover:border-pivoine transition-colors"
              >
                <ArrowUpDown size={13} aria-hidden="true" />
                <span className="hidden sm:inline">{SORT_OPTIONS.find(o => o.value === sortKey)?.label}</span>
                <ChevronDown size={13} aria-hidden="true" />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-card overflow-hidden z-30 min-w-[200px]">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortKey(opt.value); setSortOpen(false) }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-blush ${
                        sortKey === opt.value ? 'text-pivoine font-semibold bg-blush/50' : 'text-charcoal/70'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid toggle */}
            <div className="hidden sm:flex border border-gray-200 rounded-xl overflow-hidden bg-white">
              {([3, 2] as const).map(n => (
                <button
                  key={n}
                  onClick={() => setGridCols(n)}
                  aria-label={`${n} colonnes`}
                  className={`p-2.5 transition-colors ${gridCols === n ? 'bg-pivoine/10 text-pivoine' : 'text-charcoal/35 hover:text-charcoal'}`}
                >
                  {n === 3 ? <LayoutGrid size={15} aria-hidden="true" /> : <LayoutList size={15} aria-hidden="true" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="text-xs text-charcoal/45 font-medium">Filtres actifs :</span>
            {priceRange !== null && (
              <span className="flex items-center gap-1 bg-pivoine/10 text-pivoine text-xs font-semibold px-2.5 py-1 rounded-full border border-pivoine/20">
                {PRICE_RANGES[priceRange].label}
                <button onClick={() => setPriceRange(null)} aria-label="Supprimer filtre prix">
                  <X size={11} aria-hidden="true" />
                </button>
              </span>
            )}
            {occasions.map(occ => (
              <span key={occ} className="flex items-center gap-1 bg-pivoine/10 text-pivoine text-xs font-semibold px-2.5 py-1 rounded-full border border-pivoine/20">
                {occ.charAt(0).toUpperCase() + occ.slice(1)}
                <button onClick={() => toggleOccasion(occ)} aria-label={`Supprimer filtre ${occ}`}>
                  <X size={11} aria-hidden="true" />
                </button>
              </span>
            ))}
            {onlyNew && (
              <span className="flex items-center gap-1 bg-pivoine/10 text-pivoine text-xs font-semibold px-2.5 py-1 rounded-full border border-pivoine/20">
                Nouveautés
                <button onClick={() => setOnlyNew(false)} aria-label="Supprimer filtre nouveautés">
                  <X size={11} aria-hidden="true" />
                </button>
              </span>
            )}
            <button onClick={clearFilters} className="text-xs text-charcoal/40 hover:text-red-500 transition-colors underline underline-offset-2">
              Tout effacer
            </button>
          </div>
        )}

        {/* Main layout */}
        <div className="flex gap-8">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-card sticky top-8">
              <FiltersContent
                priceRange={priceRange} setPriceRange={setPriceRange}
                occasions={occasions} toggleOccasion={toggleOccasion}
                onlyNew={onlyNew} setOnlyNew={setOnlyNew}
                activeCount={activeFilterCount} onClear={clearFilters}
              />
            </div>
          </aside>

          {/* Product grid */}
          <main className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <Search size={24} className="text-charcoal/25" aria-hidden="true" />
                </div>
                <p className="font-semibold text-charcoal">Aucun résultat</p>
                <p className="text-sm text-charcoal/50 max-w-xs">
                  Essayez d'autres filtres ou élargissez votre recherche.
                </p>
                <button onClick={clearFilters} className="btn-pivoine text-sm py-2.5 px-6">
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs text-charcoal/40 font-medium mb-4">
                  {filtered.length} article{filtered.length > 1 ? 's' : ''}
                </p>
                <div className={`grid gap-4 ${
                  gridCols === 3
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2'
                }`}>
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="font-semibold text-charcoal">Filtrer les produits</p>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Fermer"
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={15} aria-hidden="true" />
              </button>
            </div>
            <FiltersContent
              priceRange={priceRange} setPriceRange={setPriceRange}
              occasions={occasions} toggleOccasion={toggleOccasion}
              onlyNew={onlyNew} setOnlyNew={setOnlyNew}
              activeCount={activeFilterCount} onClear={clearFilters}
            />
            <button
              onClick={() => setDrawerOpen(false)}
              className="btn-pivoine w-full justify-center mt-6 py-3.5"
            >
              Voir {filtered.length} article{filtered.length > 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
