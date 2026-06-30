import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'
import { seoFields } from '@/payload/fields/seoFields'

function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    defaultColumns: ['title', 'layout', 'slug', 'order'],
    useAsTitle: 'title'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (data && !data.slug && data.title && typeof data.title === 'string') {
          data.slug = slugify(data.title)
        }
        return data
      }
    ]
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              label: 'Service Title',
              type: 'text',
              localized: true,
              required: true
            },
            {
              name: 'description',
              label: 'Service Description',
              type: 'textarea',
              localized: true,
              required: true
            },
            {
              name: 'image',
              label: 'Service Image',
              type: 'relationship',
              relationTo: 'media',
              admin: {
                description: 'Main image displayed on the service card.'
              }
            }
          ]
        },
        {
          label: 'SEO',
          name: 'seo',
          fields: seoFields
        }
      ]
    },
    // --- Sidebar fields ---
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from title. Edit to customize.'
      }
    },
    {
      name: 'layout',
      label: 'Card Layout',
      type: 'select',
      defaultValue: 'standard',
      options: [
        {
          label: 'AI Card (Featured with mascot)',
          value: 'ai-card'
        },
        {
          label: 'Globe Card (Wide with globe)',
          value: 'globe-card'
        },
        {
          label: 'Standard Card',
          value: 'standard'
        }
      ],
      required: true,
      admin: {
        position: 'sidebar',
        description: 'AI Card spans 2 cols, Globe Card spans full width.'
      }
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.'
      }
    }
  ]
}

