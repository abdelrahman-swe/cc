import type { CollectionConfig } from 'payload'

import { authenticated } from '@/payload/access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated
  },
  fields: [
    {
      name: 'name',
      type: 'text'
    }
  ]
}
