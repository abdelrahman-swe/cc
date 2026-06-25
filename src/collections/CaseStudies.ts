import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    defaultColumns: ['title', 'category', 'order'],
    useAsTitle: 'title'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true
    },
    {
      name: 'category',
      type: 'text',
      localized: true,
      required: true
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media'
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'Optional public or remote image URL used by the homepage card.'
      }
    },
    {
      name: 'href',
      type: 'text',
      defaultValue: '#'
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      required: true
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: true
    }
  ]
}
