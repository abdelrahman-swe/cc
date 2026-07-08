'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { PillButton } from '@/components/ui/PillButton'
import { SectionTag } from '@/components/ui/SectionTag'
import { cn } from '@/lib/cn'
import { AnimatedBeam } from '@/registry/magicui/animated-beam'
import { useTheme } from '@/components/shared/ThemeProvider'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const circleVariants: Variants = {
  hidden: (custom: { index: number; theme: string }) => ({
    scale: 1,
    backgroundColor: custom.theme === 'dark' ? 'transparent' : '#FFFFFF',
    color: custom.theme === 'dark' ? '#7687B5' : '#F15722',
    borderColor: custom.theme === 'dark' ? '#243A77' : '#F4794E',
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)'
  }),
  visible: (custom: { index: number; theme: string }) => ({
    scale: [1, 1.25, 1.1],
    backgroundColor: custom.theme === 'dark' ? '#243A77' : '#F15722',
    color: '#FFFFFF',
    borderColor: custom.theme === 'dark' ? '#243A77' : '#F15722',
    boxShadow: custom.theme === 'dark'
      ? [
          '0px 0px 0px rgba(36, 58, 119, 0)',
          '0px 0px 20px rgba(36, 58, 119, 0.75)',
          '0px 0px 10px rgba(36, 58, 119, 0.4)'
        ]
      : [
          '0px 0px 0px rgba(241, 87, 34, 0)',
          '0px 0px 28px rgba(241, 87, 34, 0.85)',
          '0px 0px 14px rgba(241, 87, 34, 0.4)'
        ],
    transition: {
      duration: 0.65,
      ease: 'easeOut' as const,
      delay: custom.index * 1.2
    }
  })
}

const motionViewport = { once: true, margin: '-80px' } as const

const defaultMethodology = [
  ['تحليل وفهم المشروع', 'نبدأ بدراسة متطلباتك، طبيعة عملك، وأهدافك لضمان بناء حل رقمي يخدم مشروعك فعليًا'],
  ['تخطيط تجربة المستخدم وواجهة الاستخدام (UX/UI)', 'نبدأ بدراسة متطلباتك، طبيعة عملك، وأهدافك لضمان بناء حل رقمي يخدم مشروعك فعليًا'],
  ['التطوير والبرمجة', 'نحوّل التصاميم إلى أنظمة وتطبيقات قوية باستخدام أحدث التقنيات وأفضل ممارسات البرمجة'],
  ['الاختبار والإطلاق', 'نختبر الحل بدقة لضمان الجودة والأمان والأداء، ثم نطلقه بشكل رسمي وجاهز للاستخدام']
] as const

type MethodologySectionProps = {
  sectionTag?: string
  heading?: string
  steps?: Array<{ title: string; description: string }>
  cta?: { label?: string; href?: string }
  presentation?: any
  customSectionId?: string
}

function StepRow({
  title,
  body,
  step,
  index,
  circleRef,
  isInView,
  theme
}: {
  title: string
  body: string
  step: number
  index: number
  circleRef: React.RefObject<HTMLDivElement | null>
  isInView: boolean
  theme: string
}) {
  const isCardOnRight = index % 2 !== 0

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn('relative', 'flex', 'w-full', 'flex-col', 'items-center', 'gap-4', 'lg:flex-row', 'lg:items-center', 'lg:gap-0', 'lg:h-[144px]')}
    >
      {/* Left Half */}
      <div className={cn(
        "w-full lg:flex-1 flex justify-center lg:justify-end lg:pe-12",
        isCardOnRight ? "hidden lg:flex" : "flex"
      )}>
        {!isCardOnRight && (
          <motion.article
            variants={cardVariants}
            className={cn('brand-card', 'methodology-card', 'group', 'relative', 'w-full', 'lg:w-[548px]', 'max-w-[548px]', 'overflow-hidden', 'transition-all', 'duration-300')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: '8px',
              borderRadius: '24px',
            }}
          >

            <h3
              className={cn('relative', 'z-10', 'w-full', 'text-right', 'font-brand', 'font-medium', 'text-[22px]', 'text-[#1E1E20]', 'dark:text-white')}
            >
              {title}
            </h3>
            <p
              className={cn('relative', 'z-10', 'w-full', 'text-right', 'font-brand', 'font-normal', 'text-[18px]', 'leading-[150%]', 'text-[#5F6063]', 'dark:text-[#E8EAEA]')}
            >
              {body}
            </p>
          </motion.article>
        )}
      </div>

      {/* Center (Circle) */}
      <div
        ref={circleRef}
        className={cn('z-10', 'flex', 'items-center', 'justify-center', 'shrink-0', 'order-first', 'lg:order-none', 'w-8', 'h-8')}
      >
        <motion.span
          variants={circleVariants}
          custom={{ index, theme }}
          className={cn('grid', 'size-8', 'place-items-center', 'rounded-full', 'border', 'border-[#243A77] dark:border-[#243A77]', 'text-[14px]', 'font-bold')}
        >
          {step}
        </motion.span>
      </div>

      {/* Right Half */}
      <div className={cn(
        "w-full lg:flex-1 flex justify-center lg:justify-start lg:ps-12",
        !isCardOnRight ? "hidden lg:flex" : "flex"
      )}>
        {isCardOnRight && (
          <motion.article
            variants={cardVariants}
            className={cn('brand-card', 'methodology-card', 'group', 'relative', 'w-full', 'lg:w-[548px]', 'max-w-[548px]', 'overflow-hidden', 'transition-all', 'duration-300')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: '8px',
              borderRadius: '24px',
            }}
          >

            <h3
              className={cn('relative', 'z-10', 'w-full', 'text-right', 'font-brand', 'font-medium', 'text-[22px]', 'text-[#1E1E20]', 'dark:text-white')}
            >
              {title}
            </h3>
            <p
              className={cn('relative', 'z-10', 'w-full', 'text-right', 'font-brand', 'font-normal', 'text-[18px]', 'leading-[150%]', 'text-[#5F6063]', 'dark:text-[#E8EAEA]')}
            >
              {body}
            </p>
          </motion.article>
        )}
      </div>
    </motion.div>
  )
}

export function MethodologySection(props: MethodologySectionProps) {
  const { theme } = useTheme()
  const sectionTag = props.sectionTag || 'آلية العمل'
  const heading = props.heading || 'من الفكرة إلى الإطلاق بخطوات تقنية دقيقة'
  const sectionId = props.customSectionId || 'methodology'
  
  const methodologyList = props.steps && props.steps.length > 0
    ? props.steps.map((s) => [s.title, s.description] as const)
    : defaultMethodology

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.15 })

  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)
  const step3Ref = useRef<HTMLDivElement>(null)
  const step4Ref = useRef<HTMLDivElement>(null)

  const stepRefs = [step1Ref, step2Ref, step3Ref, step4Ref]

  return (
    <section className={cn('py-5 sm:py-16 lg:py-24', 'transition-colors', 'duration-300')} id={sectionId}>
      <div className={cn('mx-auto', 'max-w-[1248px]', 'px-5', 'text-center', 'lg:px-0')}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={motionViewport}>
          <SectionTag>{sectionTag}</SectionTag>
          <h2 className={cn('mt-6', 'font-serif-text', 'text-[18px] sm:text-[32px] lg:text-[40px]', 'font-bold', 'text-[#243A77]', 'dark:text-white')}>
            {heading}
          </h2>
        </motion.div>

        <div ref={containerRef} className={cn('relative', 'mt-10 lg:mt-[104px]', 'flex', 'w-full', 'flex-col', 'gap-12', 'lg:gap-0')}>
          <div className={cn('absolute', 'bottom-[-30px]', 'left-1/2', 'top-[-60px]', 'hidden', 'w-[2px]', '-translate-x-1/2', 'bg-[#FEEEE9] dark:bg-[#243A77]', 'lg:block')} />
          {methodologyList.map(([title, body], index) => (
            <StepRow
              key={title}
              title={title}
              body={body}
              step={index + 1}
              index={index}
              circleRef={stepRefs[index]}
              isInView={isInView}
              theme={theme}
            />
          ))}

          {/* Animated Beams between consecutive steps */}
          <div className={cn('hidden', 'lg:block')}>
            {isInView && methodologyList.slice(0, -1).map((_, index) => (
              <AnimatedBeam
                key={index}
                containerRef={containerRef}
                fromRef={stepRefs[index]}
                toRef={stepRefs[index + 1]}
                pathColor={theme === 'dark' ? '#243A77' : '#FEEEE9'}
                pathOpacity={0}
                pathWidth={2}
                gradientStartColor={theme === 'dark' ? '#0052FF' : '#F15722'}
                gradientStopColor={theme === 'dark' ? '#60A5FA' : '#E84C1E'}
                duration={1.2}
                delay={index * 1.2}
                repeat={0}
              />
            ))}
          </div>
        </div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={motionViewport} className="mt-14">
          <PillButton href={props.cta?.href || '/contact'} variant="blue">
            {props.cta?.label || 'تواصل معنا الآن'}
          </PillButton>
        </motion.div>
      </div>
    </section>
  )
}


