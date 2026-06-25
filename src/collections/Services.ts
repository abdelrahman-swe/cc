import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    defaultColumns: ['title', 'layout', 'order'],
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
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true
    },
    {
      name: 'summary',
      type: 'textarea',
      localized: true
    },
    {
      name: 'metric',
      type: 'text',
      localized: true
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'standard',
      options: [
        {
          label: 'Featured wide',
          value: 'featured'
        },
        {
          label: 'Standard card',
          value: 'standard'
        },
        {
          label: 'Wide horizontal',
          value: 'wide'
        }
      ],
      required: true
    },
    {
      name: 'accent',
      type: 'select',
      defaultValue: 'blue',
      options: [
        {
          label: 'Blue',
          value: 'blue'
        },
        {
          label: 'Orange',
          value: 'orange'
        },
        {
          label: 'Neutral',
          value: 'neutral'
        }
      ]
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
