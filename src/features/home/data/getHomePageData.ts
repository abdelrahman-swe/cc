import config from '@payload-config'
import { getPayload } from 'payload'

import type {
  BlogPost,
  CaseStudy,
  Cta,
  HomePageData,
  ImageAsset,
  Partner,
  Service,
  Statistic
} from '@/features/home/types/home'
import { routing, type Locale } from '@/i18n/routing'

type MediaLike = {
  url?: string
  alt?: string
}

type Relationship<T> = string | number | T | null | undefined
type LinkLike = {
  label?: unknown
  href?: unknown
}
type HeroCardLike = {
  title?: unknown
  description?: unknown
  kicker?: unknown
  visual?: 'chart' | 'process' | 'button'
}
type TextBlockLike = {
  title?: unknown
  description?: unknown
}

const fallbackLocale = routing.defaultLocale

const asLocale = (value: string): Locale =>
  routing.locales.includes(value as Locale) ? (value as Locale) : fallbackLocale

const text = (value: unknown, fallback = '') =>
  typeof value === 'string' && value.trim().length > 0 ? value : fallback

const cta = (value: unknown, fallback: Cta): Cta => {
  const candidate = value as Partial<Cta> | undefined

  return {
    label: text(candidate?.label, fallback.label),
    href: text(candidate?.href, fallback.href)
  }
}

const mediaAsset = (
  media: Relationship<MediaLike>,
  imageUrl: unknown,
  alt: string
): ImageAsset | undefined => {
  if (media && typeof media === 'object' && media.url) {
    return {
      src: media.url,
      alt: text(media.alt, alt)
    }
  }

  const src = text(imageUrl)

  if (!src) {
    return undefined
  }

  return {
    src,
    alt
  }
}

export async function getHomePageData(localeParam: string): Promise<HomePageData> {
  const locale = asLocale(localeParam)
  const payload = await getPayload({ config })

  const [hero, settings, services, stats, caseStudies, partners, blogPosts] =
    await Promise.all([
      payload.findGlobal({
        slug: 'hero-content',
        depth: 1,
        locale,
        fallbackLocale
      }),
      payload.findGlobal({
        slug: 'homepage-settings',
        depth: 1,
        locale,
        fallbackLocale
      }),
      payload.find({
        collection: 'services',
        depth: 1,
        locale,
        fallbackLocale,
        limit: 12,
        sort: 'order',
        where: {
          isFeatured: {
            equals: true
          }
        }
      }),
      payload.find({
        collection: 'statistics',
        depth: 0,
        locale,
        fallbackLocale,
        limit: 8,
        sort: 'order'
      }),
      payload.find({
        collection: 'case-studies',
        depth: 1,
        locale,
        fallbackLocale,
        limit: 6,
        sort: 'order',
        where: {
          isFeatured: {
            equals: true
          }
        }
      }),
      payload.find({
        collection: 'partners',
        depth: 1,
        locale,
        fallbackLocale,
        limit: 12,
        sort: 'order'
      }),
      payload.find({
        collection: 'blog-posts',
        depth: 1,
        locale,
        fallbackLocale,
        limit: 3,
        sort: '-publishedAt',
        where: {
          isFeatured: {
            equals: true
          }
        }
      })
    ])

  const heroHeadline = hero.headline || {}
  const nav = settings.nav || {}
  const partnersCopy = settings.partners || {}
  const servicesCopy = settings.services || {}
  const whoWeAre = settings.whoWeAre || {}
  const results = settings.results || {}
  const methodology = settings.methodology || {}
  const finalCta = settings.finalCta || {}
  const blog = settings.blog || {}
  const footer = settings.footer || {}

  return {
    locale,
    nav: {
      brand: text(nav.brand, 'Code Clouders'),
      cta: cta(nav.cta, {
        label: 'ابدأ رحلة نموك',
        href: '#contact'
      }),
      links: ((nav.links || []) as LinkLike[]).map((link) => ({
        label: text(link.label),
        href: text(link.href, '#')
      }))
    },
    hero: {
      headline: {
        before: text(heroHeadline.before, 'شريكك التقني لحلــــول'),
        emphasis: text(heroHeadline.emphasis, 'رقميـــــة'),
        after: text(heroHeadline.after, 'تدعم نمو أعمالك')
      },
      subtitle: text(hero.subtitle),
      primaryCta: cta(hero.primaryCta, {
        label: 'احصل على استشارة مجانية',
        href: '#contact'
      }),
      cards: ((hero.cards || []) as HeroCardLike[]).map((card) => ({
        title: text(card.title),
        description: text(card.description),
        kicker: text(card.kicker),
        visual: card.visual || 'chart'
      }))
    },
    partnersCopy: {
      eyebrow: text(partnersCopy.eyebrow),
      heading: text(partnersCopy.heading)
    },
    partners: partners.docs.map<Partner>((partner) => ({
      name: text(partner.name),
      href: text(partner.href, '#'),
      logo: mediaAsset(partner.logo as Relationship<MediaLike>, undefined, text(partner.name))
    })),
    servicesCopy: {
      eyebrow: text(servicesCopy.eyebrow),
      heading: text(servicesCopy.heading)
    },
    services: services.docs.map<Service>((service) => ({
      title: text(service.title),
      description: text(service.description),
      summary: text(service.summary),
      metric: text(service.metric),
      layout: service.layout || 'standard',
      accent: service.accent || 'blue',
      image: mediaAsset(
        service.image as Relationship<MediaLike>,
        service.imageUrl,
        text(service.title)
      )
    })),
    whoWeAre: {
      heading: text(whoWeAre.heading),
      body: text(whoWeAre.body),
      cta: cta(whoWeAre.cta, {
        label: 'اعرف عنا',
        href: '#who-we-are'
      })
    },
    stats: stats.docs.map<Statistic>((stat) => ({
      value: text(stat.value),
      label: text(stat.label),
      description: text(stat.description)
    })),
    whyUs: ((settings.whyUs || []) as TextBlockLike[]).map((item) => ({
      title: text(item.title),
      description: text(item.description)
    })),
    resultsCopy: {
      eyebrow: text(results.eyebrow),
      heading: text(results.heading),
      cta: cta(results.cta, {
        label: 'تصفح جميع المشاريع',
        href: '#featured-work'
      })
    },
    caseStudies: caseStudies.docs.map<CaseStudy>((study) => ({
      title: text(study.title),
      category: text(study.category),
      excerpt: text(study.excerpt),
      href: text(study.href, '#'),
      image: mediaAsset(
        study.image as Relationship<MediaLike>,
        study.imageUrl,
        text(study.title)
      )
    })),
    methodology: {
      eyebrow: text(methodology.eyebrow),
      heading: text(methodology.heading),
      steps: ((methodology.steps || []) as TextBlockLike[]).map((step) => ({
        title: text(step.title),
        description: text(step.description)
      })),
      cta: cta(methodology.cta, {
        label: 'تواصل معنا الآن',
        href: '#contact'
      })
    },
    finalCta: {
      heading: text(finalCta.heading),
      body: text(finalCta.body),
      cta: cta(finalCta.cta, {
        label: 'احصل على استشارة مجانية',
        href: '#contact'
      }),
      image: mediaAsset(undefined, finalCta.imageUrl, text(finalCta.heading))
    },
    blogCopy: {
      eyebrow: text(blog.eyebrow),
      heading: text(blog.heading)
    },
    blogPosts: blogPosts.docs.map<BlogPost>((post) => ({
      title: text(post.title),
      excerpt: text(post.excerpt),
      href: text(post.href, '#'),
      publishedAt: text(post.publishedAt),
      image: mediaAsset(post.image as Relationship<MediaLike>, post.imageUrl, text(post.title))
    })),
    footer: {
      socialTitle: text(footer.socialTitle),
      locationTitle: text(footer.locationTitle),
      location: text(footer.location),
      contactTitle: text(footer.contactTitle),
      email: text(footer.email),
      phone: text(footer.phone),
      copyright: text(footer.copyright)
    }
  }
}
