export const routing = {
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always'
} as const

export type Locale = (typeof routing.locales)[number]
