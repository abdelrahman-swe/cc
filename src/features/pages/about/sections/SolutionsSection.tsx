'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionTag } from '@/components/ui/SectionTag'
import { cn } from '@/lib/cn'
import { useParams } from 'next/navigation'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
}

const motionViewport = { once: true, margin: '-80px' } as const

type SolutionItem = {
  name: string
}

type SolutionsSectionProps = {
  sectionTag?: string
  title?: string
  items?: SolutionItem[]
}

export function SolutionsSection({
  sectionTag = 'ماذا نقدم',
  title = 'حلول متكاملة مصممة خصيصًا لاحتياجات أعمالك',
  items
}: SolutionsSectionProps) {
  const params = useParams()
  const locale = (params.locale as string) || 'ar'

  const defaultItems = [
    { name: locale === 'en' ? 'Product Design & User Experience' : 'تصميم المنتجات وتجربة المستخدم' },
    { name: locale === 'en' ? 'Software Engineering & AI Development' : 'هندسة البرمجيات والذكاء الإصطناعي' },
    { name: locale === 'en' ? 'Digital Transformation Consulting' : 'التحول الرقمي والذكاء الاصطناعي' },
    { name: locale === 'en' ? 'Technical Outsourcing & Dedicated Teams' : 'تعهيد الكفاءات والفرق التقنية' },
    { name: locale === 'en' ? 'SaaS Product Construction' : 'بناء منتجات SaaS' }
  ]

  const list = items && items.length > 0 ? items : defaultItems

  return (
    <section className="bg-surface dark:bg-[#0b1124] py-16 lg:py-24 transition-colors duration-300" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-[1240px] px-5 text-center lg:px-0">
        
        {/* Top Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="flex flex-col items-center gap-6"
        >
          <SectionTag variant="about">{sectionTag}</SectionTag>
          <h2 
            className="mx-auto max-w-[780px] text-center text-[#243A77] dark:text-white"
            style={{
              textAlign: 'center',
              fontFamily: '"Thmanyah Serif Text", serif',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal'
            }}
          >
            {title}
          </h2>
        </motion.div>

        {/* Dynamic Tags Listing Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="mt-12 flex flex-wrap justify-center gap-4 max-w-[980px] mx-auto"
        >
          {list.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -2 }}
              className="flex h-[56px] items-center gap-3 rounded-[12px] border border-[#eaeaeb] dark:border-[#0a2268] bg-[#f9f9f9] dark:bg-[#0d193b] px-5 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.02)] dark:shadow-[inset_0px_4px_4px_0px_#0a2268] transition-shadow duration-200 hover:shadow-[0_12px_24px_rgba(36,58,119,0.06)] hover:dark:shadow-[0_12px_24px_rgba(10,34,104,0.3)]"
            >
              {/* Gemini Star Icon */}
              <div className="size-6 text-[#f4794e] shrink-0">
                <svg className="size-full fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>

              {/* Gradient text */}
              <span
                className="font-medium text-[16px] sm:text-[18px] leading-normal bg-clip-text bg-gradient-to-r from-[#f4794e] to-[#243a77] dark:to-white text-transparent"
                style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
              >
                {item.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
