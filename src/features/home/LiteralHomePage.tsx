'use client'

import { ArrowLeft, ArrowUpLeft, Plus } from 'lucide-react'
import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { cn } from "../../lib/cn";

const navLinks = [
  ['الرئيسية', '#home'],
  ['من نحن', '#who-we-are'],
  ['أعمالنا', '#featured-work'],
  ['الخدمات', '#services'],
  ['المدونة', '#blog'],
  ['تواصل معنا', '#contact']
] as const

const partners = [
  ['/images/noboco.svg', 'noboco'],
  ['/images/naama.svg', 'Naama'],
  ['/media/nafath.svg', 'نفاذ'],
  ['/images/mada.svg', 'mada'],
  ['/images/stc.svg', 'stc'],
  ['/images/sadia.svg', 'SDAIA']
] as const

const whyCards = [
  ['/icons/content/medal.svg', 'خبرة أكثر من 10 سنوات', 'مشاريع رقمية ناضجة في قطاعات متعددة، مع فهم عميق لمتطلبات السوق المحلي.'],
  ['/icons/content/pen.svg', 'حلول مخصصة حسب احتياجك', 'نبني المنتج حول أهدافك ونموذج عملك، لا حول قالب جاهز محدود.'],
  ['/icons/content/rank.svg', 'سرعة إنجاز ومرونة عالية', 'فرق عمل رشيقة تتعامل مع التغيرات بسرعة وتحافظ على جودة التنفيذ.'],
  ['/icons/content/shield.svg', 'أمان وحوكمة البيانات', 'نطبق معايير حماية واعتمادية مناسبة لطبيعة بياناتك وعملياتك.']
] as const

const methodology = [
  ['تحليل وفهم المشروع', 'نكتشف الفكرة ونحوّلها إلى نطاق عمل واضح ومؤشرات نجاح قابلة للقياس.'],
  ['تخطيط تجربة المستخدم وواجهة الاستخدام (UX/UI)', 'نصمم رحلة استخدام واضحة ومنطقية قبل بدء التطوير.'],
  ['التطوير والبرمجة', 'نبني النظام بأفضل الممارسات التقنية لضمان قابلية التوسع.'],
  ['الاختبار والإطلاق', 'نراجع الأداء وتجربة الاستخدام ونطلق المنتج بثقة.']
] as const

function Counter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (inView) {
      const node = ref.current
      if (!node) return

      const controls = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(latest) {
          node.textContent = `${prefix}${Math.floor(latest)}${suffix}`
        }
      })

      return () => controls.stop()
    }
  }, [value, inView, prefix, suffix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

function PillButton({
  children,
  href,
  variant = 'nav',
  className = ''
}: {
  children: string
  href: string
  variant?: 'nav' | 'orange' | 'blue' | 'white'
  className?: string
}) {
  const buttonStyles = {
    nav: 'bg-[#243A77] text-white hover:bg-[#1d2e5f]',
    orange: 'bg-[#F15722] text-white hover:bg-[#d44516]',
    blue: 'bg-[#243A77] text-white hover:bg-[#1d2e5f]',
    white: 'bg-white text-[#F15722] border border-[#F1D5CC] hover:bg-orange-50'
  }

  const circleStyles = {
    nav: 'bg-white text-[#243A77]',
    orange: 'bg-white text-[#F15722]',
    blue: 'bg-white text-[#243A77]',
    white: 'bg-[#F15722] text-white'
  }

  return (
    <a
      href={href}
      className={cn(
        'group inline-flex h-14 items-center justify-between gap-4 rounded-[50.5px] ps-6 pe-2 text-[15px] font-bold shadow-[0_12px_28px_rgba(14,23,48,0.12)] transition-all duration-300 hover:shadow-[0_16px_36px_rgba(14,23,48,0.18)] hover:-translate-y-0.5',
        buttonStyles[variant],
        className
      )}
    >
      <span className="leading-none">{children}</span>
      <span className={cn(
        'grid size-10 place-items-center rounded-full transition-transform duration-300 group-hover:-translate-x-1 shrink-0',
        circleStyles[variant]
      )}>
        <ArrowLeft aria-hidden className="size-5" />
      </span>
    </a>
  )
}

function SectionTag({ children }: { children: string }) {
  return (
    <div className={cn('inline-flex', 'h-12', 'items-center', 'justify-center', 'rounded-full', 'border', 'border-[#E8EDF6]', 'bg-white', 'px-4', 'text-[15px]', 'font-medium', 'text-[#6F7890]', 'shadow-[0_10px_24px_rgba(36,58,119,0.04)]')}>
      {children}
    </div>
  )
}

function HeroCard({
  title,
  body,
  type,
  hoverRotate = 0,
  idleRotateStart = 0,
  idleRotateEnd = 0,
  idleDuration = 5
}: {
  title: string
  body: string
  type: 'chart' | 'process' | 'button'
  hoverRotate?: number
  idleRotateStart?: number
  idleRotateEnd?: number
  idleDuration?: number
}) {
  const cardVariants = {
    initial: { opacity: 0, y: 30, rotate: idleRotateStart },
    animate: {
      opacity: 1,
      y: 0,
      rotate: [idleRotateStart, idleRotateEnd, idleRotateStart],
      transition: {
        y: { duration: 0.8, ease: 'easeOut' as const },
        opacity: { duration: 0.8, ease: 'easeOut' as const },
        rotate: {
          repeat: Infinity,
          duration: idleDuration,
          ease: 'easeInOut' as const
        }
      }
    }
  }

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ rotate: hoverRotate, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className={cn('h-[373px]', 'rounded-[50px]', 'border-2', 'border-[#F15722]', 'bg-[#FAFCFF]', 'p-6', 'text-center', 'shadow-[0_8px_32px_rgba(241,87,34,0.15)]', 'transition-shadow', 'duration-500', 'hover:shadow-[0_12px_48px_rgba(241,87,34,0.25)]')}
    >
      <div className={cn('grid', 'h-[178px]', 'place-items-center')}>
        {type === 'chart' ? (
          <div className={cn('flex', 'h-[132px]', 'items-center', 'justify-center', 'w-full')}>
            <img src="/images/charts.svg" alt="Charts" className={cn('h-full', 'w-auto', 'object-contain')} />
          </div>
        ) : null}
        {type === 'process' ? (
          <div className={cn('grid', 'w-[250px]', 'gap-5')}>
            {[0, 1].map((item) => (
              <div key={item} className={cn('flex', 'h-12', 'items-center', 'justify-between', 'rounded-full', 'bg-white', 'px-4', 'shadow-[0_10px_24px_rgba(36,58,119,0.08)]')}>
                <span className={cn('h-2', 'w-24', 'rounded-full', 'bg-[#E5ECF8]')} />
                <span className={cn('size-9', 'rounded-full', 'border', 'border-[#CFE0FF]')} />
              </div>
            ))}
          </div>
        ) : null}
        {type === 'button' ? (
          <div className={cn('inline-flex', 'rotate-[-8deg]', 'items-center', 'gap-3', 'rounded-full', 'bg-[#243A77]', 'px-5', 'py-3', 'text-white')}>
            <span className={cn('grid', 'size-9', 'place-items-center', 'rounded-full', 'bg-white/15')}>
              <ArrowLeft aria-hidden className="size-5" />
            </span>
            <span className={cn('h-2', 'w-24', 'rounded-full', 'bg-white/70')} />
          </div>
        ) : null}
      </div>
      <h3 className={cn('mt-8', 'text-[20px]', 'font-bold', 'leading-7', 'text-[#0E1730]')}>{title}</h3>
      <p className={cn('mx-auto', 'mt-3', 'max-w-[270px]', 'text-[15px]', 'leading-7', 'text-[#74829A]')}>{body}</p>
    </motion.article>
  )
}

function ServiceCard({
  title,
  body,
  image,
  className = ''
}: {
  title: string
  body: string
  image: string
  className?: string
}) {
  return (
    <motion.article
      variants={{
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className={cn('group', 'flex', 'h-[530px]', 'flex-col', 'overflow-hidden', 'rounded-[50px]', 'border', 'border-[#EEF2F8]', 'bg-white', 'shadow-[0_18px_44px_rgba(14,23,48,0.04)]', 'transition-shadow', 'duration-500', 'hover:shadow-[0_20px_60px_rgba(241,87,34,0.12)]', className)}
    >
      <div className={cn('flex-1', 'p-8', 'pb-0', 'text-start', 'flex', 'flex-col', 'justify-start')}>
        <h3 className={cn('text-[22px]', 'font-bold', 'leading-8', 'text-[#0E1730]')}>{title}</h3>
        <p className={cn('mt-4', 'text-[15px]', 'leading-7', 'text-[#6F7890]')}>{body}</p>
      </div>
      <div className={cn('relative', 'h-[280px]', 'w-full', 'overflow-hidden')}>
        <div className={cn('pointer-events-none', 'absolute', 'bottom-0', 'left-1/2', '-translate-x-1/2', 'h-[120px]', 'w-[80%]', 'rounded-full', 'bg-[#F15722]/10', 'blur-[40px]', 'transition-opacity', 'duration-500', 'opacity-0', 'group-hover:opacity-100')} />
        <img src={image} alt="" className={cn('h-full', 'w-full', 'object-cover', 'transition-transform', 'duration-500', 'group-hover:scale-[1.02]')} loading="lazy" />
      </div>
    </motion.article>
  )
}

function ProjectCard({
  image,
  category,
  title
}: {
  image: string
  category: string
  title: string
}) {
  return (
    <motion.article
      variants={{
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
      }}
      className={cn('h-[539px]', 'rounded-[28px]', 'border', 'border-[#EEF2F8]', 'bg-white', 'p-4', 'shadow-[0_18px_44px_rgba(14,23,48,0.05)]')}
    >
      <div className={cn('h-[445px]', 'overflow-hidden', 'rounded-[18px]', 'bg-[#FAFBFF]')}>
        <img src={image} alt="" className={cn('h-full', 'w-full', 'object-cover')} loading="lazy" />
      </div>
      <div className={cn('flex', 'h-[62px]', 'items-end', 'justify-between')}>
        <span className={cn('grid', 'size-10', 'place-items-center', 'rounded-full', 'text-[#243A77]')}>
          <ArrowUpLeft aria-hidden className="size-6" />
        </span>
        <div className={cn('flex', 'items-center', 'gap-2', 'text-[15px]')}>
          <span className={cn('rounded-full', 'bg-[#F4F7FC]', 'px-3', 'py-1', 'text-[13px]', 'text-[#6F7890]')}>{category}</span>
          <h3 className={cn('font-bold', 'text-[#0E1730]')}>{title}</h3>
        </div>
      </div>
    </motion.article>
  )
}

export function LiteralHomePage() {
  return (
    <div className={cn('bg-white', 'text-[#0E1730]', 'overflow-x-hidden')}>
      <header className={cn('h-[100px]', 'bg-white')}>
        <nav className={cn('mx-auto', 'flex', 'h-14', 'max-w-[1240px]', 'items-center', 'justify-between', 'pt-[22px]')}>
          <img src="/Logo.svg" alt="Code Clouders" className={cn('h-[39px]', 'w-[160px]')} />
          <div className={cn('hidden', 'w-[920px]', 'justify-center', 'gap-10', 'text-[15px]', 'font-medium', 'text-[#5F6575]', 'lg:flex')}>
            {navLinks.map(([label, href], index) => (
              <a key={label} href={href} className={index === 0 ? 'font-bold text-[#F15722]' : ''}>
                {label}
              </a>
            ))}
          </div>
          <PillButton href="#contact" className="w-[160px]">طلب خدمة</PillButton>
        </nav>
      </header>

      <main>
        <section id="home" className={cn('relative', 'h-auto', 'overflow-hidden', 'bg-white', 'pb-16', 'pt-16', 'lg:h-[995px]', 'lg:pb-0')}>
          <img
            src="/images/hero-blur-orange.svg"
            alt=""
            className={cn('pointer-events-none', 'absolute', 'left-1/2', 'top-0', '-translate-x-1/2', 'w-full', 'min-w-[1440px]', 'max-w-[1763px]', 'h-auto', 'z-0')}
          />
          <div className={cn('relative', 'z-10', 'mx-auto', 'max-w-[1240px]', 'px-5', 'text-center', 'lg:px-0')}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn('mx-auto', 'w-full', 'max-w-[652px]')}
            >
              <h1 className={cn('text-[42px]', 'font-serif-display', 'font-bold', 'leading-[1.22]', 'text-[#243A77]', 'md:text-[52px]')}>
                شريكك التقني <span className="text-[#F15722]">لحلــــول رقميـــــة</span>
                <br />
                تدعم نمو أعمالك
              </h1>
              <p className={cn('mt-6', 'text-[16px]', 'leading-8', 'text-[#8B93A6]')}>
                نصمم ونطور حلولاً وتطبيقات مخصصة لتحسين الكفاءة وتجربة العملاء.
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              animate="animate"
              variants={{
                animate: { transition: { staggerChildren: 0.15 } }
              }}
              className={cn('mx-auto', 'mt-[191px]', 'grid', 'max-w-[1248px]', 'gap-6', 'md:grid-cols-3')}
            >
              <HeroCard title="نجعل القرار أسهل" body="نضع بين يديك تجربة رقمية واضحة ومتكاملة." type="button" hoverRotate={-5} idleRotateStart={-1.5} idleRotateEnd={1.5} idleDuration={5} />
              <HeroCard title="نسهل آلية فهم احتياجاتك" body="نحوّل متطلباتك إلى حلول رقمية دقيقة ومترابطة." type="process" hoverRotate={5} idleRotateStart={1} idleRotateEnd={-1} idleDuration={4.5} />
              <HeroCard title="nمنحك رؤية أوضح" body="حوّل بياناتك إلى قرارات قابلة للتنفيذ." type="chart" hoverRotate={-4} idleRotateStart={-2} idleRotateEnd={2} idleDuration={6} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-16"
            >
              <PillButton href="#contact" variant="orange">
                احصل على استشارة مجانية
              </PillButton>
            </motion.div>
          </div>
        </section>

        <section className={cn('h-auto', 'bg-white', 'py-16', 'lg:h-[392px]')} id="partners">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className={cn('mx-auto', 'max-w-[1240px]', 'px-5', 'text-center', 'lg:px-0')}
          >
            <SectionTag>شركاء النجاح</SectionTag>
            <h2 className={cn('mt-6', 'text-[28px]', 'font-serif-text', 'font-bold', 'text-[#243A77]')}>
              علامات تشاركنا شغف التميز في حضورها الرقمي
            </h2>
            <div className={cn('mt-20', 'relative', 'w-full', 'overflow-hidden', '[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]')}>
              <div className={cn('animate-marquee', 'flex', 'gap-16', 'items-center')}>
                {[...partners, ...partners, ...partners].map(([src, label], index) => (
                  <div
                    key={`${src}-${index}`}
                    className={cn('flex', 'h-[72px]', 'w-[180px]', 'shrink-0', 'items-center', 'justify-center', 'opacity-55', 'grayscale', 'transition', 'hover:opacity-100', 'hover:grayscale-0')}
                  >
                    <img src={src} alt={label} className={cn('max-h-[44px]', 'max-w-[150px]', 'object-contain')} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section className={cn('bg-white', 'py-16', 'lg:min-h-[1725px]', 'lg:py-16')} id="services">
          <div className={cn('mx-auto', 'max-w-[1240px]', 'px-5', 'text-center', 'lg:px-0')}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <SectionTag>الخدمات</SectionTag>
              <h2 className={cn('mt-6', 'text-[32px]', 'font-serif-text', 'font-bold', 'text-[#243A77]')}>
                كل ما تحتاجه لبناء نظام رقمي ناجح
              </h2>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                animate: { transition: { staggerChildren: 0.15 } }
              }}
              className={cn('mt-14', 'grid', 'gap-6', 'text-start', 'lg:grid-cols-[397px_397px_397px]')}
            >
              <ServiceCard
                title="هندسة البرمجيات والأنظمة المؤسسية"
                body="نقدم حلولاً برمجية مفصلة حول تخطيط موارد المؤسسات (ERP)، المصممة للتكامل مع العمليات المعقدة والبيانات الضخمة."
                image="/mockups/3aloolo.png"
              />

              <motion.article
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className={cn('flex', 'h-[531px]', 'flex-col', 'overflow-hidden', 'rounded-[50px]', 'border', 'border-[#F1D5CC]', 'bg-[#FFFDFC]', 'p-8', 'shadow-[0_18px_44px_rgba(14,23,48,0.04)]', 'lg:col-span-2')}
              >
                <div className={cn('mx-auto', 'mt-4', 'flex', 'w-full', 'max-w-[560px]', 'items-start', 'gap-4', 'rounded-[16px]', 'border', 'border-[#FFD0C0]', 'bg-white', 'p-6', 'shadow-[0_16px_38px_rgba(14,23,48,0.06)]')}>
                  <span className={cn('grid', 'size-9', 'shrink-0', 'place-items-center', 'rounded-full', 'bg-[#FEEEE9]', 'text-[#F15722]')}>
                    <Plus aria-hidden className="size-4" />
                  </span>
                  <div>
                    <h3 className={cn('text-[22px]', 'font-bold', 'text-[#0E1730]')}>حلول الذكاء الاصطناعي المتقدمة</h3>
                    <p className={cn('mt-3', 'text-[15px]', 'leading-7', 'text-[#6F7890]')}>
                      نساعدك على توظيف تقنيات الذكاء الاصطناعي التوليدي (GenAI) داخل أنظمتك لتفهم بياناتك وتنفذ أعمالك بكفاءة.
                    </p>
                  </div>
                </div>
                <div className={cn('relative', 'flex', 'flex-1', 'items-end', 'justify-center', 'pb-4')}>
                  <img src="/mockups/mascot.png" alt="" className={cn('h-[245px]', 'w-auto', 'object-contain')} loading="lazy" />
                </div>
              </motion.article>

              <ServiceCard
                title="تصميم الواجهات وتجربة المستخدم"
                body="نصمم حلولاً وتجارب مستخدم رقمية تتمحور حول المستخدم، تعزز التفاعل وترفع قيمة علامتك التجارية."
                image="/mockups/Mockup 14.png"
              />
              <ServiceCard
                title="تطوير تطبيقات الجوال"
                body="نبني تطبيقات Native وCross-platform لتجربة مستخدم سلسة ومتكاملة بشكل مثالي مع مختلف الأنظمة المؤسسية."
                image="/mockups/3aloolo.png"
              />
              <ServiceCard
                title="بناء منتجات SaaS"
                body="نساعدك في تطوير منصات SaaS مرنة وقابلة للتوسع، بنظام اشتراكات يمكّنك من بيع خدماتك كمنتج متكرر."
                image="/mockups/Dashboard 1.png"
              />

              <motion.article
                variants={{
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className={cn('grid', 'min-h-[320px]', 'overflow-hidden', 'rounded-[50px]', 'border', 'border-[#EEF2F8]', 'bg-white', 'shadow-[0_18px_44px_rgba(14,23,48,0.04)]', 'lg:col-span-3', 'lg:grid-cols-[1fr_815px]')}
              >
                <div className={cn('flex', 'flex-col', 'justify-center', 'p-10', 'text-start')}>
                  <h3 className={cn('text-[22px]', 'font-bold', 'text-[#0E1730]')}>تعهيد الكفاءات والفرق التقنية</h3>
                  <p className={cn('mt-4', 'text-[15px]', 'leading-7', 'text-[#6F7890]')}>
                    نوفر مطورين وخبراء تقنيين جاهزين للانضمام إلى فريقك، لتسريع تنفيذ المشاريع وسد فجوات المهارات بكفاءة ومرونة.
                  </p>
                  <div className={cn('mt-7', 'flex', 'items-center', 'gap-2')}>
                    <span className={cn('rounded-full', 'bg-[#243A77]', 'px-4', 'py-2', 'text-[13px]', 'font-bold', 'text-white')}>+10K</span>
                    {[0, 1, 2].map((item) => (
                      <span key={item} className={cn('size-8', 'rounded-full', 'border-2', 'border-white', 'bg-[#EDF3FF]')} />
                    ))}
                  </div>
                </div>
                <div className={cn('h-[320px]', 'bg-[#FAFBFF]')}>
                  <img src="/images/globe.svg" alt="" className={cn('h-full', 'w-full', 'object-cover')} loading="lazy" />
                </div>
              </motion.article>
            </motion.div>
          </div>
        </section>

        <section id="who-we-are" className={cn('bg-white', 'py-16', 'lg:h-[796px]', 'lg:py-16')}>
          <div className={cn('mx-auto', 'grid', 'max-w-[1240px]', 'gap-[73px]', 'px-5', 'lg:grid-cols-[587px_580px]', 'lg:px-0')}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className={cn('pt-2', 'text-start')}
            >
              <h2 className={cn('text-[36px]', 'font-serif-text', 'font-bold', 'leading-[1.35]', 'text-[#0E1730]')}>
                نبني حلولاً رقمية تنمو مع أعمالك
              </h2>
              <p className={cn('mt-7', 'text-[17px]', 'leading-8', 'text-[#6F7890]')}>
                منذ انطلاقنا في 2017، كرسنا جهودنا لتمكين المؤسسات من التميز الرقمي. واليوم نفخر بسجل حافل من المشاريع التي أحدثت فارقاً حقيقياً في أداء شركائنا، عبر حلول صممت لتبقى وتتطور.
              </p>
              <div className={cn('mt-12', 'grid', 'max-w-[472px]', 'grid-cols-3', 'gap-10', 'text-center')}>
                {[
                  { value: 200, prefix: '+', label: 'مشروع', body: 'تم تسليمه بنجاح' },
                  { value: 150, prefix: '+', label: 'عميل', body: 'وشريك نجاح' },
                  { value: 10, prefix: '+', label: 'سنوات', body: 'خبرة وتميز تقني' }
                ].map(({ value, prefix, label, body }) => (
                  <div key={label}>
                    <div className={cn('text-[30px]', 'font-black', 'text-[#F15722]')}>
                      <Counter value={value} prefix={prefix} />
                    </div>
                    <div className={cn('text-[21px]', 'font-bold', 'text-[#243A77]')}>{label}</div>
                    <p className={cn('mt-2', 'text-[13px]', 'leading-5', 'text-[#74829A]')}>{body}</p>
                  </div>
                ))}
              </div>
              <div className={cn('mt-16', 'flex', 'justify-start')}>
                <PillButton href="#contact" variant="blue">ابدأ رحلة نموك</PillButton>
              </div>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                animate: { transition: { staggerChildren: 0.12 } }
              }}
              className={cn('grid', 'gap-8')}
            >
              {whyCards.map(([icon, title, body]) => (
                <motion.article
                  key={title}
                  variants={{
                    initial: { opacity: 0, x: -30 },
                    animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                  }}
                  className={cn('flex', 'h-[143px]', 'items-center', 'gap-5', 'rounded-[24px]', 'border', 'border-[#EEF2F8]', 'bg-white', 'p-6', 'shadow-[0_14px_34px_rgba(14,23,48,0.04)]')}
                >
                  <img src={icon} alt="" className="size-5" loading="lazy" />
                  <div>
                    <h3 className={cn('text-[18px]', 'font-semibold', 'text-[#0E1730]')}>{title}</h3>
                    <p className={cn('mt-2', 'text-[14px]', 'leading-6', 'text-[#74829A]')}>{body}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="featured-work" className={cn('bg-white', 'py-16', 'lg:h-[937px]', 'lg:py-16')}>
          <div className={cn('mx-auto', 'max-w-[1240px]', 'px-5', 'text-center', 'lg:px-0')}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <SectionTag>مشاريع مختارة</SectionTag>
              <h2 className={cn('mt-6', 'text-[32px]', 'font-serif-text', 'font-bold', 'text-[#243A77]')}>
                نحوّل الأفكار إلى مشاريع تحقق نتائج
              </h2>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-100px' }}
              variants={{
                animate: { transition: { staggerChildren: 0.15 } }
              }}
              className={cn('mt-14', 'grid', 'gap-6', 'md:grid-cols-3')}
            >
              <ProjectCard image="/media/red-cresent.png" category="موقع" title="هيئة الهلال الأحمر السعودي" />
              <ProjectCard image="/mockups/Mockup 14.png" category="متجر" title="أبير" />
              <ProjectCard image="/media/red-cresent.png" category="موقع" title="هيئة الهلال الأحمر السعودي" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-14"
            >
              <PillButton href="#featured-work" variant="blue">تصفح جميع المشاريع</PillButton>
            </motion.div>
          </div>
        </section>

        <section className={cn('bg-white', 'py-16', 'lg:h-[1024px]', 'lg:py-16')} id="methodology">
          <div className={cn('mx-auto', 'max-w-[1240px]', 'px-5', 'text-center', 'lg:px-0')}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <SectionTag>آلية العمل</SectionTag>
              <h2 className={cn('mt-6', 'text-[32px]', 'font-serif-text', 'font-bold', 'text-[#243A77]')}>
                من الفكرة إلى الإطلاق بخطوات تقنية دقيقة
              </h2>
            </motion.div>

            <div className={cn('relative', 'mt-[104px]', 'flex', 'flex-col', 'gap-12', 'lg:gap-0', 'w-full')}>
              {/* Vertical line through the center of the timeline */}
              <div className={cn('absolute', 'left-1/2', 'top-0', 'bottom-0', 'w-px', 'bg-[#FCDDD3]', '-translate-x-1/2', 'hidden', 'lg:block')} />

              {methodology.map(([title, body], index) => {
                const stepNum = index + 1
                const isEven = stepNum % 2 === 0

                return (
                  <motion.div
                    key={title}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: '-100px' }}
                    className={cn('flex', 'flex-col', 'lg:flex-row', 'items-center', 'justify-between', 'w-full', 'lg:min-h-[180px]', 'relative')}
                  >
                    {isEven ? (
                      <>
                        {/* Even: Card on Right, Empty on Left in RTL */}
                        {/* Card Column */}
                        <div className={cn('w-full', 'lg:w-[calc(50%-32px)]')}>
                          <motion.article
                            variants={{
                              initial: { opacity: 0, x: 30 },
                              animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                            }}
                            className={cn('rounded-[18px]', 'border', 'border-[#EEF2F8]', 'bg-white', 'p-7', 'shadow-[0_14px_34px_rgba(14,23,48,0.04)]')}
                          >
                            <span className={cn('mb-3', 'inline-grid', 'size-7', 'place-items-center', 'rounded-full', 'bg-[#FEEEE9]', 'text-[13px]', 'font-bold', 'text-[#F15722]', 'lg:hidden')}>
                              {stepNum}
                            </span>
                            <h3 className={cn('text-[18px]', 'font-bold', 'text-[#0E1730]')}>{title}</h3>
                            <p className={cn('mt-3', 'text-[14px]', 'leading-6', 'text-[#74829A]')}>{body}</p>
                          </motion.article>
                        </div>

                        {/* Number Node */}
                        <div className={cn('hidden', 'lg:flex', 'items-center', 'justify-center', 'z-10', 'w-16')}>
                          <span className={cn('grid', 'size-8', 'place-items-center', 'rounded-full', 'bg-[#F15722]', 'text-[14px]', 'font-bold', 'text-white', 'shadow-sm')}>
                            {stepNum}
                          </span>
                        </div>

                        {/* Empty spacing */}
                        <div className={cn('hidden', 'lg:block', 'w-[calc(50%-32px)]')} />
                      </>
                    ) : (
                      <>
                        {/* Odd: Card on Left, Empty on Right in RTL */}
                        {/* Empty spacing */}
                        <div className={cn('hidden', 'lg:block', 'w-[calc(50%-32px)]')} />

                        {/* Number Node */}
                        <div className={cn('hidden', 'lg:flex', 'items-center', 'justify-center', 'z-10', 'w-16')}>
                          <span className={cn('grid', 'size-8', 'place-items-center', 'rounded-full', 'bg-[#F15722]', 'text-[14px]', 'font-bold', 'text-white', 'shadow-sm')}>
                            {stepNum}
                          </span>
                        </div>

                        {/* Card Column */}
                        <div className={cn('w-full', 'lg:w-[calc(50%-32px)]')}>
                          <motion.article
                            variants={{
                              initial: { opacity: 0, x: -30 },
                              animate: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                            }}
                            className={cn('rounded-[18px]', 'border', 'border-[#EEF2F8]', 'bg-white', 'p-7', 'shadow-[0_14px_34px_rgba(14,23,48,0.04)]')}
                          >
                            <span className={cn('mb-3', 'inline-grid', 'size-7', 'place-items-center', 'rounded-full', 'bg-[#FEEEE9]', 'text-[13px]', 'font-bold', 'text-[#F15722]', 'lg:hidden')}>
                              {stepNum}
                            </span>
                            <h3 className={cn('text-[18px]', 'font-bold', 'text-[#0E1730]')}>{title}</h3>
                            <p className={cn('mt-3', 'text-[14px]', 'leading-6', 'text-[#74829A]')}>{body}</p>
                          </motion.article>
                        </div>
                      </>
                    )}
                  </motion.div>
                )
              })}
            </div>

            <div className="my-20">
              <PillButton href="#contact" variant="blue">تواصل معنا الآن</PillButton>
            </div>
          </div>
        </section>

        <section className={cn('bg-white mt-32', 'py-20', 'lg:h-[584px]')} id="contact">
          <div className={cn('mx-auto', 'max-w-[1240px]', 'px-5', 'lg:px-0')}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className={cn('relative', 'h-auto', 'min-h-[456px]', 'overflow-hidden', 'rounded-[32px]', 'bg-[#F15722]', 'px-10', 'py-14', 'text-white', 'lg:h-[456px]', 'lg:px-0', 'lg:py-0')}
            >
              <div className={cn('relative', 'z-10', 'max-w-[634px]', 'text-center', 'lg:absolute', 'lg:left-10', 'lg:top-24', 'lg:text-start')}>
                <h2 className={cn('text-[44px]', 'font-serif-text', 'font-black', 'leading-tight')}>
                  لنحوّل فكرتك إلى منتج رقمي حقيقي
                </h2>
                <p className={cn('mt-4', 'text-[20px]', 'font-bold', 'text-white/80')}>حوّل الفكرة إلى واقع ملموس</p>
                <div className="mt-9">
                  <PillButton href="#contact" variant="white">احصل على استشارة مجانية</PillButton>
                </div>
              </div>
              <img src="/mockups/mascot.png" alt="" className={cn('pointer-events-none', 'absolute', 'bottom-[-155px]', 'right-[40px]', 'hidden', 'w-[420px]', 'lg:block')} loading="lazy" />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className={cn('h-auto', 'bg-[#0D193B]', 'text-white', 'lg:h-[356px]')}>
        <div className={cn('mx-auto', 'grid', 'max-w-[1200px]', 'gap-10', 'px-5', 'py-16', 'lg:grid-cols-[199px_220px_220px_160px]', 'lg:justify-between', 'lg:px-0')}>
          <div>
            <p className={cn('text-[17px]', 'font-bold')}>تابعنا على وسائل التواصل</p>
            <div className={cn('mt-4', 'flex', 'gap-4')}>
              {['/icons/twitter.svg', '/icons/email.svg', '/icons/Vector.svg', '/icons/mouse.svg'].map((src) => (
                <span key={src} className={cn('grid', 'size-6', 'place-items-center', 'opacity-80')}>
                  <img src={src} alt="" className={cn('max-h-5', 'max-w-5', 'invert')} loading="lazy" />
                </span>
              ))}
            </div>
          </div>
          <div className={cn('space-y-8', 'text-[15px]', 'text-white/70')}>
            <div>
              <p className={cn('mb-3', 'text-[17px]', 'font-bold', 'text-white')}>العنوان</p>
              <p>المملكة العربية السعودية</p>
            </div>
            <div>
              <p className={cn('mb-3', 'text-[17px]', 'font-bold', 'text-white')}>تواصل معنا</p>
              <p>info@codeclouders.com</p>
              <p className="mt-2">+966 55 019 7744</p>
            </div>
          </div>
          <div>
            <p className={cn('text-[17px]', 'font-bold')}>روابط مهمة</p>
            <div className={cn('mt-4', 'grid', 'gap-2', 'text-[15px]', 'text-white/70')}>
              {navLinks.map(([label, href]) => (
                <a key={label} href={href}>{label}</a>
              ))}
            </div>
          </div>
          <img src="/Logo.svg" alt="Code Clouders" className={cn('h-[39px]', 'w-[160px]', 'brightness-0', 'invert')} />
        </div>
        <p className={cn('mx-auto', 'max-w-[1200px]', 'px-5', 'pb-8', 'text-center', 'text-[12px]', 'text-white/50', 'lg:px-0')}>
          جميع الحقوق محفوظة - CodeClouders.
        </p>
      </footer>
    </div>
  )
}
