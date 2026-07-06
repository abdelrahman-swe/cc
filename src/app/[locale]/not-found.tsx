import { getLocale } from 'next-intl/server'
import config from '@payload-config'
import { getPayload } from 'payload'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { PillButton } from '@/components/ui/PillButton'
import { routing, type Locale } from '@/i18n/routing'
import Image from 'next/image'
import { cn } from "../../lib/utils";

const fallbackLocale = routing.defaultLocale

async function getNavigation(locale: Locale) {
  try {
    const payload = await getPayload({ config })
    const nav = await payload.findGlobal({
      slug: 'navigation',
      locale,
      fallbackLocale: fallbackLocale
    })
    return nav
  } catch {
    return null
  }
}

async function getFooter(locale: Locale) {
  try {
    const payload = await getPayload({ config })
    const footer = await payload.findGlobal({
      slug: 'footer',
      locale,
      fallbackLocale: fallbackLocale
    })
    return footer
  } catch {
    return null
  }
}

export default async function NotFound() {
  const locale = (await getLocale()) as Locale

  const nav = await getNavigation(locale)
  const footer = await getFooter(locale)

  const isAr = locale === 'ar'

  const title = isAr ? 'الصفحة غير موجودة' : 'Page Not Found'
  const description = isAr
    ? 'عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
    : 'Sorry, the page you are looking for does not exist or has been moved.'
  const ctaLabel = isAr ? 'العودة للرئيسية' : 'Go Back Home'

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className={cn('overflow-x-hidden', 'bg-surface', 'text-foreground', 'flex', 'flex-col', 'min-h-screen', 'transition-colors', 'duration-300')}>
      <Header
        brand={nav?.brand ?? undefined}
        links={(nav?.links as any[]) ?? undefined}
        cta={nav?.cta as any ?? undefined}
      />
      
      {/* 404 Hero Area */}
      <main className={cn('flex-grow', 'flex', 'flex-col', 'items-center', 'justify-center', 'relative', 'py-20', 'px-5', 'text-center', 'overflow-hidden')}>
        {/* Glow & Blur backgrounds from public folder */}
        <div className={cn('absolute', 'inset-0', 'z-0', 'pointer-events-none', 'opacity-50', 'flex', 'justify-center', 'items-center')}>

        </div>

        <div className={cn('relative', 'z-10', 'max-w-[600px]', 'flex', 'flex-col', 'items-center')}>
          {/* Main 404 Number */}
          <div className={cn('text-[120px]', 'sm:text-[160px]', 'font-extrabold', 'leading-none', 'text-brand-navy', 'dark:text-white', 'tracking-tight', 'relative')}>
            404
            <span className={cn('absolute', '-top-4', '-right-12', 'text-[#F15722]', 'text-[60px]', 'sm:text-[80px]')}>✦</span>
          </div>

          <h1 className={cn('mt-8', 'text-2xl', 'sm:text-4xl', 'font-bold', 'text-brand-navy', 'dark:text-white', 'leading-tight')}>
            {title}
          </h1>
          
          <p className={cn('mt-4', 'text-[18px]', 'text-foreground-muted', 'max-w-md', 'leading-relaxed')}>
            {description}
          </p>

          <div className="mt-10">
            <PillButton href="/" variant="orange">
              {ctaLabel}
            </PillButton>
          </div>
        </div>
      </main>

      <Footer data={footer} />
    </div>
  )
}
