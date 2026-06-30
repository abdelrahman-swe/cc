import { cn } from '@/lib/cn'

export function SectionTag({ children }: { children: string }) {
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
