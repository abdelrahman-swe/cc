import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    defaultColumns: ['name', 'order'],
    useAsTitle: 'name'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true
    },
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media'
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
    }
  ]
}
