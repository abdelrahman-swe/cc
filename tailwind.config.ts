import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './payload.config.ts'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#243A77',
          ink: '#0E1730',
          orange: '#F15722',
          blue: '#5f96ff',
          mist: '#FAFBFF',
          line: '#E7EEF8',
          muted: '#74829a'
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'var(--font-brand)', 'system-ui', 'sans-serif'],
        'ibm-plex': ['"IBM Plex Sans Arabic"', 'sans-serif'],
        'serif-display': ['"Thmanyah Serif Display"', '"thmanyah serif display"', 'serif'],
        'serif-text': ['"Thmanyah Serif Text"', '"thmanyah serif text"', 'serif']
      },
      boxShadow: {
        soft: '0 24px 70px rgba(41, 82, 152, 0.10)',
        card: '0 18px 50px rgba(17, 43, 88, 0.08)'
      },
      borderRadius: {
        section: '32px'
      },
      animation: {
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'blink-cursor': 'blink-cursor 1.2s step-end infinite'
      },
      keyframes: {
        'border-beam': {
          '100%': {
            'offset-distance': '100%'
          }
        },
        'blink-cursor': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' }
        }
      }
    }
  },
  plugins: []
}

export default config
