import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/cn'

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
      'bg-brand-orange text-white shadow-[0_16px_36px_rgba(255,90,36,0.24)] hover:bg-[#ee4f1e]',
    secondary:
      'bg-brand-navy text-white shadow-[0_16px_36px_rgba(24,55,119,0.18)] hover:bg-[#132e65]',
    light: 'bg-white text-brand-orange shadow-[0_14px_34px_rgba(12,23,48,0.16)] hover:bg-[#fff7f3]'
  }

  return (
    <a
      href={href}
      className={cn(
        'inline-flex h-14 items-center justify-center gap-3 rounded-full px-4 pe-6 text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange',
        variants[variant],
        className
      )}
    >
      <span className="grid size-10 place-items-center rounded-full bg-white/18">
        <ArrowLeft aria-hidden="true" className="size-5" />
      </span>
      <span>{children}</span>
    </a>
  )
}
