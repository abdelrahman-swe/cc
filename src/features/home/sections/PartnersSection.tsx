import type { Partner, SectionCopy } from '@/features/home/types/home'

import { SectionHeader } from '../components/SectionHeader'

type PartnersSectionProps = {
  copy: SectionCopy
  partners: Partner[]
}

export function PartnersSection({ copy, partners }: PartnersSectionProps) {
  return (
    <section className="bg-white py-16 md:py-20" id="partners">
      <div className="mx-auto w-full max-w-[1240px] px-5 lg:px-0">
        <SectionHeader eyebrow={copy.eyebrow} heading={copy.heading} />
        <div className="mt-14 grid grid-cols-2 items-center gap-4 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              className="flex h-20 items-center justify-center rounded-2xl border border-transparent px-5 text-center text-2xl font-black text-[#9aa5b6] grayscale transition hover:border-brand-line hover:bg-brand-mist hover:text-brand-navy hover:grayscale-0"
            >
              {partner.logo ? (
                <img
                  src={partner.logo.src}
                  alt={partner.logo.alt}
                  loading="lazy"
                  className="max-h-10 object-contain"
                />
              ) : (
                partner.name
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
