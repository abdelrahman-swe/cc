'use client'

import { motion, type Variants } from 'framer-motion'
import { PillButton } from '@/components/ui/PillButton'
import { cn } from '@/lib/cn'

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const motionViewport = { once: true, margin: '-80px' } as const

type FinalCtaSectionProps = {
  heading?: string
  body?: string
  cta?: { label?: string; href?: string }
  presentation?: any
  customSectionId?: string
}

export function FinalCtaSection(props: FinalCtaSectionProps) {
  const heading = props.heading || 'لنحوّل فكرتك إلى منتج رقمي حقيقي'
  const body = props.body || 'حوّل الفكرة إلى واقع ملموس'
  const sectionId = props.customSectionId || 'contact'

  return (
    <section className="mt-24 bg-white py-20 lg:min-h-[584px]" id={sectionId}>
      <div className="mx-auto max-w-[1240px] px-5 lg:px-0">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="relative min-h-[456px] overflow-hidden rounded-[32px] bg-[#F15722] px-10 py-14 text-white lg:px-0 lg:py-0"
        >
          <div className="relative z-10 max-w-[634px] text-center lg:absolute lg:left-10 lg:top-24 lg:text-right">
            <h2 className="font-serif-text text-[44px] font-black leading-tight">
              {heading}
            </h2>
            <p className="mt-4 text-[20px] font-bold text-white/80">
              {body}
            </p>
            <div className="mt-9">
              <PillButton href={props.cta?.href || '#contact'} variant="white">
                {props.cta?.label || 'احصل على استشارة مجانية'}
              </PillButton>
            </div>
          </div>
          <img
            src="/mockups/mascot.png"
            alt=""
            className="pointer-events-none absolute bottom-[-155px] right-[40px] hidden w-[420px] lg:block"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}
