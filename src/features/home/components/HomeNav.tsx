import type { NavigationContent } from '@/features/home/types/home'

import { BrandMark } from './BrandMark'
import { ButtonLink } from './ButtonLink'

type HomeNavProps = {
  nav: NavigationContent
}

export function HomeNav({ nav }: HomeNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-white/88 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-24 w-full max-w-[1240px] items-center justify-between px-5 lg:px-0"
      >
        <BrandMark label={nav.brand} />
        <div className="hidden items-center gap-9 text-sm font-semibold text-brand-muted lg:flex">
          {nav.links.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="transition hover:text-brand-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
            >
              {link.label}
            </a>
          ))}
        </div>
        <ButtonLink href={nav.cta.href} variant="secondary" className="h-12 pe-5 text-xs">
          {nav.cta.label}
        </ButtonLink>
      </nav>
    </header>
  )
}
