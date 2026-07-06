'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { SectionTag } from '@/components/ui/SectionTag'
import { type ServiceItem } from '@/lib/repositories/services.repository'
import { cn } from '@/lib/cn'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' }
  }
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
}

const motionViewport = { once: true, margin: '-80px' } as const

function AiServiceCard({ title, body }: { title: string; body: string }) {
  return (
    <motion.article
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      className={cn(
        'brand-card',
        'group relative h-[530px] overflow-hidden rounded-[40px] transition-all duration-300 md:col-span-2 lg:col-span-2'
      )}
    >

      {/* Layer 1: Mascot at Back */}
      <Image
        src="/assets/mockups/mascot.png"
        alt=""
        width={1024}
        height={1312}
        className="absolute left-1/2 top-[60px] sm:top-[80px] lg:top-[95px] z-0 h-[280px] sm:h-[350px] md:h-[409px] w-auto -translate-x-1/2 object-contain"
        loading="lazy"
      />

      {/* Layer 2: White Card Container (Figma 563:9152) */}
      <div className="absolute bottom-[30px] left-1/2 z-10 flex w-[623px] max-w-[calc(100%-32px)] -translate-x-1/2 flex-col gap-3 rounded-[24px] bg-surface-card dark:bg-surface-elevated p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-border dark:border-white/10 transition-colors duration-300">
        {/* Star Badge positioned on the right */}
        <div className="flex w-full justify-start">
          <div className="flex size-[48px] shrink-0 items-center justify-center rounded-[16px] border border-[#FCDDD3] dark:border-white/15 bg-surface-elevated dark:bg-surface p-3 text-[#F15722]">
            <svg className="size-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        </div>

        {/* Gray Content Box */}
        <div className="w-full rounded-[16px] bg-surface-elevated dark:bg-surface p-5 text-right transition-colors duration-300">
          <h3
            className="text-right font-medium leading-normal text-foreground"
            style={{
              fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: 500
            }}
          >
            {title}
          </h3>
          <p
            className="mt-2 text-right font-normal text-foreground-muted"
            style={{
              fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '1.4'
            }}
          >
            {body}
          </p>
        </div>
      </div>

      {/* Hidden SVG with clip path definition */}
      <svg className="absolute -left-[999px] -top-[999px] h-0 w-0" aria-hidden="true">
        <defs>
          <clipPath id="edited-differentone23-1782742739957" clipPathUnits="objectBoundingBox">
            <path
              d="M0.107822 0.242870 L0.235307 0.324978 C0.563742 0.355229 0.263397 0.590752 0.369274 0.586430 L0.308773 0.644771 L0.192092 0.668539 C0.086214 0.515125 0.000000 0.766667 0.116465 0.240709 L0.109983 0.242870 Z"
              fill="black"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Layer 3: Hand with clip path applied on top of card */}
      <Image
        src="/assets/mockups/mascot.png"
        alt=""
        width={1024}
        height={1312}
        style={{ clipPath: 'url(#edited-differentone23-1782742739957)' }}
        className="pointer-events-none absolute left-1/2 top-[60px] sm:top-[80px] lg:top-[95px] z-20 h-[280px] sm:h-[350px] md:h-[409px] w-auto -translate-x-1/2 object-contain"
        loading="lazy"
      />
    </motion.article>
  )
}

function ServiceCard({
  title,
  body,
  image,
  imageClass = 'w-full h-auto block object-contain object-bottom'
}: {
  title: string
  body: string
  image?: string
  imageClass?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      className={cn(
        'brand-card',
        'group relative flex flex-col overflow-hidden rounded-[50px] dark:rounded-[40px] transition-all duration-300'
      )}
    >
      <div className="px-8 pt-9 text-right relative z-10">
        <h3
          className="text-right font-medium leading-normal"
          style={{
            color: 'var(--Neutral-800, #1E1E20)',
            textAlign: 'right',
            fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal'
          }}
        >
          {title}
        </h3>
        <p
          className="mt-4 text-right font-normal self-stretch"
          style={{
            color: 'var(--Neutral-500, #5F6063)',
            textAlign: 'right',
            fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%',
            alignSelf: 'stretch'
          }}
        >
          {body}
        </p>
      </div>
      {image ? (
        <div className="relative z-10 mt-auto w-full overflow-hidden rounded-b-[50px] flex items-end justify-center">
          <Image
            src={image}
            alt={title || ""}
            width={600}
            height={400}
            className={cn('relative z-10 w-full h-auto block object-contain object-bottom', imageClass)}
            loading="lazy"
          />
        </div>
      ) : null}
    </motion.article>
  )
}

function WideServiceCard({ title, body }: { title: string; body: string }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      className={cn(
        'brand-card',
        'group relative grid min-h-[320px] overflow-hidden rounded-[50px] dark:rounded-[40px] transition-all duration-300 md:col-span-2 lg:col-span-3 lg:grid-cols-[1fr_815px]'
      )}
    >
      <div className="relative z-10 flex flex-col justify-center p-10 text-right">
        <h3
          className="text-right font-medium leading-normal"
          style={{
            color: 'var(--Neutral-800, #1E1E20)',
            textAlign: 'right',
            fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal'
          }}
        >
          {title}
        </h3>
        <p
          className="mt-4 text-right font-normal self-stretch"
          style={{
            color: 'var(--Neutral-500, #5F6063)',
            textAlign: 'right',
            fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%',
            alignSelf: 'stretch'
          }}
        >
          {body}
        </p>
      </div>
      <div className="relative z-10 h-[240px] sm:h-[320px] bg-surface-card">
        <Image
          src="/assets/images/globe.svg"
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
    </motion.article>
  )
}

type ServicesSectionProps = {
  sectionTag?: string
  title?: string
  description?: string
  items?: ServiceItem[]
  manualServices?: any[]
  selectionMode?: string
  presentation?: any
  customSectionId?: string
}

function parseServiceDoc(doc: any): ServiceItem | null {
  if (!doc || typeof doc !== 'object') return null
  return {
    id: String(doc.id || doc._id),
    title: typeof doc.title === 'string' ? doc.title : doc.title?.ar || doc.title?.en || '',
    description: typeof doc.description === 'string' ? doc.description : doc.description?.ar || doc.description?.en || '',
    slug: doc.slug || '',
    layout: doc.layout || 'standard',
    imageUrl: doc.image && typeof doc.image === 'object' ? (doc.image.url || doc.image.src) : (typeof doc.image === 'string' ? doc.image : doc.imageUrl)
  }
}

export function ServicesSection(props: ServicesSectionProps) {
  const sectionTag = props.sectionTag || 'خدماتنا'
  const title = props.title || 'حلول رقمية متكاملة تواكب نمو أعمالك'
  const sectionId = props.customSectionId || 'services'
  
  let items = props.items || []
  if (items.length === 0 && Array.isArray(props.manualServices) && props.manualServices.length > 0) {
    items = props.manualServices.map(parseServiceDoc).filter((x): x is ServiceItem => x !== null)
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className="bg-surface py-16 transition-colors duration-300" id={sectionId}>
      <div className="mx-auto max-w-[1240px] px-5 text-center lg:px-0">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={motionViewport}>
          <SectionTag>{sectionTag}</SectionTag>
          <h2 className="mx-auto mt-6 max-w-[760px] font-serif-text text-[34px] font-bold leading-[1.35] text-[#243A77] dark:text-white">
            {title}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="mt-[40px] md:mt-[70px] grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((svc) => {
            if (svc.layout === 'ai-card') {
              return <AiServiceCard key={svc.id || svc.title} title={svc.title} body={svc.description} />
            }
            if (svc.layout === 'globe-card') {
              return <WideServiceCard key={svc.id || svc.title} title={svc.title} body={svc.description} />
            }
            return (
              <ServiceCard
                key={svc.id || svc.title}
                title={svc.title}
                body={svc.description}
                image={svc.imageUrl}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

