'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUpLeft } from 'lucide-react'
import { SectionTag } from '@/components/ui/SectionTag'
import { type BlogPostItem } from '@/lib/repositories/blogs.repository'
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

type BlogSectionProps = {
  sectionTag?: string
  heading?: string
  items?: BlogPostItem[]
  presentation?: any
  customSectionId?: string
}

export function BlogSection(props: BlogSectionProps) {
  const sectionTag = props.sectionTag || 'المدونة التقنية'
  const heading = props.heading || 'مقالات ورؤى حول أحدث التقنيات والتحول الرقمي'
  const sectionId = props.customSectionId || 'blog'
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="bg-white py-16 lg:min-h-[700px]" id={sectionId}>
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
            props.items.map((post) => (
              <motion.article
                key={post.id || post.title}
                variants={scaleIn}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -8, transition: { type: 'spring', stiffness: 220, damping: 18 } }
                }
                className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#EEF2F8] bg-white p-6 text-right shadow-[0_18px_44px_rgba(14,23,48,0.04)] transition-all duration-300 hover:border-[#F15722]"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden rounded-[20px] bg-[#FAFBFF]">
                    <img
                      src={post.imageUrl || '/mockups/Mockup 14.png'}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                  {post.publishedAt && (
                    <span className="mt-4 block text-[12px] font-medium text-[#6F7890]">
                      {post.publishedAt}
                    </span>
                  )}
                  <h3 className="mt-2 text-[18px] font-bold leading-7 text-[#0E1730]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-6 text-[#6F7890]">{post.excerpt}</p>
                </div>
              </motion.article>
            ))
          ) : (
            <>
              <motion.article
                variants={scaleIn}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#EEF2F8] bg-white p-6 text-right shadow-[0_18px_44px_rgba(14,23,48,0.04)] transition-all duration-300 hover:border-[#F15722]"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[20px] bg-[#FAFBFF]">
                  <img
                    src="/mockups/Mockup 14.png"
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <span className="mt-4 block text-[12px] font-medium text-[#6F7890]">24 يونيو 2026</span>
                <h3 className="mt-2 text-[18px] font-bold leading-7 text-[#0E1730]">
                  مستقبل تطبيقات الذكاء الاصطناعي التوليدي في حلول الأعمال
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-[#6F7890]">
                  كيف تساهم التقنيات الحديثة في رفع كفاءة التشغيل وتحسين تجارب العملاء.
                </p>
              </motion.article>
              <motion.article
                variants={scaleIn}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#EEF2F8] bg-white p-6 text-right shadow-[0_18px_44px_rgba(14,23,48,0.04)] transition-all duration-300 hover:border-[#F15722]"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[20px] bg-[#FAFBFF]">
                  <img
                    src="/images/service-image-3.png"
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <span className="mt-4 block text-[12px] font-medium text-[#6F7890]">18 يونيو 2026</span>
                <h3 className="mt-2 text-[18px] font-bold leading-7 text-[#0E1730]">
                  أفضل الممارسات لتطوير وتوسع المنصات السحابية SaaS
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-[#6F7890]">
                  دليل شامل حول بنية الأنظمة القابلة للتوسع وإدارة البنية التحتية بكفاءة.
                </p>
              </motion.article>
              <motion.article
                variants={scaleIn}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#EEF2F8] bg-white p-6 text-right shadow-[0_18px_44px_rgba(14,23,48,0.04)] transition-all duration-300 hover:border-[#F15722]"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[20px] bg-[#FAFBFF]">
                  <img
                    src="/mockups/Dashboard 1.png"
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <span className="mt-4 block text-[12px] font-medium text-[#6F7890]">10 يونيو 2026</span>
                <h3 className="mt-2 text-[18px] font-bold leading-7 text-[#0E1730]">
                  توجيهات هندسة تجربة المستخدم في المتاجر الرقمية الحديثة
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-[#6F7890]">
                  طرق عملية لزيادة معدلات التحويل وتسريع عمليات الشراء للمستخدمين.
                </p>
              </motion.article>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
