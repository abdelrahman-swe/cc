import { ArrowUpLeft } from 'lucide-react'

import type { CaseStudy, SectionCopy } from '@/features/home/types/home'

import { ButtonLink } from '../components/ButtonLink'
import { SectionHeader } from '../components/SectionHeader'

type FeaturedWorkSectionProps = {
  copy: SectionCopy & {
    cta: {
      label: string
      href: string
    }
  }
  caseStudies: CaseStudy[]
}

export function FeaturedWorkSection({ copy, caseStudies }: FeaturedWorkSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24" id="featured-work">
      <div className="mx-auto w-full max-w-[1240px] px-5 lg:px-0">
        <SectionHeader eyebrow={copy.eyebrow} heading={copy.heading} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={`${study.title}-${study.category}`}
              className="rounded-[30px] border border-brand-line bg-white p-4 shadow-card"
            >
              <a href={study.href} className="group block">
                <div className="overflow-hidden rounded-[24px] bg-brand-mist">
                  {study.image ? (
                    <img
                      src={study.image.src}
                      alt={study.image.alt}
                      loading="lazy"
                      className="aspect-[365/445] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="flex items-center justify-between gap-4 px-1 pt-5">
                  <span className="grid size-11 place-items-center rounded-full border border-brand-line text-brand-navy">
                    <ArrowUpLeft aria-hidden="true" className="size-5" />
                  </span>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="rounded-full bg-brand-mist px-3 py-1 font-bold text-brand-navy">
                      {study.category}
                    </span>
                    <h3 className="font-extrabold text-brand-ink">{study.title}</h3>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <ButtonLink href={copy.cta.href} variant="secondary">
            {copy.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
