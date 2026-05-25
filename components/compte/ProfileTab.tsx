'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, Lock, CheckCircle2, Eye, EyeOff } from 'lucide-react'

interface FieldProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  autoComplete?: string
  readOnly?: boolean
  rightElement?: React.ReactNode
}

function Field({ id, label, type = 'text', value, onChange, placeholder, autoComplete, readOnly, rightElement }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-charcoal/60 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          readOnly={readOnly}
          className={`w-full border rounded-xl px-4 py-3 text-sm text-charcoal outline-none transition-colors ${
            readOnly
              ? 'bg-gray-50 border-gray-100 text-charcoal/50 cursor-default'
              : 'bg-white border-gray-200 focus:border-pivoine'
          }`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
    </div>
  )
}

export default function ProfileTab() {
  const [firstName, setFirstName] = useState('Sophie')
  const [lastName,  setLastName]  = useState('Martin')
  const [phone,     setPhone]     = useState('06 12 34 56 78')
  const [address,   setAddress]   = useState('12 rue des Fleurs, 75001 Paris')

  const [currentPw, setCurrentPw] = useState('')
  const [newPw,     setNewPw]     = useState('')
  const [showCur,   setShowCur]   = useState(false)
  const [showNew,   setShowNew]   = useState(false)

  const [savedInfo, setSavedInfo]   = useState(false)
  const [savedPw,   setSavedPw]     = useState(false)

  const saveInfo = () => {
    setSavedInfo(true)
    setTimeout(() => setSavedInfo(false), 2500)
  }

  const savePw = () => {
    if (!currentPw || !newPw) return
    setSavedPw(true)
    setCurrentPw('')
    setNewPw('')
    setTimeout(() => setSavedPw(false), 2500)
  }

  return (
    <div className="space-y-8">

      {/* Personal info */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
            <User size={14} className="text-pivoine" aria-hidden="true" />
          </div>
          <h2 className="text-base font-semibold text-charcoal">Informations personnelles</h2>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-card space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="firstName" label="Prénom" value={firstName} onChange={setFirstName} autoComplete="given-name" />
            <Field id="lastName"  label="Nom"    value={lastName}  onChange={setLastName}  autoComplete="family-name" />
          </div>

          <Field
            id="email" label="Email" type="email"
            value="sophie.martin@email.fr" onChange={() => {}}
            readOnly
            rightElement={
              <span className="text-[10px] font-semibold text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                Vérifié
              </span>
            }
          />

          <Field
            id="phone" label="Téléphone" type="tel"
            value={phone} onChange={setPhone}
            placeholder="06 12 34 56 78" autoComplete="tel"
          />

          <Field
            id="address" label="Adresse principale"
            value={address} onChange={setAddress}
            placeholder="12 rue des Fleurs, 75001 Paris" autoComplete="street-address"
            rightElement={<MapPin size={14} className="text-charcoal/30" aria-hidden="true" />}
          />

          <div className="flex justify-end pt-1">
            <button
              onClick={saveInfo}
              className={`btn-pivoine py-2.5 px-6 text-sm transition-all ${savedInfo ? 'bg-green-500 border-green-500' : ''}`}
            >
              {savedInfo
                ? <><CheckCircle2 size={14} /> Enregistré !</>
                : 'Enregistrer les modifications'
              }
            </button>
          </div>
        </div>
      </section>

      {/* Change password */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
            <Lock size={14} className="text-pivoine" aria-hidden="true" />
          </div>
          <h2 className="text-base font-semibold text-charcoal">Mot de passe</h2>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-card space-y-4">
          <Field
            id="currentPw" label="Mot de passe actuel" type={showCur ? 'text' : 'password'}
            value={currentPw} onChange={setCurrentPw}
            autoComplete="current-password"
            rightElement={
              <button
                type="button"
                onClick={() => setShowCur(v => !v)}
                aria-label={showCur ? 'Masquer' : 'Afficher'}
                className="text-charcoal/35 hover:text-pivoine transition-colors"
              >
                {showCur ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
              </button>
            }
          />

          <Field
            id="newPw" label="Nouveau mot de passe" type={showNew ? 'text' : 'password'}
            value={newPw} onChange={setNewPw}
            autoComplete="new-password"
            rightElement={
              <button
                type="button"
                onClick={() => setShowNew(v => !v)}
                aria-label={showNew ? 'Masquer' : 'Afficher'}
                className="text-charcoal/35 hover:text-pivoine transition-colors"
              >
                {showNew ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
              </button>
            }
          />

          {newPw.length > 0 && (
            <div className="flex gap-1" aria-label="Force du mot de passe" role="meter">
              {[1, 2, 3, 4].map(n => (
                <div
                  key={n}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    newPw.length >= n * 3
                      ? n <= 1 ? 'bg-red-400' : n <= 2 ? 'bg-amber-400' : n <= 3 ? 'bg-yellow-400' : 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}

          <div className="flex justify-end pt-1">
            <button
              onClick={savePw}
              disabled={!currentPw || !newPw}
              className={`btn-pivoine py-2.5 px-6 text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all ${savedPw ? 'bg-green-500 border-green-500' : ''}`}
            >
              {savedPw
                ? <><CheckCircle2 size={14} /> Mot de passe modifié</>
                : 'Changer le mot de passe'
              }
            </button>
          </div>
        </div>
      </section>

      {/* Notifications preferences */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 bg-pivoine/10 rounded-lg flex items-center justify-center">
            <Mail size={14} className="text-pivoine" aria-hidden="true" />
          </div>
          <h2 className="text-base font-semibold text-charcoal">Notifications</h2>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-card space-y-4">
          {[
            { id: 'notif-order',  label: 'Mises à jour de commande',  desc: 'Statut, suivi et confirmation de livraison', default: true },
            { id: 'notif-promo',  label: 'Offres et promotions',       desc: 'Codes promo exclusifs et ventes flash',      default: true },
            { id: 'notif-news',   label: 'Nouveautés & inspirations',  desc: 'Nouvelles collections et idées cadeaux',     default: false },
            { id: 'notif-remind', label: 'Rappels anniversaires',      desc: 'Rappels pour les dates importantes',         default: true },
          ].map(item => (
            <label key={item.id} className="flex items-center justify-between gap-4 cursor-pointer group">
              <div>
                <p className="text-sm font-medium text-charcoal group-hover:text-pivoine transition-colors">{item.label}</p>
                <p className="text-xs text-charcoal/45 mt-0.5">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                id={item.id}
                defaultChecked={item.default}
                className="w-4 h-4 accent-pivoine rounded flex-shrink-0"
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  )
}
