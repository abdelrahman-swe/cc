import type { Block } from 'payload'

export const SectorsBlock: Block = {
  slug: 'sectors-block',
  labels: {
    singular: 'Sectors Block',
    plural: 'Sectors Blocks'
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      localized: true,
      defaultValue: 'المجالات'
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'خبراتنا في قطاعات متنوعة'
    },
    {
      name: 'sectors',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true
        },
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media'
        }
      ],
      defaultValue: [
        { name: 'الرعاية الصحية' },
        { name: 'القطاع الحكومي' },
        { name: 'التجزئة والتجارة الإلكترونية' },
        { name: 'الخدمات المالية' },
        { name: 'العقارات' },
        { name: 'الخدمات اللوجستية' }
      ]
    }
  ]
}
