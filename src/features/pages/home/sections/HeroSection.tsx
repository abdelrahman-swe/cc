"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { PillButton } from "@/components/ui/PillButton";
import { HeroCardItem } from "./components/HeroCardItem";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
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

export function HeroSection(props: any) {
  const headline = props.homepageHeadline || props.headline || {};
  const headlineBefore = headline.before || "شريكك التقني";
  const headlineEmphasis = headline.emphasis || "لحلــــول رقميـــــة";
  const headlineAfter = headline.after || "تدعم نمو أعمالك";
  const subtitle =
    props.homepageSubtitle ||
    props.subtitle ||
    "نصمم ونطور مواقع وتطبيقات مخصصة لتحسين الكفاءة وتجربة العملاء.";
  const cta = props.homepagePrimaryCta || props.primaryCta || {};
  const ctaLabel = cta.label || "احصل على استشارة مجانية";
  const ctaHref = cta.href || "/contact";
  const rawCards = props.homepageCards || props.cards || [];
  const cards = rawCards.length
    ? rawCards
    : [
        {
          title: "نجعل الأمر أسهل",
          description: "من الفكرة إلى التنفيذ، بخطوات واضحة وعملية",
          visual: "button",
        },
        {
          title: "نستمع إليك لنفهم احتياجاتك",
          description: "فخورين بثقة أكثر من 250 مؤسسة ومنظمة",
          visual: "process",
        },
        {
          title: "نمنحك رؤية أوضح",
          description: "من خلال أدوات تساعدك على قياس النجاح",
          visual: "chart",
        },
      ];

  const [hasAnimated, setHasAnimated] = useState(false);
  const [rotations, setRotations] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

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
    <section
      id="home"
      className={cn(
        "relative",
        "overflow-hidden",
        "bg-surface",
        "transition-colors",
        "duration-300",
        "pt-24",
        "lg:pt-[100.5px]",
        "pb-[128px]",
      )}
      dir="rtl"
    >
      <div
        className={cn(
          "pointer-events-none",
          "absolute",
          "left-0",
          "right-0",
          "top-[200px]",
          "z-0",
          "w-full",
          "h-[500px]",
          "opacity-100",
        )}
      >
        <Image
          src="/light/home-hero-blur.svg"
          alt=""
          fill
          className={cn("h-full", "w-full", "object-cover", "object-top", "transition-opacity", "duration-500", "dark:opacity-0")}
          priority
        />
        <Image
          src="/dark/home-hero-blur.svg"
          alt=""
          fill
          className={cn("h-full", "w-full", "object-cover", "object-center", "transition-opacity", "duration-500", "opacity-0 dark:opacity-100")}
          priority
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
        <div className={cn("mx-auto", "w-full", "max-w-[760px]")}>
          <h1
            className={cn(
              "text-[32px]",
              "sm:text-[42px]",
              "font-bold",
              "leading-[1.18]",
              "text-[#243A77]",
              "dark:text-white",
              "md:text-[52px]",
              "font-serif-display",
            )}
            style={{ fontFamily: '"Thmanyah Serif Display", serif' }}
          >
            <span className="block md:inline">{headlineBefore} </span>
            <span
              className={cn(
                "text-[#F15722]",
                "font-serif-display",
                "block md:inline",
              )}
            >
              {headlineEmphasis}
            </span>
            <span
              className={cn("mt-3", "md:mt-5", "block", "font-serif-display")}
            >
              {headlineAfter}
            </span>
          </h1>
          <p
            className={cn(
              "mx-auto",
              "mt-5",
              "md:mt-7",
              "max-w-[652px]",
              "text-center",
              "font-normal",
              "text-[16px]",
              "sm:text-[20px]",
              "md:text-[24px]",
            )}
            style={{
              color: "var(--Neutral-300, #808586)",
              fontFamily:
                '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
              lineHeight: "140%",
            }}
          >
            {subtitle}
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          onViewportEnter={triggerChainAnimation}
          className={cn(
            "mx-auto",
            "mt-[166.5px]",
            "grid",
            "max-w-[1248px]",
            "gap-6",
            "md:grid-cols-3",
            "max-md:mt-14",
          )}
        >
          {cards.map((card: any, idx: number) => (
            <HeroCardItem
              key={card.title || idx}
              title={card.title}
              body={card.description}
              type={
                card.visual ||
                (idx === 0 ? "button" : idx === 1 ? "process" : "chart")
              }
              hoverRotate={idx % 2 === 0 ? -2 : 2}
              rotateOffset={rotations[idx]}
            />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="mt-[70.5px]"
        >
          <PillButton href={ctaHref} variant="orange" arrowDirection="up-left">
            {ctaLabel}
          </PillButton>
        </motion.div>
      </div>
    </section>
  );
}
