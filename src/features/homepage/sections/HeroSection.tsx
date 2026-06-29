import { PillButton } from '@/components/ui/PillButton'
import { SectionTag } from '@/components/ui/SectionTag'
import { HeroCard } from '../components/HeroCards'

type HeroSectionProps = {
  badge?: string
  title?: string
  subtitle?: string
  primaryCta?: { label?: string; href?: string }
  secondaryCta?: { label?: string; href?: string }
}

export function HeroSection(props: HeroSectionProps) {
  const badge = props.badge || 'شركة تطوير برمجيات وسحابة متقدمة'
  const title = props.title || 'نحول أفكارك إلى حلول رقمية تسابق المستقبل'
  const subtitle =
    props.subtitle ||
    'نساعد الشركات والمؤسسات على بناء وتطوير المنتجات الرقمية، الأنظمة السحابية، وتجارب المستخدم الاحترافية بأعلى معايير الجودة والأمان.'

  return (
    <section className="bg-white pb-16 pt-12 md:pb-24 md:pt-16" id="home">
      <div className="mx-auto w-full max-w-[1240px] px-5 lg:px-0">
        <div className="flex flex-col items-center text-center">
          <SectionTag>{badge}</SectionTag>
          <h1 className="mt-8 max-w-[920px] text-[40px] font-extrabold leading-tight text-[#0E1730] md:text-[56px]">
            {title}
          </h1>
          <p className="mt-6 max-w-[760px] text-[18px] leading-relaxed text-[#6F7890]">
            {subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PillButton href={props.primaryCta?.href || '#contact'} variant="orange">
              {props.primaryCta?.label || 'احجز استشارة مجانية'}
            </PillButton>
            <PillButton href={props.secondaryCta?.href || '#services'} variant="white">
              {props.secondaryCta?.label || 'تصفح خدماتنا'}
            </PillButton>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <HeroCard
            type="chart"
            title="نمنحك رؤية أوضح"
            body="حوّل بياناتك إلى قرارات قابلة للتنفيذ عبر واجهات مخصصة ونظم تحليل دقيقة."
            hoverRotate={-2}
          />
          <HeroCard
            type="process"
            title="نسهل آلية فهم احتياجاتك"
            body="نحول متطلباتك إلى حلول رقمية دقيقة ومترابطة تحاكي سير عملك الحقيقي."
            hoverRotate={2}
          />
          <HeroCard
            type="button"
            title="نجعل القرار أسهل"
            body="نضع بين يديك تجربة رقمية واضحة ومتكاملة تسرع الوصول إلى أهدافك."
            hoverRotate={-2}
          />
        </div>
      </div>
    </section>
  )
}
