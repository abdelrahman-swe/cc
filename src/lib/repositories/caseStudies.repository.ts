import config from '@payload-config'
import { getPayload } from 'payload'

export type CaseStudyItem = {
  id: string
  title: string
  category: string
  excerpt?: string
  href?: string
  imageUrl: string
}

const defaultCaseStudies: CaseStudyItem[] = [
  {
    id: '1',
    title: 'تطوير منصة خدمات سحابية متكاملة لقطاع الرعاية الصحية',
    category: 'نظام سحابي وتطبيق جوال',
    excerpt: 'بناء معمارية سحابية آمنة تخدم آلاف المستخدمين يومياً بتكامل كامل مع الأنظمة الحكومية.',
    href: '#',
    imageUrl: '/images/case-study-1.svg'
  },
  {
    id: '2',
    title: 'إعادة تصميم وتطوير البوابة الرقمية لمنظومة إمداد',
    category: 'تجربة مستخدم وتطوير ويب',
    excerpt: 'رفع كفاءة العمليات وتسهيل رحلة المستخدم للحصول على الخدمات بسرعة وسلاسة.',
    href: '#',
    imageUrl: '/images/case-study-2.svg'
  }
]

export async function getCaseStudies(options?: {
  featuredOnly?: boolean
  manualIds?: (string | number)[]
  limit?: number
  locale?: string
}): Promise<CaseStudyItem[]> {
  try {
    const payload = await getPayload({ config })
    const where: any = {}

    if (options?.featuredOnly) {
      where.isFeatured = { equals: true }
    }

    if (options?.manualIds && options.manualIds.length > 0) {
      where.id = { in: options.manualIds }
    }

    const res = await payload.find({
      collection: 'case-studies',
      depth: 1,
      limit: options?.limit || 6,
      sort: 'order',
      where: Object.keys(where).length > 0 ? where : undefined,
      locale: (options?.locale as any) || 'ar'
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any) => ({
        id: String(doc.id),
        title: doc.title,
        category: doc.category,
        excerpt: doc.excerpt,
        href: doc.href || '#',
        imageUrl: doc.imageUrl || (doc.image && typeof doc.image === 'object' ? doc.image.url : '/images/case-study-1.svg')
      }))
    }
  } catch (error) {
    console.warn('Payload case studies query fallback to defaults:', error)
  }

  return defaultCaseStudies
}
