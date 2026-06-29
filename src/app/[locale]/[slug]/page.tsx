import { notFound } from 'next/navigation'

import config from '@payload-config'
import { getPayload } from 'payload'

import { Header } from '@/components/shared/Header'
import { RenderBlocks } from '@/features/pages/components/RenderBlocks'
import { routing, type Locale } from '@/i18n/routing'

const fallbackLocale = routing.defaultLocale

const asLocale = (value: string): Locale =>
  routing.locales.includes(value as Locale) ? (value as Locale) : fallbackLocale

type PageProps = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

async function getNavigation(locale: Locale) {
  const payload = await getPayload({ config })
  try {
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

async function getPageBySlug(slug: string, locale: Locale) {
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
}

export default async function SlugPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params
  const locale = asLocale(localeParam)
  const [page, nav] = await Promise.all([
    getPageBySlug(slug, locale),
    getNavigation(locale)
  ])

  if (!page) {
    notFound()
  }

  const layout = (page as any).layout

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="overflow-x-hidden bg-white text-[#0E1730]">
      <Header
        brand={nav?.brand ?? undefined}
        links={(nav?.links as any[]) ?? undefined}
        cta={nav?.cta as any ?? undefined}
      />
      <RenderBlocks blocks={layout} />
    </div>
  )
}
