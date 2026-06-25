import type { CollectionConfig } from 'payload'

import { BlogPosts } from './BlogPosts'
import { CaseStudies } from './CaseStudies'
import { Media } from './Media'
import { Partners } from './Partners'
import { Services } from './Services'
import { Statistics } from './Statistics'
import { Users } from './Users'

export const collections: CollectionConfig[] = [
  Users,
  Media,
  Services,
  Statistics,
  CaseStudies,
  Partners,
  BlogPosts
]
