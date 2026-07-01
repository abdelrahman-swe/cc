"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";

const DISPLAY_PARTNERS = [
  {
    id: 'naama',
    name: 'نما',
    note: 'تم تسليم المشروع بنجاح',
    logo: '/partners/naama.svg',
  },
  {
    id: 'nupco',
    name: 'نوبكو',
    note: 'شكرا لكم، النتائج فاقت توقعاتنا',
    logo: '/partners/nupco.svg',
  },
  {
    id: 'sdaia',
    name: 'سدايا',
    note: 'شريك استراتيجي في التحول الرقمي',
    logo: '/partners/sdaia.svg',
  },
  {
    id: 'stc',
    name: 'STC',
    note: 'حلول تقنية متكاملة ومبتكرة',
    logo: '/partners/stc.svg',
  },
  {
    id: 'nafath',
    name: 'نفاذ',
    note: 'ربط وتكامل الأنظمة الرقمية',
    logo: '/partners/nafath.svg',
  },
  {
    id: 'odawi',
    name: 'عُداوي',
    note: 'منصة الرعاية الصحية الذكية',
    logo: '/partners/odawi.svg',
  },
];

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
    orange: "cta-pill--orange bg-[#c44118] text-white",
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
        "cta-pill group inline-flex h-14 items-center justify-between gap-4 rounded-[50px] ps-6 pe-2 text-[15px] font-bold transition duration-300 hover:-translate-y-0.5",
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
        <ArrowLeft aria-hidden className={cn('cta-icon-main', 'size-5')} />
        <span className="cta-icon-ghost">
          <ArrowLeft aria-hidden className="size-5" />
        </span>
      </span>
    </a>
  );
}

function HeroButtonArt() {
  return (
    <div className={cn('absolute', '-right-[35px]', 'top-[32px]', 'flex', 'origin-top-right', '-rotate-[8deg]', 'items-center')}>
      <div className={cn('relative', 'flex', 'h-[66px]', 'w-[270px]', 'items-center', 'justify-between', 'rounded-full', 'border-[1.5px]', 'border-[#F5C9BB]', 'p-1.5', 'bg-white/40')}>
        <div className="w-1" />
        <PillButton href="#contact" className={cn('!h-[52px]', '!ps-4', '!pe-1', '!text-[14px]', 'w-[150px]', 'shadow-md')}>
          طلب خدمة
        </PillButton>
      </div>
    </div>
  );
}

function HeroProcessArt() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const len = DISPLAY_PARTNERS.length;
  const currentStack = [
    { partner: DISPLAY_PARTNERS[(step + 1) % len], slot: 'top' as const },
    { partner: DISPLAY_PARTNERS[step % len], slot: 'bottom' as const },
  ];

  const slotVariants = {
    bottom: {
      y: 62,
      scale: 1,
      opacity: 1,
      zIndex: 20,
      transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as const }
    },
    top: {
      y: -10,
      scale: 0.92,
      opacity: 0.75,
      zIndex: 10,
      transition: { duration: 0.45, ease: "easeInOut" as const }
    }
  } as const;

  return (
    <div className={cn('absolute', 'inset-x-0', 'top-6', 'flex', 'h-[160px]', 'items-center', 'justify-center', 'pointer-events-none', 'select-none', 'overflow-visible')}>
      {currentStack.map(({ partner, slot }) => (
        <motion.div
          key={partner.id}
          layout
          initial={false}
          animate={slot}
          variants={slotVariants}
          className={cn('absolute', 'flex', 'h-[64px]', 'w-[275px]', 'items-center', 'gap-3', 'rounded-full', 'border', 'border-[#EBECEF]', 'bg-white', 'px-4', 'py-2', 'shadow-[0_8px_24px_rgba(14,23,48,0.05)]')}
        >
          <div className={cn('relative', 'flex', 'size-11', 'shrink-0', 'items-center', 'justify-center', 'rounded-full', 'border', 'border-[#EAECEF]', 'bg-white', 'p-1.5', 'shadow-sm')}>
            <img src={partner.logo} alt={partner.name} className={cn('h-full', 'w-full', 'object-contain')} />
          </div>
          <div className={cn('text-right', 'flex-1', 'min-w-0')}>
            <strong className={cn('block', 'text-[14px]', 'font-bold', 'text-[#0E1730]', 'truncate')}>{partner.name}</strong>
            <span className={cn('block', 'text-[11px]', 'text-[#808586]', 'truncate')}>{partner.note}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function HeroChartArt() {
  return (
    <div className={cn('absolute', 'inset-x-0', 'top-10', 'flex', 'h-[160px]', 'items-center', 'justify-center')}>
      <img src="/images/chart-orange.svg" alt="" className={cn('h-[160px]', 'w-auto', 'object-contain')} />
    </div>
  );
}

function HeroCardItem({
  title,
  body,
  type,
  hoverRotate = 2,
  rotateOffset = 0,
}: {
  title: string;
  body: string;
  type: "button" | "process" | "chart";
  hoverRotate?: number;
  rotateOffset?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const px = x / (rect.width / 2);
    const py = y / (rect.height / 2);

    setRotateX(-py * 8);
    setRotateY(px * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      animate={{
        rotate: rotateOffset,
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
      }}
      transition={{
        rotate: { type: "spring", stiffness: 140, damping: 12 },
        rotateX: { type: "spring", stiffness: 150, damping: 20 },
        rotateY: { type: "spring", stiffness: 150, damping: 20 },
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              rotate: hoverRotate,
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformOrigin: "bottom center" }}
      className={cn('group', 'relative', 'h-[360px]', 'overflow-hidden', 'rounded-[50.5px]', 'border-[2.02px]', 'border-[#F1D5CC]', 'bg-white', 'px-6', 'py-10', 'xl:px-8', 'text-right', 'shadow-[0_12px_32px_rgba(14,23,48,0.03)]', 'transition-[border-color]', 'duration-200', 'hover:border-[#F79A7A]')}
    >
      <div className={cn('pointer-events-none', 'absolute', 'bottom-4', 'left-1/2', 'h-28', 'w-[75%]', '-translate-x-1/2', 'rounded-full', 'bg-[#F79A7A]/25', 'opacity-0', 'blur-2xl', 'transition-opacity', 'duration-300', 'group-hover:opacity-100')} />
      {/* <img src="/hero-blur.svg" alt="" className={cn('pointer-events-none', 'absolute', 'inset-x-0', 'bottom-0', 'z-0', 'w-full')} /> */}
      {type === "button" ? <HeroButtonArt /> : null}
      {type === "process" ? <HeroProcessArt /> : null}
      {type === "chart" ? <HeroChartArt /> : null}

      <div className={cn('relative', 'z-10', 'mt-[218px]')}>
        <h3
          className={cn('text-right', 'font-semibold', 'leading-normal')}
          style={{
            color: 'var(--Neutral-800, #121516)',
            fontFamily: '"IBM Plex Sans Arabic", sans-serif',
            fontSize: '22px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
          }}
        >
          {title}
        </h3>
        <p
          className={cn('mt-2', 'text-right', 'font-normal')}
          style={{
            color: 'var(--Neutral-400, #575C5E)',
            fontFamily: '"IBM Plex Sans Arabic", sans-serif',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%',
            whiteSpace: 'nowrap'
          }}
        >
          {body}
        </p>
      </div>
    </motion.article>
  );
}

export function HeroSection(props: any) {
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

  const [hasAnimated, setHasAnimated] = useState(false);
  const [rotations, setRotations] = useState<[number, number, number]>([0, 0, 0]);

  const triggerChainAnimation = () => {
    if (hasAnimated) return;
    setHasAnimated(true);

    setTimeout(() => {
      const rot = -30;

      setRotations([rot, 0, 0]);

      setTimeout(() => {
        setRotations([0, rot, 0]);

        setTimeout(() => {
          setRotations([0, 0, rot]);

          setTimeout(() => {
            setRotations([0, 0, 0]);
          }, 350);
        }, 220);
      }, 220);
    }, 1000);
  };

  return (
    <section id="home" className={cn('relative', 'overflow-hidden', 'bg-white', 'pb-14', 'pt-16', 'lg:min-h-[870px]')} dir="rtl">
      <div className={cn('pointer-events-none', 'absolute', 'left-1/2', 'top-[50px]', 'z-0', 'h-[750px]', 'w-[1540px]', '-translate-x-1/2', 'opacity-100')}>
        <img src="/hero-blur.svg" alt="" className={cn('h-full', 'w-full', 'object-contain')} />
      </div>
      <div className={cn('relative', 'z-10', 'mx-auto', 'max-w-[1248px]', 'px-5', 'text-center', 'lg:px-0')}>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className={cn('mx-auto', 'w-full', 'max-w-[760px]')}>
          <h1 className={cn('text-[32px]', 'sm:text-[42px]', 'font-bold', 'leading-[1.18]', 'text-[#243A77]', 'md:text-[52px]', 'font-serif-display')} style={{ fontFamily: '"Thmanyah Serif Display", serif' }}>
            <span className="block">
              {headlineBefore} <span className={cn('text-[#F15722]', 'font-serif-display')}>{headlineEmphasis}</span>
            </span>
            <span className={cn('mt-3', 'md:mt-5', 'block', 'font-serif-display')}>{headlineAfter}</span>
          </h1>
          <p
            className={cn('mx-auto', 'mt-5', 'md:mt-7', 'max-w-[652px]', 'text-center', 'font-normal', 'text-[16px]', 'sm:text-[20px]', 'md:text-[24px]')}
            style={{
              color: 'var(--Neutral-300, #808586)',
              fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
              lineHeight: '140%'
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          onViewportEnter={triggerChainAnimation}
          className={cn('mx-auto', 'mt-[86px]', 'grid', 'max-w-[1248px]', 'gap-6', 'md:grid-cols-3', 'max-md:mt-14')}
        >
          {cards.map((card: any, idx: number) => (
            <HeroCardItem
              key={card.title || idx}
              title={card.title}
              body={card.description}
              type={card.visual || (idx === 0 ? "button" : idx === 1 ? "process" : "chart")}
              hoverRotate={idx % 2 === 0 ? -2 : 2}
              rotateOffset={rotations[idx]}
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
