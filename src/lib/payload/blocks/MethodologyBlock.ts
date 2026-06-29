import type { Block } from 'payload'

export const MethodologyBlock: Block = {
  slug: 'methodology-block',
  labels: {
    singular: 'Methodology Block',
    plural: 'Methodology Blocks'
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      localized: true,
      defaultValue: 'منهجية العمل'
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'خطوات واضحة تضمن نجاح مشروعك من الفكرة إلى الإطلاق'
    },
    {
      name: 'steps',
      type: 'array',
      localized: true,
      minRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true }
      ],
      defaultValue: [
        {
          title: 'تحليل وفهم المشروع',
          description: 'نكتشف الفكرة ونحولها إلى نطاق عمل واضح ومؤشرات نجاح قابلة للقياس.'
        },
        {
          title: 'تخطيط تجربة المستخدم وواجهة الاستخدام',
          description: 'نصمم رحلة استخدام واضحة ومنطقية قبل بدء التطوير.'
        },
        {
          title: 'التطوير والبرمجة',
          description: 'نبني النظام بأفضل الممارسات التقنية لضمان الأداء وقابلية التوسع.'
        },
        {
          title: 'الاختبار والإطلاق',
          description: 'نراجع الأداء وتجربة الاستخدام ونطلق المنتج بثقة.'
        }
      ]
    }
  ]
}
