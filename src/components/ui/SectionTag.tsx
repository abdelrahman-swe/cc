import { cn } from '@/lib/cn'

export interface SectionTagProps {
  children: string
  variant?: 'default' | 'about'
}

export function SectionTag({ children, variant = 'default' }: SectionTagProps) {
  if (variant === 'about') {
    return (
      <div
        className={cn(
          'flex',
          'h-12',
          'items-center',
          'justify-center',
          'px-4',
          'gap-2',
          'font-normal',
          'leading-normal',
          'rounded-[32px]',
          'border',
          'border-border-subtle',
          'bg-surface-elevated',
          'text-foreground-muted',
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

  return (
    <div
      className={cn(
        'inline-flex',
        'h-12',
        'items-center',
        'justify-center',
        'rounded-full',
        'border',
        'border-border',
        'bg-surface',
        'px-4',
        'font-normal',
        'leading-normal',
        'shadow-[0_10px_24px_rgba(36,58,119,0.04)]',
        'dark:shadow-[0_10px_24px_rgba(0,0,0,0.2)]',
        'text-foreground-muted',
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

