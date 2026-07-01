'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { PillButton } from '@/components/ui/PillButton'
import { cn } from '@/lib/cn'
import { useParams, usePathname, useRouter } from 'next/navigation'

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
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const currentLocale = (params.locale as string) || 'ar'

  const switchLocale = (newLocale: string) => {
    if (currentLocale && pathname.startsWith(`/${currentLocale}`)) {
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
      router.push(newPath)
    } else {
      router.push(`/${newLocale}`)
    }
  }

  const navLinks = links && links.length > 0
    ? links.map((l) => [l.label, l.href] as const)
    : defaultNavLinks

  const ctaLabel = cta?.label || 'طلب خدمة'
  const ctaHref = cta?.href || '#contact'

  return (
    <header className={cn('h-[100px]', 'bg-white', 'relative')}>
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
            'items-center',
            'justify-center',
            'gap-10',
            'lg:flex'
          )}
        >
          {navLinks.map(([label, href], index) => {
            const isActive = index === 0
            return (
              <a
                key={label}
                href={href}
                className="transition duration-200 leading-normal"
                style={
                  isActive
                    ? {
                        color: 'var(--Primary-500, #F15722)',
                        fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                        fontSize: '20px',
                        fontWeight: 700
                      }
                    : {
                        color: 'var(--Neutral-600, #414244)',
                        fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                        fontSize: '18px',
                        fontWeight: 400
                      }
                }
              >
                {label}
              </a>
            )
          })}
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <PillButton href={ctaHref} variant="nav">
            {ctaLabel}
          </PillButton>
          <button
            onClick={() => switchLocale(currentLocale === 'ar' ? 'en' : 'ar')}
            className={cn(
              'flex',
              'h-10',
              'px-4',
              'items-center',
              'justify-center',
              'rounded-full',
              'border',
              'border-[#E8EDF6]',
              'text-[#243A77]',
              'font-medium',
              'text-[15px]',
              'transition-all',
              'duration-200',
              'hover:bg-[#FCDDD3]/10',
              'hover:border-[#F15722]/50',
              'hover:text-[#F15722]'
            )}
          >
            {currentLocale === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>

        {/* Hamburger Mobile Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex size-10 items-center justify-center rounded-full border border-[#E8EDF6] text-[#243A77] lg:hidden transition duration-200 active:scale-95"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-x-0 top-[100px] z-50 flex flex-col items-center gap-6 border-b border-[#E8EDF6] bg-white px-6 py-8 shadow-lg lg:hidden"
          >
            <div className="flex flex-col items-center gap-4 w-full">
              {navLinks.map(([label, href], index) => {
                const isActive = index === 0
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="transition duration-200 leading-normal text-center py-2 w-full block hover:bg-gray-50 rounded-xl"
                    style={
                      isActive
                        ? {
                            color: 'var(--Primary-500, #F15722)',
                            fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                            fontSize: '20px',
                            fontWeight: 700
                          }
                        : {
                            color: 'var(--Neutral-600, #414244)',
                            fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                            fontSize: '18px',
                            fontWeight: 400
                          }
                    }
                  >
                    {label}
                  </a>
                )
              })}
            </div>
            <PillButton href={ctaHref} variant="nav" className="w-full justify-center mt-2" onClick={() => setMenuOpen(false)}>
              {ctaLabel}
            </PillButton>
            <button
              onClick={() => {
                switchLocale(currentLocale === 'ar' ? 'en' : 'ar')
                setMenuOpen(false)
              }}
              className={cn(
                'flex',
                'w-full',
                'h-12',
                'items-center',
                'justify-center',
                'rounded-xl',
                'border',
                'border-[#E8EDF6]',
                'text-[#243A77]',
                'font-medium',
                'text-[16px]',
                'transition-all',
                'duration-200',
                'hover:bg-[#FCDDD3]/10',
                'hover:border-[#F15722]/50',
                'hover:text-[#F15722]'
              )}
            >
              {currentLocale === 'ar' ? 'English' : 'العربية'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
