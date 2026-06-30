import type { FooterData } from '@/components/shared/Footer'
import { Footer } from '@/components/shared/Footer'
import type { FooterContent, NavLink } from '@/features/home/types/home'

type HomeFooterProps = {
  brand: string
  footer: FooterContent
  links: NavLink[]
}

export function HomeFooter({ brand, footer, links }: HomeFooterProps) {
  const footerData: FooterData = {
    socialTitle: footer.socialTitle,
    locationTitle: footer.locationTitle,
    location: footer.location,
    contactTitle: footer.contactTitle,
    email: footer.email,
    phone: footer.phone,
    copyright: footer.copyright,
    links: links.map((l) => ({ label: l.label, url: l.href }))
  }

  return <Footer data={footerData} />
}

