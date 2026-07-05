import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Link } from '@/i18n/routing'

type ButtonLinkProps = {
  href: string
  children: string
  variant?: 'primary' | 'secondary' | 'light'
  className?: string
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className
}: ButtonLinkProps) {
  const variants = {
    primary:
      'cta-pill--orange bg-brand-orange text-white shadow-[0_16px_36px_rgba(255,90,36,0.24)]',
    secondary:
      'cta-pill--navy bg-brand-navy text-white shadow-[0_16px_36px_rgba(24,55,119,0.18)]',
    light: 'cta-pill--white bg-white text-brand-orange shadow-[0_14px_34px_rgba(12,23,48,0.16)]'
  }

  const isHash = href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')

  const commonClass = cn(
    'cta-pill group inline-flex h-14 items-center justify-center gap-3 rounded-full px-4 pe-6 text-sm font-bold transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange',
    variants[variant],
    className
  )

  const content = (
    <>
      <span className="cta-icon-wrap relative grid size-10 place-items-center rounded-full bg-white/18">
        <ArrowLeft aria-hidden className="cta-icon-main size-5" />
        <span className="cta-icon-ghost">
          <ArrowLeft aria-hidden className="size-5" />
        </span>
      </span>
      <span>{children}</span>
    </>
  )

  if (isHash) {
    return (
      <a href={href} className={commonClass}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={commonClass}>
      {content}
    </Link>
  )
}
