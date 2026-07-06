import { Counter } from '@/components/ui/Counter'
import { SectionTag } from '@/components/ui/SectionTag'

type StatisticItem = {
  value: number
  suffix: string
  label: string
}

type StatisticsSectionProps = {
  sectionTag?: string
  title?: string
  stats?: StatisticItem[]
  presentation?: any
  customSectionId?: string
}

const defaultStats: StatisticItem[] = [
  { value: 60, suffix: '+', label: 'مشاريع منجزة' },
  { value: 98, suffix: '%', label: 'نسبة رضا العملاء' },
  { value: 15, suffix: '+', label: 'خبير تقني' },
  { value: 24, suffix: '/7', label: 'دعم متواصل' }
]

export function StatisticsSection(props: StatisticsSectionProps) {
  const stats = props.stats || defaultStats
  const sectionTag = props.sectionTag || 'أرقامنا'
  const title = props.title || 'أرقام تتحدث عن نجاحنا'
  const sectionId = props.customSectionId || 'statistics'

  return (
    <section className="bg-surface py-16 md:py-24 transition-colors duration-300" id={sectionId}>
      <div className="mx-auto w-full max-w-[1240px] px-5 lg:px-0">
        <div className="text-right">
          <SectionTag>{sectionTag}</SectionTag>
          <h2
            className="mt-4 font-serif-text text-[32px] font-bold leading-tight md:text-[40px]"
            style={{ color: 'var(--Neutral-800, #1E1E20)' }}
          >
            {title}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[30px] border border-border bg-surface-card p-6 text-center shadow-[0_10px_24px_rgba(36,58,119,0.03)] dark:shadow-[0_10px_24px_rgba(0,0,0,0.15)] transition-colors duration-300"
            >
              <div className="text-[36px] font-extrabold text-[#F15722] md:text-[44px]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p
                className="mt-2 text-center font-normal"
                style={{
                  color: 'var(--Neutral-500, #5F6063)',
                  fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                  fontSize: '16px'
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
