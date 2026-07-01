import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { collections } from './src/collections'
import { globals } from './src/globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- CodeClouders'
    },
    components: {
      graphics: {
        Logo: './src/components/admin/Logo.tsx',
        Icon: './src/components/admin/Icon.tsx',
      }
    },
  },
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    'https://cc-lime-nu.vercel.app',
    'http://localhost:3000'
  ],
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    'https://cc-lime-nu.vercel.app',
    'http://localhost:3000'
  ],
  collections,
  globals,
  editor: lexicalEditor(),
  localization: {
    locales: [
      {
        code: 'ar',
        label: 'Arabic',
        rtl: true
      },
      {
        code: 'en',
        label: 'English'
      }
    ],
    defaultLocale: 'ar',
    fallback: true
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/codeclouders'
  }),
  secret: process.env.PAYLOAD_SECRET || 'development-codeclouders-homepage-secret',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts')
  }
})
