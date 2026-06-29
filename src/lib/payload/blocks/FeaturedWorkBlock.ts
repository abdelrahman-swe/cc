import type { Block } from 'payload'

export const FeaturedWorkBlock: Block = {
  slug: 'featured-work-block',
  labels: {
    singular: 'Featured Work Block',
    plural: 'Featured Work Blocks'
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      localized: true,
      defaultValue: 'أعمالنا الرقمية'
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'قصص نجاح تعكس جودة التنفيذ والأثر'
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true
    },
    {
      name: 'selectionMode',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Featured Case Studies Only', value: 'featured' },
        { label: 'Latest Case Studies', value: 'latest' },
        { label: 'Manual Selection', value: 'manual' }
      ]
    },
    {
      name: 'manualCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.selectionMode === 'manual'
      }
    }
  ]
}
