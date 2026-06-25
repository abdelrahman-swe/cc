import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'

import '@/app/globals.css'
import { routing, type Locale } from '@/i18n/routing'

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

export const metadata: Metadata = {
  title: {
    default: 'CodeClouders',
    template: '%s | CodeClouders'
  },
  description: 'Digital products that support business growth'
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const isLocale = (locale: string): locale is Locale =>
  routing.locales.includes(locale as Locale)

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const messages = await getMessages()
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} className={ibmPlexSansArabic.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
