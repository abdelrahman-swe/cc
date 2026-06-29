import type { Block } from 'payload'

export const StatisticsBlock: Block = {
  slug: 'statistics-block',
  labels: {
    singular: 'Statistics Block',
    plural: 'Statistics Blocks'
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      localized: true,
      defaultValue: 'أرقامنا'
    },
    {
      name: 'title',
      type: 'text',
      localized: true
    },
    {
      name: 'selectionMode',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All Statistics', value: 'all' },
        { label: 'Manual Selection', value: 'manual' }
      ]
    },
    {
      name: 'manualStats',
      type: 'relationship',
      relationTo: 'statistics',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.selectionMode === 'manual'
      }
    }
  ]
}
