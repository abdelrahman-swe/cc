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
        'text-[15px]',
        'font-medium',
        'text-[#6F7890]',
        'shadow-[0_10px_24px_rgba(36,58,119,0.04)]'
      )}
    >
      {children}
    </div>
  )
}
