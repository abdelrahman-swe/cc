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
        sans: ['var(--font-brand)', 'system-ui', 'sans-serif'],
        'serif-display': ['"Thmanyah Serif Display"', 'serif'],
        'serif-text': ['"Thmanyah Serif Text"', 'serif']
      },
      boxShadow: {
        soft: '0 24px 70px rgba(41, 82, 152, 0.10)',
        card: '0 18px 50px rgba(17, 43, 88, 0.08)'
      },
      borderRadius: {
        section: '32px'
      }
    }
  },
  plugins: []
}

export default config
