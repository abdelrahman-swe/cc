"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, rotate: 0 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const motionViewport = { once: true, margin: "-80px" } as const;

function PillButton({
  children,
  href,
  variant = "nav",
  className = "",
}: {
  children: string;
  href: string;
  variant?: "nav" | "orange" | "blue" | "white";
  className?: string;
}) {
  const styles = {
    nav: "cta-pill--navy bg-[#243A77] text-white",
    orange: "cta-pill--orange bg-[#F15722] text-white",
    blue: "cta-pill--navy bg-[#243A77] text-white",
    white: "cta-pill--white border border-[#F1D5CC] bg-white text-[#F15722]",
  };

  const circle = {
    nav: "bg-white text-[#243A77]",
    orange: "bg-white text-[#F15722]",
    blue: "bg-white text-[#F15722]",
    white: "bg-[#F15722] text-white",
  };

  return (
    <a
      href={href}
      className={cn(
        "cta-pill group inline-flex h-14 items-center justify-between gap-4 rounded-[50px] ps-6 pe-2 text-[15px] font-bold shadow-[0_14px_34px_rgba(14,23,48,0.12)] transition duration-300 hover:-translate-y-0.5",
        styles[variant],
        className,
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          "cta-icon-wrap relative grid size-10 shrink-0 place-items-center rounded-full",
          circle[variant],
        )}
      >
        <ArrowLeft aria-hidden className="cta-icon-main size-5" />
        <span className="cta-icon-ghost">
          <ArrowLeft aria-hidden className="size-5" />
        </span>
      </span>
    </a>
  );
}

function HeroButtonArt() {
  return (
    <div
      className={cn(
        "absolute right-[-26px] top-[32px] flex w-[314.11px] origin-top-right -rotate-[10deg] flex-col items-start justify-center gap-[8.08px] p-[16.16px] max-md:right-[-76px]"
      )}
    >
      <div className="absolute inset-y-[-2px] end-0 w-[92px] rounded-e-[62px] border-y-2 border-e-2 border-[#F5C9BB]" />
      <div className="absolute bottom-[-2px] end-[88px] h-0.5 w-[226px] bg-[#F5C9BB]" />
      <div className="absolute top-[-2px] end-[88px] h-0.5 w-[226px] bg-[#F5C9BB]" />
      <PillButton href="#contact" className="relative right-[125px] -mt-1.5 w-[160px]">
        طلب خدمة
      </PillButton>
    </div>
  );
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
  );
}

function HeroChartArt() {
  return (
    <div className="absolute inset-x-0 top-10 flex h-full items-center justify-center">
      <img src="/images/chart-orange.svg" alt="" className="h-full w-auto object-contain" />
    </div>
  );
}

function HeroCardItem({
  title,
  body,
  type,
  hoverRotate = 2,
}: {
  title: string;
  body: string;
  type: "button" | "process" | "chart";
  hoverRotate?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

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
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }
      }
      className="group relative h-[360px] overflow-hidden rounded-[50px] border-2 border-[#F1D5CC] bg-white p-10 text-right shadow-[0_12px_32px_rgba(14,23,48,0.03)] transition-all duration-300 hover:border-[#F15722] hover:shadow-[0_20px_48px_rgba(241,87,34,0.22)]"
    >
      <div className="pointer-events-none absolute bottom-4 left-1/2 h-28 w-[75%] -translate-x-1/2 rounded-full bg-[#F15722]/25 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <img src="/images/hero-card-orange.svg" alt="" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full" />
      {type === "button" ? <HeroButtonArt /> : null}
      {type === "process" ? <HeroProcessArt /> : null}
      {type === "chart" ? <HeroChartArt /> : null}

      <div className="relative z-10 mt-[218px]">
        <h3 className="text-[24px] font-bold leading-tight text-[#0E1730]">{title}</h3>
        <p className="mt-2 text-[16px] leading-7 text-[#6F7890]">{body}</p>
      </div>
    </motion.article>
  );
}

export function HeroSection(props: any) {
  // Support both Hero tab fields (homepageHeadline) and block fields (headline)
  const headline = props.homepageHeadline || props.headline || {};
  const headlineBefore = headline.before || "شريكك التقني";
  const headlineEmphasis = headline.emphasis || "لحلــــول رقميـــــة";
  const headlineAfter = headline.after || "تدعم نمو أعمالك";
  const subtitle = props.homepageSubtitle || props.subtitle || "نصمم ونطور مواقع وتطبيقات مخصصة لتحسين الكفاءة وتجربة العملاء.";
  const cta = props.homepagePrimaryCta || props.primaryCta || {};
  const ctaLabel = cta.label || "احصل على استشارة مجانية";
  const ctaHref = cta.href || "#contact";
  const rawCards = props.homepageCards || props.cards || [];
  const cards = rawCards.length ? rawCards : [
    { title: "نجعل الأمر أسهل", description: "من الفكرة إلى التنفيذ، بخطوات واضحة وعملية", visual: "button" },
    { title: "نستمع إليك لنفهم احتياجاتك", description: "فخورين بثقة أكثر من 250 مؤسسة ومنظمة", visual: "process" },
    { title: "نمنحك رؤية أوضح", description: "من خلال أدوات تساعدك على قياس النجاح", visual: "chart" }
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-white pb-14 pt-16 lg:min-h-[870px]" dir="rtl">
      <div className="pointer-events-none absolute left-1/2 top-[250px] z-0 h-[360px] w-[1540px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(241,87,34,0.14)_0%,rgba(241,87,34,0.08)_42%,rgba(255,255,255,0)_73%)] opacity-90" />
      <div className="relative z-10 mx-auto max-w-[1248px] px-5 text-center lg:px-0">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mx-auto w-full max-w-[760px]">
          <h1 className="font-serif-display text-[42px] font-bold leading-[1.18] text-[#243A77] md:text-[52px]">
            <span className="block">
              {headlineBefore} <span className="text-[#F15722]">{headlineEmphasis}</span>
            </span>
            <span className="mt-5 block">{headlineAfter}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[652px] text-[16px] leading-8 text-[#8B93A6]">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="mx-auto mt-[86px] grid max-w-[1248px] gap-6 md:grid-cols-3 max-md:mt-14"
        >
          {cards.map((card: any, idx: number) => (
            <HeroCardItem
              key={card.title || idx}
              title={card.title}
              body={card.description}
              type={card.visual || (idx === 0 ? "button" : idx === 1 ? "process" : "chart")}
              hoverRotate={idx % 2 === 0 ? -2 : 2}
            />
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={motionViewport} className="mt-16">
          <PillButton href={ctaHref} variant="orange">
            {ctaLabel}
          </PillButton>
        </motion.div>
      </div>
    </section>
  );
}
