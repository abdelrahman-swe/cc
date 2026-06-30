import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    defaultColumns: ['title', 'category', 'displayMode', 'order'],
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
      name: 'category',
      type: 'text',
      localized: true,
      required: true
    },
    {
      name: 'displayMode',
      type: 'select',
      defaultValue: 'image',
      required: true,
      options: [
        { label: 'Project Image', value: 'image' },
        { label: 'Live Website Preview', value: 'livePreview' }
      ],
      admin: {
        description: 'Choose whether to display a static image or a live website preview (iframe) for this project.'
      }
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.displayMode !== 'livePreview',
        description: 'Upload or select a project image.'
      }
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.displayMode !== 'livePreview',
        description: 'Optional public or remote image URL used by the homepage card.'
      }
    },
    {
      name: 'livePreviewUrl',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.displayMode === 'livePreview',
        description: 'Full URL of the website to embed as a live preview (e.g. https://example.com).'
      }
    },
    {
      name: 'href',
      type: 'text',
      defaultValue: '#'
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      required: true
    }
  ]
}

