import Link from 'next/link'
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const FOOTER_LINKS = {
  Boutique: [
    { label: 'Bouquets de Fleurs',    href: '/boutique/bouquets' },
    { label: 'Peluches XXL',          href: '/boutique/peluches' },
    { label: 'Chocolats Artisanaux',  href: '/boutique/chocolats' },
    { label: 'Coffrets Cadeaux',      href: '/boutique/coffrets' },
    { label: 'Configurateur',         href: '/configurateur' },
  ],
  Occasions: [
    { label: 'Anniversaire',   href: '/occasions/anniversaire' },
    { label: 'Saint-Valentin', href: '/occasions/saint-valentin' },
    { label: 'Fête des Mères', href: '/occasions/fete-des-meres' },
    { label: 'Mariage',        href: '/occasions/mariage' },
    { label: 'Naissance',      href: '/occasions/naissance' },
  ],
  Informations: [
    { label: 'À propos',              href: '/a-propos' },
    { label: 'Blog & Inspirations',   href: '/blog' },
    { label: 'FAQ',                   href: '/faq' },
    { label: 'Livraison & Retours',   href: '/livraison' },
    { label: 'Programme fidélité',    href: '/fidelite' },
  ],
}

const CERTIFS = [
  { label: 'Fleuriste certifié',     icon: '🌿' },
  { label: 'Chocolat artisanal',     icon: '🍫' },
  { label: 'Livraison éco-friendly', icon: '♻️' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white" role="contentinfo">

      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <circle cx="18" cy="18" r="17" fill="rgba(249,228,236,0.1)" stroke="#B5275C" strokeWidth="1.5"/>
                <path d="M18 8C18 8 14 12 14 16C14 18.2 15.8 20 18 20C20.2 20 22 18.2 22 16C22 12 18 8 18 8Z" fill="#B5275C"/>
                <path d="M11 14C11 14 10 18 13 20C14.8 21.1 17 20.2 18 18.5C19 16.8 18.1 14.6 16.4 13.6C13.4 11.8 11 14 11 14Z" fill="#D4527E"/>
                <path d="M25 14C25 14 26 18 23 20C21.2 21.1 19 20.2 18 18.5C17 16.8 17.9 14.6 19.6 13.6C22.6 11.8 25 14 25 14Z" fill="#D4527E"/>
                <path d="M18 20C18 20 18 24 18 27" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="font-display text-xl font-semibold">Sufi Chocolat</span>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-5">
              Bouquets de fleurs fraîches, peluches géantes et chocolats artisanaux.
              Des cadeaux qui restent gravés dans les cœurs.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-6">
              {[
                { icon: <Phone size={14} />,   text: '+33 1 23 45 67 89' },
                { icon: <Mail  size={14} />,   text: 'bonjour@sufichocolat.fr' },
                { icon: <MapPin size={14} />,  text: 'Paris, France — Livraison nationale' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-white/55 text-sm">
                  <span className="text-pivoine flex-shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {[
                { href: 'https://instagram.com', icon: <Instagram size={16} />, label: 'Instagram' },
                { href: 'https://facebook.com',  icon: <Facebook  size={16} />, label: 'Facebook'  },
                { href: 'https://youtube.com',   icon: <Youtube   size={16} />, label: 'YouTube'   },
                {
                  href: 'https://tiktok.com',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.86 4.86 0 01-1.02-.07z"/>
                    </svg>
                  ),
                  label: 'TikTok',
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-pivoine hover:border-pivoine transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <nav key={category} aria-label={`Navigation ${category}`}>
              <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/55 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Certifications bar */}
      <div className="border-t border-white/8 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6">
          {CERTIFS.map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-white/50 text-xs">
              <span aria-hidden="true">{c.icon}</span>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Sufi. Tous droits réservés.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40">
            {[
              { label: 'CGV',                      href: '/cgv' },
              { label: 'Politique de confidentialité', href: '/confidentialite' },
              { label: 'Mentions légales',          href: '/mentions-legales' },
              { label: 'Cookies',                   href: '/cookies' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-white/70 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Payment icons */}
          <div className="flex items-center gap-2" aria-label="Paiements sécurisés acceptés">
            {['VISA', 'MC', 'AMEX', 'PP'].map((card) => (
              <div
                key={card}
                className="bg-white/10 border border-white/8 rounded px-2 py-1 text-[10px] font-bold text-white/50 tracking-wide"
              >
                {card}
              </div>
            ))}
            <div className="bg-white/10 border border-white/8 rounded px-2 py-1 text-[10px] font-bold text-white/50 tracking-wide flex items-center gap-1">
              🔒 SSL
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
