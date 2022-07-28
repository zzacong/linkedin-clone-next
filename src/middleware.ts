import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret })

  if (
    (req.nextUrl.pathname.startsWith('/auth') ||
      req.nextUrl.pathname === '/') &&
    session
  ) {
    return NextResponse.redirect(new URL('/feed', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/feed') && !session)
    return NextResponse.redirect(new URL('/', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/feed/:path*', '/auth/:path*', '/'],
}
