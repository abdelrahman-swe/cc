import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

export const HeroContent: GlobalConfig = {
  slug: 'hero-content',
  label: 'Hero content',
  access: {
    read: anyone,
    update: authenticated
  },
  fields: [
    {
      name: 'headline',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'before',
          type: 'text',
          defaultValue: 'شريكك التقني لحلــــول'
        },
        {
          name: 'emphasis',
          type: 'text',
          defaultValue: 'رقميـــــة'
        },
        {
          name: 'after',
          type: 'text',
          defaultValue: 'تدعم نمو أعمالك'
        }
      ]
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      defaultValue: 'نصمم ونطور حلولاً وتطبيقات مخصصة لتحسين الكفاءة وتجربة العملاء.'
    },
    {
      name: 'primaryCta',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'احصل على استشارة مجانية'
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '#contact'
        }
      ]
    },
    {
      name: 'cards',
      type: 'array',
      localized: true,
      minRows: 3,
      maxRows: 3,
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
          name: 'kicker',
          type: 'text'
        },
        {
          name: 'visual',
          type: 'select',
          defaultValue: 'chart',
          options: [
            {
              label: 'Chart',
              value: 'chart'
            },
            {
              label: 'Process',
              value: 'process'
            },
            {
              label: 'Button',
              value: 'button'
            }
          ]
        }
      ],
      defaultValue: [
        {
          title: 'نمنحك رؤية أوضح',
          description: 'حوّل بياناتك إلى قرارات قابلة للتنفيذ.',
          kicker: 'تحليل',
          visual: 'chart'
        },
        {
          title: 'نسهل آلية فهم احتياجاتك',
          description: 'نحول متطلباتك إلى حلول رقمية دقيقة ومترابطة.',
          kicker: 'تخطيط',
          visual: 'process'
        },
        {
          title: 'نجعل القرار أسهل',
          description: 'نضع بين يديك تجربة رقمية واضحة ومتكاملة.',
          kicker: 'تنفيذ',
          visual: 'button'
        }
      ]
    }
  ]
}
