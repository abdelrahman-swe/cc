import path from 'path'
import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(process.cwd(), 'public/media'),
    imageSizes: [
      {
        name: 'card',
        width: 820,
        height: 620,
        position: 'centre'
      },
      {
        name: 'hero',
        width: 1240,
        height: 760,
        position: 'centre'
      }
    ],
    mimeTypes: ['image/*']
  },
  admin: {
    useAsTitle: 'alt'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: true
    },
    {
      name: 'caption',
      type: 'text',
      localized: true
    }
  ]
}
