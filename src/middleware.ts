import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${routing.defaultLocale}`

    return NextResponse.redirect(url)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
}
