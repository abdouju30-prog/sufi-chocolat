'use client'

import { useState } from 'react'
import { Package, User, Heart, Gift, LogOut, ChevronRight, Flower2, Star } from 'lucide-react'
import OrdersTab  from './OrdersTab'
import ProfileTab from './ProfileTab'
import FavorisTab from './FavorisTab'

const TABS = [
  { id: 'orders',   label: 'Mes commandes', icon: Package, count: 3    },
  { id: 'profile',  label: 'Mon compte',    icon: User,    count: null  },
  { id: 'favoris',  label: 'Mes favoris',   icon: Heart,   count: 4    },
]

export default function AccountShell() {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'favoris'>('orders')

  return (
    <div className="min-h-screen bg-[#FAFAF9]">

      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">

            {/* Avatar + info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-2xl bg-cover bg-center border-2 border-blush shadow-soft"
                  style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=47')" }}
                  role="img"
                  aria-label="Photo de profil de Sophie Martin"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-semibold text-charcoal">
                  Bonjour, Sophie 👋
                </h1>
                <p className="text-sm text-charcoal/50 mt-0.5">
                  Membre depuis janvier 2025
                </p>
              </div>
            </div>

            {/* Loyalty badge */}
            <div className="flex items-center gap-3 bg-cream border border-blush rounded-2xl px-4 py-3">
              <div className="w-9 h-9 bg-gold/15 rounded-xl flex items-center justify-center">
                <Star size={16} className="text-gold fill-gold" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-charcoal/50 font-medium leading-tight">Points fidélité</p>
                <p className="font-display text-xl font-bold text-charcoal leading-tight">840 pts</p>
              </div>
              <div className="ml-2 text-right">
                <p className="text-[10px] text-charcoal/40 font-medium">Statut</p>
                <p className="text-xs font-bold text-gold">Or ✦</p>
              </div>
            </div>
          </div>

          {/* Tab nav */}
          <nav className="flex gap-1 mt-6 -mb-px" aria-label="Sections du compte">
            {TABS.map(tab => {
              const Icon    = tab.icon
              const current = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  role="tab"
                  aria-selected={current}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all rounded-t-lg ${
                    current
                      ? 'border-pivoine text-pivoine bg-blush/30'
                      : 'border-transparent text-charcoal/50 hover:text-charcoal hover:border-gray-200'
                  }`}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${
                      current ? 'bg-pivoine text-white' : 'bg-gray-200 text-charcoal/60'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-start">

          {/* Tab panel */}
          <div
            key={activeTab}
            className="animate-fade-up"
            role="tabpanel"
            aria-label={TABS.find(t => t.id === activeTab)?.label}
          >
            {activeTab === 'orders'  && <OrdersTab />}
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'favoris' && <FavorisTab />}
          </div>

          {/* Right sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-8">

            {/* Quick links */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden">
              <p className="text-xs font-semibold text-charcoal/40 uppercase tracking-wider px-5 pt-4 pb-3">
                Accès rapide
              </p>
              {[
                { icon: Gift,    label: 'Créer un coffret',      href: '/configurateur' },
                { icon: Flower2, label: 'Explorer la boutique',  href: '/boutique'       },
                { icon: Package, label: 'Retours & remboursements', href: '#'            },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors border-t border-gray-50 group"
                >
                  <div className="flex items-center gap-3">
                    <link.icon size={14} className="text-charcoal/40 group-hover:text-pivoine transition-colors" aria-hidden="true" />
                    <span className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors">{link.label}</span>
                  </div>
                  <ChevronRight size={13} className="text-charcoal/25 group-hover:text-pivoine transition-colors" aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Loyalty details */}
            <div className="bg-gradient-to-br from-cream to-blush border border-blush rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star size={14} className="text-gold fill-gold" aria-hidden="true" />
                <p className="text-sm font-semibold text-charcoal">Programme fidélité</p>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-charcoal/60 mb-1.5">
                  <span>840 / 1000 pts vers Platine</span>
                  <span>84%</span>
                </div>
                <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-amber-400 rounded-full transition-all"
                    style={{ width: '84%' }}
                    role="progressbar"
                    aria-valuenow={840}
                    aria-valuemin={0}
                    aria-valuemax={1000}
                  />
                </div>
              </div>
              <p className="text-xs text-charcoal/50">
                Encore <strong className="text-charcoal">160 pts</strong> pour accéder au statut Platine et bénéficier de 15% de réduction permanente.
              </p>
            </div>

            {/* Logout */}
            <button className="w-full flex items-center justify-center gap-2 text-sm text-charcoal/45 hover:text-red-500 transition-colors py-3 border border-gray-200 rounded-xl hover:border-red-200 hover:bg-red-50">
              <LogOut size={14} aria-hidden="true" />
              Se déconnecter
            </button>
          </aside>
        </div>
      </main>
    </div>
  )
}
