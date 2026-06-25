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
        <p className="inline-flex h-12 items-center gap-2 rounded-full border border-brand-line bg-white px-5 text-sm font-bold text-brand-muted shadow-[0_12px_34px_rgba(17,43,88,0.06)]">
          <Sparkles aria-hidden="true" className="size-4 text-brand-orange" />
          <span>{eyebrow}</span>
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-extrabold leading-tight text-brand-navy md:text-4xl">
        {heading}
      </h2>
    </div>
  )
}
