import config from '@payload-config'
import { getPayload } from 'payload'

export type PartnerItem = {
  id: string
  name: string
  logoSrc: string
  href?: string
}

const defaultPartners: PartnerItem[] = [
  { id: '1', name: 'noboco', logoSrc: '/images/noboco.svg', href: '#' },
  { id: '2', name: 'Naama', logoSrc: '/images/naama.svg', href: '#' },
  { id: '3', name: 'نفاذ', logoSrc: '/media/nafath.svg', href: '#' },
  { id: '4', name: 'mada', logoSrc: '/images/mada.svg', href: '#' },
  { id: '5', name: 'stc', logoSrc: '/images/stc.svg', href: '#' },
  { id: '6', name: 'SDAIA', logoSrc: '/images/sadia.svg', href: '#' }
]

export async function getPartners(options?: {
  featuredOnly?: boolean
  manualIds?: (string | number)[]
  limit?: number
  locale?: string
}): Promise<PartnerItem[]> {
  try {
    const payload = await getPayload({ config })
    const where: any = {}

    if (options?.manualIds && options.manualIds.length > 0) {
      where.id = { in: options.manualIds }
    }

    const res = await payload.find({
      collection: 'partners',
      depth: 1,
      limit: options?.limit || 12,
      sort: 'order',
      where: Object.keys(where).length > 0 ? where : undefined,
      locale: (options?.locale as any) || 'ar'
    })

    if (res.docs && res.docs.length > 0) {
      return res.docs.map((doc: any) => ({
        id: String(doc.id),
        name: doc.name,
        logoSrc: doc.logo && typeof doc.logo === 'object' ? doc.logo.url : '/images/noboco.svg',
        href: doc.href || '#'
      }))
    }
  } catch (error) {
    console.warn('Payload partners query fallback to defaults:', error)
  }

  return defaultPartners
}
