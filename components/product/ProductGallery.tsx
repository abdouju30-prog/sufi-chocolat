'use client'

import { useState, useRef } from 'react'
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react'

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=900&q=85&auto=format', alt: 'Bouquet Signature Rosa — Vue principale' },
  { src: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=900&q=85&auto=format', alt: 'Bouquet Signature Rosa — Vue de côté' },
  { src: 'https://images.unsplash.com/photo-1470509037663-253d2d33765a?w=900&q=85&auto=format', alt: 'Bouquet Signature Rosa — Détail fleurs' },
  { src: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=900&q=85&auto=format', alt: 'Bouquet Signature Rosa — Emballage cadeau' },
  { src: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=900&q=85&auto=format', alt: 'Bouquet Signature Rosa — En situation' },
]

export default function ProductGallery() {
  const [active,   setActive]   = useState(0)
  const [zoomed,   setZoomed]   = useState(false)
  const [zoomPos,  setZoomPos]  = useState({ x: 50, y: 50 })
  const [wishlisted, setWishlisted] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  const prev = () => setActive(i => (i === 0 ? IMAGES.length - 1 : i - 1))
  const next = () => setActive(i => (i === IMAGES.length - 1 ? 0 : i + 1))

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed || !imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'Bouquet Signature Rosa — Sufi Chocolat', url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="flex flex-col gap-3">

      {/* Main image */}
      <div className="relative">
        <div
          ref={imgRef}
          className={`relative rounded-2xl overflow-hidden bg-cream select-none ${
            zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          style={{ aspectRatio: '4/5' }}
          onClick={() => setZoomed(z => !z)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => zoomed && setZoomed(false)}
          role="img"
          aria-label={IMAGES[active].alt}
        >
          <div
            className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-300"
            style={{
              backgroundImage: `url('${IMAGES[active].src}')`,
              backgroundPosition: zoomed ? `${zoomPos.x}% ${zoomPos.y}%` : 'center',
              transform: zoomed ? 'scale(2)' : 'scale(1)',
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            }}
          />

          {/* Freshness badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs font-semibold text-charcoal">Fraîcheur garantie 7 jours</span>
          </div>

          {/* Bestseller badge */}
          <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            ⚡ Bestseller
          </div>

          {/* Zoom indicator */}
          <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-sm text-white rounded-full p-2 pointer-events-none">
            {zoomed
              ? <ZoomOut size={16} aria-label="Dézoomer" />
              : <ZoomIn  size={16} aria-label="Zoomer" />
            }
          </div>

          {/* Prev / next arrows (mobile-friendly) */}
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-colors lg:hidden"
          >
            <ChevronLeft size={16} className="text-charcoal" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-colors lg:hidden"
          >
            <ChevronRight size={16} className="text-charcoal" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-16 flex flex-col gap-2">
          <button
            onClick={e => { e.stopPropagation(); setWishlisted(w => !w) }}
            aria-label={wishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            aria-pressed={wishlisted}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
          >
            <Heart
              size={16}
              className={wishlisted ? 'fill-pivoine text-pivoine' : 'text-charcoal/60'}
            />
          </button>
          <button
            onClick={e => { e.stopPropagation(); handleShare() }}
            aria-label="Partager ce produit"
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
          >
            <Share2 size={15} className="text-charcoal/60" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div
        className="flex gap-2 overflow-x-auto scrollbar-hide"
        role="tablist"
        aria-label="Vues du produit"
      >
        {IMAGES.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            role="tab"
            aria-selected={active === i}
            aria-label={`Vue ${i + 1} : ${img.alt}`}
            className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              active === i
                ? 'border-pivoine shadow-card scale-105'
                : 'border-transparent hover:border-pivoine/30'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${img.src.replace('w=900', 'w=200')}')` }}
            />
          </button>
        ))}
      </div>

      {/* Dot indicators (mobile) */}
      <div className="flex justify-center gap-1.5 lg:hidden" aria-hidden="true">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${
              active === i ? 'w-5 h-1.5 bg-pivoine' : 'w-1.5 h-1.5 bg-charcoal/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
