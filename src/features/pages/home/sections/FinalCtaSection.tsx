"use client";

import { motion, type Variants } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { cn } from "@/lib/cn";

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const motionViewport = { once: true, margin: "-80px" } as const;

type FinalCtaSectionProps = {
  heading?: string;
  body?: string;
  cta?: { label?: string; href?: string };
  presentation?: any;
  customSectionId?: string;
};

export function FinalCtaSection(props: FinalCtaSectionProps) {
  const heading = props.heading || "لنحوّل فكرتك إلى منتج رقمي حقيقي";
  const body = props.body || "نحوّل الرؤية إلى واقع رقمي";
  const sectionId = props.customSectionId || "contact";

  return (
    <section className={cn('bg-surface', 'py-5 sm:py-10', 'md:py-16', 'transition-colors', 'duration-300')} id={sectionId}>
      <div className={cn('mx-auto', 'max-w-[1240px]', 'px-5', 'lg:px-0')}>
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className={cn('relative', 'min-h-[220px] md:min-h-[420px]', 'flex items-center', 'overflow-hidden', 'rounded-[24px] md:rounded-[32px]', 'bg-[#0D193B]', 'px-4 py-6 sm:px-6 md:p-14 lg:px-16 lg:py-16', 'text-white')}
        >
          {/* CTA Pop Starburst behind mascot head */}
          <img
            src="/light/cta-pop-orange.svg"
            alt=""
            className={cn('pointer-events-none', 'absolute', 'left-[170px]', 'top-[15px]', 'z-0', 'hidden', 'w-[190px]', 'md:block', 'lg:left-[240px]', 'lg:top-[25px]', 'lg:w-[230px]')}
            loading="lazy"
          />

          {/* Mascot Robot on Left */}
          <img
            src="/assets/mockups/mascot.png"
            alt=""
            width={460}
            height={590}
            className={cn('pointer-events-none', 'absolute', 'bottom-[-100px]', 'left-0', 'z-10', 'hidden', 'w-[340px]', 'md:block', 'lg:bottom-[-210px]', 'lg:left-[30px]', 'lg:w-[460px]')}
            loading="lazy"
          />

          {/* CTA Blur overlay on top of mascot at bottom end of card */}
          <img
            src="/dark/cta-blur-blue.svg"
            alt=""
            className={cn('pointer-events-none', 'absolute', 'inset-x-0', 'bottom-0', 'z-20', 'h-auto', 'w-full', 'object-cover')}
            loading="lazy"
          />

          {/* Grid Layout: Text on Right */}
          <div className={cn('relative', 'z-30', 'grid', 'w-full', 'items-center', 'gap-6 md:gap-8', 'md:grid-cols-[1.2fr_0.8fr]')}>
            <div className={cn('flex', 'flex-col', 'items-center', 'text-center', 'md:items-start', 'md:text-right')}>
              <span className={cn('font-brand', 'bg-white/10 dark:bg-white/15 backdrop-blur-md', 'px-3.5', 'py-1.5', 'border border-white/20', 'rounded-3xl', 'text-white', 'text-[12px] md:text-[14px]', 'mb-3', 'inline-block')}>
                لديك فكرة ؟
              </span>
              <h2 className={cn('font-serif-text', 'text-[18px] sm:text-[24px] md:text-[36px] lg:text-[44px]', 'font-bold', 'leading-tight', 'text-white')}>
                {heading}
              </h2>
              <p className={cn('mt-3 md:mt-4', 'text-[14px] md:text-[20px]', 'font-semibold', 'text-white/90')}>
                {body}
              </p>
              <div className="mt-6 md:mt-8">
                <PillButton href={props.cta?.href || "/contact"} variant="blue">
                  {props.cta?.label || "احصل علي استشارة مجانية"}
                </PillButton>
              </div>
            </div>
            <div className={cn('hidden', 'min-h-[200px] md:min-h-[300px]', 'md:block')} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
