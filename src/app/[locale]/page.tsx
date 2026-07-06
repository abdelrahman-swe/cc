import type { Metadata } from 'next'
import config from '@payload-config'
import { getPayload } from 'payload'

import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { LiteralHomePage } from '@/features/home/LiteralHomePage'
import { RenderBlocks } from '@/features/pages/components/RenderBlocks'
import { resolveBlocks } from '@/lib/repositories/blocks.resolver'
import { routing, type Locale } from '@/i18n/routing'

export const revalidate = 3600 // Caches and revalidates home page every hour

const fallbackLocale = routing.defaultLocale

const asLocale = (value: string): Locale =>
  routing.locales.includes(value as Locale) ? (value as Locale) : fallbackLocale

async function getNavigation(locale: Locale) {
  try {
    const payload = await getPayload({ config })
    const nav = await payload.findGlobal({
      slug: 'navigation',
      locale,
      fallbackLocale: fallbackLocale
    })
    return nav
  } catch {
    return null
  }
}

async function getFooter(locale: Locale) {
  try {
    const payload = await getPayload({ config })
    const footer = await payload.findGlobal({
      slug: 'footer',
      locale,
      fallbackLocale: fallbackLocale
    })
    return footer
  } catch {
    return null
  }
}

async function getHomePageFromCMS(locale: Locale) {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: 'home' }
      },
      locale,
      fallbackLocale: fallbackLocale,
      depth: 2,
      limit: 1
    })

    return result.docs[0] || null
  } catch (error) {
    console.warn('Payload / MongoDB connection offline or timed out, using fallback homepage:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = asLocale(localeParam)
  const page = await getHomePageFromCMS(locale)

  if (!page) {
    return {
      title: 'CodeClouders',
      description: 'Digital products that support business growth'
    }
  }

  const seo = (page as any).seo || {}
  const title = seo.metaTitle || page.title || 'CodeClouders'
  const description = seo.metaDescription || 'Digital products that support business growth'

  return {
    title,
    description,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow
    },
    alternates: {
      canonical: seo.canonicalUrl || undefined
    }
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = asLocale(localeParam)
  const [page, nav, footer] = await Promise.all([
    getHomePageFromCMS(locale),
    getNavigation(locale),
    getFooter(locale)
  ])

  if (!page) {
    return <LiteralHomePage data={{ nav, footer } as any} />
  }

  const layout = await resolveBlocks((page as any).layout, locale)

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="overflow-x-hidden bg-surface text-foreground transition-colors duration-300">
      <Header
        brand={nav?.brand ?? undefined}
        links={(nav?.links as any[]) ?? undefined}
        cta={nav?.cta as any ?? undefined}
      />
      <RenderBlocks blocks={layout} />
      <Footer data={footer} />
    </div>
  )
}


