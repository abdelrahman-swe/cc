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
      className="relative overflow-hidden bg-white py-20 lg:py-32"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* SVG Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/images/about-hero.svg"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
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
            className="text-center max-w-[980px]"
            style={{
              color: "var(--Sec-500, #243A77)",
              textAlign: "center",
              fontFamily: '"Thmanyah Serif Text", serif',
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            <TypingAnimation
              duration={50}
              startOnView={true}
              showCursor={false}
              as="span"
            >
              {title}
            </TypingAnimation>
          </h1>

          <p
            className="text-center max-w-[866px]"
            style={{
              color: "var(--Neutral-300, #808586)",
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
