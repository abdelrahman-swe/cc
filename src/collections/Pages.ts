import type { CollectionConfig } from 'payload'

import { blocks } from '@/lib/payload/blocks'
import { anyone, authenticated } from '@/payload/access'
import { seoFields } from '@/payload/fields/seoFields'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      index: true,
      required: true,
      unique: true
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            {
              name: 'type',
              label: 'Hero Style / Type',
              type: 'select',
              defaultValue: 'standard',
              options: [
                { label: 'Standard Page Hero', value: 'standard' },
                { label: 'Homepage Interactive Special Hero', value: 'homepage' },
                { label: 'No Hero (None)', value: 'none' }
              ]
            },

            // --- STANDARD HERO FIELDS ---
            {
              name: 'badge',
              type: 'text',
              localized: true,
              defaultValue: 'شركة تطوير برمجيات وسحابة متقدمة',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'standard'
              }
            },
            {
              name: 'title',
              type: 'text',
              localized: true,
              defaultValue: 'نحول أفكارك إلى حلول رقمية تسابق المستقبل',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'standard'
              }
            },
            {
              name: 'subtitle',
              type: 'textarea',
              localized: true,
              defaultValue: 'نساعد الشركات والمؤسسات على بناء وتطوير المنتجات الرقمية، الأنظمة السحابية، وتجارب المستخدم الاحترافية بأعلى معايير الجودة والأمان.',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'standard'
              }
            },
            {
              name: 'primaryCta',
              type: 'group',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'standard'
              },
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'احجز استشارة مجانية' },
                { name: 'href', type: 'text', defaultValue: '#contact' }
              ]
            },
            {
              name: 'secondaryCta',
              type: 'group',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'standard'
              },
              fields: [
                { name: 'label', type: 'text', localized: true, defaultValue: 'تصفح خدماتنا' },
                { name: 'href', type: 'text', defaultValue: '#services' }
              ]
            },

            // --- HOMEPAGE SPECIAL HERO FIELDS ---
            {
              name: 'homepageHeadline',
              label: 'Main Headline Parts (Colored)',
              type: 'group',
              localized: true,
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'homepage'
              },
              fields: [
                {
                  name: 'before',
                  label: 'Blue Text (Before)',
                  type: 'text',
                  defaultValue: 'شريكك التقني'
                },
                {
                  name: 'emphasis',
                  label: 'Orange Text (Emphasis)',
                  type: 'text',
                  defaultValue: 'لحلــــول رقميـــــة'
                },
                {
                  name: 'after',
                  label: 'Blue Text (After)',
                  type: 'text',
                  defaultValue: 'تدعم نمو أعمالك'
                }
              ]
            },
            {
              name: 'homepageSubtitle',
              label: 'Hero Subtitle',
              type: 'textarea',
              localized: true,
              defaultValue: 'نصمم ونطور مواقع وتطبيقات مخصصة لتحسين الكفاءة وتجربة العملاء.',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'homepage'
              }
            },
            {
              name: 'homepagePrimaryCta',
              label: 'Primary CTA Button',
              type: 'group',
              localized: true,
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'homepage'
              },
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
              name: 'homepageCards',
              label: 'Hero Cards (3 Items)',
              type: 'array',
              localized: true,
              minRows: 3,
              maxRows: 3,
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'homepage'
              },
              fields: [
                {
                  name: 'title',
                  label: 'Card Title',
                  type: 'text',
                  required: true
                },
                {
                  name: 'description',
                  label: 'Card Subtitle / Description',
                  type: 'textarea',
                  required: true
                },
                {
                  name: 'visual',
                  label: 'Card Visual Type',
                  type: 'select',
                  defaultValue: 'button',
                  options: [
                    { label: 'Button Art (CTA Pill)', value: 'button' },
                    { label: 'Process Art (Client Feedback)', value: 'process' },
                    { label: 'Chart Art (Graph)', value: 'chart' }
                  ]
                }
              ],
              defaultValue: [
                {
                  title: 'نجعل الأمر أسهل',
                  description: 'من الفكرة إلى التنفيذ، بخطوات واضحة وعملية',
                  visual: 'button'
                },
                {
                  title: 'نستمع إليك لنفهم احتياجاتك',
                  description: 'فخورين بثقة أكثر من 250 مؤسسة ومنظمة',
                  visual: 'process'
                },
                {
                  title: 'نمنحك رؤية أوضح',
                  description: 'من خلال أدوات تساعدك على قياس النجاح',
                  visual: 'chart'
                }
              ]
            }
          ]
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: blocks
            }
          ]
        },
        {
          label: 'SEO',
          name: 'seo',
          fields: seoFields
        },
        {
          label: 'Settings',
          name: 'settings',
          fields: [
            { name: 'transparentHeader', type: 'checkbox', defaultValue: false },
            {
              name: 'pageTemplate',
              type: 'select',
              defaultValue: 'default',
              options: [
                { label: 'Default', value: 'default' },
                { label: 'Landing Page', value: 'landing' },
                { label: 'Full Width', value: 'fullWidth' }
              ]
            },
            { name: 'breadcrumbVisibility', type: 'checkbox', defaultValue: true },
            {
              name: 'defaultTheme',
              type: 'select',
              defaultValue: 'light',
              options: [
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
                { label: 'Auto', value: 'auto' }
              ]
            },
            { name: 'animationToggle', type: 'checkbox', defaultValue: true },
            { name: 'previewImage', type: 'relationship', relationTo: 'media' },
            {
              name: 'analyticsIdentifiers',
              type: 'group',
              fields: [
                { name: 'gtmId', type: 'text' },
                { name: 'conversionTag', type: 'text' }
              ]
            }
          ]
        }
      ]
    }
  ]
}
