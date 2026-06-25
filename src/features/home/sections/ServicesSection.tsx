import { Plus } from 'lucide-react'

import type { SectionCopy, Service } from '@/features/home/types/home'
import { cn } from '@/lib/cn'

import { SectionHeader } from '../components/SectionHeader'

type ServicesSectionProps = {
  copy: SectionCopy
  services: Service[]
}

function ServiceImage({ service }: { service: Service }) {
  if (!service.image) {
    return null
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[26px] bg-brand-mist',
        service.layout === 'wide' ? 'min-h-[260px] lg:min-h-full' : 'h-64'
      )}
    >
      <img
        src={service.image.src}
        alt={service.image.alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const isFeatured = service.layout === 'featured'
  const isWide = service.layout === 'wide'

  return (
    <article
      className={cn(
        'overflow-hidden rounded-[30px] border border-brand-line bg-white shadow-card',
        isFeatured && 'lg:col-span-2',
        isWide && 'lg:col-span-3'
      )}
    >
      <div
        className={cn(
          'grid h-full gap-6 p-5',
          isWide && 'lg:grid-cols-[2fr_1fr] lg:items-center',
          isFeatured && 'lg:grid-cols-[1.35fr_1fr] lg:items-center'
        )}
      >
        {(isFeatured || isWide) && service.image ? <ServiceImage service={service} /> : null}
        <div className={cn('flex h-full flex-col p-2', isWide && 'lg:order-first')}>
          <span
            className={cn(
              'mb-6 grid size-10 place-items-center rounded-full',
              service.accent === 'orange'
                ? 'bg-[#fff1eb] text-brand-orange'
                : 'bg-brand-mist text-brand-navy'
            )}
          >
            <Plus aria-hidden="true" className="size-5" />
          </span>
          <h3 className="text-xl font-extrabold leading-8 text-brand-ink">{service.title}</h3>
          <p className="mt-4 text-sm leading-7 text-brand-muted">{service.description}</p>
          {service.summary ? (
            <p className="mt-5 text-xs font-bold text-brand-navy/60">{service.summary}</p>
          ) : null}
          {service.metric ? (
            <div className="mt-auto flex items-center gap-3 pt-8">
              <span className="rounded-full bg-brand-navy px-4 py-2 text-xs font-black text-white">
                {service.metric}
              </span>
              <span className="flex -space-x-3 space-x-reverse">
                {[0, 1, 2].map((item) => (
                  <span
                    key={item}
                    className="size-8 rounded-full border-2 border-white bg-brand-mist"
                  />
                ))}
              </span>
            </div>
          ) : null}
        </div>
        {!isFeatured && !isWide && service.image ? <ServiceImage service={service} /> : null}
      </div>
    </article>
  )
}

export function ServicesSection({ copy, services }: ServicesSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24" id="services">
      <div className="mx-auto w-full max-w-[1240px] px-5 lg:px-0">
        <SectionHeader eyebrow={copy.eyebrow} heading={copy.heading} />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
