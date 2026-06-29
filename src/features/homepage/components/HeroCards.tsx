'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { PillButton } from '@/components/ui/PillButton'
import { cardVariants, motionViewport } from '@/lib/animations/motion'
import { cn } from '@/lib/cn'

function HeroButtonArt() {
  return (
    <div className="absolute right-[-26px] top-[32px] flex w-[314.11px] origin-top-right -rotate-[10deg] flex-col items-start justify-center gap-[8.08px] p-[16.16px] max-md:right-[-76px]">
      <div className="absolute inset-y-[-2px] end-0 w-[92px] rounded-e-[62px] border-y-2 border-e-2 border-[#F5C9BB]" />
      <div className="absolute bottom-[-2px] end-[88px] h-0.5 w-[226px] bg-[#F5C9BB]" />
      <div className="absolute top-[-2px] end-[88px] h-0.5 w-[226px] bg-[#F5C9BB]" />
      <PillButton href="#contact" className="-mt-1.5 relative right-[125px] w-[160px]">
        طلب خدمة
      </PillButton>
    </div>
  )
}

function HeroProcessArt() {
  return (
    <div className="absolute inset-x-0 top-8 flex flex-col items-center gap-4">
      <div className="flex h-[64px] w-[260px] items-center justify-between rounded-full border border-[#E6E9F0] bg-white px-5 shadow-[0_8px_24px_rgba(14,23,48,0.05)]">
        <div className="text-right">
          <strong className="block text-[14px] font-bold text-[#0E1730]">نما</strong>
          <span className="text-[12px] text-[#6F7890]">تم تسليم المشروع بنجاح</span>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#E6E9F0] bg-[#FAFCFF] text-[12px] font-bold text-[#243A77]">
          نما
        </span>
      </div>
      <div className="flex h-[76px] w-[310px] items-center justify-between rounded-full border border-[#E6E9F0] bg-white px-6 shadow-[0_10px_28px_rgba(14,23,48,0.06)]">
        <div className="text-right">
          <strong className="block text-[18px] font-bold text-[#0E1730]">نوبكو</strong>
          <span className="text-[13px] text-[#6F7890]">شكرا لكم، النتائج فاقت توقعاتنا</span>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-full border border-[#E6E9F0] bg-[#FAFCFF] text-[13px] font-bold text-[#243A77]">
          نوبكو
        </span>
      </div>
    </div>
  )
}

function HeroChartArt() {
  return (
    <div className="absolute inset-x-0 top-10 flex h-full items-center justify-center">
      <img src="/images/chart-orange.svg" alt="" className="h-full w-auto object-contain" />
    </div>
  )
}

export function HeroCard({
  title,
  body,
  type,
  hoverRotate = 2
}: {
  title: string
  body: string
  type: 'button' | 'process' | 'chart'
  hoverRotate?: number
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              rotate: hoverRotate,
              y: -6,
              transition: { type: 'spring', stiffness: 300, damping: 20 }
            }
      }
      className="group relative h-[360px] overflow-hidden rounded-[50px] border-2 border-[#F1D5CC] bg-white p-10 text-right shadow-[0_12px_32px_rgba(14,23,48,0.03)] transition-all duration-300 hover:border-[#F15722] hover:shadow-[0_20px_48px_rgba(241,87,34,0.22)]"
    >
      <div className="pointer-events-none absolute bottom-4 left-1/2 h-28 w-[75%] -translate-x-1/2 rounded-full bg-[#F15722]/25 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <img
        src="/images/hero-card-orange.svg"
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full"
      />
      {type === 'button' && <HeroButtonArt />}
      {type === 'process' && <HeroProcessArt />}
      {type === 'chart' && <HeroChartArt />}

      <div className="relative z-10 mt-[218px]">
        <h3 className="text-[24px] font-bold leading-tight text-[#0E1730]">{title}</h3>
        <p className="mt-2 text-[16px] leading-7 text-[#6F7890]">{body}</p>
      </div>
    </motion.article>
  )
}
