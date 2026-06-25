import { Cloud } from 'lucide-react'

type BrandMarkProps = {
  label: string
  compact?: boolean
}

export function BrandMark({ label, compact = false }: BrandMarkProps) {
  return (
    <div className="inline-flex items-center gap-2 text-brand-navy" aria-label={label}>
      <span className="grid size-9 place-items-center rounded-xl bg-brand-mist text-brand-navy">
        <Cloud aria-hidden="true" className="size-5" />
      </span>
      <span
        className={
          compact
            ? 'text-sm font-black leading-none'
            : 'max-w-24 text-sm font-black uppercase leading-none'
        }
      >
        {label}
      </span>
    </div>
  )
}
