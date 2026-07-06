"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import { ArrowLeft, ArrowUpLeft, Star, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Marquee } from "@/registry/magicui/marquee";
import type { HomePageData } from "./types/home";
import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { ProjectCard } from "@/features/case-studies/sections/FeaturedWorkSection";
import { SectionTag } from "@/components/ui/SectionTag";
import { useTheme } from "@/components/shared/ThemeProvider";

const DISPLAY_PARTNERS = [
  {
    id: "naama",
    name: "نما",
    note: "تم تسليم المشروع بنجاح",
    logo: "/assets/partners/naama.svg",
  },
  {
    id: "nupco",
    name: "نوبكو",
    note: "شكرا لكم، النتائج فاقت توقعاتنا",
    logo: "/assets/partners/nupco.svg",
  },
  {
    id: "sdaia",
    name: "سدايا",
    note: "شريك استراتيجي في التحول الرقمي",
    logo: "/assets/partners/sdaia.svg",
  },
  {
    id: "stc",
    name: "STC",
    note: "حلول تقنية متكاملة ومبتكرة",
    logo: "/assets/partners/stc.svg",
  },
  {
    id: "nafath",
    name: "نفاذ",
    note: "ربط وتكامل الأنظمة الرقمية",
    logo: "/assets/partners/nafath.svg",
  },
  {
    id: "odawi",
    name: "عُداوي",
    note: "منصة الرعاية الصحية الذكية",
    logo: "/assets/partners/odawi.svg",
  },
];

const defaultNavLinks = [
  ["الرئيسية", "/"],
  ["من نحن", "/about"],
  ["أعمالنا", "/featured-work"],
  ["الخدمات", "/services"],
  ["المدونة", "/blog"],
  ["تواصل معنا", "/contact"],
] as const;

const defaultPartners = [
  ["/assets/partners/nupco.svg", "nupco"],
  ["/assets/partners/naama.svg", "Naama"],
  ["/assets/partners/nafath.svg", "نفاذ"],
  ["/assets/partners/mada.svg", "mada"],
  ["/assets/partners/stc.svg", "stc"],
  ["/assets/partners/sdaia.svg", "SDAIA"],
] as const;

const defaultWhyCards = [
  [
    "/assets/icons/content/medal.svg",
    "خبرة تزيد عن 6 سنوات",
    "نمتلك خبرة عملية في تصميم وتطوير حلول رقمية احترافية تدعم نجاح أعمالك.",
  ],
  [
    "/assets/icons/content/pen.svg",
    "حلول مخصصة حسب احتياجك",
    "نصمم المنتج حول أهدافك ونموذج عملك، لا حول قالب جاهز ومحدود.",
  ],
  [
    "/assets/icons/content/rank.svg",
    "سرعة إنجاز ومرونة عالية",
    "فرق عمل رشيقة تتعامل مع المتغيرات بسرعة وتحافظ على جودة التنفيذ.",
  ],
  [
    "/assets/icons/content/shield.svg",
    "أمان وحوكمة البيانات",
    "نطبق معايير حماية واعتمادية مناسبة لطبيعة بياناتك وعملياتك.",
  ],
] as const;

const defaultMethodology = [
  [
    "تحليل وفهم المشروع",
    "نكتشف الفكرة ونحولها إلى نطاق عمل واضح ومؤشرات نجاح قابلة للقياس.",
  ],
  [
    "تخطيط تجربة المستخدم وواجهة الاستخدام",
    "نصمم رحلة استخدام واضحة ومنطقية قبل بدء التطوير.",
  ],
  [
    "التطوير والبرمجة",
    "نبني النظام بأفضل الممارسات التقنية لضمان الأداء وقابلية التوسع.",
  ],
  ["الاختبار والإطلاق", "نراجع الأداء وتجربة الاستخدام ونطلق المنتج بثقة."],
] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
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
  onClick,
}: {
  children: string;
  href: string;
  variant?: "nav" | "orange" | "blue" | "white";
  className?: string;
  onClick?: () => void;
}) {
  const styles = {
    nav: "cta-pill--navy bg-[#243A77] text-white",
    orange: "cta-pill--orange bg-[#F15722] text-white",
    blue: "cta-pill--navy bg-[#243A77] text-white",
    white: "cta-pill--white border border-[#F1D5CC] dark:border-white/15 bg-surface-card text-[#F15722]",
  };

  const circle = {
    nav: "bg-surface text-[#243A77]",
    orange: "bg-surface text-[#F15722]",
    blue: "bg-surface text-[#F15722]",
    white: "bg-[#F15722] text-white",
  };

  return (
    <a
      href={href}
      onClick={onClick}
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
        <ArrowLeft aria-hidden className={cn("cta-icon-main", "size-5")} />
        <span className="cta-icon-ghost">
          <ArrowLeft aria-hidden className="size-5" />
        </span>
      </span>
    </a>
  );
}



function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;

    if (!node || !isInView) {
      return;
    }

    if (shouldReduceMotion) {
      node.textContent = `${value}${suffix}`;
      return;
    }

    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(latest) {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, suffix, value]);

  return <span ref={ref}>0{suffix}</span>;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, rotate: 0 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

function HeroButtonArt() {
  return (
    <div
      className={cn(
        "absolute",
        "-right-[35px]",
        "top-[32px]",
        "flex",
        "origin-top-right",
        "-rotate-[8deg]",
        "items-center",
      )}
    >
      <div
        className={cn(
          "relative",
          "flex",
          "h-[66px]",
          "w-[270px]",
          "items-center",
          "justify-between",
          "rounded-full",
          "border-[1.5px]",
          "border-[#F5C9BB]",
          "p-1.5",
          "bg-white/40",
        )}
      >
        <div className="w-1" />
        <PillButton
          href="/contact"
          className={cn(
            "!h-[52px]",
            "!ps-4",
            "!pe-1",
            "!text-[14px]",
            "w-[150px]",
            "shadow-md",
          )}
        >
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
    { partner: DISPLAY_PARTNERS[(step + 1) % len], slot: "top" as const },
    { partner: DISPLAY_PARTNERS[step % len], slot: "bottom" as const },
  ];

  const slotVariants = {
    bottom: {
      y: 62,
      scale: 1,
      opacity: 1,
      zIndex: 20,
      transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as const },
    },
    top: {
      y: -10,
      scale: 0.92,
      opacity: 0.75,
      zIndex: 10,
      transition: { duration: 0.45, ease: "easeInOut" as const },
    },
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
          className={cn('absolute', 'flex', 'h-[64px]', 'w-[275px]', 'items-center', 'gap-3', 'rounded-full', 'border', 'border-border', 'dark:border-white/10', 'bg-surface-card', 'dark:bg-[#070C18]/60', 'px-4', 'py-2', 'shadow-[0_8px_24px_rgba(14,23,48,0.05)]', 'transition-colors', 'duration-300')}
        >
          <div className={cn('relative', 'flex', 'size-11', 'shrink-0', 'items-center', 'justify-center', 'rounded-full', 'border', 'border-border', 'dark:border-white/10', 'bg-surface-card', 'dark:bg-[#070C18]/60', 'p-1.5', 'shadow-sm', 'transition-colors', 'duration-300')}>
            <img
              src={partner.logo}
              alt={partner.name}
              className={cn('h-full', 'w-full', 'object-contain', 'dark:brightness-0', 'dark:invert')}
            />
          </div>
          <div className={cn('text-right', 'flex-1', 'min-w-0')}>
            <strong className={cn('block', 'text-[14px]', 'font-bold', 'text-foreground', 'truncate')}>
              {partner.name}
            </strong>
            <span className={cn('block', 'text-[11px]', 'text-foreground-subtle', 'truncate')}>
              {partner.note}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function HeroChartArt() {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        "absolute",
        "inset-x-0",
        "top-4",
        "flex",
        "h-[190px]",
        "items-center",
        "justify-center",
      )}
    >
      <img
        src={theme === 'dark' ? '/dark/charts.svg' : '/assets/images/chart-orange.svg'}
        alt=""
        className={cn("h-[190px]", "w-auto", "object-contain")}
      />
    </div>
  );
}

function HeroCard({
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
  const { theme } = useTheme();

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
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
      className={cn(
        "group relative h-[360px] overflow-hidden rounded-[50.5px] border-[2.02px] border-[#F1D5CC] dark:border-white/15 bg-surface-card hero-card px-6 py-10 xl:px-8 text-right shadow-[0_12px_32px_rgba(14,23,48,0.03)] transition-[border-color,box-shadow,background-color] duration-200 hover:border-[#F79A7A] dark:hover:border-[#072FA2] hover:shadow-[-217.15px_247.45px_91.91px_0px_rgba(36,58,119,0.01),-9.09px_10.1px_29.29px_0px_rgba(36,58,119,0.08)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none",
          "absolute",
          "bottom-4",
          "left-1/2",
          "h-28",
          "w-[75%]",
          "-translate-x-1/2",
          "rounded-full",
          "bg-[#F79A7A]/25",
          "dark:bg-[#072FA2]/20",
          "opacity-0",
          "blur-2xl",
          "transition-opacity",
          "duration-300",
          "group-hover:opacity-100",
        )}
      />

      <img
        src={theme === 'dark' ? '/dark/hero-card-blur.svg' : '/assets/images/hero-card-orange.svg'}
        alt=""
        className={cn(
          "pointer-events-none",
          "absolute",
          "inset-x-0",
          "bottom-0",
          "z-0",
          "w-full",
        )}
      />
      {type === "button" ? <HeroButtonArt /> : null}
      {type === "process" ? <HeroProcessArt /> : null}
      {type === "chart" ? <HeroChartArt /> : null}

      <div className={cn("relative", "z-10", "mt-[218px]")}>
        <h3
          className={cn('text-right', 'font-semibold', 'leading-normal')}
          style={{
            color: "var(--Neutral-800, #121516)",
            fontFamily: '"IBM Plex Sans Arabic", sans-serif',
            fontSize: "22px",
            fontWeight: 600,
            lineHeight: "normal",
          }}
        >
          {title}
        </h3>
        <p
          className={cn('mt-2', 'text-right', 'font-normal', 'text-[15px]', 'sm:text-[16px]', 'lg:text-[18px]', 'xl:text-[20px]')}
          style={{
            color: "var(--Neutral-400, #575C5E)",
            fontFamily: '"IBM Plex Sans Arabic", sans-serif',
            fontWeight: 400,
            lineHeight: "140%",
          }}
        >
          {body}
        </p>
      </div>
    </motion.article>
  );
}

function AiServiceCard() {
  return (
    <motion.article
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      className={cn(
        "brand-card",
        "group",
        "relative",
        "h-[530px]",
        "overflow-hidden",
        "rounded-[50px]",
        "border",
        "border-[#EEF2F8]",
        "bg-white",
        "shadow-[0_18px_44px_rgba(14,23,48,0.04)]",
        "transition-all",
        "duration-300",
        "hover:border-[#F15722]",
        "hover:shadow-[0_20px_48px_rgba(14,23,48,0.08)]",
        "md:col-span-2",
        "lg:col-span-2",
      )}
    >
      <img
        src="/light/hover.svg"
        alt=""
        className={cn('pointer-events-none', 'absolute', 'bottom-0', 'left-0', 'z-0', 'h-full', 'w-full', 'object-cover', 'opacity-0', 'dark:opacity-0', 'transition-opacity', 'duration-500', 'group-hover:opacity-100', 'dark:group-hover:opacity-0')}
      />

      {/* Layer 1: Mascot at Back */}
      <img
        src="/assets/mockups/mascot.png"
        alt=""
        className={cn(
          "absolute",
          "left-1/2",
          "top-[60px] sm:top-[80px] lg:top-[95px]",
          "z-0",
          "h-[280px] sm:h-[350px] md:h-[409px]",
          "w-auto",
          "-translate-x-1/2",
          "object-contain",
        )}
        loading="lazy"
      />

      {/* Layer 2: White Card Container (Figma 563:9152) */}
      <div className={cn('absolute', 'bottom-[30px]', 'left-1/2', 'z-10', 'flex', 'w-[623px]', 'max-w-[calc(100%-32px)]', '-translate-x-1/2', 'flex-col', 'gap-3', 'rounded-[24px]', 'bg-surface-card', 'dark:bg-surface-elevated', 'p-4', 'shadow-[0_10px_30px_rgba(0,0,0,0.04)]', 'border', 'border-border', 'dark:border-white/10', 'transition-colors', 'duration-300')}>
        {/* Star Badge positioned on the right */}
        <div className={cn('flex', 'w-full', 'justify-start')}>
          <div className={cn('flex', 'size-[48px]', 'shrink-0', 'items-center', 'justify-center', 'rounded-[16px]', 'border', 'border-[#FCDDD3]', 'dark:border-white/15', 'bg-surface-elevated', 'dark:bg-surface', 'p-3', 'text-[#F15722]')}>
            <svg className={cn('size-6', 'fill-current')} viewBox="0 0 24 24">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
        </div>

        {/* Gray Content Box */}
        <div className={cn('w-full', 'rounded-[16px]', 'bg-surface-elevated', 'dark:bg-surface', 'p-5', 'text-right', 'transition-colors', 'duration-300')}>
          <h3
            className={cn('text-right', 'font-medium', 'leading-normal', 'text-foreground')}
            style={{
              fontFamily:
                '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 500,
            }}
          >
            حلول الذكاء الاصطناعي المتقدمة
          </h3>
          <p
            className={cn('mt-2', 'text-right', 'font-normal', 'text-foreground-muted')}
            style={{
              fontFamily:
                '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.4",
            }}
          >
            نساعدك على تبني تقنيات الذكاء الاصطناعي التوليدي (GenAI) وتعلم الآلة
            (ML) لبناء أنظمة تفهم، تحلل، وتنبأ.
          </p>
        </div>
      </div>

      {/* Hidden SVG with clip path definition */}
      <svg
        className={cn('absolute', '-left-[999px]', '-top-[999px]', 'h-0', 'w-0')}
        aria-hidden="true"
      >
        <defs>
          <clipPath
            id="edited-differentone23-1782742739957"
            clipPathUnits="objectBoundingBox"
          >
            <path
              d="M0.107822 0.242870 L0.235307 0.324978 C0.563742 0.355229 0.263397 0.590752 0.369274 0.586430 L0.308773 0.644771 L0.192092 0.668539 C0.086214 0.515125 0.000000 0.766667 0.116465 0.240709 L0.109983 0.242870 Z"
              fill="black"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Layer 3: Hand with clip path applied on top of card */}
      <img
        src="/assets/mockups/mascot.png"
        alt=""
        style={{ clipPath: "url(#edited-differentone23-1782742739957)" }}
        className={cn(
          "pointer-events-none",
          "absolute",
          "left-1/2",
          "top-[60px] sm:top-[80px] lg:top-[95px]",
          "z-20",
          "h-[280px] sm:h-[350px] md:h-[409px]",
          "w-auto",
          "-translate-x-1/2",
          "object-contain",
        )}
        loading="lazy"
      />
    </motion.article>
  );
}

function ServiceCard({
  title,
  body,
  image,
  imageClass = "object-cover object-top w-full h-full",
}: {
  title: string;
  body: string;
  image: string;
  imageClass?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

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
              transition: { type: "spring", stiffness: 220, damping: 18 },
            }
      }
      className={cn(
        "brand-card",
        "group",
        "relative",
        "flex",
        "h-[530px]",
        "flex-col",
        "overflow-hidden",
        "rounded-[50px]",
        "dark:rounded-[40px]",
        "border",
        "border-border",
        "bg-surface-card",
        "shadow-[0_18px_44px_rgba(14,23,48,0.04)]",
        "dark:shadow-[0_18px_44px_rgba(0,0,0,0.15)]",
        "transition-all",
        "duration-300",
        "hover:border-[#F15722]",
        "hover:shadow-[0_20px_48px_rgba(14,23,48,0.08)]",
      )}
    >
      <img
        src="/light/hover.svg"
        alt=""
        className={cn('pointer-events-none', 'absolute', 'bottom-0', 'left-0', 'z-0', 'h-full', 'w-full', 'object-cover', 'opacity-0', 'dark:opacity-0', 'transition-opacity', 'duration-500', 'group-hover:opacity-100', 'dark:group-hover:opacity-0')}
      />
      <div className={cn("px-8", "pt-9", "text-right")}>
        <h3
          className={cn('text-right', 'font-medium', 'leading-normal')}
          style={{
            color: "var(--Neutral-800, #1E1E20)",
            textAlign: "right",
            fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          {title}
        </h3>
        <p
          className={cn('mt-4', 'text-right', 'font-normal', 'self-stretch')}
          style={{
            color: "var(--Neutral-500, #5F6063)",
            textAlign: "right",
            fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "140%",
            alignSelf: "stretch",
          }}
        >
          {body}
        </p>
      </div>
      <div
        className={cn(
          "relative",
          "z-10",
          "mt-6",
          "flex-1",
          "w-full",
          "overflow-hidden",
          "bg-transparent",
        )}
      >
        <div className={cn('pointer-events-none', 'absolute', 'inset-x-0', 'bottom-0', 'z-0', 'h-full', 'w-full', 'bg-gradient-to-t', 'from-[#F15722]/30', 'via-[#F15722]/10', 'to-transparent', 'blur-2xl', 'opacity-0', 'transition-opacity', 'duration-500', 'group-hover:opacity-100')} />
        <img
          src={image}
          alt=""
          className={cn(
            "relative z-10 h-full w-full transition duration-500 group-hover:scale-[1.02]",
            imageClass,
          )}
          loading="lazy"
        />
      </div>
    </motion.article>
  );
}

function WideServiceCard() {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      className={cn(
        "brand-card",
        "group",
        "relative",
        "grid",
        "min-h-[320px]",
        "overflow-hidden",
        "rounded-[50px]",
        "dark:rounded-[40px]",
        "border",
        "border-border",
        "bg-surface-card",
        "shadow-[0_18px_44px_rgba(14,23,48,0.04)]",
        "dark:shadow-[0_18px_44px_rgba(0,0,0,0.15)]",
        "transition-all",
        "duration-300",
        "hover:border-[#F15722]",
        "hover:shadow-[0_20px_48px_rgba(14,23,48,0.08)]",
        "md:col-span-2",
        "lg:col-span-3",
        "lg:grid-cols-[1fr_815px]",
      )}
    >
      <img
        src="/light/hover.svg"
        alt=""
        className={cn('pointer-events-none', 'absolute', 'bottom-0', 'left-0', 'z-0', 'h-full', 'w-full', 'object-cover', 'opacity-0', 'dark:opacity-0', 'transition-opacity', 'duration-500', 'group-hover:opacity-100', 'dark:group-hover:opacity-0')}
      />
      <div
        className={cn(
          "flex",
          "flex-col",
          "justify-center",
          "p-10",
          "text-right",
        )}
      >
        <h3
          className={cn('text-right', 'font-medium', 'leading-normal')}
          style={{
            color: "var(--Neutral-800, #1E1E20)",
            textAlign: "right",
            fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          تعزيز الكفاءات والفرق التقنية
        </h3>
        <p
          className={cn('mt-4', 'text-right', 'font-normal', 'self-stretch')}
          style={{
            color: "var(--Neutral-500, #5F6063)",
            textAlign: "right",
            fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "140%",
            alignSelf: "stretch",
          }}
        >
          نوفر مطورين وخبراء تقنيين جاهزين للانضمام إلى فريقك، لتسريع تنفيذ
          المشاريع وسد فجوات المهارات بكفاءة ومرونة.
        </p>
        <div
          className={cn("mt-7", "flex", "items-center", "justify-end", "gap-2")}
        >
          <span
            className={cn(
              "rounded-full",
              "bg-[#243A77]",
              "px-4",
              "py-2",
              "text-[13px]",
              "font-bold",
              "text-white",
            )}
          >
            10K+
          </span>
          {[0, 1, 2].map((item) => (
            <span
              key={item}
              className={cn(
                "size-8",
                "rounded-full",
                "border-2",
                "border-white",
                "bg-[#EDF3FF]",
              )}
            />
          ))}
        </div>
      </div>
      <div className={cn("relative", "h-[240px] sm:h-[320px]", "bg-surface-card")}>
        <div className={cn('pointer-events-none', 'absolute', 'inset-0', 'z-0', 'bg-gradient-to-l', 'from-[#F15722]/30', 'via-[#F15722]/10', 'to-transparent', 'blur-2xl', 'opacity-0', 'transition-opacity', 'duration-500', 'group-hover:opacity-100')} />
        <img
          src="/assets/images/globe.svg"
          alt=""
          className={cn("relative", "z-10", "h-full", "w-full", "object-cover")}
          loading="lazy"
        />
      </div>
    </motion.article>
  );
}

export function LiteralHomePage({ data }: { data?: HomePageData }) {
  const { theme } = useTheme();
  const navLinksList = data?.nav?.links?.length
    ? data.nav.links.map((link) => [link.label, link.href] as const)
    : defaultNavLinks;

  const filteredPartners = data?.partners?.filter((p) => Boolean(p.logo?.src));
  const partnersList =
    filteredPartners && filteredPartners.length > 0
      ? filteredPartners.map((p) => [p.logo!.src, p.name] as const)
      : defaultPartners;

  const whyUsList = data?.whyUs?.length
    ? data.whyUs.map(
        (w, idx) =>
          [
            defaultWhyCards[idx % defaultWhyCards.length][0],
            w.title,
            w.description,
          ] as const,
      )
    : defaultWhyCards;

  const methodologyList = data?.methodology?.steps?.length
    ? data.methodology.steps.map((m) => [m.title, m.description] as const)
    : defaultMethodology;

  return (
    <div
      dir="rtl"
      className={cn("overflow-x-hidden", "bg-surface", "text-foreground", "transition-colors", "duration-300")}
    >
      <Header
        brand={data?.nav?.brand ?? undefined}
        links={(data?.nav?.links as any[]) ?? undefined}
        cta={data?.nav?.cta as any ?? undefined}
      />

      <main>
        <section
          id="home"
          className={cn(
            "relative",
            "overflow-hidden",
            "bg-surface",
            "pb-14",
            "pt-16",
            "lg:min-h-[870px]",
            "transition-colors",
            "duration-300",
          )}
        >
          <div
            className={cn(
              "pointer-events-none",
              "absolute",
              "inset-0",
              "z-0",
              "w-full",
              "h-full",
              "opacity-100",
            )}
          >
            <img
              src={theme === 'dark' ? '/dark/home-hero-blur.svg' : '/light/home-hero-blur.svg'}
              alt=""
              className={cn("h-full", "w-full", "object-cover", theme === 'dark' ? "object-center" : "object-top")}
              loading="eager"
            />
          </div>
          <div
            className={cn(
              "relative",
              "z-10",
              "mx-auto",
              "max-w-[1248px]",
              "px-5",
              "text-center",
              "lg:px-0",
            )}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={cn("mx-auto", "w-full", "max-w-[760px]")}
            >
              <h1
                className={cn(
                  "font-serif-text",
                  "text-[32px]",
                  "sm:text-[42px]",
                  "font-bold",
                  "leading-[1.18]",
                  "text-[#243A77]",
                  "dark:text-white",
                  "md:text-[52px]",
                )}
                style={{ fontFamily: '"Thmanyah Serif Display", serif' }}
              >
                <span className={cn('block', 'md:inline', 'font-serif-display')}>
                  {data?.hero?.headline?.before || "شريكك التقني"}{" "}
                </span>
                <span className={cn('text-[#F15722]', 'font-serif-display', 'block', 'md:inline')}>
                  {data?.hero?.headline?.emphasis || "لحلــــول رقميـــــة"}
                </span>
                <span
                  className={cn(
                    "mt-3",
                    "md:mt-5",
                    "block",
                    "font-serif-display",
                  )}
                >
                  {data?.hero?.headline?.after || "تدعم نمو أعمالك"}
                </span>
              </h1>
              <p
                className={cn('mx-auto', 'mt-5', 'md:mt-7', 'max-w-[652px]', 'text-center', 'font-normal', 'text-[16px]', 'sm:text-[20px]', 'md:text-[24px]')}
                style={{
                  color: "var(--Neutral-300, #808586)",
                  fontFamily:
                    '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                  fontSize: "24px",
                  lineHeight: "140%",
                }}
              >
                {data?.hero?.subtitle ||
                  "نصمم ونطور مواقع وتطبيقات مخصصة لتحسين الكفاءة وتجربة العملاء."}
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              className={cn(
                "mx-auto",
                "mt-[86px]",
                "grid",
                "max-w-[1248px]",
                "gap-6",
                "md:grid-cols-3",
                "max-md:mt-14",
              )}
            >
              {data?.hero?.cards?.length ? (
                data.hero.cards.map((card, idx) => (
                  <HeroCard
                    key={card.title}
                    title={card.title}
                    body={card.description}
                    type={
                      card.visual ||
                      (idx === 0 ? "button" : idx === 1 ? "process" : "chart")
                    }
                    hoverRotate={idx % 2 === 0 ? -2 : 2}
                  />
                ))
              ) : (
                <>
                  <HeroCard
                    title="نجعل الأمر أسهل"
                    body="من الفكرة إلى التنفيذ، بخطوات واضحة وعملية"
                    type="button"
                    hoverRotate={-2}
                  />
                  <HeroCard
                    title="نستمع إليك لنفهم احتياجاتك"
                    body="فخورين بثقة أكثر من 250 مؤسسة ومنظمة"
                    type="process"
                    hoverRotate={2}
                  />
                  <HeroCard
                    title="نمنحك رؤية أوضح"
                    body="من خلال أدوات تساعدك على قياس النجاح"
                    type="chart"
                    hoverRotate={-2}
                  />
                </>
              )}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              className="mt-16"
            >
              <PillButton
                href={data?.hero?.primaryCta?.href || "/contact"}
                variant="blue"
              >
                {data?.hero?.primaryCta?.label || "احصل على استشارة مجانية"}
              </PillButton>
            </motion.div>
          </div>
        </section>

        <section
          className={cn("bg-surface", "py-16", "lg:min-h-[392px]", "transition-colors", "duration-300")}
          id="partners"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            className={cn(
              "mx-auto",
              "max-w-[1240px]",
              "px-5",
              "text-center",
              "lg:px-0",
            )}
          >
            <SectionTag>
              {data?.partnersCopy?.eyebrow || "شركاء النجاح"}
            </SectionTag>
            <h2
              className={cn(
                "mt-6",
                "font-serif-text",
                "text-[28px]",
                "font-bold",
              )}
              style={{ color: "var(--Neutral-800, #1E1E20)" }}
            >
              {data?.partnersCopy?.heading ||
                "عملاء وثقوا بنا لصناعة حلول رقمية مؤثرة"}
            </h2>
            <div className={cn('relative', 'flex', 'w-full', 'flex-col', 'items-center', 'justify-center', 'overflow-hidden', 'mt-12')}>
              <Marquee className={cn('[--duration:12s]', '[--gap:5.5rem]', 'py-4')}>
                {partnersList.map(([src, alt], idx) => (
                  <div
                    key={`${alt}-${idx}`}
                    className={cn('flex', 'h-16', 'w-36', 'items-center', 'justify-center', 'opacity-75', 'grayscale', 'transition-all', 'duration-300', 'hover:opacity-100', 'hover:grayscale-0')}
                  >
                    <img
                      src={src}
                      alt={alt}
                      className={cn('max-h-12', 'max-w-[130px]', 'object-contain')}
                      loading="lazy"
                    />
                  </div>
                ))}
              </Marquee>
              <div className={cn('pointer-events-none', 'absolute', 'inset-y-0', 'left-0', 'w-1/3', 'bg-gradient-to-r', 'from-white', 'via-white/80', 'via-40%', 'to-transparent', 'z-10')}></div>
              <div className={cn('pointer-events-none', 'absolute', 'inset-y-0', 'right-0', 'w-1/3', 'bg-gradient-to-l', 'from-white', 'via-white/80', 'via-40%', 'to-transparent', 'z-10')}></div>
            </div>
          </motion.div>
        </section>

        <section className={cn("bg-surface", "py-16", "transition-colors", "duration-300")} id="services">
          <div
            className={cn(
              "mx-auto",
              "max-w-[1240px]",
              "px-5",
              "text-center",
              "lg:px-0",
            )}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
            >
              <SectionTag>
                {data?.servicesCopy?.eyebrow || "خدماتنا"}
              </SectionTag>
              <h2
                className={cn(
                  "mx-auto",
                  "mt-6",
                  "max-w-[760px]",
                  "font-serif-text",
                  "text-[34px]",
                  "font-bold",
                  "leading-[1.35]",
                  "text-[#243A77]",
                  "dark:text-white",
                )}
              >
                {data?.servicesCopy?.heading ||
                  "حلول رقمية متكاملة تواكب نمو أعمالك"}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              className={cn(
                "mt-[40px] md:mt-[70px]",
                "grid",
                "gap-6",
                "grid-cols-1",
                "md:grid-cols-2",
                "lg:grid-cols-3",
              )}
            >
              {data?.services?.length ? (
                data.services.map((svc) => (
                  <ServiceCard
                    key={svc.title}
                    title={svc.title}
                    body={svc.description}
                    image={svc.image?.src || "/assets/mockups/Mockup 14.png"}
                  />
                ))
              ) : (
                <>
                  <ServiceCard
                    title="تصميم الواجهات وتجربة المستخدم"
                    body="نصمم تجارب مستخدم رقمية تتمحور حول المستخدم، تعزز التفاعل وترفع قيمة علامتك التجارية."
                    image="/assets/mockups/Mockup 14.png"
                    imageClass="object-cover object-top w-full h-full"
                  />
                  <AiServiceCard />
                  <ServiceCard
                    title="تطوير تطبيقات الجوال"
                    body="نبني تطبيقات Native وCross-platform لتجربة مستخدم سلسة ومتكاملة مع مختلف الأنظمة."
                    image="/assets/images/service-image.svg"
                    imageClass="object-cover object-top w-full h-full"
                  />
                  <ServiceCard
                    title="بناء منتجات SaaS"
                    body="نساعدك في تطوير منصات SaaS مرنة وقابلة للتوسع، بنظام اشتراكات يمكن منتجك من النمو."
                    image="/assets/images/service-image-3.png"
                    imageClass="object-cover object-top w-full h-full"
                  />
                  <ServiceCard
                    title="حلول التجارة الإلكترونية"
                    body="نبني متاجر وتجارب بيع رقمية عالية الأداء، من الكتالوج حتى الدفع والتكاملات."
                    image="/assets/mockups/Dashboard 1.png"
                    imageClass="object-cover object-top w-full h-full"
                  />
                  <WideServiceCard />
                </>
              )}
            </motion.div>
          </div>
        </section>

        <section
          id="who-we-are"
          className={cn("bg-surface", "py-16", "lg:min-h-[796px]", "transition-colors", "duration-300")}
        >
          <div
            className={cn(
              "mx-auto",
              "grid",
              "max-w-[1240px]",
              "gap-[40px]",
              "lg:gap-[73px]",
              "px-5",
              "lg:grid-cols-2",
              "lg:px-0",
            )}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              className={cn("pt-2", "text-right")}
            >
              <h2
                className={cn(
                  "font-serif-text",
                  "text-[28px]",
                  "sm:text-[32px]",
                  "md:text-[36px]",
                  "font-bold",
                  "leading-[1.35]",
                  "text-right",
                )}
                style={{ color: "var(--Neutral-800, #1E1E20)" }}
              >
                {data?.whoWeAre?.heading || "نبني حلولا رقمية تنمو مع أعمالك"}
              </h2>
              <p
                className={cn('mt-7', 'text-right', 'font-normal')}
                style={{
                  color: "var(--Neutral-500, #5F6063)",
                  fontFamily:
                    '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                  fontSize: "18px",
                  lineHeight: "140%",
                }}
              >
                {data?.whoWeAre?.body ||
                  "منذ انطلاقنا في 2017، كرسنا جهودنا لتمكين المؤسسات من التميز الرقمي. نفخر بسجل من المشاريع التي أحدثت فارقا حقيقيا في أداء شركائنا."}
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
                className={cn(
                  "mt-10 md:mt-12",
                  "grid",
                  "max-w-[472px]",
                  "grid-cols-3",
                  "gap-4 sm:gap-6 md:gap-10",
                  "text-center",
                )}
              >
                {(data?.stats?.length
                  ? data.stats
                  : [
                      {
                        value: "+200",
                        label: "مشروع",
                        description: "تم تسليمه بنجاح",
                      },
                      {
                        value: "+150",
                        label: "عميل",
                        description: "وشريك نجاح",
                      },
                      {
                        value: "+10",
                        label: "سنوات",
                        description: "خبرة وتميز تقني",
                      },
                    ]
                ).map((stat) => {
                  const numericValue = Number(
                    String(stat.value).replace(/\D/g, ""),
                  );

                  return (
                    <motion.div key={stat.label} variants={fadeUp}>
                      <div
                        className={cn(
                          "text-[20px] sm:text-[24px] md:text-[30px]",
                          "font-black",
                          "text-[#F15722]",
                        )}
                      >
                        <Counter value={numericValue} suffix="+" />
                      </div>
                      <div
                        className={cn(
                          "text-[15px] sm:text-[18px] md:text-[21px]",
                          "font-bold",
                          "text-[#243A77]",
                   "dark:text-white",
                          "truncate",
                        )}
                      >
                        {stat.label}
                      </div>
                      <p
                        className={cn(
                          "mt-2",
                          "text-[11px] sm:text-[13px] md:text-[14px]",
                          "leading-tight",
                          "text-[#74829A]",
                        )}
                      >
                        {stat.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
              <div
                className={cn(
                  "mt-10 md:mt-16",
                  "flex",
                  "justify-center",
                  "lg:justify-start",
                )}
              >
                <PillButton
                  href={data?.whoWeAre?.cta?.href || "/contact"}
                  variant="blue"
                >
                  {data?.whoWeAre?.cta?.label || "ابدأ رحلة نموك"}
                </PillButton>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              className={cn("grid", "gap-8")}
            >
              {whyUsList.map(([icon, title, body]) => (
                <motion.article
                  key={title}
                  variants={fadeUp}
                  className={cn(
                    "flex",
                    "min-h-[143px]",
                    "items-center",
                    "gap-5",
                    "rounded-[24px]",
                    "border",
                    "border-[#EEF2F8]",
                    "bg-white",
                    "p-6",
                    "shadow-[0_14px_34px_rgba(14,23,48,0.04)]",
                  )}
                >
                  <div
                    className={cn(
                      "flex",
                      "size-11",
                      "shrink-0",
                      "items-center",
                      "justify-center",
                      "rounded-xl",
                      "border",
                      "border-orange-300",
                    )}
                  >
                    <img src={icon} alt="" className="size-5" loading="lazy" />
                  </div>
                  <div className="text-right">
                    <h3
                      className={cn('text-right', 'font-medium', 'leading-normal')}
                      style={{
                        color: "var(--Neutral-800, #1E1E20)",
                        fontFamily:
                          '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                        fontSize: "20px",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      className={cn('mt-2', 'text-right', 'font-normal')}
                      style={{
                        color: "var(--Neutral-500, #5F6063)",
                        fontFamily:
                          '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                        fontSize: "16px",
                        lineHeight: "140%",
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section
          id="featured-work"
          className={cn("bg-surface", "py-16", "lg:min-h-[937px]", "transition-colors", "duration-300")}
        >
          <div
            className={cn(
              "mx-auto",
              "max-w-[1240px]",
              "px-5",
              "text-center",
              "lg:px-0",
            )}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
            >
              <SectionTag>
                {data?.resultsCopy?.eyebrow || "مشاريع مختارة"}
              </SectionTag>
              <h2
                className={cn(
                  "mt-6",
                  "font-serif-text",
                  "text-[32px]",
                  "font-bold",
                  "text-[#243A77]",
                  "dark:text-white",
                )}
              >
                {data?.resultsCopy?.heading ||
                  "نحوّل الأفكار إلى مشاريع تحقق نتائج"}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              className={cn(
                "mt-14",
                "grid",
                "gap-6",
                "grid-cols-1",
                "sm:grid-cols-2",
                "lg:grid-cols-3",
              )}
            >
              {data?.caseStudies?.length ? (
                data.caseStudies.map((cs) => (
                  <ProjectCard
                    key={cs.title}
                    image={cs.image?.src || "/media/red-cresent.svg"}
                    category={cs.category}
                    title={cs.title}
                  />
                ))
              ) : (
                <>
                  <ProjectCard
                    image="/media/red-cresent.svg"
                    category="موقع"
                    title="هيئة الهلال الأحمر السعودي"
                  />
                  <ProjectCard
                    image="/assets/mockups/Mockup 14.png"
                    category="متجر"
                    title="أبير"
                    imageClass="object-cover object-center"
                  />
                  <ProjectCard
                    image="/media/red-cresent.svg"
                    category="موقع"
                    title="هيئة الهلال الأحمر السعودي"
                  />
                </>
              )}
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              className="mt-14"
            >
              <PillButton
                href={data?.resultsCopy?.cta?.href || "#featured-work"}
                variant="blue"
              >
                {data?.resultsCopy?.cta?.label || "تصفح جميع المشاريع"}
              </PillButton>
            </motion.div>
          </div>
        </section>

        <section
          className={cn("bg-surface", "py-16", "lg:min-h-[960px]", "transition-colors", "duration-300")}
          id="methodology"
        >
          <div
            className={cn(
              "mx-auto",
              "max-w-[1240px]",
              "px-5",
              "text-center",
              "lg:px-0",
            )}
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
            >
              <SectionTag>
                {data?.methodology?.eyebrow || "آلية العمل"}
              </SectionTag>
              <h2
                className={cn(
                  "mt-6",
                  "font-serif-text",
                  "text-[32px]",
                  "font-bold",
                  "text-[#243A77]",
                  "dark:text-white",
                )}
              >
                {data?.methodology?.heading ||
                  "من الفكرة إلى الإطلاق بخطوات تقنية دقيقة"}
              </h2>
            </motion.div>

            <div
              className={cn(
                "relative",
                "mt-10 lg:mt-[104px]",
                "flex",
                "w-full",
                "flex-col",
                "gap-12",
                "lg:gap-0",
              )}
            >
              <div
                className={cn(
                  "absolute",
                  "bottom-0",
                  "left-1/2",
                  "top-0",
                  "hidden",
                  "w-px",
                  "-translate-x-1/2",
                  "bg-[#FCDDD3] dark:bg-white/10",
                  "lg:block",
                )}
              />
              {methodologyList.map(([title, body], index) => {
                const step = index + 1;
                const even = step % 2 === 0;

                return (
                  <div
                    key={title}
                    className={cn(
                      "relative",
                      "flex",
                      "w-full",
                      "flex-col",
                      "items-center",
                      "justify-between",
                      "lg:min-h-[180px]",
                      "lg:flex-row",
                    )}
                  >
                    {even ? (
                      <>
                        <motion.article
                          variants={fadeUp}
                          initial="hidden"
                          whileInView="visible"
                          viewport={motionViewport}
                          className={cn(
                            "brand-card",
                            "w-full",
                            "rounded-[18px]",
                            "p-7",
                            "text-right",
                            "lg:w-[calc(50%-80px)]",
                            "group relative overflow-hidden transition-all duration-300",
                          )}
                        >
                          <img
                            src="/light/hover.svg"
                            alt=""
                            className={cn('pointer-events-none', 'absolute', 'bottom-0', 'left-0', 'z-0', 'h-full', 'w-full', 'object-cover', 'opacity-0', 'dark:opacity-0', 'transition-opacity', 'duration-500', 'group-hover:opacity-100', 'dark:group-hover:opacity-0')}
                          />
                          <h3
                            className={cn(
                              "text-[18px]",
                              "font-bold",
                              "text-foreground",
                              "relative z-10",
                            )}
                          >
                            {title}
                          </h3>
                          <p
                            className={cn(
                              "mt-3",
                              "text-[14px]",
                              "leading-6",
                              "text-foreground-muted",
                              "relative z-10",
                            )}
                          >
                            {body}
                          </p>
                        </motion.article>
                        <div
                          className={cn(
                            "z-10",
                            "hidden",
                            "w-16",
                            "items-center",
                            "justify-center",
                            "lg:flex",
                          )}
                        >
                          <span
                            className={cn(
                              "grid",
                              "size-8",
                              "place-items-center",
                              "rounded-full",
                              "bg-[#F15722]",
                              "text-[14px]",
                              "font-bold",
                              "text-white",
                            )}
                          >
                            {step}
                          </span>
                        </div>
                        <div
                          className={cn(
                            "hidden",
                            "w-[calc(50%-80px)]",
                            "lg:block",
                          )}
                        />
                      </>
                    ) : (
                      <>
                        <div
                          className={cn(
                            "hidden",
                            "w-[calc(50%-80px)]",
                            "lg:block",
                          )}
                        />
                        <div
                          className={cn(
                            "z-10",
                            "hidden",
                            "w-16",
                            "items-center",
                            "justify-center",
                            "lg:flex",
                          )}
                        >
                          <span
                            className={cn(
                              "grid",
                              "size-8",
                              "place-items-center",
                              "rounded-full",
                              "bg-[#F15722]",
                              "text-[14px]",
                              "font-bold",
                              "text-white",
                            )}
                          >
                            {step}
                          </span>
                        </div>
                        <motion.article
                          variants={fadeUp}
                          initial="hidden"
                          whileInView="visible"
                          viewport={motionViewport}
                          className={cn(
                            "brand-card",
                            "w-full",
                            "rounded-[18px]",
                            "p-7",
                            "text-right",
                            "lg:w-[calc(50%-80px)]",
                            "group relative overflow-hidden transition-all duration-300",
                          )}
                        >
                          <img
                            src="/light/hover.svg"
                            alt=""
                            className={cn('pointer-events-none', 'absolute', 'bottom-0', 'left-0', 'z-0', 'h-full', 'w-full', 'object-cover', 'opacity-0', 'dark:opacity-0', 'transition-opacity', 'duration-500', 'group-hover:opacity-100', 'dark:group-hover:opacity-0')}
                          />
                          <h3
                            className={cn(
                              "text-[18px]",
                              "font-bold",
                              "text-foreground",
                              "relative z-10",
                            )}
                          >
                            {title}
                          </h3>
                          <p
                            className={cn(
                              "mt-3",
                              "text-[14px]",
                              "leading-6",
                              "text-foreground-muted",
                              "relative z-10",
                            )}
                          >
                            {body}
                          </p>
                        </motion.article>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              className="mt-14"
            >
              <PillButton
                href={data?.methodology?.cta?.href || "/contact"}
                variant="blue"
              >
                {data?.methodology?.cta?.label || "تواصل معنا الآن"}
              </PillButton>
            </motion.div>
          </div>
        </section>

        <section
          className={cn("mt-12 md:mt-24", "bg-surface", "py-10 md:py-20", "transition-colors", "duration-300")}
          id="contact"
        >
          <div className={cn("mx-auto", "max-w-[1240px]", "px-5", "lg:px-0")}>
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              className={cn(
                "relative",
                "min-h-[420px]",
                "overflow-hidden",
                "rounded-[32px]",
                "bg-[#F15722]",
                "px-6",
                "py-10",
                "text-white",
                "md:p-14",
                "lg:px-16",
                "lg:py-16",
              )}
            >
              {/* CTA Pop Starburst behind mascot head */}
              <img
                src="/assets/images/cta-pop.svg"
                alt=""
                className={cn('pointer-events-none', 'absolute', 'left-[170px]', 'top-[15px]', 'z-0', 'hidden', 'w-[190px]', 'md:block', 'lg:left-[240px]', 'lg:top-[25px]', 'lg:w-[230px]')}
                loading="lazy"
              />

              {/* Mascot Robot on Left */}
              <img
                src="/assets/mockups/mascot.png"
                alt=""
                className={cn('pointer-events-none', 'absolute', 'bottom-[-75px]', 'left-0', 'z-10', 'hidden', 'w-[340px]', 'md:block', 'lg:bottom-[-95px]', 'lg:left-[30px]', 'lg:w-[460px]')}
                loading="lazy"
              />

              {/* CTA Blur overlay on top of mascot at bottom end of card */}
              <img
                src="/assets/images/cta-blur.svg"
                alt=""
                className={cn('pointer-events-none', 'absolute', 'inset-x-0', 'bottom-0', 'z-20', 'h-auto', 'w-full', 'object-cover')}
                loading="lazy"
              />

              {/* Grid Layout: Text on Right */}
              <div className={cn('relative', 'z-30', 'grid', 'w-full', 'items-center', 'gap-8', 'md:grid-cols-[1.2fr_0.8fr]')}>
                <div className={cn('flex', 'flex-col', 'items-center', 'text-center', 'md:items-start', 'md:text-right')}>
                  <h2
                    className={cn(
                      "font-serif-text",
                      "text-[30px]",
                      "font-black",
                      "leading-tight",
                      "text-white",
                      "md:text-[40px]",
                      "lg:text-[44px]",
                    )}
                  >
                    {data?.finalCta?.heading ||
                      "لنحوّل فكرتك إلى منتج رقمي حقيقي"}
                  </h2>
                  <p
                    className={cn(
                      "mt-4",
                      "text-[18px]",
                      "font-bold",
                      "text-white/90",
                      "md:text-[20px]",
                    )}
                  >
                    {data?.finalCta?.body || "نحوّل الرؤية إلى واقع رقمي"}
                  </p>
                  <div className="mt-8">
                    <PillButton
                      href={data?.finalCta?.cta?.href || "/contact"}
                      variant="white"
                    >
                      {data?.finalCta?.cta?.label || "احصل علي استشارة مجانية"}
                    </PillButton>
                  </div>
                </div>
                <div className={cn('hidden', 'min-h-[300px]', 'md:block')} />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer data={data?.footer} />
    </div>
  );
}
