"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { HeroButtonArt } from "./HeroButtonArt";
import { HeroProcessArt } from "./HeroProcessArt";
import { HeroChartArt } from "./HeroChartArt";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, rotate: 0 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const motionViewport = { once: true, margin: "-80px" } as const;

export function HeroCardItem({
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
  
  // Normalized mouse coordinates (-1 to 1) relative to center of card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs to smooth out the mouse movement
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Map positions to rotation angles
  const rotateX = useTransform(springY, [-1, 1], [8, -8]);
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const px = x / (rect.width / 2);
    const py = y / (rect.height / 2);

    mouseX.set(px);
    mouseY.set(py);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      animate={{
        rotate: rotateOffset,
      }}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformPerspective: 1000,
        transformOrigin: "bottom center",
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
      className={cn(
        "group",
        "relative",
        "flex flex-col justify-end",
        "h-[260px] sm:h-[300px] lg:h-[363.6px]",
        "w-full max-w-[395.92px] mx-auto",
        "overflow-hidden",
        "rounded-[40px] lg:rounded-[50.5px]",
        "border-[2.02px]",
        "border-[#F1D5CC]",
        "bg-surface-card",
        "dark:bg-surface-card",
        "hero-card",
        "px-6 pt-6 pb-6 sm:pb-8 lg:pb-10",
        "xl:px-8",
        "text-right",
        "shadow-[0_12px_32px_rgba(14,23,48,0.03)]",
        "transition-[border-color,background-color,box-shadow]",
        "duration-200",
        "hover:border-[#F79A7A]",
        "dark:hover:border-[#072FA2]",
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
      {type === "button" ? <HeroButtonArt /> : null}
      {type === "process" ? <HeroProcessArt /> : null}
      {type === "chart" ? <HeroChartArt /> : null}

      <div
        className={cn(
          "relative",
          "z-10",
        )}
      >
        <h3
          className={cn(
            "text-right",
            "font-semibold",
            "leading-normal",
            "text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[22px]",
          )}
          style={{
            color: "var(--Neutral-800, #121516)",
            fontFamily: '"IBM Plex Sans Arabic", sans-serif',
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
          }}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-2",
            "text-right",
            "font-normal",
            "text-[12px] sm:text-[14px] lg:text-[18px] xl:text-[20px]",
            "xl:whitespace-nowrap",
          )}
          style={{
            color: "var(--Neutral-400, #575C5E)",
            fontFamily: '"IBM Plex Sans Arabic", sans-serif',
            fontStyle: "normal",
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
