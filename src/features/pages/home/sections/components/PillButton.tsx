"use client";

import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export function PillButton({
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
    white: "cta-pill--white border border-[#F1D5CC] dark:border-white/15 bg-surface-card text-[#F15722]",
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
        "cta-pill group inline-flex h-14 items-center justify-between gap-4 rounded-[50px] ps-6 pe-2 text-[15px] font-bold transition duration-300 hover:-translate-y-0.5 whitespace-nowrap",
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
