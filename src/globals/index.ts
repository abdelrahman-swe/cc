import type { GlobalConfig } from 'payload'

import { Footer } from './Footer'
import { HeroContent } from './HeroContent'
import { HomepageSettings } from './HomepageSettings'
import { Navigation } from './Navigation'
import { SiteSettings } from './SiteSettings'

export const globals: GlobalConfig[] = [
  SiteSettings,
  Navigation,
  Footer,
  HeroContent,
  HomepageSettings
]
