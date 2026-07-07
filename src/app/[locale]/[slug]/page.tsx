import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import config from '@payload-config'
import { getPayload } from 'payload'

import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { RenderBlocks } from '@/features/pages/components/RenderBlocks'
import { resolveBlocks } from '@/lib/repositories/blocks.resolver'
import { routing, type Locale } from '@/i18n/routing'

const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export const revalidate = 3600 // Caches and revalidates pages every hour

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

async function getPageBySlug(slug: string, locale: Locale) {
  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: slug }
      },
      locale,
      fallbackLocale: fallbackLocale,
      depth: 2,
      limit: 1
    })

    return result.docs[0] || null
  } catch (error) {
    console.warn(`Could not fetch page '${slug}' from CMS:`, error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = asLocale(localeParam)
  const page = await getPageBySlug(slug, locale)

  if (!page) {
    return {}
  }

  const seo = (page as any).seo || {}
  const title = seo.metaTitle || page.title || 'CodeClouders'
  const description = seo.metaDescription || 'Digital products that support business growth'

  const canonical = seo.canonicalUrl && isValidUrl(seo.canonicalUrl) ? seo.canonicalUrl : undefined

  return {
    title,
    description,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow
    },
    alternates: {
      canonical
    }
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'pages',
      limit: 100,
      depth: 0
    })

    const params: { locale: string; slug: string }[] = []

    res.docs.forEach((doc) => {
      if (doc.slug && doc.slug !== 'home') {
        routing.locales.forEach((locale) => {
          params.push({
            locale,
            slug: doc.slug
          })
        })
      }
    })

    return params
  } catch (error) {
    console.error('Error in generateStaticParams for slug pages:', error)
    return []
  }
}

export default async function SlugPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params
  const locale = asLocale(localeParam)
  const [page, nav, footer] = await Promise.all([
    getPageBySlug(slug, locale),
    getNavigation(locale),
    getFooter(locale)
  ])

  if (!page) {
    notFound()
  }

  const layout = await resolveBlocks((page as any).layout, locale)

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="overflow-x-hidden bg-surface text-foreground transition-colors duration-300">
      <Header
        brand={nav?.brand ?? undefined}
        links={(nav?.links as any[]) ?? undefined}
        cta={nav?.cta as any ?? undefined}
      />
      <main>
        <RenderBlocks blocks={layout} />
      </main>
      <Footer data={footer} />
    </div>
  )
}

