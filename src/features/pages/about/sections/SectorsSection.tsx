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
    { name: locale === 'en' ? 'Healthcare' : 'الرعاية الصحية', image: '/assets/mockups/3aloolo.png' },
    { name: locale === 'en' ? 'Government Sector' : 'القطاع الحكومي', image: '/assets/mockups/Mockup 14.png' },
    { name: locale === 'en' ? 'Retail & E-commerce' : 'التجزئة والتجارة الإلكترونية', image: '/assets/mockups/Dashboard 1.png' },
    { name: locale === 'en' ? 'Financial Services' : 'الخدمات المالية', image: '/assets/mockups/card.png' },
    { name: locale === 'en' ? 'Real Estate' : 'العقارات', image: '/assets/mockups/mascot_web.png' },
    { name: locale === 'en' ? 'Logistics & Supply Chain' : 'الخدمات اللوجستية', image: '/assets/mockups/Mockup 14.png' }
  ]

  const defaultTitle = locale === 'en' ? 'Our expertise in diverse sectors' : 'خبراتنا في قطاعات متنوعة'
  const displayTitle = title || defaultTitle

  const list = sectors && sectors.length > 0 ? sectors : defaultSectors
  const activeSector = list[activeIndex] || list[0]

  // Resolve active image source URL
  let activeImageUrl = '/assets/mockups/Mockup 14.png'
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
    <section className={cn('bg-surface dark:bg-[#0b1124]', 'py-5 sm:py-16', 'lg:py-24', 'transition-colors', 'duration-300')} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className={cn('mx-auto', 'max-w-[1240px]', 'px-4', 'sm:px-5', 'lg:px-0')}>
        
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
            className={cn('mb-8 md:mb-12', 'text-center', 'text-[#243A77] dark:text-white', 'text-[18px] sm:text-[28px] lg:text-[32px]')}
            style={{
              textAlign: 'center',
              fontFamily: '"Thmanyah Serif Text", serif',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal'
            }}
          >
            {renderTitle(displayTitle)}
          </h2>
        </motion.div>

        {/* Content Columns split */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 w-full" dir="ltr">
          
          {/* Left Mockup Showcase */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            className="flex justify-center items-center w-full max-w-[598px]"
          >
            <div 
              className={cn('relative', 'overflow-hidden', 'rounded-[24px] bg-[#c9a893] dark:bg-[#0d193b] dark:border dark:border-[#0a2268] w-full aspect-[598/480]', 'h-[250px] sm:h-[350px] lg:h-[480px]')}
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
                    {activeIndex === 0 && activeImageUrl === '/assets/mockups/3aloolo.png' ? (
                      <>
                        <Image
                          src="/assets/mockups/3aloolo.png"
                          alt={activeSector?.name || ''}
                          fill
                          className="object-cover dark:hidden rounded-[24px]"
                          sizes="598px"
                          priority
                        />
                        <Image
                          src="/dark/imgMockupScene4.png"
                          alt={activeSector?.name || ''}
                          fill
                          className="object-cover hidden dark:block rounded-[24px]"
                          sizes="598px"
                          priority
                        />
                      </>
                    ) : (
                      <Image
                        src={activeImageUrl}
                        alt={activeSector?.name || ''}
                        fill
                        className="object-cover rounded-[24px]"
                        sizes="598px"
                        priority
                      />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right interactive Accordion List */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            className={cn('flex flex-col gap-2 p-4 md:p-6 rounded-[24px] border border-border dark:border-[#0A2268] bg-[#f9f9f9] dark:bg-[#0D193B] shadow-[inset_0_4px_4px_0_rgba(10,34,104,0.05)] dark:shadow-[inset_0_4px_4px_0_#0A2268] transition-colors duration-300 justify-center items-start w-full max-w-[600px] h-auto lg:h-[480px]')}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            {list.map((sector, index) => {
              const isActive = index === activeIndex
              
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "w-full flex items-center justify-between py-2.5 sm:py-3.5 px-3 border-b border-[#eaeaeb] dark:border-[#162347] last:border-b-0 transition-colors duration-200 cursor-pointer",
                    locale === 'ar' ? "text-right" : "text-left"
                  )}
                >
                  {/* Sector Title */}
                  <span 
                    className={cn(
                      isActive 
                        ? 'text-[#F4794E] dark:text-[#f15722]' 
                        : 'text-[#243A77] dark:text-[#c1cae5]',
                      'text-[15px] sm:text-[18px] lg:text-[22px]'
                    )}
                    style={{
                      textAlign: locale === 'ar' ? 'right' : 'left',
                      fontFamily: '"Thmanyah Serif Text", serif',
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
                    className={cn(
                      'flex items-center justify-center transition-all duration-300 shrink-0 w-8 h-8 rounded-full',
                      isActive 
                        ? 'bg-[#F4794E] dark:bg-[#f15722]' 
                        : 'bg-[#F9F9F9] dark:bg-[#0e1730]'
                    )}
                  >
                    <ArrowLeft className={cn(
                      'size-4 transition-transform duration-300',
                      isActive ? 'text-white' : 'text-[#98999A] dark:text-[#c1cae5]'
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

        </div>

      </div>
    </section>
  )
}
