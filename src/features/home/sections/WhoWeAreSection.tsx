import { Award, Lock, Rocket, SlidersHorizontal } from 'lucide-react'

import type { Statistic, WhyUsItem } from '@/features/home/types/home'

import { ButtonLink } from '../components/ButtonLink'

type WhoWeAreSectionProps = {
  content: {
    heading: string
    body: string
    cta: {
      label: string
      href: string
    }
  }
  stats: Statistic[]
  whyUs: WhyUsItem[]
}

const icons = [Award, SlidersHorizontal, Rocket, Lock]

export function WhoWeAreSection({ content, stats, whyUs }: WhoWeAreSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24" id="who-we-are">
      <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-5 lg:grid-cols-[580px_1fr] lg:px-0">
        <div className="grid gap-6">
          {whyUs.map((item, index) => {
            const Icon = icons[index % icons.length]

            return (
              <article
                key={item.title}
                className="flex gap-5 rounded-3xl border border-brand-line bg-white p-6 shadow-card"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#fff1eb] text-brand-orange">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-brand-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-brand-muted">{item.description}</p>
                </div>
              </article>
            )
          })}
        </div>
        <div className="self-center text-start">
          <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-brand-ink md:text-4xl">
            {content.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-9 text-brand-muted">{content.body}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={`${stat.value}-${stat.label}`} className="text-center">
                <div className="text-3xl font-black text-brand-orange">{stat.value}</div>
                <div className="mt-1 text-lg font-extrabold text-brand-navy">{stat.label}</div>
                {stat.description ? (
                  <p className="mt-3 text-sm leading-6 text-brand-muted">{stat.description}</p>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href={content.cta.href} variant="secondary">
              {content.cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
