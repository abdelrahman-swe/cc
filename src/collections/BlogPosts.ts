import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    defaultColumns: ['title', 'publishedAt'],
    useAsTitle: 'title'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      required: true
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload or select a blog post cover image.'
      }
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'Optional public or remote image URL used by the homepage card.'
      }
    },
    {
      name: 'href',
      type: 'text',
      defaultValue: '#'
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime'
        }
      }
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: true
    }
  ]
}
