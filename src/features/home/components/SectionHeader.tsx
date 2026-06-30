import { Sparkles } from 'lucide-react'

import { cn } from '@/lib/cn'

type SectionHeaderProps = {
  eyebrow?: string
  heading: string
  align?: 'center' | 'start'
  className?: string
}

export function SectionHeader({
  eyebrow,
  heading,
  align = 'center',
  className
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-3xl flex-col gap-6',
        align === 'center' ? 'items-center text-center' : 'items-start text-start',
        className
      )}
    >
      {eyebrow ? (
        <div
          className="inline-flex h-12 items-center justify-center rounded-full border border-[#E8EDF6] bg-white px-5 font-normal leading-normal shadow-[0_10px_24px_rgba(36,58,119,0.04)]"
          style={{
            color: 'var(--Neutral-700, #2F3032)',
            fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
            fontSize: '16px'
          }}
        >
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2
        className="text-balance font-serif-text text-3xl font-bold leading-tight md:text-4xl"
        style={{ color: 'var(--Neutral-800, #1E1E20)' }}
      >
        {heading}
      </h2>
    </div>
  )
}
