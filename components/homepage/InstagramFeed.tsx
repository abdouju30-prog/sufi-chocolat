'use client'

import { useEffect, useRef } from 'react'
import { Instagram, Heart, ExternalLink } from 'lucide-react'

const IG_POSTS = [
  { id: 1, img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc0b?w=400&q=75&auto=format', likes: 243, large: true  },
  { id: 2, img: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&q=75&auto=format', likes: 187, large: false },
  { id: 3, img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=75&auto=format', likes: 312, large: false },
  { id: 4, img: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&q=75&auto=format', likes: 156, large: false },
  { id: 5, img: 'https://images.unsplash.com/photo-1470509037663-253d2d33765a?w=400&q=75&auto=format', likes: 421, large: false },
  { id: 6, img: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&q=75&auto=format', likes: 298, large: false },
]

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('[data-reveal]').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80)
          })
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-24 bg-white"
      aria-labelledby="instagram-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10" data-reveal>
          <div className="section-reveal inline-flex items-center gap-2 bg-gradient-to-r from-[#E1306C]/10 to-[#F77737]/10 border border-[#E1306C]/15 rounded-full px-4 py-2 mb-4">
            <Instagram size={16} className="text-[#E1306C]" />
            <span className="text-sm font-semibold text-[#E1306C]">@sufi.cadeaux</span>
          </div>
          <h2
            id="instagram-heading"
            className="font-display text-3xl sm:text-4xl font-semibold text-charcoal section-reveal"
          >
            Suivez nos créations
          </h2>
          <p className="text-charcoal/60 text-base mt-2 section-reveal">
            Chaque jour de nouvelles créations, de l&apos;inspiration et des coulisses de notre atelier
          </p>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 auto-rows-fr" style={{ gridTemplateRows: 'repeat(2, 200px)' }}>
          {IG_POSTS.map((post, i) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className={`section-reveal relative overflow-hidden rounded-2xl group cursor-pointer ${
                post.large
                  ? 'col-span-1 md:col-span-2 row-span-2'
                  : 'col-span-1 row-span-1'
              }`}
              aria-label={`Voir le post Instagram (${post.likes} j'aime)`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${post.img}')` }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <Heart size={post.large ? 28 : 20} className="fill-white text-white" />
                  <span className="text-white font-semibold text-sm">{post.likes}</span>
                </div>
              </div>

              {/* External link icon */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <ExternalLink size={12} className="text-white" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8" data-reveal>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="section-reveal inline-flex items-center gap-2 border-2 border-[#E1306C]/30 text-[#E1306C] rounded-full px-6 py-3 text-sm font-semibold hover:bg-[#E1306C]/5 hover:border-[#E1306C] transition-all duration-200"
          >
            <Instagram size={16} />
            Suivre @sufi.cadeaux
          </a>
        </div>
      </div>
    </section>
  )
}
