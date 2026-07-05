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
          'leading-normal'
        )}
        style={{
          borderRadius: '32px',
          border: '1px solid var(--Neutral-200, #EAEAEB)',
          background: 'var(--Neutral-100, #F9F9F9)',
          color: 'var(--Neutral-700, #2F3032)',
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
        'border-[#E8EDF6]',
        'bg-white',
        'px-4',
        'font-normal',
        'leading-normal',
        'shadow-[0_10px_24px_rgba(36,58,119,0.04)]'
      )}
      style={{
        color: 'var(--Neutral-700, #2F3032)',
        fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
        fontSize: '16px'
      }}
    >
      {children}
    </div>
  )
}
