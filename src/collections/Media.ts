import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    staticURL: '/media',
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
