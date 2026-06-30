import type { Partner, SectionCopy } from '@/features/home/types/home'
import { SectionHeader } from '../components/SectionHeader'
import { Marquee } from '@/registry/magicui/marquee'

type PartnersSectionProps = {
  copy: SectionCopy
  partners: Partner[]
}

export function PartnersSection({ copy, partners }: PartnersSectionProps) {
  const validPartners = partners.filter((p) => Boolean(p.logo?.src))

  return (
    <section className="bg-white py-16 md:py-20" id="partners">
      <div className="mx-auto w-full max-w-[1240px] px-5 lg:px-0">
        <SectionHeader eyebrow={copy.eyebrow} heading={copy.heading} />
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-12">
          <Marquee className="[--duration:12s] [--gap:5.5rem] py-4">
            {validPartners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href || '#'}
                className="flex h-16 w-36 items-center justify-center opacity-75 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <img
                  src={partner.logo!.src}
                  alt={partner.logo!.alt || partner.name}
                  loading="lazy"
                  className="max-h-12 max-w-[130px] object-contain"
                />
              </a>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white via-white/80 via-40% to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white via-white/80 via-40% to-transparent z-10"></div>
        </div>
      </div>
    </section>
  )
}
