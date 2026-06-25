import type { MethodologyStep } from '@/features/home/types/home'

import { ButtonLink } from '../components/ButtonLink'
import { SectionHeader } from '../components/SectionHeader'

type MethodologySectionProps = {
  methodology: {
    eyebrow?: string
    heading: string
    steps: MethodologyStep[]
    cta: {
      label: string
      href: string
    }
  }
}

export function MethodologySection({ methodology }: MethodologySectionProps) {
  return (
    <section className="bg-white py-16 md:py-24" id="methodology">
      <div className="mx-auto w-full max-w-[1240px] px-5 lg:px-0">
        <SectionHeader eyebrow={methodology.eyebrow} heading={methodology.heading} />
        <div className="relative mt-16 grid gap-6 lg:grid-cols-[1fr_96px_1fr] lg:gap-16">
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-brand-line lg:block" />
          <div className="grid gap-36 pt-36 lg:pt-40">
            {methodology.steps
              .filter((_, index) => index % 2 === 1)
              .map((step, index) => (
                <StepCard key={step.title} step={step} index={index * 2 + 2} />
              ))}
          </div>
          <div className="hidden lg:grid lg:justify-center">
            {methodology.steps.map((step, index) => (
              <div key={step.title} className="flex min-h-36 items-center justify-center">
                <span className="z-10 grid size-10 place-items-center rounded-full bg-brand-orange text-sm font-black text-white">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
          <div className="grid gap-36">
            {methodology.steps
              .filter((_, index) => index % 2 === 0)
              .map((step, index) => (
                <StepCard key={step.title} step={step} index={index * 2 + 1} />
              ))}
          </div>
        </div>
        <div className="mt-14 flex justify-center">
          <ButtonLink href={methodology.cta.href} variant="secondary">
            {methodology.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index }: { step: MethodologyStep; index: number }) {
  return (
    <article className="relative rounded-3xl border border-brand-line bg-white p-7 shadow-card">
      <span className="mb-4 inline-grid size-9 place-items-center rounded-full bg-[#fff1eb] text-sm font-black text-brand-orange lg:hidden">
        {index}
      </span>
      <h3 className="text-lg font-extrabold text-brand-ink">{step.title}</h3>
      <p className="mt-3 text-sm leading-7 text-brand-muted">{step.description}</p>
    </article>
  )
}
