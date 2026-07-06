"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

export function HeroChartArt() {
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
        src="/light/chart-orange.svg"
        alt=""
        width={200}
        height={190}
        className={cn("h-[190px]", "w-auto", "object-contain", "dark:hidden")}
      />
      <Image
        src="/dark/charts.svg"
        alt=""
        width={200}
        height={190}
        className={cn("h-[190px]", "w-auto", "object-contain", "hidden dark:block")}
      />
    </div>
  );
}
