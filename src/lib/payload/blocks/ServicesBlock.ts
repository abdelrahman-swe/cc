import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services-block',
  labels: {
    singular: 'Services Block',
    plural: 'Services Blocks'
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      localized: true,
      defaultValue: 'خدماتنا'
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'حلول تقنية متكاملة تسرع نمو أعمالك'
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true
    },
    {
      name: 'selectionMode',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All Services', value: 'all' },
        { label: 'Manual Selection', value: 'manual' }
      ]
    },
    {
      name: 'manualServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.selectionMode === 'manual'
      }
    }
  ]
}
