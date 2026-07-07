import type { Field } from 'payload'

/**
 * Reusable SEO fields block.
 * Use inside a `tabs` layout as a dedicated "SEO" tab, or spread into any
 * collection's `fields` array.
 *
 * Usage in a tab:
 * ```ts
 * { label: 'SEO', name: 'seo', fields: seoFields }
 * ```
 *
 * Usage as a named group inside flat fields:
 * ```ts
 * seoFieldGroup()   // returns a single `group` field named "seo"
 * ```
 */
export const seoFields: Field[] = [
  {
    name: 'metaTitle',
    label: 'Meta Title',
    type: 'text',
    localized: true,
    admin: {
      description: 'Title shown in search engine results and browser tabs. Recommended: 50-60 characters.'
    }
  },
  {
    name: 'metaDescription',
    label: 'Meta Description',
    type: 'textarea',
    localized: true,
    admin: {
      description: 'Description shown in search engine results. Recommended: 150-160 characters.'
    }
  },
  {
    name: 'keywords',
    label: 'Keywords',
    type: 'text',
    localized: true,
    admin: {
      description: 'Comma-separated keywords for SEO.'
    }
  },
  {
    type: 'row',
    fields: [
      {
        name: 'ogTitle',
        label: 'OG Title',
        type: 'text',
        localized: true,
        admin: {
          description: 'Title for social media sharing. Falls back to Meta Title if empty.',
          width: '50%'
        }
      },
      {
        name: 'ogType',
        label: 'OG Type',
        type: 'select',
        defaultValue: 'website',
        options: [
          { label: 'Website', value: 'website' },
          { label: 'Article', value: 'article' }
        ],
        admin: { width: '50%' }
      }
    ]
  },
  {
    name: 'ogDescription',
    label: 'OG Description',
    type: 'textarea',
    localized: true,
    admin: {
      description: 'Description for social media sharing. Falls back to Meta Description if empty.'
    }
  },
  {
    name: 'ogImage',
    label: 'OG Image',
    type: 'relationship',
    relationTo: 'media',
    admin: {
      description: 'Image shown when shared on social media. Recommended: 1200×630px.'
    }
  },
  {
    name: 'twitterCard',
    label: 'Twitter Card Type',
    type: 'select',
    defaultValue: 'summary_large_image',
    options: [
      { label: 'Summary', value: 'summary' },
      { label: 'Summary with Large Image', value: 'summary_large_image' }
    ]
  },
  {
    name: 'canonicalUrl',
    label: 'Canonical URL',
    type: 'text',
    validate: (value: string | null | undefined) => {
      if (!value) return true
      try {
        const parsed = new URL(value)
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return true
        return 'Canonical URL must start with http:// or https://'
      } catch {
        return 'Please enter a valid absolute URL (e.g. https://example.com/page)'
      }
    },
    admin: {
      description: 'Set a custom canonical URL if this content is duplicated from another page. Must be an absolute URL (https://...).'
    }
  },
  {
    type: 'row',
    fields: [
      {
        name: 'noIndex',
        label: 'No Index',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Prevent search engines from indexing this page.',
          width: '50%'
        }
      },
      {
        name: 'noFollow',
        label: 'No Follow',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          description: 'Prevent search engines from following links on this page.',
          width: '50%'
        }
      }
    ]
  },
  {
    name: 'structuredData',
    label: 'Structured Data (JSON-LD)',
    type: 'json',
    admin: {
      description: 'Optional schema.org JSON-LD structured data for rich search results.'
    }
  }
]

/**
 * Returns seoFields wrapped in a named group field called "seo".
 * Useful when you want to add SEO as a flat group instead of a tab.
 */
export function seoFieldGroup(): Field {
  return {
    name: 'seo',
    label: 'SEO',
    type: 'group',
    fields: seoFields
  }
}
