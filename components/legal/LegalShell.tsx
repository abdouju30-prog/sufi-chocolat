import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Section {
  title: string
  content: React.ReactNode
}

export default function LegalShell({
  title,
  subtitle,
  lastUpdated,
  sections,
}: {
  title: string
  subtitle: string
  lastUpdated: string
  sections: Section[]
}) {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">

      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-charcoal/40 mb-4" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-pivoine transition-colors">Accueil</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-charcoal/70">{title}</span>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal mb-2">
            {title}
          </h1>
          <p className="text-charcoal/50 text-sm">{subtitle}</p>
          <p className="text-xs text-charcoal/35 mt-3">Dernière mise à jour : {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-8">
          {sections.map((section, i) => (
            <section
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 sm:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-charcoal mb-4 pb-3 border-b border-gray-100">
                {section.title}
              </h2>
              <div className="prose-sm text-charcoal/70 leading-relaxed space-y-3">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
          <Link href="/mentions-legales" className="text-pivoine hover:underline font-medium">Mentions légales</Link>
          <Link href="/cgv" className="text-pivoine hover:underline font-medium">CGV</Link>
          <Link href="/boutique" className="text-charcoal/50 hover:text-charcoal transition-colors">Retour à la boutique</Link>
        </div>
      </div>
    </div>
  )
}
