"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowUpLeft, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import type { HomePageData } from "./types/home";

const defaultNavLinks = [
  ["الرئيسية", "#home"],
  ["من نحن", "#who-we-are"],
  ["أعمالنا", "#featured-work"],
  ["الخدمات", "#services"],
  ["المدونة", "#blog"],
  ["تواصل معنا", "#contact"],
] as const;

const defaultPartners = [
  ["/images/noboco.svg", "noboco"],
  ["/images/naama.svg", "Naama"],
  ["/media/nafath.svg", "نفاذ"],
  ["/images/mada.svg", "mada"],
  ["/images/stc.svg", "stc"],
  ["/images/sadia.svg", "SDAIA"],
] as const;

const defaultWhyCards = [
  [
    "/icons/content/medal.svg",
    "خبرة تزيد عن 6 سنوات",
    "نمتلك خبرة عملية في تصميم وتطوير حلول رقمية احترافية تدعم نجاح أعمالك.",
  ],
  [
    "/icons/content/pen.svg",
    "حلول مخصصة حسب احتياجك",
    "نصمم المنتج حول أهدافك ونموذج عملك، لا حول قالب جاهز ومحدود.",
  ],
  [
    "/icons/content/rank.svg",
    "سرعة إنجاز ومرونة عالية",
    "فرق عمل رشيقة تتعامل مع المتغيرات بسرعة وتحافظ على جودة التنفيذ.",
  ],
  [
    "/icons/content/shield.svg",
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
        <ArrowLeft aria-hidden className={cn("cta-icon-main", "size-5")} />
        <span className="cta-icon-ghost">
          <ArrowLeft aria-hidden className="size-5" />
        </span>
      </span>
    </a>
  );
}

function SectionTag({ children }: { children: string }) {
  return (
    <div
      className={cn(
        "inline-flex",
        "h-12",
        "items-center",
        "justify-center",
        "rounded-full",
        "border",
        "border-[#E8EDF6]",
        "bg-white",
        "px-4",
        "text-[15px]",
        "font-medium",
        "text-[#6F7890]",
        "shadow-[0_10px_24px_rgba(36,58,119,0.04)]",
      )}
    >
      {children}
    </div>
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
        "right-[-26px]",
        "top-[32px]",
        "flex",
        "w-[314.11px]",
        "origin-top-right",
        "-rotate-[10deg]",
        "flex-col",
        "items-start",
        "justify-center",
        "gap-[8.08px]",
        "p-[16.16px]",
        "max-md:right-[-76px]",
      )}
    >
      <div
        className={cn(
          "absolute",
          "inset-y-[-2px]",
          "end-0",
          "w-[92px]",
          "rounded-e-[62px]",
          "border-y-2",
          "border-e-2",
          "border-[#F5C9BB]",
        )}
      />
      <div
        className={cn(
          "absolute",
          "bottom-[-2px]",
          "end-[88px]",
          "h-0.5",
          "w-[226px]",
          "bg-[#F5C9BB]",
        )}
      />
      <div
        className={cn(
          "absolute",
          "top-[-2px]",
          "end-[88px]",
          "h-0.5",
          "w-[226px]",
          "bg-[#F5C9BB]",
        )}
      />
      <PillButton
        href="#contact"
        className={cn("w-[160px]", "-mt-1.5", "relative", "right-[125px]")}
      >
        طلب خدمة
      </PillButton>
    </div>
  );
}

function HeroProcessArt() {
  return (
    <div
      className={cn(
        "absolute",
        "inset-x-0",
        "top-8",
        "flex",
        "flex-col",
        "items-center",
        "gap-4",
      )}
    >
      <div
        className={cn(
          "flex",
          "h-[64px]",
          "w-[260px]",
          "items-center",
          "justify-between",
          "rounded-full",
          "border",
          "border-[#E6E9F0]",
          "bg-white",
          "px-5",
          "shadow-[0_8px_24px_rgba(14,23,48,0.05)]",
        )}
      >
        <div className="text-right">
          <strong
            className={cn(
              "block",
              "text-[14px]",
              "font-bold",
              "text-[#0E1730]",
            )}
          >
            نما
          </strong>
          <span className={cn("text-[12px]", "text-[#6F7890]")}>
            تم تسليم المشروع بنجاح
          </span>
        </div>
        <span
          className={cn(
            "grid",
            "size-10",
            "shrink-0",
            "place-items-center",
            "rounded-full",
            "border",
            "border-[#E6E9F0]",
            "bg-[#FAFCFF]",
            "text-[12px]",
            "font-bold",
            "text-[#243A77]",
          )}
        >
          نما
        </span>
      </div>

      <div
        className={cn(
          "flex",
          "h-[76px]",
          "w-[310px]",
          "items-center",
          "justify-between",
          "rounded-full",
          "border",
          "border-[#E6E9F0]",
          "bg-white",
          "px-6",
          "shadow-[0_10px_28px_rgba(14,23,48,0.06)]",
        )}
      >
        <div className="text-right">
          <strong
            className={cn(
              "block",
              "text-[18px]",
              "font-bold",
              "text-[#0E1730]",
            )}
          >
            نوبكو
          </strong>
          <span className={cn("text-[13px]", "text-[#6F7890]")}>
            شكرا لكم، النتائج فاقت توقعاتنا
          </span>
        </div>
        <span
          className={cn(
            "grid",
            "size-12",
            "shrink-0",
            "place-items-center",
            "rounded-full",
            "border",
            "border-[#E6E9F0]",
            "bg-[#FAFCFF]",
            "text-[13px]",
            "font-bold",
            "text-[#243A77]",
          )}
        >
          نوبكو
        </span>
      </div>
    </div>
  );
}

function HeroChartArt() {
  return (
    <div
      className={cn(
        "absolute",
        "inset-x-0",
        "top-10",
        "flex",
        "h-full",
        "items-center",
        "justify-center",
      )}
    >
      <img
        src="/images/chart-orange.svg"
        alt=""
        className={cn("h-full", "w-auto", "object-contain")}
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
      className={cn(
        "group relative h-[360px] overflow-hidden rounded-[50px] border-2 border-[#F1D5CC] bg-white p-10 text-right shadow-[0_12px_32px_rgba(14,23,48,0.03)] transition-all duration-300 hover:border-[#F15722] hover:shadow-[0_20px_48px_rgba(241,87,34,0.22)]",
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
          "bg-[#F15722]/25",
          "opacity-0",
          "blur-2xl",
          "transition-opacity",
          "duration-300",
          "group-hover:opacity-100",
        )}
      />

      <img
        src="/images/hero-card-orange.svg"
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
          className={cn(
            "text-[24px]",
            "font-bold",
            "leading-tight",
            "text-[#0E1730]",
          )}
        >
          {title}
        </h3>
        <p className={cn("mt-2", "text-[16px]", "leading-7", "text-[#6F7890]")}>
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
        "lg:col-span-2",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-full w-full bg-gradient-to-t from-[#F15722]/25 via-[#F15722]/10 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <img
        src="/mockups/mascot.png"
        alt=""
        className={cn(
          "absolute",
          "left-1/2",
          "top-[-50px]",
          "z-0",
          "h-[458px]",
          "w-auto",
          "-translate-x-1/2",
          "object-contain",
        )}
        loading="lazy"
      />
      <div
        className={cn(
          "absolute",
          "bottom-[58px]",
          "left-1/2",
          "z-10",
          "flex",
          "min-h-[150px]",
          "w-[560px]",
          "max-w-[calc(100%-48px)]",
          "-translate-x-1/2",
          "items-center",
          "justify-between",
          "gap-6",
          "rounded-[24px]",
          "bg-white",
          "px-9",
          "py-7",
          "text-right",
          "shadow-[0_20px_50px_rgba(14,23,48,0.08)]",
        )}
      >
        <span
          className={cn(
            "grid",
            "size-12",
            "shrink-0",
            "place-items-center",
            "rounded-[15px]",
            "border",
            "border-[#EEF2F8]",
            "text-[#243A77]",
            "transition-colors",
            "duration-300",
            "group-hover:border-[#FBCDBD]",
            "group-hover:text-[#F15722]",
          )}
        >
          <Star aria-hidden className="size-5" />
        </span>
        <div className={cn("min-w-0", "flex-1")}>
          <h3
            className={cn(
              "text-[24px]",
              "font-bold",
              "leading-8",
              "text-[#0E1730]",
            )}
          >
            حلول الذكاء الاصطناعي المتقدمة
          </h3>
          <p
            className={cn("mt-4", "text-[15px]", "leading-8", "text-[#6F7890]")}
          >
            نساعدك على تبني تقنيات الذكاء الاصطناعي التوليدي (GenAI) وتعلم الآلة
            (ML) لبناء أنظمة تفهم، تحلل، وتنبأ.
          </p>
        </div>
      </div>
      <div
        className={cn(
          "absolute",
          "left-[calc(50%-230px)]",
          "top-[224px]",
          "z-20",
          "h-[145px]",
          "w-[230px]",
          "max-md:left-[4%]",
          "max-md:h-[120px]",
          "max-md:w-[190px]",
        )}
        style={{ clipPath: "inset(0 0 8% 0)" }}
      >
        <img
          src="/mockups/mascot_arm_front.png"
          alt=""
          className={cn("h-full", "w-auto", "rotate-[-4deg]", "object-contain")}
          loading="lazy"
        />
      </div>
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
        "group",
        "relative",
        "flex",
        "h-[530px]",
        "flex-col",
        "overflow-hidden",
        "rounded-[50px]",
        "border",
        "border-[#EEF2F8]",
        "bg-white",
        "shadow-[0_18px_44px_rgba(14,23,48,0.04)]",
        "transition-all",
        "duration-300",
        "hover:border-[#F15722]",
      )}
    >
      <div className={cn("px-8", "pt-9", "text-right")}>
        <h3
          className={cn(
            "text-[22px]",
            "font-bold",
            "leading-8",
            "text-[#0E1730]",
          )}
        >
          {title}
        </h3>
        <p className={cn("mt-4", "text-[15px]", "leading-7", "text-[#6F7890]")}>
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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-full w-full bg-gradient-to-t from-[#F15722]/30 via-[#F15722]/10 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
        "group",
        "relative",
        "grid",
        "min-h-[320px]",
        "overflow-hidden",
        "rounded-[50px]",
        "border",
        "border-[#EEF2F8]",
        "bg-white",
        "shadow-[0_18px_44px_rgba(14,23,48,0.04)]",
        "transition-all",
        "duration-300",
        "hover:border-[#F15722]",
        "lg:col-span-3",
        "lg:grid-cols-[1fr_815px]",
      )}
    >
      <div
        className={cn(
          "flex",
          "flex-col",
          "justify-center",
          "p-10",
          "text-right",
        )}
      >
        <h3 className={cn("text-[22px]", "font-bold", "text-[#0E1730]")}>
          تعزيز الكفاءات والفرق التقنية
        </h3>
        <p className={cn("mt-4", "text-[15px]", "leading-7", "text-[#6F7890]")}>
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
      <div className={cn("relative", "h-[320px]", "bg-white")}>
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-l from-[#F15722]/30 via-[#F15722]/10 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <img
          src="/images/globe.svg"
          alt=""
          className={cn("relative", "z-10", "h-full", "w-full", "object-cover")}
          loading="lazy"
        />
      </div>
    </motion.article>
  );
}

function ProjectCard({
  image,
  category,
  title,
  imageClass = "object-cover object-center w-full h-full",
}: {
  image: string;
  category: string;
  title: string;
  imageClass?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      variants={scaleIn}
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
        "group",
        "relative",
        "h-[539px]",
        "rounded-[28px]",
        "border",
        "border-[#EEF2F8]",
        "bg-white",
        "p-4",
        "text-right",
        "shadow-[0_18px_44px_rgba(14,23,48,0.05)]",
        "transition-all",
        "duration-300",
        "hover:border-[#F15722]",
        "hover:shadow-[0_20px_48px_rgba(241,87,34,0.2)]",
      )}
    >
      <div
        className={cn(
          "relative",
          "z-10",
          "h-[445px]",
          "overflow-hidden",
          "rounded-[18px]",
          "bg-[#FAFBFF]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none",
            "absolute",
            "bottom-0",
            "left-1/2",
            "h-28",
            "w-[80%]",
            "-translate-x-1/2",
            "rounded-full",
            "bg-[#F15722]/25",
            "opacity-0",
            "blur-2xl",
            "transition-opacity",
            "duration-300",
            "group-hover:opacity-100",
          )}
        />
        <img
          src={image}
          alt=""
          className={cn(
            "relative z-10 h-full w-full transition-transform duration-500 group-hover:scale-[1.03]",
            imageClass,
          )}
          loading="lazy"
        />
      </div>
      <div className={cn("flex", "h-[62px]", "items-end", "justify-between")}>
        <span
          className={cn(
            "grid",
            "size-10",
            "place-items-center",
            "text-[#243A77]",
          )}
        >
          <ArrowUpLeft aria-hidden className="size-6" />
        </span>
        <div className={cn("flex", "items-center", "gap-2", "text-[15px]")}>
          <span
            className={cn(
              "rounded-full",
              "bg-[#F4F7FC]",
              "px-3",
              "py-1",
              "text-[13px]",
              "text-[#6F7890]",
            )}
          >
            {category}
          </span>
          <h3 className={cn("font-bold", "text-[#0E1730]")}>{title}</h3>
        </div>
      </div>
    </motion.article>
  );
}

export function LiteralHomePage({ data }: { data?: HomePageData }) {
  const navLinksList = data?.nav?.links?.length
    ? data.nav.links.map((link) => [link.label, link.href] as const)
    : defaultNavLinks;

  const partnersList = data?.partners?.length
    ? data.partners.map((p) => [p.logo?.src || "/images/noboco.svg", p.name] as const)
    : defaultPartners;

  const whyUsList = data?.whyUs?.length
    ? data.whyUs.map((w, idx) => [
        defaultWhyCards[idx % defaultWhyCards.length][0],
        w.title,
        w.description,
      ] as const)
    : defaultWhyCards;

  const methodologyList = data?.methodology?.steps?.length
    ? data.methodology.steps.map((m) => [m.title, m.description] as const)
    : defaultMethodology;

  return (
    <div
      dir="rtl"
      className={cn("overflow-x-hidden", "bg-white", "text-[#0E1730]")}
    >
      <header className={cn("h-[100px]", "bg-white")}>
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "mx-auto",
            "flex",
            "h-14",
            "max-w-[1240px]",
            "items-center",
            "justify-between",
            "px-5",
            "pt-[22px]",
            "lg:px-0",
          )}
        >
          <img
            src="/Logo.svg"
            alt={data?.nav?.brand || "Code Clouders"}
            className={cn("h-[39px]", "w-[160px]")}
          />
          <div
            className={cn(
              "hidden",
              "w-[920px]",
              "justify-center",
              "gap-10",
              "text-[15px]",
              "font-medium",
              "text-[#5F6575]",
              "lg:flex",
            )}
          >
            {navLinksList.map(([label, href], index) => (
              <a
                key={label}
                href={href}
                className={index === 0 ? "font-bold text-[#F15722]" : ""}
              >
                {label}
              </a>
            ))}
          </div>
          <PillButton href={data?.nav?.cta?.href || "#contact"} className="w-[160px]">
            {data?.nav?.cta?.label || "طلب خدمة"}
          </PillButton>
        </motion.nav>
      </header>

      <main>
        <section
          id="home"
          className={cn(
            "relative",
            "overflow-hidden",
            "bg-white",
            "pb-14",
            "pt-16",
            "lg:min-h-[870px]",
          )}
        >
          <div
            className={cn(
              "pointer-events-none",
              "absolute",
              "left-1/2",
              "top-[250px]",
              "z-0",
              "h-[360px]",
              "w-[1540px]",
              "-translate-x-1/2",
              "bg-[radial-gradient(ellipse_at_center,rgba(241,87,34,0.14)_0%,rgba(241,87,34,0.08)_42%,rgba(255,255,255,0)_73%)]",
              "opacity-90",
            )}
          />
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
                  "font-serif-display",
                  "text-[42px]",
                  "font-bold",
                  "leading-[1.18]",
                  "text-[#243A77]",
                  "md:text-[52px]",
                )}
              >
                <span className="block">
                  {data?.hero?.headline?.before || "شريكك التقني لحلــــول"}{" "}
                  <span className="text-[#F15722]">{data?.hero?.headline?.emphasis || "رقميـــــة"}</span>
                </span>
                <span className={cn("mt-5", "block")}>{data?.hero?.headline?.after || "تدعم نمو أعمالك"}</span>
              </h1>
              <p
                className={cn(
                  "mx-auto",
                  "mt-7",
                  "max-w-[652px]",
                  "text-[16px]",
                  "leading-8",
                  "text-[#8B93A6]",
                )}
              >
                {data?.hero?.subtitle || "نصمم ونطور مواقع وتطبيقات مخصصة لتحسين الكفاءة وتجربة العملاء."}
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
                    type={card.visual || (idx === 0 ? "button" : idx === 1 ? "process" : "chart")}
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
              <PillButton href={data?.hero?.primaryCta?.href || "#contact"} variant="orange">
                {data?.hero?.primaryCta?.label || "احصل على استشارة مجانية"}
              </PillButton>
            </motion.div>
          </div>
        </section>

        <section
          className={cn("bg-white", "py-16", "lg:min-h-[392px]")}
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
            <SectionTag>{data?.partnersCopy?.eyebrow || "شركاء النجاح"}</SectionTag>
            <h2
              className={cn(
                "mt-6",
                "font-serif-text",
                "text-[28px]",
                "font-bold",
                "text-[#243A77]",
              )}
            >
              {data?.partnersCopy?.heading || "عملاء وثقوا بنا لصناعة حلول رقمية مؤثرة"}
            </h2>
            <div
              className={cn(
                "mt-14",
                "grid",
                "grid-cols-2",
                "items-center",
                "gap-8",
                "md:grid-cols-6",
              )}
            >
              {partnersList.map(([src, alt]) => (
                <motion.div
                  key={alt}
                  variants={fadeIn}
                  className={cn(
                    "flex",
                    "h-16",
                    "items-center",
                    "justify-center",
                    "opacity-75",
                    "grayscale",
                    "transition",
                    "hover:opacity-100",
                    "hover:grayscale-0",
                  )}
                >
                  <img
                    src={src}
                    alt={alt}
                    className={cn("max-h-12", "max-w-[130px]")}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className={cn("bg-white", "py-16")} id="services">
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
              <SectionTag>{data?.servicesCopy?.eyebrow || "خدماتنا"}</SectionTag>
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
                )}
              >
                {data?.servicesCopy?.heading || "حلول رقمية متكاملة تواكب نمو أعمالك"}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              className={cn("mt-[70px]", "grid", "gap-6", "lg:grid-cols-3")}
            >
              {data?.services?.length ? (
                data.services.map((svc) => (
                  <ServiceCard
                    key={svc.title}
                    title={svc.title}
                    body={svc.description}
                    image={svc.image?.src || "/mockups/Mockup 14.png"}
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

        <section
          id="who-we-are"
          className={cn("bg-white", "py-16", "lg:min-h-[796px]")}
        >
          <div
            className={cn(
              "mx-auto",
              "grid",
              "max-w-[1240px]",
              "gap-[73px]",
              "px-5",
              "lg:grid-cols-[587px_580px]",
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
                  "text-[36px]",
                  "font-bold",
                  "leading-[1.35]",
                  "text-[#0E1730]",
                )}
              >
                {data?.whoWeAre?.heading || "نبني حلولا رقمية تنمو مع أعمالك"}
              </h2>
              <p
                className={cn(
                  "mt-7",
                  "text-[17px]",
                  "leading-8",
                  "text-[#6F7890]",
                )}
              >
                {data?.whoWeAre?.body || "منذ انطلاقنا في 2017، كرسنا جهودنا لتمكين المؤسسات من التميز الرقمي. نفخر بسجل من المشاريع التي أحدثت فارقا حقيقيا في أداء شركائنا."}
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
                className={cn(
                  "mt-12",
                  "grid",
                  "max-w-[472px]",
                  "grid-cols-3",
                  "gap-10",
                  "text-center",
                )}
              >
                {(data?.stats?.length ? data.stats : [
                  { value: "+200", label: "مشروع", description: "تم تسليمه بنجاح" },
                  { value: "+150", label: "عميل", description: "وشريك نجاح" },
                  { value: "+10", label: "سنوات", description: "خبرة وتميز تقني" },
                ]).map((stat) => {
                  const numericValue = Number(String(stat.value).replace(/\D/g, ""));

                  return (
                    <motion.div key={stat.label} variants={fadeUp}>
                      <div
                        className={cn(
                          "text-[30px]",
                          "font-black",
                          "text-[#F15722]",
                        )}
                      >
                        <Counter value={numericValue} suffix="+" />
                      </div>
                      <div
                        className={cn(
                          "text-[21px]",
                          "font-bold",
                          "text-[#243A77]",
                        )}
                      >
                        {stat.label}
                      </div>
                      <p
                        className={cn(
                          "mt-2",
                          "text-[13px]",
                          "leading-5",
                          "text-[#74829A]",
                        )}
                      >
                        {stat.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
              <div className={cn("mt-16", "flex", "justify-start")}>
                <PillButton href={data?.whoWeAre?.cta?.href || "#contact"} variant="blue">
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
                      className={cn(
                        "text-[18px]",
                        "font-semibold",
                        "text-[#0E1730]",
                      )}
                    >
                      {title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2",
                        "text-[14px]",
                        "leading-6",
                        "text-[#74829A]",
                      )}
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
          className={cn("bg-white", "py-16", "lg:min-h-[937px]")}
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
              <SectionTag>{data?.resultsCopy?.eyebrow || "مشاريع مختارة"}</SectionTag>
              <h2
                className={cn(
                  "mt-6",
                  "font-serif-text",
                  "text-[32px]",
                  "font-bold",
                  "text-[#243A77]",
                )}
              >
                {data?.resultsCopy?.heading || "نحوّل الأفكار إلى مشاريع تحقق نتائج"}
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={motionViewport}
              className={cn("mt-14", "grid", "gap-6", "md:grid-cols-3")}
            >
              {data?.caseStudies?.length ? (
                data.caseStudies.map((cs) => (
                  <ProjectCard
                    key={cs.title}
                    image={cs.image?.src || "/media/red-cresent.png"}
                    category={cs.category}
                    title={cs.title}
                  />
                ))
              ) : (
                <>
                  <ProjectCard
                    image="/media/red-cresent.png"
                    category="موقع"
                    title="هيئة الهلال الأحمر السعودي"
                  />
                  <ProjectCard
                    image="/mockups/Mockup 14.png"
                    category="متجر"
                    title="أبير"
                    imageClass="object-cover object-center"
                  />
                  <ProjectCard
                    image="/media/red-cresent.png"
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
              <PillButton href={data?.resultsCopy?.cta?.href || "#featured-work"} variant="blue">
                {data?.resultsCopy?.cta?.label || "تصفح جميع المشاريع"}
              </PillButton>
            </motion.div>
          </div>
        </section>

        <section
          className={cn("bg-white", "py-16", "lg:min-h-[960px]")}
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
              <SectionTag>{data?.methodology?.eyebrow || "آلية العمل"}</SectionTag>
              <h2
                className={cn(
                  "mt-6",
                  "font-serif-text",
                  "text-[32px]",
                  "font-bold",
                  "text-[#243A77]",
                )}
              >
                {data?.methodology?.heading || "من الفكرة إلى الإطلاق بخطوات تقنية دقيقة"}
              </h2>
            </motion.div>

            <div
              className={cn(
                "relative",
                "mt-[104px]",
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
                  "bg-[#FCDDD3]",
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
                            "w-full",
                            "rounded-[18px]",
                            "border",
                            "border-[#EEF2F8]",
                            "bg-white",
                            "p-7",
                            "text-right",
                            "shadow-[0_14px_34px_rgba(14,23,48,0.04)]",
                            "lg:w-[calc(50%-32px)]",
                          )}
                        >
                          <h3
                            className={cn(
                              "text-[18px]",
                              "font-bold",
                              "text-[#0E1730]",
                            )}
                          >
                            {title}
                          </h3>
                          <p
                            className={cn(
                              "mt-3",
                              "text-[14px]",
                              "leading-6",
                              "text-[#74829A]",
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
                            "w-[calc(50%-32px)]",
                            "lg:block",
                          )}
                        />
                      </>
                    ) : (
                      <>
                        <div
                          className={cn(
                            "hidden",
                            "w-[calc(50%-32px)]",
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
                            "w-full",
                            "rounded-[18px]",
                            "border",
                            "border-[#EEF2F8]",
                            "bg-white",
                            "p-7",
                            "text-right",
                            "shadow-[0_14px_34px_rgba(14,23,48,0.04)]",
                            "lg:w-[calc(50%-32px)]",
                          )}
                        >
                          <h3
                            className={cn(
                              "text-[18px]",
                              "font-bold",
                              "text-[#0E1730]",
                            )}
                          >
                            {title}
                          </h3>
                          <p
                            className={cn(
                              "mt-3",
                              "text-[14px]",
                              "leading-6",
                              "text-[#74829A]",
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
              <PillButton href={data?.methodology?.cta?.href || "#contact"} variant="orange">
                {data?.methodology?.cta?.label || "تواصل معنا الآن"}
              </PillButton>
            </motion.div>
          </div>
        </section>

        <section
          className={cn("mt-24", "bg-white", "py-20", "lg:min-h-[584px]")}
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
                "min-h-[456px]",
                "overflow-hidden",
                "rounded-[32px]",
                "bg-[#F15722]",
                "px-10",
                "py-14",
                "text-white",
                "lg:px-0",
                "lg:py-0",
              )}
            >
              <div
                className={cn(
                  "relative",
                  "z-10",
                  "max-w-[634px]",
                  "text-center",
                  "lg:absolute",
                  "lg:left-10",
                  "lg:top-24",
                  "lg:text-right",
                )}
              >
                <h2
                  className={cn(
                    "font-serif-text",
                    "text-[44px]",
                    "font-black",
                    "leading-tight",
                  )}
                >
                  {data?.finalCta?.heading || "لنحوّل فكرتك إلى منتج رقمي حقيقي"}
                </h2>
                <p
                  className={cn(
                    "mt-4",
                    "text-[20px]",
                    "font-bold",
                    "text-white/80",
                  )}
                >
                  {data?.finalCta?.body || "حوّل الفكرة إلى واقع ملموس"}
                </p>
                <div className="mt-9">
                  <PillButton href={data?.finalCta?.cta?.href || "#contact"} variant="white">
                    {data?.finalCta?.cta?.label || "احصل على استشارة مجانية"}
                  </PillButton>
                </div>
              </div>
              <img
                src="/mockups/mascot.png"
                alt=""
                className={cn(
                  "pointer-events-none",
                  "absolute",
                  "bottom-[-155px]",
                  "right-[40px]",
                  "hidden",
                  "w-[420px]",
                  "lg:block",
                )}
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className={cn("bg-[#0E1730]", "pt-16", "text-white")}>
        <div
          className={cn(
            "mx-auto",
            "grid",
            "max-w-[1240px]",
            "gap-10",
            "px-5",
            "pb-16",
            "md:grid-cols-2",
            "lg:grid-cols-4",
            "lg:px-0",
          )}
        >
          <div>
            <p className={cn("text-[17px]", "font-bold")}>
              {data?.footer?.socialTitle || "تابعنا على وسائل التواصل"}
            </p>
            <div className={cn("mt-4", "flex", "gap-4")}>
              {[
                "/icons/twitter.svg",
                "/icons/email.svg",
                "/icons/Vector.svg",
                "/icons/mouse.svg",
              ].map((src) => (
                <span
                  key={src}
                  className={cn(
                    "grid",
                    "size-6",
                    "place-items-center",
                    "opacity-80",
                  )}
                >
                  <img
                    src={src}
                    alt=""
                    className={cn("max-h-5", "max-w-5", "invert")}
                    loading="lazy"
                  />
                </span>
              ))}
            </div>
          </div>
          <div className={cn("space-y-8", "text-[15px]", "text-white/70")}>
            <div>
              <p
                className={cn("mb-3", "text-[17px]", "font-bold", "text-white")}
              >
                {data?.footer?.locationTitle || "العنوان"}
              </p>
              <p>{data?.footer?.location || "المملكة العربية السعودية"}</p>
            </div>
            <div>
              <p
                className={cn("mb-3", "text-[17px]", "font-bold", "text-white")}
              >
                {data?.footer?.contactTitle || "تواصل معنا"}
              </p>
              <p>{data?.footer?.email || "info@codeclouders.com"}</p>
              <p className="mt-2">{data?.footer?.phone || "+966 55 019 7744"}</p>
            </div>
          </div>
          <div>
            <p className={cn("text-[17px]", "font-bold")}>روابط مهمة</p>
            <div
              className={cn(
                "mt-4",
                "grid",
                "gap-2",
                "text-[15px]",
                "text-white/70",
              )}
            >
              {navLinksList.map(([label, href]) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <img
            src="/Logo.svg"
            alt={data?.nav?.brand || "Code Clouders"}
            className={cn("h-[39px]", "w-[160px]", "brightness-0", "invert")}
          />
        </div>
        <p
          className={cn(
            "mx-auto",
            "max-w-[1200px]",
            "px-5",
            "pb-8",
            "text-center",
            "text-[12px]",
            "text-white/50",
            "lg:px-0",
          )}
        >
          {data?.footer?.copyright || "جميع الحقوق محفوظة - CodeClouders."}
        </p>
      </footer>
    </div>
  );
}
