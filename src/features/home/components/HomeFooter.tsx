import { Mail, MapPin, Phone, Send } from 'lucide-react'

import type { FooterContent, NavLink } from '@/features/home/types/home'

import { BrandMark } from './BrandMark'

type HomeFooterProps = {
  brand: string
  footer: FooterContent
  links: NavLink[]
}

export function HomeFooter({ brand, footer, links }: HomeFooterProps) {
  return (
    <footer className="bg-[#09152c] text-white" id="contact">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_160px] lg:px-0">
        <div>
          <p className="text-base font-bold">{footer.socialTitle}</p>
          <div className="mt-5 flex gap-3">
            {[0, 1, 2, 3].map((item) => (
              <a
                key={item}
                href="#contact"
                aria-label={`${footer.socialTitle} ${item + 1}`}
                className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/6 text-white/80 transition hover:bg-white/14"
              >
                <Send aria-hidden="true" className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <p className="font-bold">{footer.locationTitle}</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-white/72">
              <MapPin aria-hidden="true" className="size-4" />
              <span>{footer.location}</span>
            </p>
          </div>
          <div>
            <p className="font-bold">{footer.contactTitle}</p>
            <div className="mt-3 space-y-3 text-sm text-white/72">
              <a className="flex items-center gap-2 hover:text-white" href={`mailto:${footer.email}`}>
                <Mail aria-hidden="true" className="size-4" />
                <span>{footer.email}</span>
              </a>
              <a className="flex items-center gap-2 hover:text-white" href={`tel:${footer.phone}`}>
                <Phone aria-hidden="true" className="size-4" />
                <span>{footer.phone}</span>
              </a>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold">{footer.contactTitle}</p>
          <div className="mt-5 grid gap-3 text-sm text-white/72">
            {links.map((link) => (
              <a key={`${link.href}-${link.label}`} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="justify-self-start lg:justify-self-end">
          <BrandMark label={brand} compact />
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] border-t border-white/10 px-5 py-8 text-center text-xs text-white/50 lg:px-0">
        {footer.copyright}
      </div>
    </footer>
  )
}
