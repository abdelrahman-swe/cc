'use client'

import { motion, type Variants } from 'framer-motion'
import { Eye, Medal, Layer } from 'iconsax-reactjs'
import { Target } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useParams } from 'next/navigation'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
}

const motionViewport = { once: true, margin: '-80px' } as const

type ValueCard = {
  title: string
  description: string
  bgType: 'lavender' | 'navy' | 'orange' | 'light-orange'
  icon: 'target' | 'eye' | 'medal' | 'layer'
}

type AboutValuesSectionProps = {
  cards?: ValueCard[]
}

const iconMap = {
  target: Target,
  eye: Eye,
  medal: Medal,
  layer: Layer
}

export function AboutValuesSection({ cards }: AboutValuesSectionProps) {
  const params = useParams()
  const locale = (params.locale as string) || 'ar'

  const defaultCards: ValueCard[] = [
    {
      title: locale === 'en' ? 'Our Vision' : 'رؤيتنا',
      description: locale === 'en'
        ? 'To be the primary reference for intelligent software solutions in the region, leading our partners towards an innovative and sustainable digital future.'
        : 'أن نكون المرجع الأول للحلول البرمجية الذكية في المنطقة، ونقود شركاءنا نحو مستقبل رقمي يتسم بالابتكار والاستدامة',
      bgType: 'navy',
      icon: 'eye'
    },
    {
      title: locale === 'en' ? 'Our Mission' : 'رسالتنا',
      description: locale === 'en' 
        ? 'We deploy the latest software and AI technologies to deliver custom solutions combining quality, security, and flexibility.' 
        : 'نوظف أحدث تقنيات البرمجيات والذكاء الاصطناعي لتقديم حلول مخصصة تجمع بين الجودة، الأمان، والمرونة',
      bgType: 'lavender',
      icon: 'target'
    },
    {
      title: locale === 'en' ? 'What We Offer' : 'ما نقدمه',
      description: locale === 'en'
        ? 'We develop intelligent digital solutions that help companies improve efficiency, make better decisions, and achieve sustainable growth.'
        : 'نطور حلولاً رقمية ذكية تساعد الشركات على رفع الكفاءة، واتخاذ قرارات أفضل، وتحقيق نمو مستدام',
      bgType: 'light-orange',
      icon: 'layer'
    },
    {
      title: locale === 'en' ? 'What Distinguishes Us' : 'ما يميزنا',
      description: locale === 'en'
        ? 'Your digital transformation partner · Intelligent digital solutions · Scalable systems · Specialized technical expertise'
        : 'شريكك في التحول الرقمي • حلول رقمية ذكية • أنظمة قابلة للتوسع • خبرات تقنية متخصصة',
      bgType: 'orange',
      icon: 'medal'
    }
  ]

  const items = cards && cards.length > 0 ? cards : defaultCards

  // Helper styles based on card background type
  const getCardStyles = (bgType: string) => {
    switch (bgType) {
      case 'navy':
        return {
          cardBg: 'bg-[#243A77] dark:bg-[#162347]',
          titleColor: 'text-white',
          descColor: 'text-[#f9f9f9]/80',
          iconWrapBg: 'bg-[#1D2E5F] dark:bg-[#1d2e5f]',
          iconColor: 'text-white'
        }
      case 'orange':
        return {
          cardBg: 'bg-[#F4794E] dark:bg-[#f15722]',
          titleColor: 'text-white',
          descColor: 'text-[#f9f9f9]/80',
          iconWrapBg: 'bg-[#C1461B] dark:bg-[#c1461b]',
          iconColor: 'text-white'
        }
      case 'light-orange':
        return {
          cardBg: 'bg-[#FFF2EF] dark:bg-[#0e1730] border border-[#fcddd3]/40 dark:border-[#162347]',
          titleColor: 'text-foreground dark:text-white',
          descColor: 'text-foreground-muted dark:text-[#eaeaeb]',
          iconWrapBg: 'bg-[#FCDDD3] dark:bg-[#162347]',
          iconColor: 'text-[#F15722] dark:text-white'
        }
      case 'lavender':
      default:
        return {
          cardBg: 'bg-[#EEF2FF] dark:bg-[#0e1730] border border-[#d2daf1]/40 dark:border-[#162347]',
          titleColor: 'text-foreground dark:text-white',
          descColor: 'text-foreground-muted dark:text-[#eaeaeb]',
          iconWrapBg: 'bg-[rgba(210,218,241,0.5)] dark:bg-[#162347]',
          iconColor: 'text-[#243A77] dark:text-white'
        }
    }
  }

  return (
    <section className="bg-surface dark:bg-[#0b1124] py-16 lg:py-20 transition-colors duration-300" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-[1240px] px-5 lg:px-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          {items.map((card, index) => {
            const styles = getCardStyles(card.bgType)
            const IconComponent = iconMap[card.icon] || Target
            
            // Map index to col spans: 
            // 0: span 7, 1: span 5, 2: span 5, 3: span 7
            const colSpanClass = index === 0 
              ? 'lg:col-span-7' 
              : index === 1 
              ? 'lg:col-span-5' 
              : index === 2 
              ? 'lg:col-span-5' 
              : 'lg:col-span-7'

            return (
              <motion.article
                key={index}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className={cn(
                  'flex flex-col gap-6 rounded-[24px] p-8 text-right shadow-[0_12px_32px_rgba(14,23,48,0.03)] transition-all duration-300',
                  colSpanClass,
                  styles.cardBg,
                  locale === 'ar' ? 'text-right' : 'text-left'
                )}
              >
                {/* Icon wrapper */}
                <div className={cn(
                  'flex size-12 items-center justify-center rounded-[16px]',
                  styles.iconWrapBg,
                  locale === 'ar' ? 'mr-0' : 'ml-0'
                )}>
                  <IconComponent className={cn('size-6', styles.iconColor)} />
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-3">
                  <h3 
                    className={cn(
                      'text-[24px] sm:text-[28px] font-bold leading-normal font-serif-text',
                      styles.titleColor
                    )}
                    style={{ fontFamily: '"Thmanyah Serif Text", serif' }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    className={cn(
                      'text-[15px] sm:text-[18px] font-medium leading-[1.6]',
                      styles.descColor
                    )}
                    style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
                  >
                    {card.description}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
