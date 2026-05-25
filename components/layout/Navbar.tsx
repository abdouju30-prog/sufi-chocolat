'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Heart, ShoppingBag, User, ChevronDown } from 'lucide-react'
import { useCart } from '@/components/cart/CartContext'

const NAV_LINKS = [
  { label: 'Boutique',    href: '/boutique',    sub: ['Bouquets', 'Peluches', 'Chocolats', 'Coffrets'] },
  { label: 'Occasions',   href: '/occasions',   sub: ['Anniversaire', 'Saint-Valentin', 'Fête des Mères', 'Mariage'] },
  { label: 'Configurateur', href: '/configurateur', sub: [] },
  { label: 'Blog',        href: '/blog',        sub: [] },
]

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { totalItems, openDrawer } = useCart()
  const wishlistCount = 3

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gradient-pivoine text-white text-center py-2 text-sm font-medium tracking-wide">
        <span className="font-accent italic mr-2 text-gold-light">Offre spéciale</span>
        Livraison offerte dès 65€ d&apos;achat
        <span className="mx-3 opacity-40">|</span>
        Code : <span className="font-semibold text-gold-light">FLORALIA10</span> → -10% première commande
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="transition-transform group-hover:scale-105" aria-hidden="true">
                <circle cx="18" cy="18" r="17" fill="#FDF2F6" stroke="#B5275C" strokeWidth="1.5"/>
                <path d="M18 8C18 8 14 12 14 16C14 18.2 15.8 20 18 20C20.2 20 22 18.2 22 16C22 12 18 8 18 8Z" fill="#B5275C"/>
                <path d="M11 14C11 14 10 18 13 20C14.8 21.1 17 20.2 18 18.5C19 16.8 18.1 14.6 16.4 13.6C13.4 11.8 11 14 11 14Z" fill="#D4527E"/>
                <path d="M25 14C25 14 26 18 23 20C21.2 21.1 19 20.2 18 18.5C17 16.8 17.9 14.6 19.6 13.6C22.6 11.8 25 14 25 14Z" fill="#D4527E"/>
                <path d="M18 20C18 20 18 24 18 27" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M15 25C15 25 16.5 23 18 23C19.5 23 21 25 21 25" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="font-display text-2xl font-semibold text-charcoal tracking-tight">
                Sufi Chocolat
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.sub.length > 0 && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-charcoal hover:text-pivoine hover:bg-blush transition-all duration-200"
                  >
                    {link.label}
                    {link.sub.length > 0 && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.sub.length > 0 && activeDropdown === link.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-2xl shadow-soft-xl border border-blush py-2 w-48 animate-scale-in origin-top">
                      {link.sub.map((item) => (
                        <Link
                          key={item}
                          href={`${link.href}#${item.toLowerCase().replace(' ', '-')}`}
                          className="block px-4 py-2 text-sm text-charcoal hover:text-pivoine hover:bg-blush transition-colors duration-150"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                aria-label="Rechercher"
                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full hover:bg-blush text-charcoal hover:text-pivoine transition-colors duration-200"
              >
                <Search size={18} />
              </button>

              <Link
                href="/compte/wishlist"
                aria-label={`Liste de souhaits (${wishlistCount} articles)`}
                className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-blush text-charcoal hover:text-pivoine transition-colors duration-200"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-pivoine text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={openDrawer}
                aria-label={`Panier (${totalItems} article${totalItems !== 1 ? 's' : ''})`}
                className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-blush text-charcoal hover:text-pivoine transition-colors duration-200"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-pivoine text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link
                href="/compte"
                aria-label="Mon compte"
                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full hover:bg-blush text-charcoal hover:text-pivoine transition-colors duration-200"
              >
                <User size={18} />
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={menuOpen}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-blush text-charcoal hover:text-pivoine transition-colors duration-200 ml-1"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-blush animate-fade-up">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-charcoal hover:text-pivoine hover:bg-blush transition-colors"
                  >
                    {link.label}
                    {link.sub.length > 0 && <ChevronDown size={14} />}
                  </Link>
                  {link.sub.length > 0 && (
                    <div className="pl-6 space-y-0.5">
                      {link.sub.map((item) => (
                        <Link
                          key={item}
                          href={`${link.href}#${item.toLowerCase().replace(' ', '-')}`}
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-charcoal/70 hover:text-pivoine transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-blush">
                <Link
                  href="/compte"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-charcoal hover:text-pivoine hover:bg-blush transition-colors"
                >
                  <User size={16} /> Mon compte
                </Link>
                <Link
                  href="/compte/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-charcoal hover:text-pivoine hover:bg-blush transition-colors"
                >
                  <Heart size={16} /> Ma liste de souhaits
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
