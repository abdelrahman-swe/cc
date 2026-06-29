import type { Block } from 'payload'

export const BlogBlock: Block = {
  slug: 'blog-block',
  labels: {
    singular: 'Blog Block',
    plural: 'Blog Blocks'
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      localized: true,
      defaultValue: 'المدونة التقنية'
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'مقالات ورؤى حول أحدث التقنيات والتحول الرقمي'
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true
    },
    {
      name: 'selectionMode',
      type: 'select',
      defaultValue: 'latest',
      options: [
        { label: 'Latest Posts', value: 'latest' },
        { label: 'Featured Posts Only', value: 'featured' },
        { label: 'Manual Selection', value: 'manual' }
      ]
    },
    {
      name: 'manualPosts',
      type: 'relationship',
      relationTo: 'blog-posts',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.selectionMode === 'manual'
      }
    }
  ]
}
