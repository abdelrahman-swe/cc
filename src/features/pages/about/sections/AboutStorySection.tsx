"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { useParams } from "next/navigation";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const motionViewport = { once: true, margin: "-80px" } as const;

type AboutStorySectionProps = {
  sectionTag?: string;
  title?: string;
  description?: string;
  image?: any;
};

export function AboutStorySection({
  sectionTag = "قصتنا",
  title = "رحلة بدأت بالشغف... وتستمر بالابتكار",
  description,
  image,
}: AboutStorySectionProps) {
  const params = useParams();
  const locale = (params.locale as string) || "ar";

  const defaultDescription =
    locale === "en"
      ? `Since 2017, we help companies lead digital transformation through software solutions combining innovation, quality, and ease of use.\n\nWe start by understanding your business needs, then transform them into secure, flexible, and scalable digital systems that support your growth.\n\nAt Code, we are not just a software development company, but a tech partner that works with you to build solutions that achieve real value.`
      : `منذ عام 2017، نساعد الشركات على قيادة التحول الرقمي من خلال حلول برمجية تجمع بين الابتكار، الجودة، وسهولة الاستخدام.\n\nنبدأ بفهم احتياجات أعمالك، ثم نحولها إلى أنظمة رقمية آمنة، مرنة، وقابلة للتوسع، تدعم نموك وتواكب تطلعاتك المستقبلية.\n\nفي كود، لسنا مجرد شركة تطوير برمجيات، بل شريك تقني يعمل معك لبناء حلول تحقق قيمة حقيقية وتساعد أعمالك على النجاح.`;

  const bodyText = description || defaultDescription;
  const paragraphs = bodyText.split("\n\n").filter(Boolean);

  let imageUrl = "/images/about-story.svg";
  if (image && typeof image === "object") {
    imageUrl = image.url || image.src || imageUrl;
  } else if (typeof image === "string") {
    imageUrl = image;
  }

  return (
    <section
      className={cn('bg-white', 'py-16', 'lg:py-24')}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className={cn('mx-auto', 'max-w-[1240px]', 'px-5', 'lg:px-0')}>
        <div className={cn('grid', 'grid-cols-1', 'items-center', 'gap-12', 'lg:grid-cols-12')}>
          {/* Texts Column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            className={cn('lg:col-span-5', 'flex', 'flex-col', 'gap-6')}
          >
            <h2
              className={cn(
                "text-[28px] sm:text-[34px] md:text-[38px] font-bold leading-[1.3] text-[#1e1e20]",
                locale === "ar" ? "text-right" : "text-left",
              )}
              style={{ fontFamily: '"Thmanyah Serif Text", serif' }}
            >
              {title}
            </h2>

            <div
              className={cn('flex', 'flex-col', 'gap-4')}
              style={{
                color: "var(--Neutral-500, #5F6063)",
                textAlign: "justify",
                fontFamily: '"IBM Plex Sans Arabic", sans-serif',
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "140%",
                alignSelf: "stretch",
              }}
            >
              {paragraphs.map((para, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Image & Rotated Badge Column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={motionViewport}
            className={cn('relative', 'lg:col-span-7', 'flex', 'justify-center', 'w-full')}
          >
            {/* Card Container wrapper with stacked layers: Max Width 800px */}
            <div className={cn('relative', 'w-full', 'max-w-[800px]', 'h-[280px]', 'sm:h-[350px]', 'lg:h-[427px]')}>
              {/* Tilted Tag Badge: Centered mathematically on the corner of the card */}
              <div
                className={cn(
                  "absolute z-30 pointer-events-none select-none",
                  locale === "ar" ? "top-0 left-0" : "top-0 right-0"
                )}
              >
                {/* The Orange Stripe */}
                <div
                  className={cn('absolute', 'bg-[#F15722]')}
                  style={{
                    width: "155px",
                    height: "27px",
                    left: "-50.5px",
                    top: "-9px",
                    transform: `rotate(${locale === "ar" ? -24.48 : 24.48}deg)`,
                    transformOrigin: "center",
                  }}
                />

                {/* Text Overlay */}
                <span
                  className={cn('absolute', 'text-[#301107]', 'font-semibold', 'whitespace-nowrap')}
                  style={{
                    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
                    fontSize: "40px",
                    lineHeight: "normal",
                    width: "110px",
                    height: "94px",
                    left: locale === "ar" ? "-30px" : "auto",
                    right: locale === "en" ? "-50px" : "auto",
                    top: "-42px",
                    transform: `rotate(${locale === "ar" ? -25.32 : 25.32}deg) translate(${locale === "ar" ? "-4px" : "4px"}, -12px)`,
                    transformOrigin: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {sectionTag}
                </span>
              </div>

              {/* Stack Layer 1 (Backmost/Bottom): Width 800px, bg: #FEEEE9 */}
              <div
                className={cn(
                  "absolute inset-y-0 rounded-[24px] bg-[#FEEEE9] transition-all duration-300",
                  locale === "ar" ? "left-0 right-0" : "left-0 right-0",
                )}
              />

              {/* Stack Layer 2 (Middle): Width 785px (offset by 15px), bg: #FCDDD3 */}
              <div
                className={cn(
                  "absolute inset-y-0 rounded-[24px] bg-[#FCDDD3] transition-all duration-300",
                  locale === "ar"
                    ? "left-0 right-[15px]"
                    : "left-[15px] right-0",
                )}
              />

              {/* Main Image Frame (Top/Front): Width 770px (offset by 30px) */}
              <div
                className={cn(
                  "absolute inset-y-0 z-10 overflow-hidden rounded-[24px] transition-all duration-300",
                  locale === "ar"
                    ? "left-0 right-[30px]"
                    : "left-[30px] right-0",
                )}
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={cn('object-cover', 'transition-transform', 'duration-500', 'hover:scale-103')}
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
