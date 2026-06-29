import type { CollectionConfig } from 'payload'

import { BlogPosts } from './BlogPosts'
import { CaseStudies } from './CaseStudies'
import { Media } from './Media'
import { Pages } from './Pages'
import { Partners } from './Partners'
import { Services } from './Services'
import { Statistics } from './Statistics'
import { Users } from './Users'

export const collections: CollectionConfig[] = [
  Users,
  Media,
  Pages,
  Services,
  Statistics,
  CaseStudies,
  Partners,
  BlogPosts
]

