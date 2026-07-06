import config from '@payload-config'
import { getPayload } from 'payload'

export type BlogPostItem = {
  id: string
  title: string
  excerpt: string
  href?: string
  publishedAt?: string
  imageUrl: string
}

const defaultBlogs: BlogPostItem[] = [
  {
    id: '1',
    title: 'أهمية المعمارية السحابية الحديثة في بناء تطبيقات عالية الاعتمادية',
    excerpt: 'استعراض لأفضل الممارسات التقنية عند تصميم المنصات الرقمية لضمان الأداء الأقصى والتوسع المالي والتنفيذي.',
    href: '#',
    publishedAt: '25 يونيو 2026',
    imageUrl: '/assets/images/blog-1.svg'
  },
  {
    id: '2',
    title: 'كيف تساهم تجربة المستخدم (UX) في زيادت معدلات التحول الرقمي؟',
    excerpt: 'دراسة تحليليّة حول تأثير التصميم المبني على فهم سلوك المستخدم في إنجاح المنتجات البرمجية.',
    href: '#',
    publishedAt: '18 يونيو 2026',
    imageUrl: '/assets/images/blog-2.svg'
  },
  {
    id: '3',
    title: 'معايير أمان وحوكمة البيانات في المشاريع البرمجية المؤسسية',
    excerpt: 'دليل عملي حول كيفية تطبيق أعلى معايير الحماية والتشفير لحماية بيانات المستفيدين والعمليات.',
    href: '#',
    publishedAt: '10 يونيو 2026',
    imageUrl: '/assets/images/blog-3.svg'
  }
]

export async function getBlogPosts(options?: {
  featuredOnly?: boolean
  manualIds?: (string | number)[]
  limit?: number
  locale?: string
}): Promise<BlogPostItem[]> {
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
      collection: 'blog-posts',
      depth: 1,
      limit: options?.limit || 3,
      sort: '-publishedAt',
      where: Object.keys(where).length > 0 ? where : undefined,
      locale: (options?.locale as any) || 'ar'
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any) => ({
        id: String(doc.id),
        title: doc.title,
        excerpt: doc.excerpt,
        href: doc.href || '#',
        publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString('ar-SA') : undefined,
        imageUrl: doc.imageUrl || (doc.image && typeof doc.image === 'object' ? doc.image.url : '/assets/images/blog-1.svg')
      }))
    }
  } catch (error) {
    console.warn('Payload blog posts query fallback to defaults:', error)
  }

  return defaultBlogs
}
