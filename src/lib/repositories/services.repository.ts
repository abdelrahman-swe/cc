import config from '@payload-config'
import { getPayload } from 'payload'

export type ServiceItem = {
  id: string
  title: string
  description: string
  slug: string
  layout: 'ai-card' | 'globe-card' | 'standard'
  imageUrl?: string
}

export async function getServices(options?: {
  manualIds?: (string | number)[]
  limit?: number
  locale?: string
}): Promise<ServiceItem[]> {
  try {
    const payload = await getPayload({ config })
    const where: any = {}

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
        title: typeof doc.title === 'string' ? doc.title : doc.title?.ar || '',
        description: typeof doc.description === 'string' ? doc.description : doc.description?.ar || '',
        slug: doc.slug || '',
        layout: doc.layout || 'standard',
        imageUrl: doc.image && typeof doc.image === 'object' ? doc.image.url : (doc.imageUrl || undefined)
      }))
    }
  } catch (error) {
    console.warn('Payload services query returned no results:', error)
  }

  return []
}


