"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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

export function HeroProcessArt() {
  const [step, setStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      y: isMobile ? 40 : 62,
      scale: 1,
      opacity: 1,
      zIndex: 20,
      transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] as const },
    },
    top: {
      y: isMobile ? -8 : -10,
      scale: 0.92,
      opacity: 0.75,
      zIndex: 10,
      transition: { duration: 0.45, ease: "easeInOut" as const },
    },
  } as const;

  return (
    <div
      className={cn(
        "absolute",
        "inset-x-0",
        "top-6",
        "flex",
        "h-[120px] lg:h-[160px]",
        "items-center",
        "justify-center",
        "pointer-events-none",
        "select-none",
        "overflow-visible",
      )}
    >
      {currentStack.map(({ partner, slot }) => (
        <motion.div
          key={partner.id}
          layout
          initial={false}
          animate={slot}
          variants={slotVariants}
          className={cn(
            "absolute",
            "flex",
            "h-[48px] lg:h-[64px]",
            "w-[220px] lg:w-[275px]",
            "items-center",
            "gap-2 lg:gap-3",
            "rounded-full",
            "border",
            "border-border",
            "dark:border-white/10",
            "bg-surface-card",
            "dark:bg-[#070C18]/60",
            "px-3 lg:px-4",
            "py-1.5 lg:py-2",
            "shadow-[0_8px_24px_rgba(14,23,48,0.05)]",
          )}
        >
          <div
            className={cn(
              "relative",
              "flex",
              "size-8 lg:size-11",
              "shrink-0",
              "items-center",
              "justify-center",
              "rounded-full",
              "border",
              "border-border",
              "dark:border-white/10",
              "bg-surface-card",
              "dark:bg-white",
              "p-1 lg:p-1.5",
              "shadow-sm",
            )}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={44}
              height={44}
              className={cn("h-full", "w-full", "object-contain")}
            />
          </div>
          <div className={cn("text-right", "flex-1", "min-w-0")}>
            <strong
              className={cn(
                "block",
                "text-[12px] lg:text-[14px]",
                "font-bold",
                "text-foreground",
                "truncate",
              )}
            >
              {partner.name}
            </strong>
            <span
              className={cn(
                "block",
                "text-[9px] lg:text-[11px]",
                "text-foreground-subtle",
                "truncate",
              )}
            >
              {partner.note}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
