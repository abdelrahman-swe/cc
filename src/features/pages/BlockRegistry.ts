import React from 'react'

import { BlogSection } from '@/features/blog/sections/BlogSection'
import { FeaturedWorkSection } from '@/features/case-studies/sections/FeaturedWorkSection'
import { FinalCtaSection } from '@/features/pages/sections/FinalCtaSection'
import { HeroSection } from '@/features/pages/sections/HeroSection'
import { MethodologySection } from '@/features/pages/sections/MethodologySection'
import { StatisticsSection } from '@/features/pages/sections/StatisticsSection'
import { WhoWeAreSection } from '@/features/pages/sections/WhoWeAreSection'
import { PartnersSection } from '@/features/partners/sections/PartnersSection'
import { ServicesSection } from '@/features/services/sections/ServicesSection'

export const blockRegistry: Record<string, React.ComponentType<any>> = {
  'hero-block': HeroSection,
  'services-block': ServicesSection,
  'featured-work-block': FeaturedWorkSection,
  'partners-block': PartnersSection,
  'blog-block': BlogSection,
  'methodology-block': MethodologySection,
  'who-we-are-block': WhoWeAreSection,
  'statistics-block': StatisticsSection,
  'final-cta-block': FinalCtaSection
}
