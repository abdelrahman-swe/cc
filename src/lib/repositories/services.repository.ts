import config from '@payload-config'
import { getPayload } from 'payload'

export type ServiceItem = {
  id: string
  title: string
  description: string
  summary?: string
  metric?: string
  layout: 'featured' | 'standard' | 'wide'
  accent: 'blue' | 'orange' | 'neutral'
  imageUrl?: string
  tags?: string[]
}

const defaultServices: ServiceItem[] = [
  {
    id: '1',
    title: 'تطوير المنصات والأنظمة السحابية',
    description: 'نبني أنظمة سحابية وتطبيقات ويب عالية الأداء معمارية حديثة تضمن الاعتمادية والأمان وقابلية التوسع المستقبلي.',
    summary: 'معمارية سحابية حديثة وقابلة للتوسع',
    metric: 'اعتمادية 99.9%',
    layout: 'featured',
    accent: 'blue',
    imageUrl: '/images/card-1.svg',
    tags: ['Next.js', 'Cloud', 'Microservices']
  },
  {
    id: '2',
    title: 'تطوير تطبيقات الجوال',
    description: 'نطور تطبيقات جوال احترافية لنظامي iOS و Android بتجربة مستخدم سلسة وأداء عالي السرعة.',
    summary: 'تطبيقات native و cross-platform',
    layout: 'standard',
    accent: 'orange',
    imageUrl: '/images/card-2.svg',
    tags: ['iOS', 'Android', 'Flutter']
  },
  {
    id: '3',
    title: 'تصميم تجربة وواجهة المستخدم UX/UI',
    description: 'نصمم واجهات رقمية حديثة توازن بين الجمالية والوضوح وتوفر رحلة استخدام سهلة وممتعة لعملائك.',
    summary: 'تصميم واجهات رقمية معاصرة',
    layout: 'standard',
    accent: 'neutral',
    imageUrl: '/images/card-3.svg',
    tags: ['UX Research', 'Figma', 'UI Design']
  },
  {
    id: '4',
    title: 'الاستشارات التقنية والتحول الرقمي',
    description: 'نقدم استشارات تخصصية لمساعدة المنشآت على تخطيط وتنفيذ استراتيجيات التحول الرقمي بفاعلية.',
    summary: 'استراتيجيات تحول رقمي مدروسة',
    layout: 'wide',
    accent: 'blue',
    imageUrl: '/images/card-4.svg',
    tags: ['Architecture', 'DevOps', 'Consulting']
  }
]

export async function getServices(options?: {
  featuredOnly?: boolean
  manualIds?: (string | number)[]
  limit?: number
  locale?: string
}): Promise<ServiceItem[]> {
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
      collection: 'services',
      depth: 1,
      limit: options?.limit || 12,
      sort: 'order',
      where: Object.keys(where).length > 0 ? where : undefined,
      locale: (options?.locale as any) || 'ar'
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any) => ({
        id: String(doc.id),
        title: doc.title,
        description: doc.description,
        summary: doc.summary,
        metric: doc.metric,
        layout: doc.layout || 'standard',
        accent: doc.accent || 'blue',
        imageUrl: doc.imageUrl || (doc.image && typeof doc.image === 'object' ? doc.image.url : undefined),
        tags: doc.tags || ['Enterprise', 'Cloud']
      }))
    }
  } catch (error) {
    console.warn('Payload services query fallback to defaults:', error)
  }

  return defaultServices
}
