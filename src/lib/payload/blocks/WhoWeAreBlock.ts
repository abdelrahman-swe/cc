import type { Block } from 'payload'

export const WhoWeAreBlock: Block = {
  slug: 'who-we-are-block',
  labels: {
    singular: 'Who We Are Block',
    plural: 'Who We Are Blocks'
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      localized: true,
      defaultValue: 'من نحن'
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'نبني المستقبل الرقمي بشغف وخبرة استثنائية'
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue: 'منذ انطلاقنا كشركة متخصصة في الحلول البرمجية والسحابية، نركز على تقديم منتجات رقمية عالية الأداء تجمع بين الابتكار التقني وسهولة الاستخدام. نساعد شركاءنا على تحويل التحديات التشغيلية إلى فرص نمو مستدامة.'
    },
    {
      name: 'whyCards',
      type: 'array',
      localized: true,
      minRows: 4,
      fields: [
        {
          name: 'icon',
          label: 'Icon URL (Fallback)',
          type: 'text'
        },
        {
          name: 'iconMedia',
          label: 'Icon Upload',
          type: 'upload',
          relationTo: 'media'
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true }
      ],
      defaultValue: [
        {
          title: 'خبرة تزيد عن 6 سنوات',
          description: 'نمتلك خبرة عملية في تصميم وتطوير حلول رقمية احترافية تدعم نجاح أعمالك.'
        },
        {
          title: 'حلول مخصصة حسب احتياجك',
          description: 'نصمم المنتج حول أهدافك ونموذج عملك، لا حول قالب جاهز ومحدود.'
        },
        {
          title: 'سرعة إنجاز ومرونة عالية',
          description: 'فرق عمل رشيقة تتعامل مع المتغيرات بسرعة وتحافظ على جودة التنفيذ.'
        },
        {
          title: 'أمان وحوكمة البيانات',
          description: 'نطبق معايير حماية واعتمادية مناسبة لطبيعة بياناتك وعملياتك.'
        }
      ]
    },
    {
      name: 'stats',
      type: 'array',
      localized: true,
      minRows: 3,
      maxRows: 3,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'description', type: 'text', required: true }
      ],
      defaultValue: [
        { value: '+10', label: 'سنوات', description: 'خبرة وتميز تقني' },
        { value: '+150', label: 'عميل', description: 'وشريك نجاح' },
        { value: '+200', label: 'مشروع', description: 'تم تسليمه بنجاح' }
      ]
    }
  ]
}
