import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: {
    read: anyone,
    update: authenticated
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      localized: true,
      defaultValue: 'Code Clouders'
    },
    {
      name: 'brandLogo',
      type: 'relationship',
      relationTo: 'media'
    },
    {
      name: 'contactEmail',
      type: 'email',
      defaultValue: 'info@codeclouders.com'
    },
    {
      name: 'contactPhone',
      type: 'text',
      defaultValue: '+966 55 019 7744'
    },
    {
      name: 'address',
      type: 'textarea',
      localized: true,
      defaultValue: 'المملكة العربية السعودية'
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'icon', type: 'text' }
      ],
      defaultValue: [
        { platform: 'twitter', url: '#', icon: '/icons/twitter.svg' },
        { platform: 'email', url: 'mailto:info@codeclouders.com', icon: '/icons/email.svg' },
        { platform: 'linkedin', url: '#', icon: '/icons/Vector.svg' },
        { platform: 'website', url: '#', icon: '/icons/mouse.svg' }
      ]
    }
  ]
}
