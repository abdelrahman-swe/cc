"use client";

import { cn } from "@/lib/cn";
import { PillButton } from "@/components/ui/PillButton";

export function HeroButtonArt() {
  return (
    <div
      className={cn(
        "absolute",
        "-right-[100px]",
        "top-[32px]",
        "flex",
        "origin-top-right",
        "-rotate-[10deg]",
        "items-center",
      )}
    >
      <div
        className={cn(
          "relative",
          "flex",
          "h-[96px]",
          "w-[311px]",
          "flex-row",
          "justify-start",
          "items-center",
          "rounded-[500px]",
          "border-[1.5px]",
          "border-[#F5C9BB]",
          "dark:border-white/10",
          "p-[22px]",
          "ps-[139px]",
          "bg-surface-card/40",
          "dark:bg-[#0B1124]",
        )}
      >
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
