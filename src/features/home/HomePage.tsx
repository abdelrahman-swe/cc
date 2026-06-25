import type { HomePageData } from './types/home'

import { HomeFooter } from './components/HomeFooter'
import { HomeNav } from './components/HomeNav'
import { BlogPreviewSection } from './sections/BlogPreviewSection'
import { FeaturedWorkSection } from './sections/FeaturedWorkSection'
import { FinalCtaSection } from './sections/FinalCtaSection'
import { HeroSection } from './sections/HeroSection'
import { MethodologySection } from './sections/MethodologySection'
import { PartnersSection } from './sections/PartnersSection'
import { ServicesSection } from './sections/ServicesSection'
import { WhoWeAreSection } from './sections/WhoWeAreSection'

type HomePageProps = {
  data: HomePageData
}

export function HomePage({ data }: HomePageProps) {
  return (
    <>
      <HomeNav nav={data.nav} />
      <main>
        <HeroSection hero={data.hero} />
        <PartnersSection copy={data.partnersCopy} partners={data.partners} />
        <ServicesSection copy={data.servicesCopy} services={data.services} />
        <WhoWeAreSection content={data.whoWeAre} stats={data.stats} whyUs={data.whyUs} />
        <FeaturedWorkSection copy={data.resultsCopy} caseStudies={data.caseStudies} />
        <MethodologySection methodology={data.methodology} />
        <BlogPreviewSection copy={data.blogCopy} posts={data.blogPosts} />
        <FinalCtaSection finalCta={data.finalCta} />
      </main>
      <HomeFooter brand={data.nav.brand} footer={data.footer} links={data.nav.links} />
    </>
  )
}
