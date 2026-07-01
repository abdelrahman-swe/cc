'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUpLeft } from 'lucide-react'
import Image from 'next/image'
import { PillButton } from '@/components/ui/PillButton'
import { SectionTag } from '@/components/ui/SectionTag'
import { type CaseStudyItem } from '@/lib/repositories/caseStudies.repository'
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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

export function ProjectCard({
  image,
  category,
  title,
  imageClass = 'object-cover object-center w-full h-full'
}: {
  image: string
  category: string
  title: string
  imageClass?: string
}) {
  return (
    <motion.article
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      className={cn(
        'brand-card',
        'group relative h-[420px] sm:h-[480px] md:h-[539px] rounded-[28px] p-4 text-right transition-all duration-300'
      )}
    >
      <div className={cn('relative', 'z-10', 'h-[320px] sm:h-[380px] md:h-[445px]', 'overflow-hidden', 'rounded-[18px]', 'bg-[#FAFBFF]')}>
        <div className={cn('pointer-events-none', 'absolute', 'bottom-0', 'left-1/2', 'h-28', 'w-[80%]', '-translate-x-1/2', 'rounded-full', 'bg-[#F15722]/25', 'opacity-0', 'blur-2xl', 'transition-opacity', 'duration-300', 'group-hover:opacity-100')} />

        <Image
          src={image}
          alt={title || ""}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn('transition-transform duration-500 group-hover:scale-[1.03]', imageClass)}
          loading="lazy"
        />
      </div>
      <div className={cn('relative', 'z-10', 'flex', 'h-[62px]', 'items-end', 'justify-between')}>
        <div className={cn('flex', 'items-center', 'gap-2', 'text-[15px]')}>
          <h3 className={cn('font-bold', 'text-[#0E1730]')}>{title}</h3>
          <span className={cn('rounded-xl', 'bg-white', 'px-3', 'py-1', 'text-[13px]', 'text-[#6F7890] border border-[#6F7890]')}>
            {category}
          </span>
        </div>
        <span className={cn('grid', 'size-10', 'place-items-center', 'text-[#243A77]')}>
          <ArrowUpLeft aria-hidden className="size-6" />
        </span>
      </div>
    </motion.article>
  )
}

type FeaturedWorkSectionProps = {
  sectionTag?: string
  heading?: string
  items?: CaseStudyItem[]
  cta?: { label?: string; href?: string }
  presentation?: any
  customSectionId?: string
}

export function FeaturedWorkSection(props: FeaturedWorkSectionProps) {
  const sectionTag = props.sectionTag || 'مشاريع مختارة'
  const heading = props.heading || 'نحوّل الأفكار إلى مشاريع تحقق نتائج'
  const sectionId = props.customSectionId || 'featured-work'

  return (
    <section id={sectionId} className={cn('bg-white', 'py-16', 'lg:min-h-[937px]')}>
      <div className={cn('mx-auto', 'max-w-[1240px]', 'px-5', 'text-center', 'lg:px-0')}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={motionViewport}>
          <SectionTag>{sectionTag}</SectionTag>
          <h2 className={cn('mt-6', 'font-serif-text', 'text-[32px]', 'font-bold', 'text-[#243A77]')}>
            {heading}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className={cn('mt-14', 'grid', 'gap-6', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3')}
        >
          {props.items && props.items.length > 0 ? (
            props.items.map((cs) => (
              <ProjectCard
                key={cs.id || cs.title}
                image={cs.imageUrl || '/media/red-cresent.svg'}
                category={cs.category}
                title={cs.title}
              />
            ))
          ) : (
            <>
              <ProjectCard
                image="/media/red-cresent.svg"
                category="موقع"
                title="هيئة الهلال الأحمر السعودي"
              />
              <ProjectCard
                image="/mockups/Mockup 14.png"
                category="متجر"
                title="أبير"
                imageClass="object-cover object-center"
              />
              <ProjectCard
                image="/media/red-cresent.svg"
                category="موقع"
                title="هيئة الهلال الأحمر السعودي"
              />
            </>
          )}
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={motionViewport} className="mt-14">
          <PillButton href={props.cta?.href || '#featured-work'} variant="blue">
            {props.cta?.label || 'تصفح جميع المشاريع'}
          </PillButton>
        </motion.div>
      </div>
    </section>
  )
}
