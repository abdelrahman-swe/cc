'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import Image from 'next/image'
import { SectionTag } from '@/components/ui/SectionTag'
import { cn } from '@/lib/cn'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'iconsax-reactjs'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' }
  }
}

const motionViewport = { once: true, margin: '-80px' } as const

type SectorItem = {
  name: string
  image?: any
}

type SectorsSectionProps = {
  sectionTag?: string
  title?: string
  sectors?: SectorItem[]
}

export function SectorsSection({
  sectionTag = 'المجالات',
  title,
  sectors
}: SectorsSectionProps) {
  const params = useParams()
  const locale = (params.locale as string) || 'ar'
  const [activeIndex, setActiveIndex] = useState(0)

  const defaultSectors: SectorItem[] = [
    { name: locale === 'en' ? 'Healthcare' : 'الرعاية الصحية', image: '/mockups/3aloolo.png' },
    { name: locale === 'en' ? 'Government Sector' : 'القطاع الحكومي', image: '/mockups/Mockup 14.png' },
    { name: locale === 'en' ? 'Retail & E-commerce' : 'التجزئة والتجارة الإلكترونية', image: '/mockups/Dashboard 1.png' },
    { name: locale === 'en' ? 'Financial Services' : 'الخدمات المالية', image: '/mockups/card.png' },
    { name: locale === 'en' ? 'Real Estate' : 'العقارات', image: '/mockups/mascot_web.png' },
    { name: locale === 'en' ? 'Logistics & Supply Chain' : 'الخدمات اللوجستية', image: '/mockups/Mockup 14.png' }
  ]

  const defaultTitle = locale === 'en' ? 'Our expertise in diverse sectors' : 'خبراتنا في قطاعات متنوعة'
  const displayTitle = title || defaultTitle

  const list = sectors && sectors.length > 0 ? sectors : defaultSectors
  const activeSector = list[activeIndex] || list[0]

  // Resolve active image source URL
  let activeImageUrl = '/mockups/Mockup 14.png'
  if (activeSector?.image) {
    if (typeof activeSector.image === 'object') {
      activeImageUrl = activeSector.image.url || activeSector.image.src || activeImageUrl
    } else if (typeof activeSector.image === 'string') {
      activeImageUrl = activeSector.image
    }
  }

  // Format title to color "قطاعات متنوعة" / "diverse sectors"
  const renderTitle = (text: string) => {
    if (text.includes('قطاعات متنوعة')) {
      const parts = text.split('قطاعات متنوعة')
      return (
        <>
          {parts[0]}
          <span className="text-[#f4794e]">قطاعات متنوعة</span>
          {parts[1]}
        </>
      )
    }
    if (text.includes('diverse sectors')) {
      const parts = text.split('diverse sectors')
      return (
        <>
          {parts[0]}
          <span className="text-[#f4794e]">diverse sectors</span>
          {parts[1]}
        </>
      )
    }
    return text
  }

  return (
    <section className={cn('bg-white', 'py-16', 'lg:py-24')} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className={cn('mx-auto', 'max-w-[1240px]', 'px-5', 'lg:px-0')}>
        
        {/* Title Container */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className={cn('flex', 'flex-col', 'items-center', 'gap-6', 'text-center')}
        >
          <SectionTag variant="about">{sectionTag}</SectionTag>
          <h2 
            className={cn('mb-12', 'text-center')}
            style={{
              color: 'var(--Sec-500, #243A77)',
              textAlign: 'center',
              fontFamily: '"Thmanyah Serif Text", serif',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal'
            }}
          >
            {renderTitle(displayTitle)}
          </h2>
        </motion.div>

        {/* Content Columns split */}
        <div className={cn('grid', 'grid-cols-1', 'gap-12', 'lg:grid-cols-12', 'items-center')}>
          
          {/* Right interactive Accordion List */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            className={cn('lg:col-span-6', 'flex', 'flex-col', 'divide-y', 'divide-[#eaeaeb]', 'border-t', 'border-b', 'border-[#eaeaeb]')}
          >
            {list.map((sector, index) => {
              const isActive = index === activeIndex
              
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "w-full flex items-center justify-between py-6 px-4 transition-colors duration-200 cursor-pointer",
                    locale === 'ar' ? "text-right" : "text-left"
                  )}
                >
                  {/* Sector Title */}
                  <span 
                    style={{
                      color: isActive ? 'var(--Primary-400, #F4794E)' : 'var(--Sec-500, #243A77)',
                      textAlign: locale === 'ar' ? 'right' : 'left',
                      fontFamily: '"Thmanyah Serif Text", serif',
                      fontSize: '28px',
                      fontStyle: 'normal',
                      fontWeight: 700,
                      lineHeight: 'normal',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {sector.name}
                  </span>

                  {/* Circle Arrow Indicator */}
                  <div 
                    className={cn('flex', 'items-center', 'justify-center', 'transition-all', 'duration-300')}
                    style={{
                      width: '40px',
                      height: '40px',
                      aspectRatio: '1/1',
                      borderRadius: '240px',
                      background: isActive ? 'var(--primary-effect, #F4794E)' : 'var(--Neutral-100, #F9F9F9)',
                      gap: '9.6px',
                      flexShrink: 0
                    }}
                  >
                    <ArrowLeft className={cn(
                      'size-5 transition-transform duration-300',
                      isActive ? 'text-white' : 'text-[#98999A]'
                    )}
                    style={{
                      transform: isActive 
                        ? 'rotate(90deg)' 
                        : 'rotate(-90deg)'
                    }}
                    />
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* Left Mockup Showcase */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            className={cn('lg:col-span-6', 'flex', 'justify-center', 'items-center', 'w-full')}
          >
            <div 
              className={cn('relative', 'overflow-hidden', 'rounded-[24px]')}
              style={{ width: '598px', height: '656px', flexShrink: 0 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={cn('relative', 'size-full', 'flex', 'items-center', 'justify-center')}
                >
                  <div className={cn('relative', 'w-full', 'h-full')}>
                    <Image
                      src={activeImageUrl}
                      alt={activeSector?.name || ''}
                      fill
                      className="object-contain"
                      sizes="598px"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
