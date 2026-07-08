import { cn } from '@/lib/cn'

export interface SectionTagProps {
  children: string
  variant?: 'default' | 'about'
}

export function SectionTag({ children }: SectionTagProps) {
  return (
    <div
      className={cn(
        'inline-flex',
        'h-12',
        'items-center',
        'justify-center',
        'px-4',
        'gap-2',
        'font-normal',
        'leading-normal',
        'rounded-full',
        'border',
        'border-border-subtle',
        'dark:border-[#162347]',
        'bg-surface-elevated',
        'dark:bg-[#0E1730]',
        'text-foreground-muted',
        'dark:text-[#A9BEDB]',
        'transition-colors',
        'duration-300'
      )}
      style={{
        fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
        fontSize: '16px'
      }}
    >
      {children}
    </div>
  )
}

