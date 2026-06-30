import config from '@payload-config'
import { getPayload } from 'payload'

export type CaseStudyItem = {
  id: string
  title: string
  category: string
  href?: string
  imageUrl: string
  displayMode: 'image' | 'livePreview'
  livePreviewUrl?: string
}

const defaultCaseStudies: CaseStudyItem[] = [
  {
    id: '1',
    title: 'تطوير منصة خدمات سحابية متكاملة لقطاع الرعاية الصحية',
    category: 'نظام سحابي وتطبيق جوال',
    href: '#',
    imageUrl: '/images/case-study-1.svg',
    displayMode: 'image'
  },
  {
    id: '2',
    title: 'إعادة تصميم وتطوير البوابة الرقمية لمنظومة إمداد',
    category: 'تجربة مستخدم وتطوير ويب',
    href: '#',
    imageUrl: '/images/case-study-2.svg',
    displayMode: 'image'
  }
]

export async function getCaseStudies(options?: {
  manualIds?: (string | number)[]
  limit?: number
  locale?: string
}): Promise<CaseStudyItem[]> {
  try {
    const payload = await getPayload({ config })
    const where: any = {}

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
        href: doc.href || '#',
        imageUrl: doc.imageUrl || (doc.image && typeof doc.image === 'object' ? doc.image.url : '/images/case-study-1.svg'),
        displayMode: doc.displayMode || 'image',
        livePreviewUrl: doc.livePreviewUrl || undefined
      }))
    }
  } catch (error) {
    console.warn('Payload case studies query fallback to defaults:', error)
  }

  return defaultCaseStudies
}

