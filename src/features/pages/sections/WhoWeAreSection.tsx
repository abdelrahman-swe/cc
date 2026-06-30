'use client'

import { motion, type Variants } from 'framer-motion'
import { Counter } from '@/components/ui/Counter'
import { PillButton } from '@/components/ui/PillButton'
import { cn } from '@/lib/cn'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' }
  }
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
}

const motionViewport = { once: true, margin: '-80px' } as const

const defaultWhyCards = [
  ['/icons/content/medal.svg', 'خبرة تزيد عن 6 سنوات', 'نمتلك خبرة عملية في تصميم وتطوير حلول رقمية احترافية تدعم نجاح أعمالك.'],
  ['/icons/content/pen.svg', 'حلول مخصصة حسب احتياجك', 'نصمم المنتج حول أهدافك ونموذج عملك، لا حول قالب جاهز ومحدود.'],
  ['/icons/content/rank.svg', 'سرعة إنجاز ومرونة عالية', 'فرق عمل رشيقة تتعامل مع المتغيرات بسرعة وتحافظ على جودة التنفيذ.'],
  ['/icons/content/shield.svg', 'أمان وحوكمة البيانات', 'نطبق معايير حماية واعتمادية مناسبة لطبيعة بياناتك وعملياتك.']
] as const

type WhoWeAreSectionProps = {
  heading?: string
  body?: string
  stats?: Array<{ value: string; label: string; description: string }>
  whyUs?: Array<{ icon?: string; title: string; description: string }>
  cta?: { label?: string; href?: string }
  customSectionId?: string
}

export function WhoWeAreSection(props: WhoWeAreSectionProps) {
  const heading = props.heading || 'نبني حلولا رقمية تنمو مع أعمالك'
  const body = props.body || 'منذ انطلاقنا في 2017، كرسنا جهودنا لتمكين المؤسسات من التميز الرقمي. نفخر بسجل من المشاريع التي أحدثت فارقا حقيقيا في أداء شركائنا.'
  const sectionId = props.customSectionId || 'who-we-are'

  const statsList = props.stats && props.stats.length > 0 ? props.stats : [
    { value: '+200', label: 'مشروع', description: 'تم تسليمه بنجاح' },
    { value: '+150', label: 'عميل', description: 'وشريك نجاح' },
    { value: '+10', label: 'سنوات', description: 'خبرة وتميز تقني' }
  ]

  const whyList = props.whyUs && props.whyUs.length > 0
    ? props.whyUs.map((item, idx) => [item.icon || defaultWhyCards[idx % 4][0], item.title, item.description] as const)
    : defaultWhyCards

  return (
    <section id={sectionId} className="bg-white py-16 lg:min-h-[796px]">
      <div className="mx-auto grid max-w-[1240px] gap-[73px] px-5 lg:grid-cols-[587px_580px] lg:px-0">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="pt-2 text-right"
        >
          <h2
            className="font-serif-text font-bold leading-[1.35] text-right"
            style={{
              color: 'var(--Neutral-800, #1E1E20)',
              fontSize: '36px'
            }}
          >
            {heading}
          </h2>
          <p
            className="mt-7 text-right font-normal"
            style={{
              color: 'var(--Neutral-500, #5F6063)',
              fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
              fontSize: '18px',
              lineHeight: '140%'
            }}
          >
            {body}
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            className="mt-12 grid max-w-[472px] grid-cols-3 gap-10 text-center"
          >
            {statsList.map((stat) => {
              const numericValue = Number(String(stat.value).replace(/\D/g, ''))

              return (
                <motion.div key={stat.label} variants={fadeUp}>
                  <div className="text-[30px] font-black text-[#F15722]">
                    <Counter value={numericValue} suffix="+" />
                  </div>
                  <div className="text-[21px] font-bold text-[#243A77]">
                    {stat.label}
                  </div>
                  <p
                    className="mt-2 text-[14px] font-normal"
                    style={{
                      color: 'var(--Neutral-500, #5F6063)',
                      fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                    }}
                  >
                    {stat.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
          <div className="mt-16 flex justify-start">
            <PillButton href={props.cta?.href || '#contact'} variant="blue">
              {props.cta?.label || 'ابدأ رحلة نموك'}
            </PillButton>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="grid gap-8"
        >
          {whyList.map(([icon, title, desc]) => (
            <motion.article
              key={title}
              variants={fadeUp}
              className="flex min-h-[143px] items-center gap-5 rounded-[24px] border border-[#EEF2F8] bg-white p-6 shadow-[0_14px_34px_rgba(14,23,48,0.04)] transition-all duration-300 hover:border-[#F15722] hover:shadow-[0_14px_34px_rgba(14,23,48,0.04),inset_0_0_20px_rgba(241,87,34,0.12)]"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-orange-300">
                <img src={icon} alt="" className="size-5" loading="lazy" />
              </div>
              <div className="text-right">
                <h3
                  className="text-right font-medium leading-normal"
                  style={{
                    color: 'var(--Neutral-800, #1E1E20)',
                    fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                    fontSize: '20px'
                  }}
                >
                  {title}
                </h3>
                <p
                  className="mt-2 text-right font-normal"
                  style={{
                    color: 'var(--Neutral-500, #5F6063)',
                    fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                    fontSize: '16px',
                    lineHeight: '140%'
                  }}
                >
                  {desc}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
