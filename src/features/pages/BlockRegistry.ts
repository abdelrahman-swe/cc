import React from 'react'

import { BlogSection } from '@/features/blog/sections/BlogSection'
import { FeaturedWorkSection } from '@/features/case-studies/sections/FeaturedWorkSection'
import { FinalCtaSection } from '@/features/pages/home/sections/FinalCtaSection'
import { HeroSection } from '@/features/pages/home/sections/HeroSection'
import { MethodologySection } from '@/features/pages/home/sections/MethodologySection'
import { StatisticsSection } from '@/features/pages/home/sections/StatisticsSection'
import { WhoWeAreSection } from '@/features/pages/home/sections/WhoWeAreSection'
import { PartnersSection } from '@/features/partners/sections/PartnersSection'
import { ServicesSection } from '@/features/services/sections/ServicesSection'

import { AboutHeroSection } from '@/features/pages/about/sections/AboutHeroSection'
import { AboutStorySection } from '@/features/pages/about/sections/AboutStorySection'
import { AboutValuesSection } from '@/features/pages/about/sections/AboutValuesSection'
import { SolutionsSection } from '@/features/pages/about/sections/SolutionsSection'
import { SectorsSection } from '@/features/pages/about/sections/SectorsSection'

export const blockRegistry: Record<string, React.ComponentType<any>> = {
  'hero-block': HeroSection,
  'services-block': ServicesSection,
  'featured-work-block': FeaturedWorkSection,
  'partners-block': PartnersSection,
  'blog-block': BlogSection,
  'methodology-block': MethodologySection,
  'who-we-are-block': WhoWeAreSection,
  'statistics-block': StatisticsSection,
  'final-cta-block': FinalCtaSection,
  'about-hero-block': AboutHeroSection,
  'about-story-block': AboutStorySection,
  'about-values-block': AboutValuesSection,
  'solutions-block': SolutionsSection,
  'sectors-block': SectorsSection
}

