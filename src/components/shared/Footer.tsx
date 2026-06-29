import { cn } from '@/lib/cn'

const defaultNavLinks = [
  ['الرئيسية', '#home'],
  ['من نحن', '#who-we-are'],
  ['أعمالنا', '#featured-work'],
  ['الخدمات', '#services'],
  ['المدونة', '#blog'],
  ['تواصل معنا', '#contact']
] as const

export function Footer() {
  return (
    <footer className={cn('bg-[#0E1730]', 'pt-16', 'text-white')}>
      <div
        className={cn(
          'mx-auto',
          'grid',
          'max-w-[1240px]',
          'gap-10',
          'px-5',
          'pb-16',
          'md:grid-cols-2',
          'lg:grid-cols-4',
          'lg:px-0'
        )}
      >
        <div>
          <p className={cn('text-[17px]', 'font-bold')}>تابعنا على وسائل التواصل</p>
          <div className={cn('mt-4', 'flex', 'gap-4')}>
            {[
              '/icons/twitter.svg',
              '/icons/email.svg',
              '/icons/Vector.svg',
              '/icons/mouse.svg'
            ].map((src) => (
              <span key={src} className={cn('grid', 'size-6', 'place-items-center', 'opacity-80')}>
                <img src={src} alt="" className={cn('max-h-5', 'max-w-5', 'invert')} loading="lazy" />
              </span>
            ))}
          </div>
        </div>
        <div className={cn('space-y-8', 'text-[15px]', 'text-white/70')}>
          <div>
            <p className={cn('mb-3', 'text-[17px]', 'font-bold', 'text-white')}>العنوان</p>
            <p>المملكة العربية السعودية</p>
          </div>
          <div>
            <p className={cn('mb-3', 'text-[17px]', 'font-bold', 'text-white')}>تواصل معنا</p>
            <p>info@codeclouders.com</p>
            <p className="mt-2">+966 55 019 7744</p>
          </div>
        </div>
        <div>
          <p className={cn('text-[17px]', 'font-bold')}>روابط مهمة</p>
          <div className={cn('mt-4', 'grid', 'gap-2', 'text-[15px]', 'text-white/70')}>
            {defaultNavLinks.map(([label, href]) => (
              <a key={label} href={href} className="transition duration-200 hover:text-white">
                {label}
              </a>
            ))}
          </div>
        </div>
        <img
          src="/Logo.svg"
          alt="Code Clouders"
          className={cn('h-[39px]', 'w-[160px]', 'brightness-0', 'invert')}
        />
      </div>
      <p
        className={cn(
          'mx-auto',
          'max-w-[1200px]',
          'px-5',
          'pb-8',
          'text-center',
          'text-[12px]',
          'text-white/50',
          'lg:px-0'
        )}
      >
        جميع الحقوق محفوظة - CodeClouders.
      </p>
    </footer>
  )
}
