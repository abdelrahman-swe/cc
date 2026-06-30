import { getServices } from './services.repository'
import { getPartners } from './partners.repository'
import { getCaseStudies } from './caseStudies.repository'
import { getBlogPosts } from './blogs.repository'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function resolveBlocks(blocks?: any[], locale: 'ar' | 'en' | 'all' = 'ar'): Promise<any[]> {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return []
  }

  const resolvedBlocks = await Promise.all(
    blocks.map(async (block) => {
      if (!block || typeof block !== 'object') return block

      const blockType = block.blockType

      // 1. Services Block
      if (blockType === 'services-block') {
        const cloned = { ...block }
        if (block.selectionMode === 'manual') {
          if (Array.isArray(block.manualServices) && block.manualServices.length > 0) {
            const first = block.manualServices[0]
            if (typeof first === 'object' && first !== null && first.title) {
              cloned.items = block.manualServices.map((doc: any) => ({
                id: String(doc.id || doc._id),
                title: typeof doc.title === 'string' ? doc.title : doc.title?.[locale] || doc.title?.ar || '',
                description: typeof doc.description === 'string' ? doc.description : doc.description?.[locale] || doc.description?.ar || '',
                slug: doc.slug || '',
                layout: doc.layout || 'standard',
                imageUrl: doc.image && typeof doc.image === 'object' ? (doc.image.url || doc.image.src) : (doc.imageUrl || undefined)
              }))
            } else {
              const ids = block.manualServices.map((item: any) => (typeof item === 'object' ? item.id : item))
              cloned.items = await getServices({ manualIds: ids, locale })
            }
          } else {
            cloned.items = []
          }
        } else {
          cloned.items = await getServices({ locale })
        }
        return cloned
      }

      // 2. Partners Block
      if (blockType === 'partners-block') {
        const cloned = { ...block }
        if (block.selectionMode === 'manual') {
          if (Array.isArray(block.manualPartners) && block.manualPartners.length > 0) {
            const first = block.manualPartners[0]
            if (typeof first === 'object' && first !== null && first.name) {
              cloned.items = block.manualPartners.map((doc: any) => ({
                id: String(doc.id || doc._id),
                name: doc.name,
                logoSrc: doc.logo && typeof doc.logo === 'object' ? doc.logo.url : '/images/noboco.svg',
                href: doc.href || '#'
              }))
            } else {
              const ids = block.manualPartners.map((item: any) => (typeof item === 'object' ? item.id : item))
              cloned.items = await getPartners({ manualIds: ids, locale })
            }
          } else {
            cloned.items = []
          }
        } else if (block.selectionMode === 'featured') {
          cloned.items = await getPartners({ featuredOnly: true, locale })
        } else {
          cloned.items = await getPartners({ locale })
        }
        return cloned
      }

      // 3. Who We Are Block
      if (blockType === 'who-we-are-block') {
        const cloned = { ...block }
        cloned.heading = block.title
        cloned.body = block.description
        if (Array.isArray(block.whyCards)) {
          cloned.whyUs = block.whyCards.map((item: any) => ({
            icon: item.icon,
            title: item.title,
            description: item.description
          }))
        }
        // Fetch statistics for Who We Are block
        try {
          const payload = await getPayload({ config })
          const res = await payload.find({
            collection: 'statistics',
            sort: 'order',
            locale,
            depth: 1
          })
          if (res.docs && res.docs.length > 0) {
            cloned.stats = res.docs.map((doc: any) => ({
              value: doc.value,
              label: doc.label,
              description: doc.description || ''
            }))
          }
        } catch (e) {
          console.warn('Failed to fetch statistics for Who We Are Block:', e)
        }
        return cloned
      }

      // 4. Methodology Block
      if (blockType === 'methodology-block') {
        const cloned = { ...block }
        cloned.heading = block.title
        return cloned
      }

      // 5. Featured Work (Case Studies) Block
      if (blockType === 'featured-work-block') {
        const cloned = { ...block }
        cloned.heading = block.title
        if (block.selectionMode === 'manual') {
          if (Array.isArray(block.manualCaseStudies) && block.manualCaseStudies.length > 0) {
            const first = block.manualCaseStudies[0]
            if (typeof first === 'object' && first !== null && first.title) {
              cloned.items = block.manualCaseStudies.map((doc: any) => ({
                id: String(doc.id || doc._id),
                title: doc.title,
                category: doc.category,
                href: doc.href || '#',
                imageUrl: doc.imageUrl || (doc.image && typeof doc.image === 'object' ? doc.image.url : '/images/case-study-1.svg'),
                displayMode: doc.displayMode || 'image',
                livePreviewUrl: doc.livePreviewUrl || undefined
              }))
            } else {
              const ids = block.manualCaseStudies.map((item: any) => (typeof item === 'object' ? item.id : item))
              cloned.items = await getCaseStudies({ manualIds: ids, locale })
            }
          } else {
            cloned.items = []
          }
        } else {
          cloned.items = await getCaseStudies({ locale })
        }
        return cloned
      }

      // 6. Blog Posts Block
      if (blockType === 'blog-block') {
        const cloned = { ...block }
        cloned.heading = block.title
        if (block.selectionMode === 'manual') {
          if (Array.isArray(block.manualPosts) && block.manualPosts.length > 0) {
            const first = block.manualPosts[0]
            if (typeof first === 'object' && first !== null && first.title) {
              cloned.items = block.manualPosts.map((doc: any) => ({
                id: String(doc.id || doc._id),
                title: doc.title,
                excerpt: doc.excerpt || '',
                publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString('ar-SA') : undefined,
                imageUrl: doc.image && typeof doc.image === 'object' ? doc.image.url : '/images/blog-1.svg'
              }))
            } else {
              const ids = block.manualPosts.map((item: any) => (typeof item === 'object' ? item.id : item))
              cloned.items = await getBlogPosts({ manualIds: ids, locale })
            }
          } else {
            cloned.items = []
          }
        } else if (block.selectionMode === 'featured') {
          cloned.items = await getBlogPosts({ featuredOnly: true, locale })
        } else {
          cloned.items = await getBlogPosts({ locale })
        }
        return cloned
      }

      // 7. Statistics Block
      if (blockType === 'statistics-block') {
        const cloned = { ...block }
        try {
          const payload = await getPayload({ config })
          let dbStats = []
          if (block.selectionMode === 'manual' && Array.isArray(block.manualStats) && block.manualStats.length > 0) {
            const ids = block.manualStats.map((item: any) => (typeof item === 'object' ? item.id : item))
            const res = await payload.find({
              collection: 'statistics',
              where: { id: { in: ids } },
              locale,
              depth: 1
            })
            dbStats = res.docs
          } else {
            const res = await payload.find({
              collection: 'statistics',
              sort: 'order',
              locale,
              depth: 1
            })
            dbStats = res.docs
          }
          cloned.stats = dbStats.map((doc: any) => {
            const numericValue = Number(String(doc.value).replace(/\D/g, '')) || 0
            const suffix = String(doc.value).replace(/[0-9]/g, '')
            return {
              value: numericValue,
              suffix: suffix || '',
              label: doc.label
            }
          })
        } catch (e) {
          console.warn('Failed to resolve statistics for Statistics Block:', e)
        }
        return cloned
      }

      return block
    })
  )

  return resolvedBlocks
}
