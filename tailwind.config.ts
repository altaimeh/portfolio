import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans:  ['Sora', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        ink: '#0A1628',
        royal: {
          950: '#080F1E',
          900: '#0D1A35',
          800: '#112250',
          700: '#162B63',
          600: '#1D3578',
          500: '#254090',
        },
        sapphire: {
          950: '#1A2535',
          900: '#253345',
          800: '#2F4060',
          700: '#3C5070',
          600: '#4A6285',
          500: '#5A749A',
          400: '#7492B5',
          300: '#9AB4CC',
          200: '#BDD0E0',
        },
        quicksand: {
          700: '#A88040',
          600: '#C9A360',
          500: '#D4B478',
          400: '#E0C58F',
          300: '#EAD4A8',
          200: '#F2E4C5',
          100: '#F9F2E3',
        },
        shellstone: {
          900: '#2A2320',
          800: '#3A3330',
          700: '#554B47',
          600: '#7A6E6A',
          500: '#A89590',
          400: '#C8BAB2',
          300: '#D9CBC2',
          200: '#E8DDD7',
          100: '#F2EDE9',
        },
      },
      transitionDuration: {
        '900': '900ms',
      },
      animation: {
        'fade-up':     'fadeUp 0.8s ease forwards',
        'fade-in':     'fadeIn 0.6s ease forwards',
        'blink':       'blink 1s step-end infinite',
        'spin-slow':   'spin 18s linear infinite',
        'spin-slow-r': 'spinR 24s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        spinR: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
