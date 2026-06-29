import type { Block } from 'payload'

import { BlogBlock } from './BlogBlock'
import { FeaturedWorkBlock } from './FeaturedWorkBlock'
import { FinalCtaBlock } from './FinalCtaBlock'
import { HeroBlock } from './HeroBlock'
import { MethodologyBlock } from './MethodologyBlock'
import { PartnersBlock } from './PartnersBlock'
import { ServicesBlock } from './ServicesBlock'
import { StatisticsBlock } from './StatisticsBlock'
import { WhoWeAreBlock } from './WhoWeAreBlock'

export const blocks: Block[] = [
  HeroBlock,
  ServicesBlock,
  FeaturedWorkBlock,
  PartnersBlock,
  BlogBlock,
  StatisticsBlock,
  MethodologyBlock,
  WhoWeAreBlock,
  FinalCtaBlock
]

export {
  BlogBlock,
  FeaturedWorkBlock,
  FinalCtaBlock,
  HeroBlock,
  MethodologyBlock,
  PartnersBlock,
  ServicesBlock,
  StatisticsBlock,
  WhoWeAreBlock
}
