"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { cardVariants, motionViewport } from "@/lib/animations/motion";
import { cn } from "@/lib/cn";

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

function HeroButtonArt() {
  return (
    <div className="absolute -right-[35px] top-[32px] flex origin-top-right -rotate-[8deg] items-center">
      <div className="relative flex h-[66px] w-[270px] items-center justify-between rounded-full border-[1.5px] border-[#F5C9BB] p-1.5 bg-white/40">
        <div className="w-1" />
        <PillButton
          href="/contact"
          className="!h-[52px] !ps-4 !pe-1 !text-[14px] w-[150px] shadow-md"
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
      y: 38,
      scale: 1,
      opacity: 1,
      zIndex: 20,
      transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as const },
    },
    top: {
      y: -8,
      scale: 0.92,
      opacity: 0.75,
      zIndex: 10,
      transition: { duration: 0.45, ease: "easeInOut" as const },
    },
  } as const;

  return (
    <div className="absolute inset-x-0 top-6 flex h-[160px] items-center justify-center pointer-events-none select-none overflow-visible">
      {currentStack.map(({ partner, slot }) => (
        <motion.div
          key={partner.id}
          layout
          initial={false}
          animate={slot}
          variants={slotVariants}
          className="absolute flex h-[64px] w-[275px] items-center gap-3 rounded-full border border-[#EBECEF] bg-white px-4 py-2 shadow-[0_8px_24px_rgba(14,23,48,0.05)]"
        >
          <div className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-[#EAECEF] bg-white p-1.5 shadow-sm">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="text-right flex-1 min-w-0">
            <strong className="block text-[14px] font-bold text-[#0E1730] truncate">
              {partner.name}
            </strong>
            <span className="block text-[11px] text-[#808586] truncate">
              {partner.note}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function HeroChartArt() {
  return (
    <div className="absolute inset-x-0 top-10 flex h-full items-center justify-center">
      <img
        src="/assets/images/chart-orange.svg"
        alt=""
        className="h-full w-auto object-contain"
      />
    </div>
  );
}

export function HeroCard({
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
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
      className="group relative h-[360px] overflow-hidden rounded-[50.5px] border-[2.02px] border-[#F1D5CC] bg-white px-6 py-10 xl:px-8 text-right shadow-[0_12px_32px_rgba(14,23,48,0.03)] transition-[border-color,box-shadow] duration-200 hover:border-[#F79A7A] hover:shadow-[-217.15px_247.45px_91.91px_0px_rgba(36,58,119,0.01),-9.09px_10.1px_29.29px_0px_rgba(36,58,119,0.08)]"
    >
      <div className="pointer-events-none absolute bottom-4 left-1/2 h-28 w-[75%] -translate-x-1/2 rounded-full bg-[#F79A7A]/25 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <img
        src="/assets/images/hero-card-orange.svg"
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full"
      />
      {type === "button" && <HeroButtonArt />}
      {type === "process" && <HeroProcessArt />}
      {type === "chart" && <HeroChartArt />}

      <div className="relative z-10 mt-[218px]">
        <h3
          className="text-right font-semibold leading-normal"
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
          className="mt-2 text-right font-normal whitespace-nowrap text-[16px] lg:text-[18px] xl:text-[20px]"
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
