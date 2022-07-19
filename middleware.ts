import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export const middleware = withAuth({
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ req, token }) {
      if (!token) return false
      const url = req.nextUrl.clone()
      url.pathname = '/feed'
      NextResponse.redirect(url)
      return true
    },
  },
})

export const config = {
  matcher: ['/', '/feed'],
}
