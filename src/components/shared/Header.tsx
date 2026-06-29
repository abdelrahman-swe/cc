'use client'

import { motion } from 'framer-motion'
import { PillButton } from '@/components/ui/PillButton'
import { cn } from '@/lib/cn'

const defaultNavLinks = [
  ['الرئيسية', '#home'],
  ['من نحن', '#who-we-are'],
  ['أعمالنا', '#featured-work'],
  ['الخدمات', '#services'],
  ['المدونة', '#blog'],
  ['تواصل معنا', '#contact']
] as const

type NavLink = {
  label: string
  href: string
}

type HeaderProps = {
  brand?: string
  links?: NavLink[]
  cta?: { label?: string; href?: string }
}

export function Header({ brand, links, cta }: HeaderProps) {
  const navLinks = links && links.length > 0
    ? links.map((l) => [l.label, l.href] as const)
    : defaultNavLinks

  const ctaLabel = cta?.label || 'طلب خدمة'
  const ctaHref = cta?.href || '#contact'

  return (
    <header className={cn('h-[100px]', 'bg-white')}>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'mx-auto',
          'flex',
          'h-14',
          'max-w-[1240px]',
          'items-center',
          'justify-between',
          'px-5',
          'pt-[22px]',
          'lg:px-0'
        )}
      >
        <img src="/Logo.svg" alt={brand || 'Code Clouders'} className={cn('h-[39px]', 'w-[160px]')} />
        <div
          className={cn(
            'hidden',
            'w-[920px]',
            'justify-center',
            'gap-10',
            'text-[15px]',
            'font-medium',
            'text-[#243A77]',
            'lg:flex'
          )}
        >
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} className="transition duration-200 hover:text-[#F15722]">
              {label}
            </a>
          ))}
        </div>
        <PillButton href={ctaHref} variant="nav" className="hidden lg:inline-flex">
          {ctaLabel}
        </PillButton>
      </motion.nav>
    </header>
  )
}
