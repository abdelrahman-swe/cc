'use client'

import { motion, type Variants } from 'framer-motion'
import { PillButton } from '@/components/ui/PillButton'
import { SectionTag } from '@/components/ui/SectionTag'
import { cn } from '@/lib/cn'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' }
  }
}

const motionViewport = { once: true, margin: '-80px' } as const

const defaultMethodology = [
  ['تحليل وفهم المشروع', 'نكتشف الفكرة ونحولها إلى نطاق عمل واضح ومؤشرات نجاح قابلة للقياس.'],
  ['تخطيط تجربة المستخدم وواجهة الاستخدام', 'نصمم رحلة استخدام واضحة ومنطقية قبل بدء التطوير.'],
  ['التطوير والبرمجة', 'نبني النظام بأفضل الممارسات التقنية لضمان الأداء وقابلية التوسع.'],
  ['الاختبار والإطلاق', 'نراجع الأداء وتجربة الاستخدام ونطلق المنتج بثقة.']
] as const

type MethodologySectionProps = {
  sectionTag?: string
  heading?: string
  steps?: Array<{ title: string; description: string }>
  cta?: { label?: string; href?: string }
  presentation?: any
  customSectionId?: string
}

export function MethodologySection(props: MethodologySectionProps) {
  const sectionTag = props.sectionTag || 'آلية العمل'
  const heading = props.heading || 'من الفكرة إلى الإطلاق بخطوات تقنية دقيقة'
  const sectionId = props.customSectionId || 'methodology'

  const methodologyList = props.steps && props.steps.length > 0
    ? props.steps.map((s) => [s.title, s.description] as const)
    : defaultMethodology

  return (
    <section className="bg-white py-16 lg:min-h-[960px]" id={sectionId}>
      <div className="mx-auto max-w-[1240px] px-5 text-center lg:px-0">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={motionViewport}>
          <SectionTag>{sectionTag}</SectionTag>
          <h2 className="mt-6 font-serif-text text-[32px] font-bold text-[#243A77]">
            {heading}
          </h2>
        </motion.div>

        <div className="relative mt-[104px] flex w-full flex-col gap-12 lg:gap-0">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[#FCDDD3] lg:block" />
          {methodologyList.map(([title, body], index) => {
            const step = index + 1
            const even = step % 2 === 0

            return (
              <div
                key={title}
                className="relative flex w-full flex-col items-center justify-between lg:min-h-[180px] lg:flex-row"
              >
                {even ? (
                  <>
                    <motion.article
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={motionViewport}
                      className="w-full rounded-[18px] border border-[#EEF2F8] bg-white p-7 text-right shadow-[0_14px_34px_rgba(14,23,48,0.04)] lg:w-[calc(50%-32px)]"
                    >
                      <h3 className="text-[18px] font-bold text-[#0E1730]">{title}</h3>
                      <p className="mt-3 text-[14px] leading-6 text-[#74829A]">{body}</p>
                    </motion.article>
                    <div className="z-10 hidden w-16 items-center justify-center lg:flex">
                      <span className="grid size-8 place-items-center rounded-full bg-[#F15722] text-[14px] font-bold text-white">
                        {step}
                      </span>
                    </div>
                    <div className="hidden w-[calc(50%-32px)] lg:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden w-[calc(50%-32px)] lg:block" />
                    <div className="z-10 hidden w-16 items-center justify-center lg:flex">
                      <span className="grid size-8 place-items-center rounded-full bg-[#F15722] text-[14px] font-bold text-white">
                        {step}
                      </span>
                    </div>
                    <motion.article
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={motionViewport}
                      className="w-full rounded-[18px] border border-[#EEF2F8] bg-white p-7 text-right shadow-[0_14px_34px_rgba(14,23,48,0.04)] lg:w-[calc(50%-32px)]"
                    >
                      <h3 className="text-[18px] font-bold text-[#0E1730]">{title}</h3>
                      <p className="mt-3 text-[14px] leading-6 text-[#74829A]">{body}</p>
                    </motion.article>
                  </>
                )}
              </div>
            )
          })}
        </div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={motionViewport} className="mt-14">
          <PillButton href={props.cta?.href || '#contact'} variant="orange">
            {props.cta?.label || 'تواصل معنا الآن'}
          </PillButton>
        </motion.div>
      </div>
    </section>
  )
}
