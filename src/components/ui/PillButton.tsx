import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/cn'

type PillButtonProps = {
  children: string
  href: string
  variant?: 'nav' | 'orange' | 'blue' | 'white'
  className?: string
  onClick?: () => void
}

export function PillButton({
  children,
  href,
  variant = 'nav',
  className = '',
  onClick
}: PillButtonProps) {
  const styles = {
    nav: 'cta-pill--navy bg-[#1a2d5e] text-white',
    orange: 'cta-pill--orange bg-[#c44118] text-white',
    blue: 'cta-pill--navy bg-[#1a2d5e] text-white',
    white: 'cta-pill--white border border-[#F1D5CC] bg-white text-[#F15722]'
  }

  const circle = {
    nav: 'bg-white text-[#243A77]',
    orange: 'bg-white text-[#F15722]',
    blue: 'bg-white text-[#243A77]',
    white: 'bg-[#F15722] text-white'
  }

  const shadows = {
    nav: '',
    orange: 'shadow-[0_14px_34px_rgba(241,87,34,0.2)]',
    blue: 'shadow-[0_14px_34px_rgba(14,23,48,0.12)]',
    white: 'shadow-[0_14px_34px_rgba(14,23,48,0.12)]'
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'cta-pill group inline-flex h-14 items-center justify-between gap-4 rounded-[50px] ps-6 pe-2 text-[15px] font-bold transition duration-300 hover:-translate-y-0.5',
        shadows[variant],
        styles[variant],
        className
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          'cta-icon-wrap relative grid size-10 shrink-0 place-items-center rounded-full',
          circle[variant]
        )}
      >
        <ArrowLeft aria-hidden className={cn('cta-icon-main', 'size-5')} />
        <span className="cta-icon-ghost">
          <ArrowLeft aria-hidden className="size-5" />
        </span>
      </span>
    </a>
  )
}
