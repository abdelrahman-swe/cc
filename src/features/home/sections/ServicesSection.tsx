import type { SectionCopy, Service } from '@/features/home/types/home'
import { ServicesSection as MainServicesSection } from '@/features/services/sections/ServicesSection'

type ServicesSectionProps = {
  copy: SectionCopy
  services: Service[]
}

export function ServicesSection({ copy, services }: ServicesSectionProps) {
  const items = services.map((s) => ({
    id: s.title,
    title: s.title,
    description: s.description,
    slug: '',
    layout: s.layout,
    imageUrl: s.image?.src
  }))

  return (
    <MainServicesSection
      sectionTag={copy.eyebrow}
      title={copy.heading}
      items={items}
    />
  )
}


