"use client";

import { cn } from "@/lib/cn";
import { PillButton } from "@/components/ui/PillButton";

export function HeroButtonArt() {
  return (
    <div
      className={cn(
        "absolute",
        "-right-[70px]",
        "top-[32px]",
        "flex",
        "origin-top-right",
        "-rotate-[10deg]",
        "items-center",
      )}
    >
      <div
        dir="ltr"
        className={cn(
          "relative",
          "flex",
          "h-[84.32px]",
          "w-[314.11px]",
          "flex-col",
          "justify-center",
          "items-start",
          "gap-[8.08px]",
          "rounded-[500px]",
          "border-[1.5px]",
          "border-[#F5C9BB]",
          "dark:border-white/10",
          "p-[16.16px]",
          "bg-surface-card/40",
          "dark:bg-[#0B1124]",
        )}
      >
        <div dir="rtl" className="w-[150px]">
          <PillButton
            href="/contact"
            variant="nav"
            className={cn(
              "!h-[52px]",
              "!ps-5",
              "!pe-3",
              "!text-[14px]",
              "w-[150px]",
              "shadow-md",
            )}
          >
            طلب خدمة
          </PillButton>
        </div>
      </div>
    </div>
  );
}
