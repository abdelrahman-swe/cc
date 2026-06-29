import type { Block } from 'payload'

export const PartnersBlock: Block = {
  slug: 'partners-block',
  labels: {
    singular: 'Partners Block',
    plural: 'Partners Blocks'
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      localized: true,
      defaultValue: 'شركاء النجاح'
    },
    {
      name: 'selectionMode',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All Partners', value: 'all' },
        { label: 'Featured Partners Only', value: 'featured' },
        { label: 'Manual Selection', value: 'manual' }
      ]
    },
    {
      name: 'manualPartners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.selectionMode === 'manual'
      }
    }
  ]
}
