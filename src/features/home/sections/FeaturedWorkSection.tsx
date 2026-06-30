'use client'

import type { CaseStudy, SectionCopy } from '@/features/home/types/home'
import { ProjectCard } from '@/features/case-studies/sections/FeaturedWorkSection'
import { SectionHeader } from '../components/SectionHeader'
import { ButtonLink } from '../components/ButtonLink'

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
            <ProjectCard
              key={`${study.title}-${study.category}`}
              image={study.image?.src || '/media/red-cresent.png'}
              category={study.category}
              title={study.title}
            />
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
