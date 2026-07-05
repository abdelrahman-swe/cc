import type { Block } from 'payload'

export const SolutionsBlock: Block = {
  slug: 'solutions-block',
  labels: {
    singular: 'Solutions Block',
    plural: 'Solutions Blocks'
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      localized: true,
      defaultValue: 'ماذا نقدم'
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'حلول متكاملة مصممة خصيصًا لاحتياجات أعمالك'
    },
    {
      name: 'items',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true
        }
      ],
      defaultValue: [
        { name: 'تصميم المنتجات وتجربة المستخدم' },
        { name: 'هندسة البرمجيات والذكاء الإصطناعي' },
        { name: 'التحول الرقمي والذكاء الاصطناعي' },
        { name: 'تعهيد الكفاءات والفرق التقنية' },
        { name: 'بناء منتجات SaaS' }
      ]
    }
  ]
}
