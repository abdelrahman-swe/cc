import config from '@payload-config'
import { getPayload } from 'payload'

export type PageDocument = {
  title: string
  slug: string
  hero?: {
    badge?: string
    title?: string
    subtitle?: string
    primaryCta?: { label?: string; href?: string }
    secondaryCta?: { label?: string; href?: string }
  }
  layout?: any[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string
    ogImage?: string
  }
  settings?: {
    transparentHeader?: boolean
    pageTemplate?: 'default' | 'landing' | 'fullWidth'
    breadcrumbVisibility?: boolean
    defaultTheme?: 'light' | 'dark' | 'auto'
    animationToggle?: boolean
    previewImage?: string
    analyticsIdentifiers?: { gtmId?: string; conversionTag?: string }
  }
}

const defaultHomePage: PageDocument = {
  title: 'الرئيسية',
  slug: 'home',
  hero: {
    badge: 'شركة تطوير برمجيات وسحابة متقدمة',
    title: 'نحول أفكارك إلى حلول رقمية تسابق المستقبل',
    subtitle: 'نساعد الشركات والمؤسسات على بناء وتطوير المنتجات الرقمية، الأنظمة السحابية، وتجارب المستخدم الاحترافية بأعلى معايير الجودة والأمان.',
    primaryCta: { label: 'احجز استشارة مجانية', href: '#contact' },
    secondaryCta: { label: 'تصفح خدماتنا', href: '#services' }
  },
  layout: [
    { blockType: 'partners-block', sectionTag: 'شركاء النجاح', selectionMode: 'all' },
    { blockType: 'services-block', sectionTag: 'خدماتنا', title: 'حلول تقنية متكاملة تسرع نمو أعمالك', selectionMode: 'all' },
    { blockType: 'who-we-are-block', sectionTag: 'من نحن', title: 'نبني المستقبل الرقمي بشغف وخبرة استثنائية' },
    { blockType: 'featured-work-block', sectionTag: 'أعمالنا الرقمية', title: 'قصص نجاح تعكس جودة التنفيذ والأثر', selectionMode: 'featured' },
    { blockType: 'methodology-block', sectionTag: 'منهجية العمل', title: 'خطوات واضحة تضمن نجاح مشروعك من الفكرة إلى الإطلاق' },
    { blockType: 'blog-block', sectionTag: 'المدونة التقنية', title: 'مقالات ورؤى حول أحدث التقنيات والتحول الرقمي', selectionMode: 'latest' },
    { blockType: 'final-cta-block', headline: 'هل أنت جاهز لتحويل فكرتك إلى واقع رقمي؟' }
  ],
  seo: {
    metaTitle: 'CodeClouders - شركة تطوير برمجيات وسحابة متقدمة',
    metaDescription: 'حلول رقمية وأنظمة سحابية وتطبيقات جوال عالية الأداء للمؤسسات والشركات.'
  },
  settings: {
    transparentHeader: false,
    pageTemplate: 'default',
    breadcrumbVisibility: false,
    defaultTheme: 'light',
    animationToggle: true
  }
}

export async function getPageBySlug(slug: string, locale = 'ar'): Promise<PageDocument> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'pages' as any,
      depth: 2,
      where: {
        slug: { equals: slug }
      },
      locale: locale as any
    })

    if (res.docs && res.docs.length > 0) {
      const doc = res.docs[0] as any
      return {
        title: doc.title,
        slug: doc.slug,
        hero: doc.hero,
        layout: doc.layout || defaultHomePage.layout,
        seo: doc.seo,
        settings: doc.settings
      }
    }
  } catch (error) {
    console.warn(`Payload page query for '${slug}' fallback to defaults:`, error)
  }

  return defaultHomePage
}
