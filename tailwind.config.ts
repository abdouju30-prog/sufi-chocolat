import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pivoine: {
          50:  '#FDF2F6',
          100: '#FCE7F0',
          200: '#F9CEE1',
          300: '#F4A7C6',
          400: '#EC72A3',
          500: '#B5275C',
          600: '#9E1F50',
          700: '#841843',
          800: '#6D1438',
          900: '#5A1030',
          DEFAULT: '#B5275C',
        },
        gold: {
          light:   '#DFC47A',
          DEFAULT: '#C9A84C',
          dark:    '#A88A35',
        },
        blush:    '#F9E4EC',
        cream:    '#F7F4F0',
        charcoal: '#1A1A1A',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        accent:  ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-14px) rotate(4deg)' },
          '66%':      { transform: 'translateY(-7px) rotate(-4deg)' },
        },
        petalFall: {
          '0%':   { transform: 'translateY(-40px) translateX(0) rotate(0deg)',   opacity: '0.9' },
          '100%': { transform: 'translateY(110vh) translateX(120px) rotate(800deg)', opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideLeft: {
          '0%':   { transform: 'translateX(40px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0.8)',  opacity: '0' },
          '60%':  { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
      },
      animation: {
        float:          'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out 1.5s infinite',
        'petal-1':      'petalFall 8s  linear 0s   infinite',
        'petal-2':      'petalFall 11s linear 2s   infinite',
        'petal-3':      'petalFall 7s  linear 4s   infinite',
        'petal-4':      'petalFall 13s linear 1s   infinite',
        'petal-5':      'petalFall 9s  linear 5s   infinite',
        shimmer:        'shimmer 2.5s linear infinite',
        'fade-up':      'fadeUp  0.65s ease-out both',
        'fade-in':      'fadeIn  0.5s  ease-out both',
        'scale-in':     'scaleIn 0.5s  ease-out both',
        'slide-left':   'slideLeft 0.55s ease-out both',
        'bounce-in':    'bounceIn 0.6s cubic-bezier(.36,.07,.19,.97) both',
      },
      boxShadow: {
        'card':        '0 4px 24px -4px rgba(181,39,92,0.10)',
        'card-hover':  '0 14px 44px -8px rgba(181,39,92,0.22)',
        'gold':        '0 4px 20px -4px rgba(201,168,76,0.28)',
        'gold-hover':  '0 8px 32px -4px rgba(201,168,76,0.48)',
        'soft':        '0 2px 16px rgba(0,0,0,0.06)',
        'soft-xl':     '0 8px 40px rgba(0,0,0,0.10)',
      },
      backgroundImage: {
        'gradient-pivoine': 'linear-gradient(135deg,#B5275C 0%,#D4527E 100%)',
        'gradient-gold':    'linear-gradient(135deg,#C9A84C 0%,#DFC47A 100%)',
        'gradient-cream':   'linear-gradient(180deg,#FFFFFF 0%,#F7F4F0 100%)',
        'shimmer-gold':     'linear-gradient(90deg,transparent 25%,rgba(201,168,76,0.35) 50%,transparent 75%)',
      },
    },
  },
  plugins: [],
}

export default config
