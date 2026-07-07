'use client'

import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { SectionTag } from '@/components/ui/SectionTag'
import { type PartnerItem } from '@/lib/repositories/partners.repository'
import { cn } from '@/lib/cn'
import { Marquee } from '@/registry/magicui/marquee'

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
  ['/assets/partners/nupco.svg', 'nupco'],
  ['/assets/partners/naama.svg', 'Naama'],
  ['/assets/partners/nafath.svg', 'نفاذ'],
  ['/assets/partners/mada.svg', 'mada'],
  ['/assets/partners/stc.svg', 'stc'],
  ['/assets/partners/sdaia.svg', 'SDAIA']
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

  const filteredItems = props.items?.filter((p) => Boolean(p.logoSrc))
  const partnerItems = filteredItems && filteredItems.length > 0
    ? filteredItems.map((p) => [p.logoSrc, p.name] as const)
    : defaultPartners

  return (
    <section className={cn('bg-surface', 'py-16', 'lg:min-h-[392px]', 'transition-colors', 'duration-300', 'w-full')} id={sectionId}>
      <div className="mx-auto max-w-[1240px] px-5 text-center lg:px-0">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="flex flex-col items-center"
        >
          <SectionTag>{sectionTag}</SectionTag>
          <h2 className={cn('mt-6', 'font-serif-text', 'text-[28px]', 'font-bold', 'text-[#243A77]', 'dark:text-white')}>
            {heading}
          </h2>
        </motion.div>
      </div>

      <div className={cn('relative', 'flex', 'w-full', 'flex-col', 'items-center', 'justify-center', 'overflow-hidden', 'mt-12')}>
        <Marquee pauseOnHover className={cn('[--duration:20s]', '[--gap:5.5rem]', 'py-4')}>
          {partnerItems.map(([src, alt], idx) => (
            <div
              key={`${alt}-${idx}`}
              className={cn('flex', 'h-16', 'w-36', 'items-center', 'justify-center', 'opacity-75', 'grayscale', 'transition-all', 'duration-300', 'hover:opacity-100', 'hover:grayscale-0')}
            >
              <Image
                src={src}
                alt={alt}
                width={130}
                height={48}
                className={cn('max-h-12', 'max-w-[130px]', 'object-contain', 'dark:brightness-0 dark:invert')}
                loading="lazy"
              />
            </div>
          ))}
        </Marquee>
        <div className={cn('pointer-events-none', 'absolute', 'inset-y-0', 'left-0', 'w-[200px]', 'bg-gradient-to-r', 'from-white', 'via-white/80', 'to-transparent', 'dark:from-[#0B1124]', 'dark:via-[#0B1124]/80', 'z-10')}></div>
        <div className={cn('pointer-events-none', 'absolute', 'inset-y-0', 'right-0', 'w-[200px]', 'bg-gradient-to-l', 'from-white', 'via-white/80', 'to-transparent', 'dark:from-[#0B1124]', 'dark:via-[#0B1124]/80', 'z-10')}></div>
      </div>
    </section>
  )
}
