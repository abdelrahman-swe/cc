import type { HomePageData } from '@/features/home/types/home'

import { ButtonLink } from '../components/ButtonLink'

type FinalCtaSectionProps = {
  finalCta: HomePageData['finalCta']
}

export function FinalCtaSection({ finalCta }: FinalCtaSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-5 lg:px-0">
        <div className="relative grid min-h-[360px] overflow-hidden rounded-[32px] bg-brand-orange p-8 text-white shadow-[0_26px_80px_rgba(255,90,36,0.24)] md:grid-cols-[0.9fr_1.1fr] md:p-12">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-white/10" />
          <div className="relative order-2 self-end md:order-1">
            {finalCta.image ? (
              <img
                src={finalCta.image.src}
                alt={finalCta.image.alt}
                loading="lazy"
                className="mx-auto max-h-[310px] w-full max-w-[360px] object-contain md:mx-0"
              />
            ) : null}
          </div>
          <div className="relative order-1 flex flex-col justify-center text-center md:order-2 md:text-start">
            <p className="text-base font-bold text-white/82">{finalCta.body}</p>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              {finalCta.heading}
            </h2>
            <div className="mt-8">
              <ButtonLink href={finalCta.cta.href} variant="light">
                {finalCta.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
