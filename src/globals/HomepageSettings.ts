import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/payload/access'

const buttonFields = [
  {
    name: 'label',
    type: 'text' as const,
    localized: true
  },
  {
    name: 'href',
    type: 'text' as const,
    defaultValue: '#'
  }
]

export const HomepageSettings: GlobalConfig = {
  slug: 'homepage-settings',
  label: 'Homepage settings',
  access: {
    read: anyone,
    update: authenticated
  },
  fields: [
    {
      name: 'nav',
      type: 'group',
      fields: [
        {
          name: 'brand',
          type: 'text',
          localized: true,
          defaultValue: 'Code Clouders'
        },
        {
          name: 'cta',
          type: 'group',
          fields: buttonFields
        },
        {
          name: 'links',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true
            },
            {
              name: 'href',
              type: 'text',
              defaultValue: '#'
            }
          ],
          defaultValue: [
            {
              label: 'الرئيسية',
              href: '#home'
            },
            {
              label: 'من نحن',
              href: '#who-we-are'
            },
            {
              label: 'أعمالنا',
              href: '#featured-work'
            },
            {
              label: 'الخدمات',
              href: '#services'
            },
            {
              label: 'المدونة',
              href: '#blog'
            },
            {
              label: 'تواصل معنا',
              href: '#contact'
            }
          ]
        }
      ]
    },
    {
      name: 'partners',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'شركاء النجاح'
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'علامات تشاركنا شغف التميز في حضورها الرقمي'
        }
      ]
    },
    {
      name: 'services',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'الخدمات'
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'كل ما تحتاجه لبناء نظام رقمي ناجح'
        }
      ]
    },
    {
      name: 'whoWeAre',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'نبني حلولاً رقمية تنمو مع أعمالك'
        },
        {
          name: 'body',
          type: 'textarea',
          defaultValue:
            'منذ انطلاقنا في 2017، كرسنا جهودنا لتمكين المؤسسات من التميز الرقمي. واليوم نفخر بسجل حافل من المشاريع التي أحدثت فارقاً حقيقياً في أداء شركائنا، عبر حلول صممت لتبقى وتتطور.'
        },
        {
          name: 'cta',
          type: 'group',
          fields: buttonFields
        }
      ]
    },
    {
      name: 'whyUs',
      type: 'array',
      localized: true,
      minRows: 4,
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
        }
      ],
      defaultValue: [
        {
          title: 'خبرة أكثر من 10 سنوات',
          description: 'مشاريع رقمية في قطاعات متنوعة وبجودة تنفيذ عالية.'
        },
        {
          title: 'حلول مخصصة حسب احتياجك',
          description: 'نصمم النظام حول طريقة عملك وأهدافك لا حول قالب جاهز.'
        },
        {
          title: 'سرعة إنجاز ومرونة عالية',
          description: 'نوازن بين سرعة التنفيذ ودقة التفاصيل التقنية.'
        },
        {
          title: 'أمان وحوكمة البيانات',
          description: 'نطبق معايير حماية واعتمادية مناسبة لطبيعة عملك.'
        }
      ]
    },
    {
      name: 'results',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'مشاريع مختارة'
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'نحوّل الأفكار إلى مشاريع تحقق نتائج'
        },
        {
          name: 'cta',
          type: 'group',
          fields: buttonFields
        }
      ]
    },
    {
      name: 'methodology',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'آلية العمل'
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'من الفكرة إلى الإطلاق بخطوات تقنية دقيقة'
        },
        {
          name: 'steps',
          type: 'array',
          minRows: 4,
          maxRows: 4,
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
            }
          ],
          defaultValue: [
            {
              title: 'تحليل وفهم المشروع',
              description: 'نكتشف الفكرة ونحولها إلى نطاق واضح ومؤشرات نجاح قابلة للقياس.'
            },
            {
              title: 'تخطيط تجربة المستخدم وواجهة الاستخدام',
              description: 'نصمم رحلة استخدام سهلة ومنطقية قبل بدء التطوير.'
            },
            {
              title: 'التطوير والبرمجة',
              description: 'نبني النظام بأفضل الممارسات التقنية لضمان قابلية التوسع.'
            },
            {
              title: 'الاختبار والإطلاق',
              description: 'نراجع الأداء وتجربة الاستخدام ونطلق المنتج بثقة.'
            }
          ]
        },
        {
          name: 'cta',
          type: 'group',
          fields: buttonFields
        }
      ]
    },
    {
      name: 'finalCta',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'لنحوّل فكرتك إلى منتج رقمي حقيقي'
        },
        {
          name: 'body',
          type: 'text',
          defaultValue: 'حوّل الفكرة إلى واقع ملموس'
        },
        {
          name: 'imageUrl',
          type: 'text',
          defaultValue: '/assets/home/robot.svg'
        },
        {
          name: 'cta',
          type: 'group',
          fields: buttonFields
        }
      ]
    },
    {
      name: 'blog',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          defaultValue: 'المدونة'
        },
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'رؤى عملية من خبرائنا'
        }
      ]
    },
    {
      name: 'footer',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'socialTitle',
          type: 'text',
          defaultValue: 'تابعنا على وسائل التواصل'
        },
        {
          name: 'locationTitle',
          type: 'text',
          defaultValue: 'العنوان'
        },
        {
          name: 'location',
          type: 'text',
          defaultValue: 'المملكة العربية السعودية'
        },
        {
          name: 'contactTitle',
          type: 'text',
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
          name: 'copyright',
          type: 'text',
          defaultValue: 'جميع الحقوق محفوظة - CodeClouders.'
        }
      ]
    }
  ]
}
