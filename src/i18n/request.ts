import { getRequestConfig } from 'next-intl/server'

import { routing, type Locale } from './routing'

const isLocale = (value: string | undefined): value is Locale =>
  routing.locales.includes(value as Locale)

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = isLocale(requested) ? requested : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
