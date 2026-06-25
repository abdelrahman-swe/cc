import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

export const Statistics: CollectionConfig = {
  slug: 'statistics',
  admin: {
    defaultColumns: ['value', 'label', 'order'],
    useAsTitle: 'label'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated
  },
  fields: [
    {
      name: 'value',
      type: 'text',
      localized: true,
      required: true
    },
    {
      name: 'label',
      type: 'text',
      localized: true,
      required: true
    },
    {
      name: 'description',
      type: 'text',
      localized: true
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      required: true
    }
  ]
}
