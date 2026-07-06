"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { useTheme } from "@/components/shared/ThemeProvider";

export function HeroChartArt() {
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
      <Image
        src={theme === 'dark' ? '/dark/charts.svg' : '/light/chart-orange.svg'}
        alt=""
        width={200}
        height={190}
        className={cn("h-[190px]", "w-auto", "object-contain")}
      />
    </div>
  );
}
