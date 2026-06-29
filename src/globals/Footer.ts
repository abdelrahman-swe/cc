import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: anyone,
    update: authenticated
  },
  fields: [
    {
      name: 'socialTitle',
      type: 'text',
      localized: true,
      defaultValue: 'تابعنا على وسائل التواصل'
    },
    {
      name: 'locationTitle',
      type: 'text',
      localized: true,
      defaultValue: 'العنوان'
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
      defaultValue: 'المملكة العربية السعودية'
    },
    {
      name: 'contactTitle',
      type: 'text',
      localized: true,
      defaultValue: 'تواصل معنا'
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'info@codeclouders.com'
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+966 55 019 7744'
    },
    {
      name: 'linksTitle',
      type: 'text',
      localized: true,
      defaultValue: 'روابط مهمة'
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      defaultValue: 'جميع الحقوق محفوظة - CodeClouders.'
    }
  ]
}
