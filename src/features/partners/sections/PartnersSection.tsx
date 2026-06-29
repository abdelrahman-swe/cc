'use client'

import { motion, type Variants } from 'framer-motion'
import { SectionTag } from '@/components/ui/SectionTag'
import { type PartnerItem } from '@/lib/repositories/partners.repository'
import { cn } from '@/lib/cn'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' }
  }
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const motionViewport = { once: true, margin: '-80px' } as const

const defaultPartners = [
  ['/images/noboco.svg', 'noboco'],
  ['/images/naama.svg', 'Naama'],
  ['/media/nafath.svg', 'نفاذ'],
  ['/images/mada.svg', 'mada'],
  ['/images/stc.svg', 'stc'],
  ['/images/sadia.svg', 'SDAIA']
] as const

type PartnersSectionProps = {
  sectionTag?: string
  heading?: string
  items?: PartnerItem[]
  presentation?: any
  customSectionId?: string
}

export function PartnersSection(props: PartnersSectionProps) {
  const sectionTag = props.sectionTag || 'شركاء النجاح'
  const heading = props.heading || 'عملاء وثقوا بنا لصناعة حلول رقمية مؤثرة'
  const sectionId = props.customSectionId || 'partners'

  const partnerItems = props.items && props.items.length > 0
    ? props.items.map((p) => [p.logoSrc, p.name] as const)
    : defaultPartners

  return (
    <section className="bg-white py-16 lg:min-h-[392px]" id={sectionId}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        className="mx-auto max-w-[1240px] px-5 text-center lg:px-0"
      >
        <SectionTag>{sectionTag}</SectionTag>
        <h2 className="mt-6 font-serif-text text-[28px] font-bold text-[#243A77]">
          {heading}
        </h2>
        <div className="mt-14 grid grid-cols-2 items-center gap-8 md:grid-cols-6">
          {partnerItems.map(([src, alt]) => (
            <motion.div
              key={alt}
              variants={fadeIn}
              className="flex h-16 items-center justify-center opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0"
            >
              <img src={src} alt={alt} className="max-h-12 max-w-[130px]" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
