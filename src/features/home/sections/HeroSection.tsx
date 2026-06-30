import { BarChart3, CheckCircle2, MousePointerClick } from 'lucide-react'

import type { HeroCard, HeroContent } from '@/features/home/types/home'

import { ButtonLink } from '../components/ButtonLink'

type HeroSectionProps = {
  hero: HeroContent
}

const visualIcons = {
  chart: BarChart3,
  process: CheckCircle2,
  button: MousePointerClick
}

function HeroCardVisual({ card }: { card: HeroCard }) {
  const Icon = visualIcons[card.visual]

  if (card.visual === 'chart') {
    return (
      <div className="flex h-32 items-end justify-center gap-3 rounded-[28px] bg-brand-mist px-8 pb-6">
        {[58, 86, 118, 72].map((height, index) => (
          <span
            key={height}
            className="w-10 rounded-t-2xl bg-gradient-to-t from-[#9bc1ff] to-[#6fa2ff]"
            style={{ height, opacity: 0.72 + index * 0.08 }}
          />
        ))}
      </div>
    )
  }

  if (card.visual === 'process') {
    return (
      <div className="grid h-32 place-items-center rounded-[28px] bg-brand-mist px-8">
        <div className="grid w-full gap-4">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-full bg-white px-5 py-3 shadow-[0_10px_26px_rgba(24,55,119,0.08)]"
            >
              <span className="h-2 w-28 rounded-full bg-brand-line" />
              <span className="grid size-10 place-items-center rounded-full border border-brand-line text-brand-navy">
                <Icon aria-hidden="true" className="size-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid h-32 place-items-center rounded-[28px] bg-brand-mist px-8">
      <div className="inline-flex rotate-6 items-center gap-3 rounded-full bg-brand-navy px-5 py-3 text-white shadow-card">
        <span className="grid size-9 place-items-center rounded-full bg-white/15">
          <Icon aria-hidden="true" className="size-4" />
        </span>
        <span className="h-2 w-24 rounded-full bg-white/70" />
      </div>
    </div>
  )
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-white pb-20 pt-12 md:pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-64 h-px bg-gradient-to-r from-transparent via-brand-line to-transparent" />
      <div className="mx-auto w-full max-w-[1240px] px-5 lg:px-0">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="text-balance text-4xl font-black leading-[1.25] text-brand-navy md:text-6xl">
            {hero.headline.before}{' '}
            <span className="text-brand-orange font-serif-display">{hero.headline.emphasis}</span>
            <br />
            {hero.headline.after}
          </h1>
          {hero.subtitle ? (
            <p
              className="mx-auto mt-8 max-w-2xl text-center font-normal"
              style={{
                color: 'var(--Neutral-300, #808586)',
                fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                fontSize: '24px',
                lineHeight: '140%'
              }}
            >
              {hero.subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {hero.cards.map((card, index) => (
            <article
              key={`${card.title}-${index}`}
              className="group rounded-[30px] border border-brand-line bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-[#93b8ff]"
            >
              <HeroCardVisual card={card} />
              <div className="px-3 pb-2 pt-7 text-right">
                {card.kicker ? (
                  <p className="mb-2 text-xs font-bold text-brand-orange">{card.kicker}</p>
                ) : null}
                <h3
                  className="text-right font-semibold leading-normal"
                  style={{
                    color: 'var(--Neutral-800, #121516)',
                    fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                    fontSize: '22px'
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-3 text-right font-normal"
                  style={{
                    color: 'var(--Neutral-400, #575C5E)',
                    fontFamily: '"IBM Plex Sans Arabic", var(--font-brand), sans-serif',
                    fontSize: '20px',
                    lineHeight: '140%'
                  }}
                >
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
        </div>
      </div>
    </section>
  )
}
