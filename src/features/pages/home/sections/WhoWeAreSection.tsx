"use client";

import { motion, type Variants } from "framer-motion";
import { Counter } from "@/components/ui/Counter";
import { PillButton } from "@/components/ui/PillButton";
import { cn } from "@/lib/cn";
import Image from "next/image";

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

const defaultWhyCards = [
  [
    "/assets/icons/content/medal.svg",
    "خبرة تزيد عن 6 سنوات",
    "نمتلك خبرة عملية في تصميم وتطوير حلول رقمية احترافية تدعم نجاح أعمالك.",
  ],
  [
    "/assets/icons/content/pen.svg",
    "حلول مخصصة حسب احتياجك",
    "نصمم المنتج حول أهدافك ونموذج عملك، لا حول قالب جاهز ومحدود.",
  ],
  [
    "/assets/icons/content/rank.svg",
    "سرعة إنجاز ومرونة عالية",
    "فرق عمل رشيقة تتعامل مع المتغيرات بسرعة وتحافظ على جودة التنفيذ.",
  ],
  [
    "/assets/icons/content/shield.svg",
    "أمان وحوكمة البيانات",
    "نطبق معايير حماية واعتمادية مناسبة لطبيعة بياناتك وعملياتك.",
  ],
] as const;

type WhoWeAreSectionProps = {
  heading?: string;
  body?: string;
  stats?: Array<{ value: string; label: string; description: string }>;
  whyCards?: Array<{
    icon?: string | any;
    iconMedia?: string | any;
    title: string;
    description: string;
  }>;
  whyUs?: Array<{
    icon?: string | any;
    iconMedia?: string | any;
    title: string;
    description: string;
  }>;
  cta?: { label?: string; href?: string };
  customSectionId?: string;
};

export function WhoWeAreSection(props: WhoWeAreSectionProps) {
  const heading = props.heading || "نبني حلولا رقمية تنمو مع أعمالك";
  const body =
    props.body ||
    "منذ انطلاقنا في 2017، كرسنا جهودنا لتمكين المؤسسات من التميز الرقمي. نفخر بسجل من المشاريع التي أحدثت فارقا حقيقيا في أداء شركائنا.";
  const sectionId = props.customSectionId || "who-we-are";

  const statsList =
    props.stats && props.stats.length > 0
      ? props.stats
      : [
          { value: "+10", label: "سنوات", description: "خبرة وتميز تقني" },
          { value: "+150", label: "عميل", description: "وشريك نجاح" },
          { value: "+200", label: "مشروع", description: "تم تسليمه بنجاح" },
        ];

  const rawWhyCards = props.whyCards || props.whyUs || [];
  const whyList =
    rawWhyCards.length > 0
      ? rawWhyCards.map((item, idx) => {
          let iconUrl = "";
          if (item.iconMedia && typeof item.iconMedia === "object") {
            iconUrl = item.iconMedia.url || "";
          } else if (item.iconMedia && typeof item.iconMedia === "string") {
            iconUrl = item.iconMedia;
          } else if (item.icon && typeof item.icon === "object") {
            iconUrl = item.icon.url || "";
          } else if (typeof item.icon === "string") {
            iconUrl = item.icon;
          }
          return [
            iconUrl || defaultWhyCards[idx % 4][0],
            item.title,
            item.description,
          ] as const;
        })
      : defaultWhyCards;

  return (
    <section
      id={sectionId}
      className={cn("bg-surface", "py-5 sm:py-16", "lg:min-h-[796px]", "transition-colors", "duration-300")}
    >
      <div
        className={cn(
          "mx-auto",
          "grid",
          "max-w-[1240px]",
          "gap-[40px]",
          "lg:gap-[73px]",
          "px-5",
          "lg:grid-cols-2",
          "lg:px-0",
        )}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className={cn("pt-2", "text-right")}
        >
          <h2
            className={cn(
              "font-brand",
              "font-bold",
              "leading-[1.35]",
              "text-right",
              "text-[18px]",
              "sm:text-[32px]",
              "md:text-[36px]",
            )}
            style={{
              color: "var(--Neutral-800, #1E1E20)",
            }}
          >
            {heading}
          </h2>
          <p
            className={cn("mt-7", "text-right", "font-normal", "text-[14px] sm:text-[16px] md:text-[18px]")}
            style={{
              color: "var(--Neutral-500, #5F6063)",
              fontFamily:
                '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
              lineHeight: "140%",
            }}
          >
            {body}
          </p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            className={cn(
              "mt-10",
              "md:mt-12",
              "grid",
              "max-w-[472px]",
              "grid-cols-3",
              "gap-4",
              "sm:gap-6",
              "md:gap-10",
              "text-center",
            )}
          >
            {statsList.map((stat) => {
              const rawValue = String(stat.value);
              const numericValue = Number(rawValue.replace(/\D/g, ""));
              const suffix = rawValue.replace(/\d/g, "") || "";

              return (
                <motion.div key={stat.label} variants={fadeUp}>
                  <div
                    className={cn(
                      "text-[20px]",
                      "sm:text-[24px]",
                      "md:text-[30px]",
                      "font-black",
                      "text-[#F15722]",
                    )}
                  >
                    <Counter value={numericValue} suffix={suffix} />
                  </div>
                  <div
                    className={cn(
                      "text-[15px]",
                      "sm:text-[18px]",
                      "md:text-[21px]",
                      "font-bold",
                      "text-[#243A77]",
                      "dark:text-foreground-muted",
                      "truncate",
                    )}
                  >
                    {stat.label}
                  </div>
                  <p
                    className={cn(
                      "mt-2",
                      "text-[11px]",
                      "sm:text-[13px]",
                      "md:text-[14px]",
                      "font-normal",
                      "leading-tight",
                    )}
                    style={{
                      color: "var(--Neutral-500, #5F6063)",
                      fontFamily:
                        '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                    }}
                  >
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
          <div
            className={cn(
              "mt-10",
              "md:mt-16",
              "flex",
              "justify-center",
              "lg:justify-start",
            )}
          >
            <PillButton href={props.cta?.href || "/contact"} variant="blue">
              {props.cta?.label || "ابدأ رحلة نموك"}
            </PillButton>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className={cn("grid", "gap-8")}
        >
          {whyList.map(([icon, title, desc]) => (
            <motion.article
              key={title}
              variants={fadeUp}
              className={cn(
                "brand-card",
                "why-card",
                "flex",
                "items-start",
                "gap-5",
                "min-h-[143px]",
                "rounded-[24px]",
                "p-6",
                "transition-all",
                "duration-300",
              )}
            >
              <div
                className={cn(
                  "relative",
                  "z-10",
                  "flex",
                  "size-11",
                  "shrink-0",
                  "items-center",
                  "justify-center",
                  "rounded-xl",
                  "border",
                  "dark:border-[#1D2E5F] dark:bg-[#0E1730] border-orange-300",
                )}
              >
                <Image src={icon} alt="" width={20} height={20} className="size-5" loading="lazy" />
              </div>
              <div className="relative z-10 flex flex-col text-right w-full">
                <h3
                  className={cn("text-right", "font-medium", "leading-normal")}
                  style={{
                    color: "var(--Neutral-800, #1E1E20)",
                    fontFamily:
                      '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                    fontSize: "20px",
                  }}
                >
                  {title}
                </h3>
                <p
                  className={cn("mt-2", "text-right", "font-normal")}
                  style={{
                    color: "var(--Neutral-500, #5F6063)",
                    textAlign: "right",
                    fontFamily:
                      '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  {desc}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
