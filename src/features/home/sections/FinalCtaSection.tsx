import type { HomePageData } from '@/features/home/types/home'
import { ButtonLink } from '../components/ButtonLink'

type FinalCtaSectionProps = {
  finalCta: HomePageData['finalCta']
}

export function FinalCtaSection({ finalCta }: FinalCtaSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24" id="contact">
      <div className="mx-auto w-full max-w-[1240px] px-5 lg:px-0">
        <div className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-[#F15722] px-8 py-12 text-white shadow-[0_26px_80px_rgba(255,90,36,0.24)] md:p-14 lg:px-16 lg:py-16">
          {/* CTA Pop Starburst behind mascot head */}
          <img
            src="/images/cta-pop.svg"
            alt=""
            className="pointer-events-none absolute left-[170px] top-[15px] z-0 hidden w-[190px] md:block lg:left-[240px] lg:top-[25px] lg:w-[230px]"
            loading="lazy"
          />

          {/* Mascot Robot on Left */}
          {finalCta.image ? (
            <img
              src={finalCta.image.src || '/mockups/mascot.png'}
              alt={finalCta.image.alt || ''}
              className="pointer-events-none absolute bottom-[-75px] left-0 z-10 hidden w-[340px] md:block lg:bottom-[-95px] lg:left-[30px] lg:w-[460px]"
              loading="lazy"
            />
          ) : (
            <img
              src="/mockups/mascot.png"
              alt=""
              className="pointer-events-none absolute bottom-[-75px] left-0 z-10 hidden w-[340px] md:block lg:bottom-[-95px] lg:left-[30px] lg:w-[460px]"
              loading="lazy"
            />
          )}

          {/* CTA Blur overlay on top of mascot at bottom end of card */}
          <img
            src="/images/cta-blur.svg"
            alt=""
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-auto w-full object-cover"
            loading="lazy"
          />

          {/* Grid Layout: Text on Right */}
          <div className="relative z-30 grid w-full items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col items-center text-center md:items-start md:text-right">
              <h2 className="font-serif-text text-[30px] font-black leading-tight text-white md:text-[40px] lg:text-[44px]">
                {finalCta.heading}
              </h2>
              <p className="mt-4 text-[18px] font-bold text-white/90 md:text-[20px]">
                {finalCta.body}
              </p>
              <div className="mt-8">
                <ButtonLink href={finalCta.cta.href} variant="light">
                  {finalCta.cta.label}
                </ButtonLink>
              </div>
            </div>
            <div className="hidden min-h-[300px] md:block" />
          </div>
        </div>
      </div>
    </section>
  )
}

