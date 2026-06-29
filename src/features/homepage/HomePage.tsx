import { Footer } from '@/components/shared/Footer'
import { Header } from '@/components/shared/Header'
import { RenderBlocks } from '@/features/pages/components/RenderBlocks'
import { HeroSection } from '@/features/homepage/sections/HeroSection'
import { getPageBySlug } from '@/lib/repositories/pages.repository'

export async function HomePage() {
  const page = await getPageBySlug('home', 'ar')

  return (
    <div dir="rtl" className="overflow-x-hidden bg-white text-[#0E1730]">
      <Header />
      <main>
        <HeroSection {...(page.hero || {})} />
        <RenderBlocks blocks={page.layout} />
      </main>
      <Footer />
    </div>
  )
}
