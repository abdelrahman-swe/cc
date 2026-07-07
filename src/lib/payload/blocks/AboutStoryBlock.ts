import type { Block } from 'payload'

export const AboutStoryBlock: Block = {
  slug: 'about-story-block',
  labels: {
    singular: 'About Story Block',
    plural: 'About Story Blocks'
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      localized: true,
      defaultValue: 'قصتنا'
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      defaultValue: 'رحلة بدأت بالشغف... وتستمر بالابتكار'
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue: `منذ عام 2017، نساعد الشركات على قيادة التحول الرقمي من خلال حلول برمجية تجمع بين الابتكار، الجودة، وسهولة الاستخدام.\n\nنبدأ بفهم احتياجات أعمالك، ثم نحولها إلى أنظمة رقمية آمنة، مرنة، وقابلة للتوسع، تدعم نموك وتواكب تطلعاتك المستقبلية.\n\nفي كود، لسنا مجرد شركة تطوير برمجيات، بل شريك تقني يعمل معك لبناء حلول تحقق قيمة حقيقية وتساعد أعمالك على النجاح.`
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Upload or select the story section image.' }
    }
  ]
}
