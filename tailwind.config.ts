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
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        sage: {
          50:  '#F2F7F2',
          100: '#E3EEE4',
          200: '#C5DAC7',
          300: '#9EC4A2',
          400: '#74A97A',
          500: '#5A8F61',
          600: '#45724C',
          700: '#36583C',
          800: '#284230',
          900: '#1C2E21',
        },
        brown: {
          50:  '#FAF7F4',
          100: '#F2EBE3',
          200: '#E3D4C4',
          300: '#CEBA9E',
          400: '#B39275',
          500: '#926E52',
          600: '#6E5140',
          700: '#4F3A2D',
          800: '#33261D',
          900: '#1E1410',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
