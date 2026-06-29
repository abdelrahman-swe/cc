'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Star } from 'lucide-react'
import { SectionTag } from '@/components/ui/SectionTag'
import { getServices, type ServiceItem } from '@/lib/repositories/services.repository'
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

function AiServiceCard() {
  return (
    <motion.article
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      className={cn(
        'group relative h-[530px] overflow-hidden rounded-[50px] border border-[#EEF2F8] bg-white shadow-[0_18px_44px_rgba(14,23,48,0.04)] transition-all duration-300 hover:border-[#F15722] lg:col-span-2'
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-full w-full bg-gradient-to-t from-[#F15722]/25 via-[#F15722]/10 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <img
        src="/mockups/mascot.png"
        alt=""
        className="absolute left-1/2 top-[-50px] z-0 h-[458px] w-auto -translate-x-1/2 object-contain"
        loading="lazy"
      />
      <div className="absolute bottom-[58px] left-1/2 z-10 flex min-h-[150px] w-[560px] max-w-[calc(100%-48px)] -translate-x-1/2 items-center justify-between gap-6 rounded-[24px] bg-white px-9 py-7 text-right shadow-[0_20px_50px_rgba(14,23,48,0.08)]">
        <span className="grid size-12 shrink-0 place-items-center rounded-[15px] border border-[#EEF2F8] text-[#243A77] transition-colors duration-300 group-hover:border-[#FBCDBD] group-hover:text-[#F15722]">
          <Star aria-hidden className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[24px] font-bold leading-8 text-[#0E1730]">
            حلول الذكاء الاصطناعي المتقدمة
          </h3>
          <p className="mt-4 text-[15px] leading-8 text-[#6F7890]">
            نساعدك على تبني تقنيات الذكاء الاصطناعي التوليدي (GenAI) وتعلم الآلة (ML) لبناء أنظمة تفهم، تحلل، وتنبأ.
          </p>
        </div>
      </div>
      <div
        className="absolute left-[calc(50%-230px)] top-[224px] z-20 h-[145px] w-[230px] max-md:left-[4%] max-md:h-[120px] max-md:w-[190px]"
        style={{ clipPath: 'inset(0 0 8% 0)' }}
      >
        <img
          src="/mockups/mascot_arm_front.png"
          alt=""
          className="h-full w-auto rotate-[-4deg] object-contain"
          loading="lazy"
        />
      </div>
    </motion.article>
  )
}

function ServiceCard({
  title,
  body,
  image,
  imageClass = 'object-cover object-top w-full h-full'
}: {
  title: string
  body: string
  image: string
  imageClass?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      variants={fadeUp}
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
        'group relative flex h-[530px] flex-col overflow-hidden rounded-[50px] border border-[#EEF2F8] bg-white shadow-[0_18px_44px_rgba(14,23,48,0.04)] transition-all duration-300 hover:border-[#F15722]'
      )}
    >
      <div className="px-8 pt-9 text-right">
        <h3 className="text-[22px] font-bold leading-8 text-[#0E1730]">{title}</h3>
        <p className="mt-4 text-[15px] leading-7 text-[#6F7890]">{body}</p>
      </div>
      <div className="relative z-10 mt-6 w-full flex-1 overflow-hidden bg-transparent">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-full w-full bg-gradient-to-t from-[#F15722]/30 via-[#F15722]/10 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <img
          src={image}
          alt=""
          className={cn('relative z-10 h-full w-full transition duration-500 group-hover:scale-[1.02]', imageClass)}
          loading="lazy"
        />
      </div>
    </motion.article>
  )
}

function WideServiceCard() {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      className={cn(
        'group relative grid min-h-[320px] overflow-hidden rounded-[50px] border border-[#EEF2F8] bg-white shadow-[0_18px_44px_rgba(14,23,48,0.04)] transition-all duration-300 hover:border-[#F15722] lg:col-span-3 lg:grid-cols-[1fr_815px]'
      )}
    >
      <div className="flex flex-col justify-center p-10 text-right">
        <h3 className="text-[22px] font-bold text-[#0E1730]">تعزيز الكفاءات والفرق التقنية</h3>
        <p className="mt-4 text-[15px] leading-7 text-[#6F7890]">
          نوفر مطورين وخبراء تقنيين جاهزين للانضمام إلى فريقك، لتسريع تنفيذ المشاريع وسد فجوات المهارات بكفاءة ومرونة.
        </p>
        <div className="mt-7 flex items-center justify-end gap-2">
          <span className="rounded-full bg-[#243A77] px-4 py-2 text-[13px] font-bold text-white">
            10K+
          </span>
          {[0, 1, 2].map((item) => (
            <span
              key={item}
              className="size-8 rounded-full border-2 border-white bg-[#EDF3FF]"
            />
          ))}
        </div>
      </div>
      <div className="relative h-[320px] bg-white">
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-l from-[#F15722]/30 via-[#F15722]/10 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <img
          src="/images/globe.svg"
          alt=""
          className="relative z-10 h-full w-full object-cover"
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
  presentation?: any
  customSectionId?: string
}

export function ServicesSection(props: ServicesSectionProps) {
  const sectionTag = props.sectionTag || 'خدماتنا'
  const title = props.title || 'حلول رقمية متكاملة تواكب نمو أعمالك'
  const sectionId = props.customSectionId || 'services'

  return (
    <section className="bg-white py-16" id={sectionId}>
      <div className="mx-auto max-w-[1240px] px-5 text-center lg:px-0">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={motionViewport}>
          <SectionTag>{sectionTag}</SectionTag>
          <h2 className="mx-auto mt-6 max-w-[760px] font-serif-text text-[34px] font-bold leading-[1.35] text-[#243A77]">
            {title}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="mt-[70px] grid gap-6 lg:grid-cols-3"
        >
          {props.items && props.items.length > 0 ? (
            props.items.map((svc) => (
              <ServiceCard
                key={svc.id || svc.title}
                title={svc.title}
                body={svc.description}
                image={svc.imageUrl || (svc as any).image?.src || '/mockups/Mockup 14.png'}
              />
            ))
          ) : (
            <>
              <ServiceCard
                title="تصميم الواجهات وتجربة المستخدم"
                body="نصمم تجارب مستخدم رقمية تتمحور حول المستخدم، تعزز التفاعل وترفع قيمة علامتك التجارية."
                image="/mockups/Mockup 14.png"
                imageClass="object-cover object-top w-full h-full"
              />
              <AiServiceCard />
              <ServiceCard
                title="تطوير تطبيقات الجوال"
                body="نبني تطبيقات Native وCross-platform لتجربة مستخدم سلسة ومتكاملة مع مختلف الأنظمة."
                image="/images/service-image.svg"
                imageClass="object-cover object-top w-full h-full"
              />
              <ServiceCard
                title="بناء منتجات SaaS"
                body="نساعدك في تطوير منصات SaaS مرنة وقابلة للتوسع، بنظام اشتراكات يمكن منتجك من النمو."
                image="/images/service-image-3.png"
                imageClass="object-cover object-top w-full h-full"
              />
              <ServiceCard
                title="حلول التجارة الإلكترونية"
                body="نبني متاجر وتجارب بيع رقمية عالية الأداء، من الكتالوج حتى الدفع والتكاملات."
                image="/mockups/Dashboard 1.png"
                imageClass="object-cover object-top w-full h-full"
              />
              <WideServiceCard />
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
