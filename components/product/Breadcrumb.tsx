import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li>
          <Link href="/" className="text-charcoal/45 hover:text-pivoine transition-colors flex items-center gap-1">
            <Home size={13} aria-hidden="true" />
            <span className="sr-only">Accueil</span>
          </Link>
        </li>

        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight size={13} className="text-charcoal/30" aria-hidden="true" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-charcoal/50 hover:text-pivoine transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
