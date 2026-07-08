import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown
} from 'iconsax-reactjs'
import { cn } from '@/lib/cn'
import { Link } from '@/i18n/routing'
import { useLocale } from 'next-intl'

type PillButtonProps = {
  children: string
  href: string
  variant?: 'nav' | 'orange' | 'blue' | 'white'
  className?: string
  onClick?: () => void
  arrowDirection?: 'left' | 'right' | 'up' | 'down' | 'up-left' | 'up-right'
  size?: 'sm' | 'md'
  circleClassName?: string
}

export function PillButton({
  children,
  href,
  variant = 'nav',
  className = '',
  onClick,
  arrowDirection,
  size = 'md',
  circleClassName = ''
}: PillButtonProps) {
  const locale = useLocale()
  const isRtl = locale === 'ar'

  const resolvedDirection = arrowDirection || (isRtl ? 'left' : 'right')
 
  const ArrowIcon = {
    left: ArrowLeft,
    right: ArrowRight,
    up: ArrowUp,
    down: ArrowDown,
    'up-left': ArrowLeft,
    'up-right': ArrowRight
  }[resolvedDirection] || (isRtl ? ArrowLeft : ArrowRight)
 
  const rotateAngle = resolvedDirection === 'up-left' || resolvedDirection === 'up-right'
    ? '45deg'
    : '0deg'

  const customStyle = {
    '--arrow-rotation': rotateAngle
  } as React.CSSProperties
 
  const styles = {
    nav: 'cta-pill--navy bg-[#1a2d5e] text-white',
    orange: 'cta-pill--orange bg-[#F15722] dark:bg-[#0E1730] dark:border dark:border-white/10 text-white',
    blue: 'cta-pill--navy bg-[#1a2d5e] text-white',
    white: 'cta-pill--white border border-[#F1D5CC] bg-white text-[#F15722]'
  }
 
  const circleBg = {
    nav: 'bg-white',
    orange: 'bg-white dark:bg-white/10',
    blue: 'bg-white',
    white: 'bg-[#F15722]'
  }

  const circleText = {
    nav: 'text-[#243A77]',
    orange: 'text-[#F15722] dark:text-white',
    blue: 'text-[#243A77]',
    white: 'text-white'
  }

  const customClasses = circleClassName.split(/\s+/).filter(Boolean)
  const hasCustomLightText = customClasses.some(c => c.startsWith('text-'))
  const hasCustomDarkText = customClasses.some(c => c.startsWith('dark:text-'))
  const hasCustomLightBg = customClasses.some(c => c.startsWith('bg-'))
  const hasCustomDarkBg = customClasses.some(c => c.startsWith('dark:bg-'))

  const filteredBg = circleBg[variant].split(/\s+/).filter(Boolean).filter(c => {
    if (c.startsWith('dark:bg-')) return !hasCustomDarkBg
    if (c.startsWith('bg-')) return !hasCustomLightBg
    return true
  }).join(' ')

  const filteredText = circleText[variant].split(/\s+/).filter(Boolean).filter(c => {
    if (c.startsWith('dark:text-')) return !hasCustomDarkText
    if (c.startsWith('text-')) return !hasCustomLightText
    return true
  }).join(' ')
 
  const shadows = {
    nav: '',
    orange: 'shadow-[0_14px_34px_rgba(241,87,34,0.2)] dark:shadow-none',
    blue: 'shadow-[0_14px_34px_rgba(14,23,48,0.12)]',
    white: 'shadow-[0_14px_34px_rgba(14,23,48,0.12)]'
  }

  const isHash = href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')

  const isSm = size === 'sm'

  const commonClass = cn(
    'cta-pill group inline-flex items-center justify-between transition duration-300 hover:-translate-y-0.5 whitespace-nowrap',
    isSm
      ? 'h-10 rounded-[50px] ps-4 pe-1.5 text-[13px] font-bold gap-2'
      : 'h-14 rounded-[50px] ps-6 pe-2 text-[15px] font-bold gap-4',
    shadows[variant],
    styles[variant],
    className
  )

  const content = (
    <>
      <span>{children}</span>
      <span
        className={cn(
          'cta-icon-wrap relative grid shrink-0 place-items-center rounded-full',
          isSm ? 'size-7' : 'size-10',
          filteredBg,
          filteredText,
          circleClassName
        )}
        style={customStyle}
      >
        <ArrowIcon aria-hidden className={cn('cta-icon-main', isSm ? 'size-3.5' : 'size-5')} />
        <span className="cta-icon-ghost">
          <ArrowIcon aria-hidden className={isSm ? 'size-3.5' : 'size-5'} />
        </span>
      </span>
    </>
  )

  if (isHash) {
    return (
      <a href={href} onClick={onClick} className={commonClass}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} onClick={onClick} className={commonClass}>
      {content}
    </Link>
  )
}
