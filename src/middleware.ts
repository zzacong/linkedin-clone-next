import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  if (
    (req.nextUrl.pathname.startsWith('/auth') ||
      req.nextUrl.pathname === '/') &&
    token
  ) {
    return NextResponse.redirect(new URL('/feed', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/feed') && !token)
    return NextResponse.redirect(new URL('/', req.url))
}

export const config = {
  matcher: ['/feed/:path*', '/auth/:path*', '/'],
}
