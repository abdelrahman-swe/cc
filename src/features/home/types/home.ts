import type { Locale } from '@/i18n/routing'

export type ImageAsset = {
  src: string
  alt: string
}

export type Cta = {
  label: string
  href: string
}

export type SectionCopy = {
  eyebrow?: string
  heading: string
}

export type HeroCard = {
  title: string
  description: string
  kicker?: string
  visual: 'chart' | 'process' | 'button'
}

export type HeroContent = {
  headline: {
    before: string
    emphasis: string
    after: string
  }
  subtitle: string
  primaryCta: Cta
  cards: HeroCard[]
}

export type NavLink = Cta

export type NavigationContent = {
  brand: string
  cta: Cta
  links: NavLink[]
}

export type Partner = {
  name: string
  href: string
  logo?: ImageAsset
}

export type Service = {
  title: string
  description: string
  summary?: string
  metric?: string
  layout: 'featured' | 'standard' | 'wide'
  accent: 'blue' | 'orange' | 'neutral'
  image?: ImageAsset
}

export type Statistic = {
  value: string
  label: string
  description?: string
}

export type WhyUsItem = {
  title: string
  description: string
}

export type CaseStudy = {
  title: string
  category: string
  excerpt?: string
  href: string
  image?: ImageAsset
}

export type MethodologyStep = {
  title: string
  description: string
}

export type BlogPost = {
  title: string
  excerpt: string
  href: string
  publishedAt?: string
  image?: ImageAsset
}

export type FooterContent = {
  socialTitle: string
  locationTitle: string
  location: string
  contactTitle: string
  email: string
  phone: string
  copyright: string
}

export type HomePageData = {
  locale: Locale
  nav: NavigationContent
  hero: HeroContent
  partnersCopy: SectionCopy
  partners: Partner[]
  servicesCopy: SectionCopy
  services: Service[]
  whoWeAre: {
    heading: string
    body: string
    cta: Cta
  }
  stats: Statistic[]
  whyUs: WhyUsItem[]
  resultsCopy: SectionCopy & {
    cta: Cta
  }
  caseStudies: CaseStudy[]
  methodology: SectionCopy & {
    steps: MethodologyStep[]
    cta: Cta
  }
  finalCta: {
    heading: string
    body: string
    cta: Cta
    image?: ImageAsset
  }
  blogCopy: SectionCopy
  blogPosts: BlogPost[]
  footer: FooterContent
}
