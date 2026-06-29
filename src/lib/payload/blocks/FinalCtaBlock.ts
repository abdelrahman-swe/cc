import type { Block } from 'payload'

export const FinalCtaBlock: Block = {
  slug: 'final-cta-block',
  labels: {
    singular: 'Final CTA Block',
    plural: 'Final CTA Blocks'
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      localized: true,
      defaultValue: 'هل أنت جاهز لتحويل فكرتك إلى واقع رقمي؟'
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      defaultValue: 'فريقنا جاهز لمساعدتك في تخطيط وتنفيذ حلك الرقمي القادم بأعلى معايير الجودة.'
    },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true, defaultValue: 'تواصل معنا الآن' },
        { name: 'href', type: 'text', defaultValue: '#contact' }
      ]
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', localized: true, defaultValue: 'جدول اجتماعاً مع خبراءنا' },
        { name: 'href', type: 'text', defaultValue: '#contact' }
      ]
    }
  ]
}
