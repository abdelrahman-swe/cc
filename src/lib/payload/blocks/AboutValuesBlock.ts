import type { Block } from 'payload'

export const AboutValuesBlock: Block = {
  slug: 'about-values-block',
  labels: {
    singular: 'About Values Block',
    plural: 'About Values Blocks'
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      localized: true,
      minRows: 4,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true
        },
        {
          name: 'description',
          type: 'textarea',
          required: true
        },
        {
          name: 'bgType',
          type: 'select',
          required: true,
          defaultValue: 'lavender',
          options: [
            { label: 'Lavender (Light Blueish)', value: 'lavender' },
            { label: 'Navy (Dark Blue)', value: 'navy' },
            { label: 'Orange (Accent)', value: 'orange' },
            { label: 'Light Orange', value: 'light-orange' }
          ]
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'target',
          options: [
            { label: 'Target / Mission', value: 'target' },
            { label: 'Eye / Vision', value: 'eye' },
            { label: 'Medal / Distinction', value: 'medal' },
            { label: 'Layer / Offerings', value: 'layer' }
          ]
        }
      ],
      defaultValue: [
        {
          title: 'رسالتنا',
          description: 'نوظف أحدث تقنيات البرمجيات والذكاء الاصطناعي لتقديم حلول مخصصة تجمع بين الجودة، الأمان، والمرونة',
          bgType: 'lavender',
          icon: 'target'
        },
        {
          title: 'رؤيتنا',
          description: 'أن نكون المرجع الأول للحلول البرمجية الذكية في المنطقة، ونقود شركاءنا نحو مستقبل رقمي يتسم بالابتكار والاستدامة',
          bgType: 'navy',
          icon: 'eye'
        },
        {
          title: 'ما يميزنا',
          description: 'شريكك في التحول الرقمي • حلول رقمية ذكية • أنظمة قابلة للتوسع • خبرات تقنية متخصصة',
          bgType: 'orange',
          icon: 'medal'
        },
        {
          title: 'ما نقدمه',
          description: 'نطور حلولاً رقمية ذكية تساعد الشركات على رفع الكفاءة، واتخاذ قرارات أفضل، وتحقيق نمو مستدام',
          bgType: 'light-orange',
          icon: 'layer'
        }
      ]
    }
  ]
}
