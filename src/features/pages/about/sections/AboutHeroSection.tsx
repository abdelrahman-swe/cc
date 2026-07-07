"use client";

import { motion, type Variants } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { SectionTag } from "@/components/ui/SectionTag";
import { useParams } from "next/navigation";
import { TypingAnimation } from "@/components/ui/typing-animation";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const motionViewport = { once: true, margin: "-80px" } as const;

type AboutHeroSectionProps = {
  sectionTag?: string;
  title?: string;
  description?: string;
  cta?: {
    label?: string;
    href?: string;
  };
};

export function AboutHeroSection({
  sectionTag = "عن كود",
  title = "رحلة بدأت بفكرة... وتستمر بصناعة حلول رقمية ناجحة",
  description = "نؤمن أن التقنية ليست مجرد أدوات، بل وسيلة لخلق قيمة حقيقية. لذلك نطور حلولًا رقمية تساعد الشركات على النمو، وتحسين الكفاءة، وتقديم تجارب استثنائية لعملائها.",
  cta,
}: AboutHeroSectionProps) {
  const params = useParams();
  const locale = (params.locale as string) || "ar";

  const ctaLabel =
    cta?.label ||
    (locale === "en" ? "Get Free Consultation" : "احصل علي استشارة مجانية");
  const ctaHref = cta?.href || "/contact";

  return (
    <section
      className="relative overflow-hidden bg-surface dark:bg-[#0b1124] py-20 lg:py-32 transition-colors duration-300"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* SVG/Image Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Light Mode Background */}
        <img
          src="/light/about-hero.svg"
          alt=""
          className="w-full h-full object-cover opacity-50 transition-opacity duration-500 dark:opacity-0"
        />
        {/* Dark Mode Background */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 dark:opacity-100 bg-[#0b1124]">
          {/* Right Ellipse */}
          <div className="absolute right-0 top-[71px] w-[322px] h-[322px] translate-x-1/4">
            <img src="/dark/imgEllipse468.svg" alt="" className="w-full h-full" />
          </div>
          {/* Left Ellipse */}
          <div className="absolute left-[-4px] top-[71px] w-[322px] h-[322px]">
            <img src="/dark/imgEllipse469.svg" alt="" className="w-full h-full" />
          </div>
          {/* Masked grid/network background */}
          <div 
            className="absolute left-1/2 bottom-[-114px] h-[540px] w-[1440px] -translate-x-1/2 opacity-20 bg-[#b2c1e5]" 
            style={{ 
              maskImage: 'url("/dark/img7073.png")',
              maskRepeat: 'no-repeat',
              maskPosition: 'center bottom',
              maskSize: '1440px 540px',
              WebkitMaskImage: 'url("/dark/img7073.png")',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center bottom',
              WebkitMaskSize: '1440px 540px',
            }} 
          />
          {/* Bottom transition overlay */}
          <div className="absolute left-1/2 bottom-0 h-[175px] w-[1440px] -translate-x-1/2">
            <img src="/dark/imgRectangle3.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 text-center lg:px-0">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={motionViewport}
          className="flex flex-col items-center gap-8"
        >
          <SectionTag variant="about">{sectionTag}</SectionTag>

          <h1
            className="text-center max-w-[980px] text-[#243A77] dark:text-white"
            style={{
              textAlign: "center",
              fontFamily: '"Thmanyah Serif Text", serif',
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            <TypingAnimation
              duration={30}
              startOnView={true}
              showCursor={false}
              as="span"
            >
              {title}
            </TypingAnimation>
          </h1>

          <p
            className="text-center max-w-[866px] text-[#808586] dark:text-[#d5d6d7]"
            style={{
              textAlign: "center",
              fontFamily: '"IBM Plex Sans Arabic", sans-serif',
              fontSize: "24px",
              fontStyle: "normal",
            }}
          >
            {description}
          </p>

          <div className="mt-4">
            <PillButton href={ctaHref} variant="orange">
              {ctaLabel}
            </PillButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
