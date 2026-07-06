"use client";

import { cn } from "@/lib/cn";
import { PillButton } from "./PillButton";

export function HeroButtonArt() {
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
          "bg-surface-card/40",
          "dark:bg-surface-card/60",
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
