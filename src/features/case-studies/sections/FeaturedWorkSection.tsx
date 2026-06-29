'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUpLeft } from 'lucide-react'
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

function ProjectCard({
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
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -8,
              transition: { type: 'spring', stiffness: 220, damping: 18 }
            }
      }
      className={cn(
        'group relative h-[539px] rounded-[28px] border border-[#EEF2F8] bg-white p-4 text-right shadow-[0_18px_44px_rgba(14,23,48,0.05)] transition-all duration-300 hover:border-[#F15722] hover:shadow-[0_20px_48px_rgba(241,87,34,0.2)]'
      )}
    >
      <div className="relative z-10 h-[445px] overflow-hidden rounded-[18px] bg-[#FAFBFF]">
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-28 w-[80%] -translate-x-1/2 rounded-full bg-[#F15722]/25 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
        <img
          src={image}
          alt=""
          className={cn('relative z-10 h-full w-full transition-transform duration-500 group-hover:scale-[1.03]', imageClass)}
          loading="lazy"
        />
      </div>
      <div className="flex h-[62px] items-end justify-between">
        <span className="grid size-10 place-items-center text-[#243A77]">
          <ArrowUpLeft aria-hidden className="size-6" />
        </span>
        <div className="flex items-center gap-2 text-[15px]">
          <span className="rounded-full bg-[#F4F7FC] px-3 py-1 text-[13px] text-[#6F7890]">
            {category}
          </span>
          <h3 className="font-bold text-[#0E1730]">{title}</h3>
        </div>
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
    <section id={sectionId} className="bg-white py-16 lg:min-h-[937px]">
      <div className="mx-auto max-w-[1240px] px-5 text-center lg:px-0">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={motionViewport}>
          <SectionTag>{sectionTag}</SectionTag>
          <h2 className="mt-6 font-serif-text text-[32px] font-bold text-[#243A77]">
            {heading}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {props.items && props.items.length > 0 ? (
            props.items.map((cs) => (
              <ProjectCard
                key={cs.id || cs.title}
                image={cs.imageUrl || '/media/red-cresent.png'}
                category={cs.category}
                title={cs.title}
              />
            ))
          ) : (
            <>
              <ProjectCard
                image="/media/red-cresent.png"
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
                image="/media/red-cresent.png"
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
