'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Mail, Lock, Eye, EyeOff, User, ArrowRight,
  CheckCircle2, Flower2, AlertCircle, Phone,
} from 'lucide-react'

type Tab = 'login' | 'signup'

/* ── Shared input ── */
function Field({
  id, label, type = 'text', value, onChange,
  placeholder, autoComplete, error, rightElement, required,
}: {
  id: string; label: string; type?: string; value: string
  onChange: (v: string) => void; placeholder?: string
  autoComplete?: string; error?: string; rightElement?: React.ReactNode
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-charcoal/60 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        <input
          id={id} type={type} value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder} autoComplete={autoComplete}
          required={required}
          className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white ${
            error ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-pivoine'
          } ${rightElement ? 'pr-11' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  )
}

/* ── Social button ── */
function SocialBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2.5 w-full border border-gray-200 rounded-xl py-3 text-sm font-semibold text-charcoal hover:border-pivoine/40 hover:bg-blush/30 transition-all"
    >
      {icon}
      {label}
    </button>
  )
}

/* ══════════════════════════════════════════
   LOGIN FORM
══════════════════════════════════════════ */
function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [showPw,     setShowPw]     = useState(false)
  const [remember,   setRemember]   = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [success,    setSuccess]    = useState(false)
  const [errors,     setErrors]     = useState<Record<string, string>>({})
  const [authError,  setAuthError]  = useState('')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email invalide'
    if (password.length < 6) e.password = 'Mot de passe trop court'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setAuthError('')
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    // Simulate success (any valid-looking email works)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex flex-col items-center text-center py-8 gap-4 animate-fade-up">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce-in">
          <CheckCircle2 size={32} className="text-green-500" aria-hidden="true" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-charcoal">Bienvenue !</h2>
        <p className="text-sm text-charcoal/55">Connexion réussie. Redirection en cours…</p>
        <Link href="/" className="btn-pivoine px-8 py-3 mt-2">
          Retour à l&apos;accueil <ArrowRight size={15} />
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Social */}
      <div className="grid grid-cols-2 gap-3">
        <SocialBtn
          label="Google"
          icon={
            <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          }
        />
        <SocialBtn
          label="Apple"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M17.05 20.28c-.98.95-2.05.86-3.08.42-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.42C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.53 3.99M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/>
            </svg>
          }
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-charcoal/35 font-medium">ou avec votre email</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <Field
        id="login-email" label="Email" type="email"
        value={email} onChange={v => { setEmail(v); setErrors(e => ({ ...e, email: '' })) }}
        placeholder="sophie@email.fr" autoComplete="email" required
        error={errors.email}
        rightElement={<Mail size={15} className="text-charcoal/30" aria-hidden="true" />}
      />

      <Field
        id="login-password" label="Mot de passe"
        type={showPw ? 'text' : 'password'}
        value={password} onChange={v => { setPassword(v); setErrors(e => ({ ...e, password: '' })) }}
        placeholder="••••••••" autoComplete="current-password" required
        error={errors.password}
        rightElement={
          <button type="button" onClick={() => setShowPw(v => !v)}
            aria-label={showPw ? 'Masquer' : 'Afficher'}
            className="text-charcoal/35 hover:text-pivoine transition-colors">
            {showPw ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
          </button>
        }
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
            className="w-3.5 h-3.5 accent-pivoine rounded" />
          <span className="text-xs text-charcoal/55">Se souvenir de moi</span>
        </label>
        <button type="button" className="text-xs text-pivoine hover:underline font-medium">
          Mot de passe oublié ?
        </button>
      </div>

      {authError && (
        <div role="alert" className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
          <AlertCircle size={14} className="text-red-500 flex-shrink-0" aria-hidden="true" />
          <p className="text-xs text-red-700">{authError}</p>
        </div>
      )}

      <button
        type="submit" disabled={loading}
        className={`btn-pivoine w-full justify-center py-3.5 text-base ${loading ? 'opacity-80 cursor-wait' : ''}`}
        aria-busy={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Connexion…
          </span>
        ) : (
          <>Se connecter <ArrowRight size={16} /></>
        )}
      </button>

      <p className="text-center text-sm text-charcoal/50">
        Pas encore de compte ?{' '}
        <button type="button" onClick={onSwitch} className="text-pivoine font-semibold hover:underline">
          Créer un compte
        </button>
      </p>
    </form>
  )
}

/* ══════════════════════════════════════════
   SIGNUP FORM
══════════════════════════════════════════ */
function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [phone,     setPhone]     = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [showPw,    setShowPw]    = useState(false)
  const [terms,     setTerms]     = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [success,   setSuccess]   = useState(false)
  const [errors,    setErrors]    = useState<Record<string, string>>({})

  const pwStrength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3

  const strengthLabel = ['', 'Faible', 'Moyen', 'Fort', 'Très fort']
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-green-500']

  const validate = () => {
    const e: Record<string, string> = {}
    if (!firstName.trim()) e.firstName = 'Prénom requis'
    if (!lastName.trim())  e.lastName  = 'Nom requis'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email invalide'
    if (password.length < 6)  e.password = 'Minimum 6 caractères'
    if (password !== confirm)  e.confirm  = 'Les mots de passe ne correspondent pas'
    if (!terms) e.terms = 'Vous devez accepter les conditions'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1600))
    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex flex-col items-center text-center py-8 gap-4 animate-fade-up">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce-in">
          <CheckCircle2 size={32} className="text-green-500" aria-hidden="true" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-charcoal">
          Bienvenue, {firstName} !
        </h2>
        <p className="text-sm text-charcoal/55 max-w-xs">
          Votre compte a été créé avec succès. Un email de confirmation vous a été envoyé.
        </p>
        <Link href="/" className="btn-pivoine px-8 py-3 mt-2">
          Découvrir la boutique <ArrowRight size={15} />
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Social */}
      <div className="grid grid-cols-2 gap-3">
        <SocialBtn
          label="Google"
          icon={
            <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          }
        />
        <SocialBtn
          label="Apple"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M17.05 20.28c-.98.95-2.05.86-3.08.42-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.42C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.39-1.32 2.76-2.53 3.99M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/>
            </svg>
          }
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-charcoal/35 font-medium">ou avec votre email</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field id="sig-fname" label="Prénom" value={firstName}
          onChange={v => { setFirstName(v); setErrors(e => ({ ...e, firstName: '' })) }}
          placeholder="Sophie" autoComplete="given-name" required error={errors.firstName}
          rightElement={<User size={14} className="text-charcoal/30" aria-hidden="true" />}
        />
        <Field id="sig-lname" label="Nom" value={lastName}
          onChange={v => { setLastName(v); setErrors(e => ({ ...e, lastName: '' })) }}
          placeholder="Martin" autoComplete="family-name" required error={errors.lastName}
        />
      </div>

      <Field id="sig-phone" label="Téléphone" type="tel" value={phone}
        onChange={setPhone} placeholder="06 12 34 56 78" autoComplete="tel"
        rightElement={<Phone size={14} className="text-charcoal/30" aria-hidden="true" />}
      />

      <Field id="sig-email" label="Email" type="email" value={email}
        onChange={v => { setEmail(v); setErrors(e => ({ ...e, email: '' })) }}
        placeholder="sophie@email.fr" autoComplete="email" required error={errors.email}
        rightElement={<Mail size={14} className="text-charcoal/30" aria-hidden="true" />}
      />

      <Field id="sig-pw" label="Mot de passe"
        type={showPw ? 'text' : 'password'} value={password}
        onChange={v => { setPassword(v); setErrors(e => ({ ...e, password: '' })) }}
        placeholder="••••••••" autoComplete="new-password" required error={errors.password}
        rightElement={
          <button type="button" onClick={() => setShowPw(v => !v)}
            aria-label={showPw ? 'Masquer' : 'Afficher'}
            className="text-charcoal/35 hover:text-pivoine transition-colors">
            {showPw ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
          </button>
        }
      />

      {/* Password strength */}
      {password.length > 0 && (
        <div className="-mt-2">
          <div className="flex gap-1 mb-1">
            {[1,2,3,4].map(n => (
              <div key={n} className={`h-1 flex-1 rounded-full transition-all ${n <= pwStrength ? strengthColor[pwStrength] : 'bg-gray-200'}`} />
            ))}
          </div>
          <p className="text-[11px] text-charcoal/40">{strengthLabel[pwStrength]}</p>
        </div>
      )}

      <Field id="sig-confirm" label="Confirmer le mot de passe"
        type="password" value={confirm}
        onChange={v => { setConfirm(v); setErrors(e => ({ ...e, confirm: '' })) }}
        placeholder="••••••••" autoComplete="new-password" required error={errors.confirm}
      />

      {/* Terms */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input type="checkbox" checked={terms} onChange={e => { setTerms(e.target.checked); setErrors(er => ({ ...er, terms: '' })) }}
            className="mt-0.5 w-3.5 h-3.5 accent-pivoine flex-shrink-0" />
          <span className="text-xs text-charcoal/55 leading-relaxed">
            J&apos;accepte les{' '}
            <Link href="#" className="text-pivoine hover:underline">conditions générales</Link>
            {' '}et la{' '}
            <Link href="#" className="text-pivoine hover:underline">politique de confidentialité</Link>
          </span>
        </label>
        {errors.terms && <p role="alert" className="text-red-500 text-xs mt-1">{errors.terms}</p>}
      </div>

      <button
        type="submit" disabled={loading}
        className={`btn-pivoine w-full justify-center py-3.5 text-base ${loading ? 'opacity-80 cursor-wait' : ''}`}
        aria-busy={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Création du compte…
          </span>
        ) : (
          <>Créer mon compte <ArrowRight size={16} /></>
        )}
      </button>

      <p className="text-center text-sm text-charcoal/50">
        Déjà un compte ?{' '}
        <button type="button" onClick={onSwitch} className="text-pivoine font-semibold hover:underline">
          Se connecter
        </button>
      </p>
    </form>
  )
}

/* ══════════════════════════════════════════
   SHELL
══════════════════════════════════════════ */
export default function AuthShell({ defaultTab = 'login' }: { defaultTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(defaultTab)

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Retour à l'accueil">
          <div className="w-7 h-7 bg-gradient-to-br from-pivoine to-rose-400 rounded-full flex items-center justify-center">
            <Flower2 size={14} className="text-white" aria-hidden="true" />
          </div>
          <span className="font-display text-lg font-bold text-charcoal group-hover:text-pivoine transition-colors">
            Sufi Chocolat
          </span>
        </Link>
        <Link href="/" className="text-sm text-charcoal/45 hover:text-charcoal transition-colors">
          Retour à l&apos;accueil
        </Link>
      </div>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {(['login', 'signup'] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-4 text-sm font-semibold transition-all ${
                    tab === t
                      ? 'text-pivoine border-b-2 border-pivoine bg-blush/20'
                      : 'text-charcoal/45 hover:text-charcoal'
                  }`}
                  aria-selected={tab === t}
                  role="tab"
                >
                  {t === 'login' ? 'Se connecter' : 'Créer un compte'}
                </button>
              ))}
            </div>

            {/* Form area */}
            <div className="p-6 sm:p-8">
              {/* Heading */}
              <div className="mb-6">
                <h1 className="font-display text-2xl font-semibold text-charcoal">
                  {tab === 'login' ? 'Bon retour 👋' : 'Rejoignez-nous 🌸'}
                </h1>
                <p className="text-sm text-charcoal/50 mt-1">
                  {tab === 'login'
                    ? 'Connectez-vous pour accéder à vos commandes et favoris.'
                    : 'Créez votre compte et profitez d\'offres exclusives.'}
                </p>
              </div>

              <div key={tab} className="animate-fade-up">
                {tab === 'login'
                  ? <LoginForm  onSwitch={() => setTab('signup')} />
                  : <SignupForm onSwitch={() => setTab('login')}  />
                }
              </div>
            </div>
          </div>

          {/* Trust line */}
          <p className="text-center text-xs text-charcoal/30 mt-6 flex items-center justify-center gap-1.5">
            <Lock size={11} aria-hidden="true" />
            Connexion sécurisée — vos données ne sont jamais partagées
          </p>
        </div>
      </div>
    </div>
  )
}

